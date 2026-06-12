import { NextResponse } from 'next/server'
import { institutions } from '@/lib/static-data'

const SYSTEM_PROMPT = `You are the New Zealand Physics PhD Finder Agent, specialized in helping Nepali MSc Physics students from Tribhuvan University find and apply to Physics PhD programs in New Zealand. You have extensive knowledge of:

1. All 8 NZ universities offering Physics PhD programs: Auckland, Victoria Wellington, Canterbury, Otago, Massey, AUT, Lincoln, Waikato
2. MacDiarmid Institute for Advanced Materials and Nanotechnology — spans 5 universities (Auckland, VUW, Otago, Massey, Waikato)
3. GNS Science — geophysics, seismology, volcanology, nuclear/isotope physics
4. Callaghan Innovation — applied physics, advanced materials
5. University Doctoral Scholarships — NZD $27,000-28,000/year (tax-free)
6. Full tuition coverage at all NZ universities for doctoral students
7. Manaaki New Zealand Scholarship (MOST IMPORTANT for Nepali students — full tuition + NZD $1,500/month + airfare + insurance!)
8. NZ Commonwealth Scholarship
9. MacDiarmid Institute PhD Scholarships (NZD $27,000/year + NZD $3,000 conference travel + research funds)
10. MacDiarmid top-up scholarships (NZD $2,000-5,000/year additional on top of university scholarships)
11. GNS Science PhD Scholarships (NZD $28,000/year)
12. Semester 1 (February) and Semester 2 (July) intake cycles + Rolling admissions
13. IELTS requirements (6.5 minimum at all NZ universities, no band below 6.0)
14. NZ High Commission Nepal (Bansbari Heights, Maharajgunj, Kathmandu) — manages Manaaki NZ applications
15. NZ student visa process (Immigration NZ online portal, 4-8 weeks processing)
16. Health and travel insurance requirements
17. Research fields: Astrophysics, Quantum Physics/Computing, Condensed Matter, Materials Science, Photonics, Medical Physics, Geophysics, Environmental Physics, Applied Physics, Quantum Optics, Superconductivity, Nanotechnology, Sensors, Biophysics, Nuclear Physics, Atmospheric Physics, Seismology, Volcanology

Key points for Nepali students:
- Manaaki NZ Scholarship covers EVERYTHING: full tuition, NZD $1,500/month living allowance, return airfare from Nepal, health insurance, NZD $3,000 establishment allowance
- Apply through Manaaki NZ online portal (manaaki.nz) for Manaaki NZ Scholarship (opens Feb, deadline Apr each year)
- NZ High Commission in Kathmandu manages the Manaaki NZ process for Nepal
- University Doctoral Scholarships: NZD $27,000-28,000/year at ALL NZ universities (tax-free)
- Full tuition coverage is standard at all NZ universities for PhD students with scholarships
- MacDiarmid top-up adds NZD $2,000-5,000/year on top of university scholarships
- IELTS 6.5 minimum required at all NZ universities (no band below 6.0)
- Main intake: Semester 1 (February), also Semester 2 (July), many have Rolling admissions
- International tuition: NZD $28,000-38,700/year (covered by scholarships)
- Living costs: NZD $1,500-2,200/month depending on city
- NZ cost of living is lower than Australia, making effective purchasing power higher
- MacDiarmid Institute students enrolled at node universities but part of wider research community
- GNS Science students co-enrolled at partner universities (mainly VUW)

Help students by:
- Recommending universities/institutes based on their research interests
- Explaining Manaaki NZ application process (via manaaki.nz and NZ High Commission Kathmandu)
- Guiding through university doctoral scholarship applications
- Clarifying IELTS requirements by university
- Providing funding and stipend information in NZD
- Suggesting required documents and application strategies
- Offering tips specific to Nepali applicants
- Explaining NZ student visa process
- Comparing institutions and research programs
- Advising on contacting potential supervisors
- Explaining MacDiarmid/GNS co-supervision arrangements

Always be encouraging, detailed, and specific. When possible, mention actual professors and research groups. Be realistic about admission chances and funding.`

// Build institution data context for the AI
function buildInstitutionContext(): string {
  const summary = institutions.slice(0, 20).map((u) =>
    `${u.name} (${u.city}, ${u.country}) | Type: ${u.type} | Fields: ${u.fields} | Deadline: ${u.deadline} | Funding: ${u.contractType} | NZD $${u.monthlyGbp?.toLocaleString() || 'N/A'}/mo | IELTS: ${u.ieltsMinimum} | Manaaki NZ: ${u.funding.manaakiNzEligible ? 'Yes' : 'No'} | MacDiarmid: ${u.funding.macdiarmidNode ? 'Yes' : 'No'}`
  ).join('\n')
  return summary
}

// Call Google Gemini API
async function callGemini(apiKey: string, messages: Array<{ role: string; content: string }>) {
  const contents = messages.map((msg) => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }],
  }))

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
      }),
    }
  )

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Gemini API error: ${res.status} - ${err}`)
  }

  const data = await res.json()
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini.'
}

// Call OpenAI-compatible API
async function callOpenAI(
  apiKey: string,
  messages: Array<{ role: string; content: string }>,
  baseUrl: string = 'https://api.openai.com/v1',
  model: string = 'gpt-4o-mini'
) {
  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
      temperature: 0.7,
      max_tokens: 2048,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`OpenAI API error: ${res.status} - ${err}`)
  }

  const data = await res.json()
  return data?.choices?.[0]?.message?.content || 'No response from AI.'
}

// Call z-ai-web-dev-sdk (sandbox only)
async function callZAI(messages: Array<{ role: string; content: string }>) {
  const ZAI = (await import('z-ai-web-dev-sdk')).default
  const zai = await ZAI.create()
  const typedMessages = messages.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }))
  const completion = await zai.chat.completions.create({
    messages: typedMessages,
    thinking: { type: 'disabled' },
  })
  return completion?.choices?.[0]?.message?.content || 'I could not generate a response.'
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message, history, watchlistedIds, apiKey, provider, model, baseUrl } = body

    if (!message) {
      return NextResponse.json({ error: 'message is required' }, { status: 400 })
    }

    const messages: Array<{ role: string; content: string }> = [
      { role: 'assistant', content: SYSTEM_PROMPT },
    ]

    // Add institution data context
    const instContext = buildInstitutionContext()
    messages.push({
      role: 'assistant',
      content: `Here is a database of New Zealand Physics PhD institutions for reference:\n${instContext}\n\nUse this data to provide accurate, specific answers. If asked about an institution not in this list, use your general knowledge.`,
    })

    // Add watchlist context
    if (watchlistedIds && Array.isArray(watchlistedIds) && watchlistedIds.length > 0) {
      const watchlisted = institutions.filter((inst) => watchlistedIds.includes(inst.id)).slice(0, 10)
      if (watchlisted.length > 0) {
        const watchlistContext = watchlisted
          .map((u) => `${u.name} (${u.city}, ${u.country}) - MacDiarmid: ${u.funding.macdiarmidNode ? 'Yes' : 'No'} - Fields: ${u.fields} - Deadline: ${u.deadline} - Funding: ${u.contractType} - NZD $${u.monthlyGbp?.toLocaleString() || 'N/A'}/mo`)
          .join('\n')
        messages.push({
          role: 'assistant',
          content: `The student has these institutions in their watchlist:\n${watchlistContext}`,
        })
      }
    }

    // Add conversation history
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        if (msg.role === 'user' || msg.role === 'assistant') {
          messages.push({ role: msg.role, content: msg.content })
        }
      }
    }

    messages.push({ role: 'user', content: message })

    let assistantMessage: string

    if (apiKey && provider === 'gemini') {
      assistantMessage = await callGemini(apiKey, messages)
    } else if (apiKey && provider === 'openai') {
      assistantMessage = await callOpenAI(apiKey, messages, baseUrl || 'https://api.openai.com/v1', model || 'gpt-4o-mini')
    } else if (apiKey && provider === 'groq') {
      assistantMessage = await callOpenAI(apiKey, messages, 'https://api.groq.com/openai/v1', model || 'llama-3.3-70b-versatile')
    } else if (apiKey && provider === 'together') {
      assistantMessage = await callOpenAI(apiKey, messages, 'https://api.together.xyz/v1', model || 'meta-llama/Llama-3-70b-chat-hf')
    } else if (apiKey && provider === 'custom') {
      assistantMessage = await callOpenAI(apiKey, messages, baseUrl || 'https://api.openai.com/v1', model || 'gpt-4o-mini')
    } else {
      try {
        assistantMessage = await callZAI(messages)
      } catch {
        return NextResponse.json(
          {
            error: 'AI_API_KEY_REQUIRED',
            message: 'Please configure an AI API key to use the chat. Go to Settings in the AI Agent tab and add your API key.',
          },
          { status: 400 }
        )
      }
    }

    return NextResponse.json({ response: assistantMessage })
  } catch (error) {
    console.error('Error in agent chat:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to process agent request'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
