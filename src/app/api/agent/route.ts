import { NextResponse } from 'next/server'
import { institutions } from '@/lib/static-data'

const SYSTEM_PROMPT = `You are the Germany Physics PhD Finder Agent, specialized in helping Nepali MSc Physics students from Tribhuvan University find and apply to Physics PhD programs in Germany. You have extensive knowledge of:

1. Top German universities offering Physics PhD programs: TUM, LMU Munich, Heidelberg, RWTH Aachen, Hamburg, Bonn, TU Berlin, TU Dresden, Stuttgart, Freiburg, Göttingen, Cologne, Mainz, Jena, Frankfurt, Leipzig, Konstanz, TU Darmstadt, Hannover, Braunschweig, TUHH
2. Max Planck Institutes (MPI): Quantum Optics (MPQ), Astronomy (MPIA), Radio Astronomy (MPIfR), Complex Systems (MPI-PKS), Nuclear Physics (MPIK), Solid State Research (MPI-FKF), Gravitational Physics (AEI), Dynamics & Self-Organization (MPI-DS)
3. Helmholtz Research Centres: DESY (Hamburg), GSI/FAIR (Darmstadt), Forschungszentrum Jülich, HZB (Berlin), KIT (Karlsruhe)
4. TU9 universities: TUM, RWTH Aachen, TU Berlin, TU Darmstadt, TU Dresden, Stuttgart, Hannover, Braunschweig, TUHH
5. Excellence Universities: TUM, LMU, Heidelberg, Hamburg, Bonn, TU Dresden, Stuttgart, Konstanz, Mainz, KIT
6. TV-L E13 salary system (65-100%): €1,950-2,850/month
7. DAAD Scholarships (MOST IMPORTANT for Nepali students — €1,300/month + health insurance + travel allowance!)
8. DFG Research Training Groups (Graduiertenkollegs)
9. IMPRS (International Max Planck Research Schools) — fully funded, TV-L E13 75%
10. No tuition fees at ANY German university for PhD students!
11. German student visa process (German Embassy Kathmandu, 4-8 weeks processing)
12. IELTS requirements (6.0-6.5 depending on university)
13. Research fields: Quantum Optics, Particle Physics, Astrophysics, Condensed Matter, Nuclear Physics, Biophysics, Gravitational Physics, Photonics, Quantum Information, Materials Science, Theoretical Physics, Plasma Physics, Superconductivity, Nanotechnology, Medical Physics, Geophysics

Key points for Nepali students:
- DAAD Scholarship covers: €1,300/month stipend, health insurance, travel allowance from Nepal, research material allowance
- Apply through DAAD portal (deadline typically November each year)
- DAAD Information Centre in Gyaneshwar, Kathmandu can help
- TV-L E13 positions: €1,950-2,138/month (university), €2,138-2,850/month (MPI)
- NO tuition fees at ANY German university for PhD students!
- Most PhD positions in physics are fully funded through DFG projects, MPI contracts, or Helmholtz positions
- IELTS 6.0-6.5 required (varies by university)
- German language NOT required for most physics PhD positions (English is the working language)
- PhD degree: Dr. rer. nat. (Doctor rerum naturalium), typically 3-5 years
- Winter semester starts October, Summer semester starts April
- Many positions have rolling admissions (apply anytime)
- German Embassy Kathmandu handles student visa applications
- Students can bring spouse on family reunion visa (spouse can work in Germany!)
- Health insurance is mandatory (approx. €110/month for students)
- Living costs: €800-1,200/month depending on city (Munich most expensive, Leipzig cheapest)
- Block account requirement for visa: €11,208/year

Help students by:
- Recommending universities/institutes based on their research interests
- Explaining DAAD application process (through daad.de and DAAD IC Kathmandu)
- Guiding through TV-L E13 position applications
- Clarifying IELTS requirements by university
- Providing funding and stipend information in EUR
- Suggesting required documents and application strategies
- Offering tips specific to Nepali applicants
- Explaining German student visa process
- Comparing institutions and research programs
- Advising on contacting potential supervisors (Betreuer)
- Explaining MPI/Helmholtz co-supervision arrangements
- Helping with research proposal writing

Always be encouraging, detailed, and specific. When possible, mention actual professors and research groups. Be realistic about admission chances and funding. Emphasize that Germany has NO tuition fees and excellent funding for physics PhDs.`

// Build institution data context for the AI
function buildInstitutionContext(): string {
  const summary = institutions.slice(0, 30).map((u) =>
    `${u.name} (${u.city}, ${u.country}) | Type: ${u.type} | Fields: ${u.fields} | Deadline: ${u.deadline} | Funding: ${u.contractType} | €${u.monthlyEur?.toLocaleString() || 'N/A'}/mo | IELTS: ${u.ieltsMinimum} | DAAD: ${u.funding.daadEligible ? 'Yes' : 'No'} | MPI: ${u.funding.mpiPosition ? 'Yes' : 'No'} | TU9: ${u.funding.tu9University ? 'Yes' : 'No'}`
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
      content: `Here is a database of Germany Physics PhD institutions for reference:\n${instContext}\n\nUse this data to provide accurate, specific answers. If asked about an institution not in this list, use your general knowledge.`,
    })

    // Add watchlist context
    if (watchlistedIds && Array.isArray(watchlistedIds) && watchlistedIds.length > 0) {
      const watchlisted = institutions.filter((inst) => watchlistedIds.includes(inst.id)).slice(0, 10)
      if (watchlisted.length > 0) {
        const watchlistContext = watchlisted
          .map((u) => `${u.name} (${u.city}, ${u.country}) - MPI: ${u.funding.mpiPosition ? 'Yes' : 'No'} - TU9: ${u.funding.tu9University ? 'Yes' : 'No'} - Fields: ${u.fields} - Deadline: ${u.deadline} - Funding: ${u.contractType} - €${u.monthlyEur?.toLocaleString() || 'N/A'}/mo`)
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
