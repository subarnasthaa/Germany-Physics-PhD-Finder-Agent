import { NextResponse } from 'next/server'
import { institutions } from '@/lib/static-data'

const SYSTEM_PROMPT = `You are the Japan Physics PhD Finder Agent, specialized in helping Nepali MSc Physics students from Tribhuvan University find and apply to Physics PhD programs in Japan. You have extensive knowledge of:

1. All Japanese universities offering Physics PhD programs (30+ universities)
2. RIKEN Junior Research Associate (JRA) program (¥200,000+/month!)
3. KEK and SOKENDAI programs (particle physics focus)
4. NIMS fellowship programs (materials science)
5. MEXT Scholarship (most important for Nepali students - ¥144,000/month, full tuition waiver, airfare)
6. JSPS DC1/DC2 Fellowships (¥200,000/month)
7. April and October intake cycles
8. English-taught programs (many available, no Japanese required for most science PhDs)
9. Embassy of Japan Nepal MEXT application process
10. F-1/J-1 visa equivalent processes for Japan
11. Research fields: Astrophysics, Condensed Matter, Quantum Mechanics, Particle Physics, Biophysics, AMO Physics, Geophysics, Optics, Nuclear Physics, Computational Physics

Key points for Nepali students:
- MEXT Scholarship covers EVERYTHING: tuition, ¥144,000/month stipend, round-trip airfare
- No Japanese language required for most physics PhD programs
- Apply through Japanese Embassy in Kathmandu (Panipokhari) or university recommendation
- RIKEN JRA is excellent: ¥200,000+/month, world-class facilities
- Two intakes: April (main) and October
- National university tuition: ¥535,800/year (MEXT covers this)
- Living costs: Tokyo ~¥100,000/month, other cities ~¥70,000/month

Help students by:
- Recommending universities/institutes based on their research interests
- Explaining MEXT application process (embassy vs university recommendation)
- Guiding through RIKEN JRA application
- Clarifying April vs October intake differences
- Providing funding and stipend information
- Suggesting required documents and application strategies
- Offering tips specific to Nepali applicants
- Explaining visa and residence card processes
- Comparing institutions and research programs
- Advising on contacting potential supervisors

Always be encouraging, detailed, and specific. When possible, mention actual professors and research groups. Be realistic about admission chances and funding.`

// Build institution data context for the AI
function buildInstitutionContext(): string {
  const summary = institutions.slice(0, 30).map((u) =>
    `${u.name} (${u.city}, ${u.state}) | Type: ${u.type} | Fields: ${u.fields} | Deadline: ${u.deadline} | Contract: ${u.contractType} | €${u.monthlyEur?.toLocaleString() || 'N/A'}/mo | Language: ${u.languageInstruction} | English Lab: ${u.englishLabLife ? 'Yes' : 'No'}`
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
      content: `Here is a database of German Physics PhD institutions for reference:\n${instContext}\n\nUse this data to provide accurate, specific answers. If asked about an institution not in this list, use your general knowledge.`,
    })

    // Add watchlist context
    if (watchlistedIds && Array.isArray(watchlistedIds) && watchlistedIds.length > 0) {
      const watchlisted = institutions.filter((inst) => watchlistedIds.includes(inst.id)).slice(0, 10)
      if (watchlisted.length > 0) {
        const watchlistContext = watchlisted
          .map((u) => `${u.name} (${u.city}, ${u.state}) - Fields: ${u.fields} - Deadline: ${u.deadline} - Contract: ${u.contractType} - €${u.monthlyEur?.toLocaleString() || 'N/A'}/mo`)
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
