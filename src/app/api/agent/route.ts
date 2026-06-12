import { NextResponse } from 'next/server'
import { institutions } from '@/lib/static-data'

const SYSTEM_PROMPT = `You are the Australia Physics PhD Finder Agent, specialized in helping Nepali MSc Physics students from Tribhuvan University find and apply to Physics PhD programs in Australia. You have extensive knowledge of:

1. All Australian universities offering Physics PhD programs (25+ universities)
2. CSIRO divisions - Astronomy & Space Science, Energy, Manufacturing, Data61, Oceans & Atmosphere, Mineral Resources
3. ANSTO - Australian Centre for Neutron Scattering, OPAL research reactor
4. RTP (Research Training Program) Stipend - AUD $32,192/year (2025 rate, tax-free)
5. RTP Fee Offset - covers full international tuition fees
6. Australia Awards Scholarship (MOST IMPORTANT for Nepali students - full tuition + AUD $3,000/month + airfare + OSHC!)
7. CSIRO Postgraduate Top-up Scholarships (AUD $7,000-10,000/year on top of RTP)
8. ANSTO Postgraduate Scholarships
9. Endeavour Leadership Program
10. University-specific international scholarships (Melbourne Research, ANU Research, Sydney International, etc.)
11. Group of Eight (Go8) universities: ANU, Melbourne, Sydney, UNSW, Queensland, Monash, Adelaide, UWA
12. Semester 1 (February) and Semester 2 (July) intake cycles + Rolling admissions
13. IELTS requirements (6.0-6.5 minimum, Australia Awards requires 6.5)
14. Australian High Commission Nepal (Bansbari, Kathmandu) and Australia Awards Nepal office
15. Subclass 500 Student Visa process
16. OSHC (Overseas Student Health Cover) requirements
17. Research fields: Astrophysics, Quantum Physics/Computing, Condensed Matter, Particle Physics, Gravitational Waves, Dark Matter, Photonics, Medical Physics, Nuclear Physics, Biophysics, AMO Physics, Geophysics, Environmental Physics, Computational Physics, Plasma Physics, Renewable Energy

Key points for Nepali students:
- Australia Awards Scholarship covers EVERYTHING: full tuition, AUD $3,000/month stipend, return airfare from Nepal, OSHC, establishment allowance
- Apply through OASIS online system for Australia Awards (opens May, deadline July each year)
- Australia Awards Nepal office in Bansbari, Kathmandu manages the process
- RTP Stipend: AUD $32,192/year at ALL Australian universities (tax-free)
- RTP Fee Offset covers full international tuition at most universities
- CSIRO top-up adds AUD $7,000-10,000/year on top of RTP
- IELTS 6.5 minimum required for Australia Awards and most Go8 universities (6.0 accepted at some)
- Main intake: Semester 1 (February), also Semester 2 (July), many have Rolling admissions
- International tuition: AUD $34,000-49,500/year (covered by scholarships)
- Living costs: AUD $1,800-2,500/month depending on city
- Go8 universities are the top research-intensive universities in Australia
- CSIRO and ANSTO students enroll at partner universities but work at national facilities
- OzGrav (ARC Centre for Gravitational Wave Discovery) spans multiple universities
- EQUS (ARC Centre for Engineered Quantum Systems) at UQ and partners

Help students by:
- Recommending universities/labs based on their research interests
- Explaining Australia Awards application process (via OASIS and Australia Awards Nepal)
- Guiding through RTP stipend applications at universities
- Clarifying IELTS requirements by university
- Providing funding and stipend information in AUD
- Suggesting required documents and application strategies
- Offering tips specific to Nepali applicants
- Explaining Subclass 500 visa and OSHC processes
- Comparing institutions and research programs
- Advising on contacting potential supervisors
- Explaining CSIRO/ANSTO co-supervision arrangements

Always be encouraging, detailed, and specific. When possible, mention actual professors and research groups. Be realistic about admission chances and funding.`

// Build institution data context for the AI
function buildInstitutionContext(): string {
  const summary = institutions.slice(0, 40).map((u) =>
    `${u.name} (${u.city}, ${u.state}) | Type: ${u.type} | Go8: ${u.go8 ? 'Yes' : 'No'} | Fields: ${u.fields} | Deadline: ${u.deadline} | Funding: ${u.contractType} | AUD $${u.monthlyGbp?.toLocaleString() || 'N/A'}/mo | IELTS: ${u.ieltsMinimum} | Australia Awards: ${u.funding.australiaAwardsEligible ? 'Yes' : 'No'} | RTP: ${u.funding.rtpAvailable ? 'Yes' : 'No'} | CSIRO Top-up: ${u.funding.csiroTopup ? 'Yes' : 'No'}`
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
      content: `Here is a database of Australian Physics PhD institutions for reference:\n${instContext}\n\nUse this data to provide accurate, specific answers. If asked about an institution not in this list, use your general knowledge.`,
    })

    // Add watchlist context
    if (watchlistedIds && Array.isArray(watchlistedIds) && watchlistedIds.length > 0) {
      const watchlisted = institutions.filter((inst) => watchlistedIds.includes(inst.id)).slice(0, 10)
      if (watchlisted.length > 0) {
        const watchlistContext = watchlisted
          .map((u) => `${u.name} (${u.city}, ${u.state}) - Go8: ${u.go8 ? 'Yes' : 'No'} - Fields: ${u.fields} - Deadline: ${u.deadline} - Funding: ${u.contractType} - AUD $${u.monthlyGbp?.toLocaleString() || 'N/A'}/mo`)
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
