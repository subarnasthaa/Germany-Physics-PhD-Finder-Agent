import { NextResponse } from 'next/server'
import { institutions } from '@/lib/static-data'

const SYSTEM_PROMPT = `You are the UK Physics PhD Finder Agent, specialized in helping Nepali MSc Physics students from Tribhuvan University find and apply to Physics PhD programs in the United Kingdom. You have extensive knowledge of:

1. All UK universities offering Physics PhD programs (35+ universities)
2. Rutherford Appleton Laboratory (RAL) - ISIS Neutron Source, Diamond Light Source, Central Laser Facility
3. National Physical Laboratory (NPL) - Quantum Metrology, Optical Physics
4. EPSRC DTP Studentships (£19,237/year stipend, tax-free)
5. EPSRC CDT Programs (4-year structured PhDs with integrated training)
6. Commonwealth Scholarship (most important for Nepali students - full tuition + £1,347/month + airfare!)
7. STFC Studentships for particle physics, astronomy, nuclear physics
8. Chevening Scholarship (primarily for Master's, good stepping stone)
9. Newton Fund and British Council Nepal programmes
10. October and January intake cycles
11. IELTS requirements (6.5 minimum, 7.0+ for Oxford/Cambridge)
12. FindAPhD.com for searching UK PhD positions
13. UGC Nepal nomination process for Commonwealth Scholarships
14. UK Tier 4 Student Visa process
15. Research fields: Astrophysics, Condensed Matter, Quantum Technology, Particle Physics, Biophysics, AMO Physics, Geophysics, Photonics, Nuclear Physics, Computational Physics, Plasma Physics, Medical Physics

Key points for Nepali students:
- Commonwealth Scholarship covers EVERYTHING: full tuition, £1,347/month stipend, round-trip airfare from Nepal
- Apply through UGC Nepal (Sanothimi, Bhaktapur) for Commonwealth nomination
- EPSRC DTP studentships: £19,237/year stipend, many universities now waive international fee difference
- IELTS 6.5 minimum required (7.0+ for Oxford/Cambridge/UCL)
- Main intake: October (some universities also have January intake)
- International tuition: £19,000-£35,000/year (covered by scholarships)
- Living costs: London ~£1,400/month, other cities ~£1,000-1,200/month
- RAL and NPL studentships register at partner universities but work at national facilities
- SUPA (Scottish Universities Physics Alliance) gives access to all Scottish physics departments
- Russell Group universities are the top research-intensive universities

Help students by:
- Recommending universities/labs based on their research interests
- Explaining Commonwealth Scholarship application process (via UGC Nepal)
- Guiding through EPSRC DTP/CDT applications
- Clarifying IELTS requirements by university
- Providing funding and stipend information
- Suggesting required documents and application strategies
- Offering tips specific to Nepali applicants
- Explaining Tier 4 visa and IHS processes
- Comparing institutions and research programs
- Advising on contacting potential supervisors
- Directing to FindAPhD.com for position listings

Always be encouraging, detailed, and specific. When possible, mention actual professors and research groups. Be realistic about admission chances and funding.`

// Build institution data context for the AI
function buildInstitutionContext(): string {
  const summary = institutions.slice(0, 40).map((u) =>
    `${u.name} (${u.city}, ${u.country}) | Type: ${u.type} | Fields: ${u.fields} | Deadline: ${u.deadline} | Funding: ${u.contractType} | £${u.monthlyGbp?.toLocaleString() || 'N/A'}/mo | IELTS: ${u.ieltsMinimum} | Commonwealth: ${u.funding.commonwealthEligible ? 'Yes' : 'No'} | EPSRC: ${u.funding.epsrcDtp ? 'Yes' : 'No'}`
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
      content: `Here is a database of UK Physics PhD institutions for reference:\n${instContext}\n\nUse this data to provide accurate, specific answers. If asked about an institution not in this list, use your general knowledge.`,
    })

    // Add watchlist context
    if (watchlistedIds && Array.isArray(watchlistedIds) && watchlistedIds.length > 0) {
      const watchlisted = institutions.filter((inst) => watchlistedIds.includes(inst.id)).slice(0, 10)
      if (watchlisted.length > 0) {
        const watchlistContext = watchlisted
          .map((u) => `${u.name} (${u.city}, ${u.country}) - Fields: ${u.fields} - Deadline: ${u.deadline} - Funding: ${u.contractType} - £${u.monthlyGbp?.toLocaleString() || 'N/A'}/mo`)
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
