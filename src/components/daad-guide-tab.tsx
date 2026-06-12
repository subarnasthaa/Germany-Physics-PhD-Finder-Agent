'use client'

import { useState, useMemo } from 'react'
import { BookOpen, CheckCircle2, Globe, Phone, MapPin, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Progress } from '@/components/ui/progress'
import { scholarships as allScholarships, searchScholarships } from '@/lib/static-data'

export default function ManaakiNZGuideTab() {
  const [searchQuery, setSearchQuery] = useState('')
  const [checkedDocs, setCheckedDocs] = useState<string[]>([])

  const scholarships = useMemo(() => {
    return searchQuery ? searchScholarships(searchQuery) : allScholarships
  }, [searchQuery])

  const requiredDocuments = [
    { id: 'passport', label: 'Valid Passport (minimum 6 months validity)' },
    { id: 'degree', label: 'MSc Degree Certificate & Transcripts (attested)' },
    { id: 'cv', label: 'CV / Resume (NZ format preferred)' },
    { id: 'motivation', label: 'Research Proposal / Personal Statement' },
    { id: 'references', label: '2 Reference Letters (academic)' },
    { id: 'language', label: 'IELTS Score (minimum 6.5, no band below 6.0)' },
    { id: 'manaaki-form', label: 'Manaaki NZ Scholarship Application Form (online portal)' },
    { id: 'photos', label: 'Passport Photos' },
    { id: 'health', label: 'Health Certificate / Medical Examination' },
    { id: 'police', label: 'Police Clearance Certificate from Nepal Police' },
    { id: 'apostille', label: 'Document Attestation (MOFA Nepal)' },
  ]

  const toggleDoc = (id: string) => {
    setCheckedDocs((prev) => prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id])
  }

  const scholarshipCategories = scholarships.reduce<Record<string, typeof scholarships>>((acc, s) => {
    if (!acc[s.category]) acc[s.category] = []
    acc[s.category].push(s)
    return acc
  }, {})

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <Card className="border-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
        <CardContent className="p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-1">🎓 Manaaki NZ Guide</h2>
          <p className="text-indigo-100 text-sm max-w-xl">
            Complete guide to New Zealand scholarships for Nepali Physics students.
            The Manaaki New Zealand Scholarship is the most important funding route for Nepali students — full tuition, NZD $1,500/month stipend, airfare, and health insurance!
          </p>
        </CardContent>
      </Card>

      {/* Manaaki NZ PhD Scholarship Section */}
      <Card className="border-indigo-200 dark:border-indigo-800/50">
        <CardContent className="p-4 md:p-6">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
              <BookOpen className="size-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Manaaki New Zealand Scholarship 🌟</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                The MOST IMPORTANT scholarship for Nepali students! Fully funded by the New Zealand Government (MFAT).
                Covers full tuition, NZD $1,500/month living allowance, return airfare from Nepal, health and travel insurance,
                establishment allowance, and supplementary academic support.
              </p>
              <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                <p>• <strong>Living Allowance:</strong> NZD $1,500/month (tax-free)</p>
                <p>• <strong>Tuition:</strong> Full tuition covered (NZD $28,000-38,700/year value)</p>
                <p>• <strong>Duration:</strong> Up to 4 years (PhD)</p>
                <p>• <strong>Travel:</strong> Return airfare from Kathmandu to NZ</p>
                <p>• <strong>Establishment Allowance:</strong> NZD $3,000 one-time</p>
                <p>• <strong>Health Insurance:</strong> Full coverage for entire duration</p>
                <p>• <strong>IELTS:</strong> Minimum 6.5 required (no band below 6.0)</p>
                <p>• <strong>Apply through:</strong> Manaaki NZ online portal + NZ High Commission Kathmandu</p>
              </div>
              <a href="https://www.manaaki.nz/" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-sm text-indigo-600 hover:underline">
                Manaaki NZ Official Website →
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* University Doctoral Scholarships Section */}
      <Card className="border-purple-200 dark:border-purple-800/50">
        <CardContent className="p-4 md:p-6">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
              <BookOpen className="size-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">University Doctoral Scholarships</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                All 8 NZ universities offer doctoral scholarships. Typical stipend is NZD $27,000-28,000/year with full tuition coverage.
                These are available for both domestic and international students. MacDiarmid Institute students may receive additional top-up.
              </p>
              <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                <p>• <strong>Stipend:</strong> NZD $27,000-28,000/year (tax-free)</p>
                <p>• <strong>Tuition:</strong> Full tuition covered at all universities</p>
                <p>• <strong>Duration:</strong> 3-4 years (PhD)</p>
                <p>• <strong>Apply:</strong> Directly through university graduate research admissions</p>
                <p>• <strong>MacDiarmid Top-up:</strong> NZD $2,000-5,000/year additional at node universities</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* NZ High Commission Nepal */}
      <Card className="border-gray-200 dark:border-gray-700">
        <CardContent className="p-4 md:p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">🇳🇿 NZ High Commission Nepal</h3>
          <div className="grid sm:grid-cols-2 gap-3 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-start gap-2">
              <MapPin className="size-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Address</p>
                <p>Bansbari Heights, Maharajgunj, Kathmandu, Nepal</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="size-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Phone</p>
                <p>+977-1-4371-678</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Globe className="size-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Manaaki NZ Portal</p>
                <a href="https://www.manaaki.nz/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                  manaaki.nz
                </a>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="size-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Student Visa</p>
                <p>Immigration NZ online portal, 4-8 weeks processing</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Application Timeline */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">
            📅 Application Timeline for Semester 1, 2026 (February)
          </h3>
          <div className="space-y-3">
            {[
              { step: 1, month: 'Mar-May 2025', desc: 'Research programs, identify supervisors, start IELTS preparation', color: 'bg-indigo-500' },
              { step: 2, month: 'Feb-Apr 2025', desc: 'Apply for Manaaki NZ Scholarship via online portal (typically opens Feb, deadline Apr)', color: 'bg-indigo-600' },
              { step: 3, month: 'May-Jul 2025', desc: 'Submit university applications (rolling admissions, but early is better)', color: 'bg-purple-600' },
              { step: 4, month: 'Aug-Oct 2025', desc: 'Receive admission offers; Manaaki NZ interview and selection', color: 'bg-indigo-700' },
              { step: 5, month: 'Nov-Dec 2025', desc: 'Accept offers, apply for university doctoral scholarship if not on Manaaki NZ', color: 'bg-purple-700' },
              { step: 6, month: 'Dec 2025-Jan 2026', desc: 'Apply for NZ student visa; arrange accommodation and travel', color: 'bg-indigo-800' },
              { step: 7, month: 'Feb-Mar 2026', desc: 'Arrive in New Zealand, enroll, start your PhD research! Kia Ora!', color: 'bg-purple-600' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3">
                <div className={`size-8 rounded-full ${item.color} text-white flex items-center justify-center text-xs font-bold shrink-0`}>
                  {item.step}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-900 dark:text-white">{item.month}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* IELTS Requirement */}
      <Card className="border-amber-200 dark:border-amber-800/50">
        <CardContent className="p-4 md:p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            📝 IELTS Requirement
          </h3>
          <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
            <p>NZ universities require IELTS as proof of English proficiency. Here are the typical minimum scores:</p>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="p-2 rounded bg-indigo-50 dark:bg-indigo-950/20">
                <p className="font-medium text-indigo-700 dark:text-indigo-300">IELTS 6.5</p>
                <p>All NZ universities (standard requirement across all 8 universities)</p>
              </div>
              <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/20">
                <p className="font-medium text-amber-700 dark:text-amber-300">No band below 6.0</p>
                <p>Manaaki NZ Scholarship and most universities require no band below 6.0</p>
              </div>
            </div>
            <p className="mt-2"><strong>Tip:</strong> Take IELTS early! IDP Nepal and British Council Nepal offer tests in Kathmandu regularly. Score is valid for 2 years. Manaaki NZ requires minimum 6.5 with no band below 6.0. Some universities also accept TOEFL iBT 90+ or PTE Academic 58+.</p>
          </div>
        </CardContent>
      </Card>

      {/* Document Checklist */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">
            📋 Required Documents Checklist
          </h3>
          <div className="mb-3">
            <Progress value={(checkedDocs.length / requiredDocuments.length) * 100} className="h-2" />
            <p className="text-xs text-gray-500 mt-1">{checkedDocs.length}/{requiredDocuments.length} completed</p>
          </div>
          <div className="space-y-2">
            {requiredDocuments.map((doc) => (
              <button
                key={doc.id}
                onClick={() => toggleDoc(doc.id)}
                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
              >
                <CheckCircle2
                  className={`size-5 shrink-0 ${
                    checkedDocs.includes(doc.id) ? 'text-green-500' : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
                <span className={`text-sm ${
                  checkedDocs.includes(doc.id)
                    ? 'text-gray-400 line-through'
                    : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {doc.label}
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scholarship Cards */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">💰 Scholarships & Funding</h3>
          <div className="mb-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scholarships..."
              className="w-full h-9 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {Object.entries(scholarshipCategories).map(([category, items]) => (
            <div key={category} className="mb-4">
              <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 flex items-center gap-2">
                <Badge variant="outline" className="text-xs">{items.length}</Badge>
                {category}
              </h4>
              <div className="grid gap-2 sm:grid-cols-2">
                {items.slice(0, 4).map((s) => (
                  <div key={s.id} className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                    <p className="text-xs font-medium text-gray-900 dark:text-white">{s.title}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{s.content.slice(0, 100)}...</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Doctoral Stipend Explanation */}
      <Card className="border-purple-200 dark:border-purple-800/50">
        <CardContent className="p-4 md:p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">💵 Doctoral Stipend Explained</h3>
          <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
            <p>Most NZ PhD positions in physics are funded through university doctoral scholarships or MacDiarmid Institute scholarships. You receive a <strong>tax-free stipend</strong> for living costs, and tuition is fully covered.</p>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="p-2 rounded bg-indigo-50 dark:bg-indigo-950/20">
                <p className="font-medium text-indigo-700 dark:text-indigo-300">Standard Doctoral</p>
                <p>NZD $27,000-28,000/year</p>
                <p>NZD $2,250-2,333/month</p>
              </div>
              <div className="p-2 rounded bg-purple-50 dark:bg-purple-950/20">
                <p className="font-medium text-purple-700 dark:text-purple-300">+ MacDiarmid Top-up</p>
                <p>NZD $2,000-5,000/year</p>
                <p>Total: ~$29,000-33,000/yr</p>
              </div>
            </div>
            <p className="mt-2">Benefits include: tax-free stipend, full tuition coverage, conference travel allowance (especially at MacDiarmid), research expense funds, and access to world-class facilities. NZ cost of living is lower than Australia, making the effective purchasing power higher.</p>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">❓ FAQ</h3>
          <Accordion type="single" collapsible>
            {[
              { q: 'How do I apply for Manaaki NZ Scholarship from Nepal?', a: 'Apply through the Manaaki NZ online portal (manaaki.nz). The NZ High Commission in Kathmandu manages the application process for Nepali students. Applications typically open in February and close in April each year. You need IELTS 6.5+, a strong academic record, and a research proposal.' },
              { q: 'What IELTS score do I need for NZ PhD?', a: 'All NZ universities require IELTS 6.5 overall with no band below 6.0. Manaaki NZ Scholarship also requires minimum 6.5 with no band below 6.0. Take IELTS through IDP Nepal or British Council Nepal in Kathmandu. Score is valid for 2 years. Some universities also accept TOEFL iBT 90+ or PTE Academic 58+.' },
              { q: 'Can I apply for both Manaaki NZ and university doctoral scholarship?', a: 'Yes! Manaaki NZ is a separate, fully-funded scholarship from the NZ Government specifically for developing countries including Nepal. University doctoral scholarships are available at all 8 NZ universities. If you get Manaaki NZ, it covers everything. If not, you can still get university doctoral funding. Apply for both!' },
              { q: 'How long does NZ student visa processing take from Nepal?', a: 'Typically 4-8 weeks after submitting your online application through Immigration New Zealand. You need an offer of place from a NZ university and must show financial capacity (or Manaaki NZ scholarship letter). Apply online at immigration.govt.nz. Biometrics may be required at VFS Global Kathmandu.' },
              { q: 'What is the MacDiarmid Institute?', a: 'The MacDiarmid Institute for Advanced Materials and Nanotechnology is NZ\'s premier Centre of Research Excellence for physics and materials science. It spans 5 universities (Auckland, VUW, Otago, Massey, Waikato). Students are enrolled at a node university but are part of the wider MacDiarmid research community with access to shared facilities, conference travel funds, and additional stipend top-ups.' },
              { q: 'Can I bring my spouse to New Zealand?', a: 'Yes! On a dependent visa, your spouse can work in New Zealand full-time. You need to show sufficient funds for living expenses. Each dependent needs their own visa application. NZ is very family-friendly and your spouse can work in most occupations.' },
              { q: 'Is health insurance mandatory in NZ?', a: 'Yes, health and travel insurance is mandatory for the entire duration of your visa. Manaaki NZ Scholarship covers health insurance. For university-funded students, you must purchase insurance (approx. NZD $500-700/year). Most universities arrange this during enrollment.' },
              { q: 'How competitive are NZ PhD positions for Nepali students?', a: 'Very achievable! Manaaki NZ specifically targets developing countries including Nepal, making it more accessible than many European scholarships. University doctoral scholarships are widely available for international students. Strong MSc from TU with good grades and IELTS score makes you competitive. NZ is smaller than Australia, so less competition overall.' },
              { q: 'What is GNS Science?', a: 'GNS Science is NZ\'s premier research institute for geophysics, seismology, volcanology, and nuclear/isotope physics. Students are co-enrolled at partner universities (mainly VUW) but conduct research at GNS facilities in Lower Hutt, Wellington. GNS offers its own PhD scholarships (NZD $28,000/year). Ideal for Nepali students interested in geophysics and earth sciences.' },
            ].map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-sm text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-xs text-gray-600 dark:text-gray-400">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
