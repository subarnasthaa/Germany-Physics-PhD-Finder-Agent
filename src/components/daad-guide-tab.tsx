'use client'

import { useState, useMemo } from 'react'
import { BookOpen, CheckCircle2, Globe, Phone, MapPin, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Progress } from '@/components/ui/progress'
import { scholarships as allScholarships, searchScholarships } from '@/lib/static-data'

export default function CommonwealthGuideTab() {
  const [searchQuery, setSearchQuery] = useState('')
  const [checkedDocs, setCheckedDocs] = useState<string[]>([])

  const scholarships = useMemo(() => {
    return searchQuery ? searchScholarships(searchQuery) : allScholarships
  }, [searchQuery])

  const requiredDocuments = [
    { id: 'passport', label: 'Valid Passport' },
    { id: 'degree', label: 'MSc Degree Certificate & Transcripts' },
    { id: 'cv', label: 'CV / Resume (UK format preferred)' },
    { id: 'motivation', label: 'Research Proposal / Personal Statement' },
    { id: 'references', label: '2 Reference Letters (academic)' },
    { id: 'language', label: 'IELTS Score (minimum 6.5, some require 7.0)' },
    { id: 'commonwealth-form', label: 'Commonwealth Application Form (via UGC Nepal)' },
    { id: 'photos', label: 'Passport Photos' },
    { id: 'health', label: 'Health Certificate / TB Test Result' },
    { id: 'ugc-nomination', label: 'UGC Nepal Nomination Letter' },
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
      <Card className="border-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 text-white overflow-hidden">
        <CardContent className="p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-1">🎓 Commonwealth Scholarship Guide</h2>
          <p className="text-blue-100 text-sm max-w-xl">
            Complete guide to UK scholarships for Nepali Physics students.
            The Commonwealth Scholarship is the most important funding route for Nepali students — full tuition, stipend, and travel covered!
          </p>
        </CardContent>
      </Card>

      {/* Commonwealth PhD Scholarship Section */}
      <Card className="border-blue-200 dark:border-blue-800/50">
        <CardContent className="p-4 md:p-6">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
              <BookOpen className="size-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Commonwealth PhD Scholarship</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                The most important scholarship for Nepali students! Apply through UGC Nepal.
                Covers full tuition, £1,347/month stipend, arrival allowance, warm clothing allowance,
                thesis grant, and round-trip airfare from Nepal to the UK.
              </p>
              <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                <p>• <strong>Stipend:</strong> £1,347/month (tax-free)</p>
                <p>• <strong>Tuition:</strong> Full tuition covered</p>
                <p>• <strong>Duration:</strong> 3 years (PhD)</p>
                <p>• <strong>Travel:</strong> Round-trip airfare from Nepal</p>
                <p>• <strong>Arrival Allowance:</strong> £1,000 one-time</p>
                <p>• <strong>Warm Clothing Allowance:</strong> Provided</p>
                <p>• <strong>IELTS:</strong> Minimum 6.5 required</p>
                <p>• <strong>Apply through:</strong> UGC Nepal (Sanothimi, Bhaktapur)</p>
              </div>
              <a href="https://cscuk.fcdo.gov.uk/scholarships/" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-sm text-blue-600 hover:underline">
                Browse Commonwealth Programmes →
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* EPSRC DTP Section */}
      <Card className="border-green-200 dark:border-green-800/50">
        <CardContent className="p-4 md:p-6">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
              <BookOpen className="size-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">EPSRC DTP Studentships</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Engineering and Physical Sciences Research Council funds PhD studentships across UK universities.
                Standard stipend is £19,237/year. International students may need fee top-up, but many universities now waive this.
              </p>
              <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                <p>• <strong>Stipend:</strong> £19,237/year (2025/26 rate, tax-free)</p>
                <p>• <strong>Tuition:</strong> Home rate covered; many universities waive international fee difference</p>
                <p>• <strong>Duration:</strong> 3.5 years</p>
                <p>• <strong>Apply:</strong> Directly through university PhD admissions</p>
                <p>• <strong>Fields:</strong> Physics, Engineering, Mathematics, Materials Science</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* British High Commission Nepal */}
      <Card className="border-gray-200 dark:border-gray-700">
        <CardContent className="p-4 md:p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">🇬🇧 British High Commission Nepal</h3>
          <div className="grid sm:grid-cols-2 gap-3 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-start gap-2">
              <MapPin className="size-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Address</p>
                <p>Pulchowk, Lalitpur, Nepal</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="size-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Phone</p>
                <p>+977-1-5543310 / 5543311</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Globe className="size-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Website</p>
                <a href="https://www.gov.uk/world/organisations/british-embassy-kathmandu" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  gov.uk/british-embassy-kathmandu
                </a>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="size-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Visa Section</p>
                <p>Mon-Fri, by appointment</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Application Timeline */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">
            📅 Application Timeline for October 2026 Intake
          </h3>
          <div className="space-y-3">
            {[
              { step: 1, month: 'Jul-Sep 2025', desc: 'Research programs, identify supervisors, start IELTS preparation', color: 'bg-blue-500' },
              { step: 2, month: 'Oct-Nov 2025', desc: 'Apply for Commonwealth Scholarship through UGC Nepal (deadline usually November)', color: 'bg-blue-600' },
              { step: 3, month: 'Dec 2025-Jan 2026', desc: 'Submit university applications (Oxford/Cambridge deadlines in Dec/Jan)', color: 'bg-blue-700' },
              { step: 4, month: 'Jan-Mar 2026', desc: 'Other university application deadlines (Jan-Mar); attend interviews', color: 'bg-blue-600' },
              { step: 5, month: 'Apr-Jun 2026', desc: 'Receive admission offers; apply for EPSRC studentships if eligible', color: 'bg-blue-700' },
              { step: 6, month: 'Jun-Aug 2026', desc: 'Apply for UK student visa (Tier 4); arrange accommodation', color: 'bg-blue-800' },
              { step: 7, month: 'Sep-Oct 2026', desc: 'Arrive in the UK, enroll, start your PhD research!', color: 'bg-blue-600' },
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
            <p>Most UK universities require IELTS as proof of English proficiency. Here are the typical minimum scores:</p>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="p-2 rounded bg-blue-50 dark:bg-blue-950/20">
                <p className="font-medium text-blue-700 dark:text-blue-300">IELTS 6.0-6.5</p>
                <p>Most universities (Birmingham, Leeds, Sheffield, etc.)</p>
              </div>
              <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/20">
                <p className="font-medium text-amber-700 dark:text-amber-300">IELTS 7.0-7.5</p>
                <p>Oxford, Cambridge, UCL, St Andrews</p>
              </div>
            </div>
            <p className="mt-2"><strong>Tip:</strong> Take IELTS early! British Council Nepal offers tests in Kathmandu regularly. Score is valid for 2 years.</p>
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
              className="w-full h-9 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  <div key={s.id} className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                    <p className="text-xs font-medium text-gray-900 dark:text-white">{s.title}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{s.content.slice(0, 100)}...</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* EPSRC Stipend Explanation */}
      <Card className="border-green-200 dark:border-green-800/50">
        <CardContent className="p-4 md:p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">💷 EPSRC Stipend Explained</h3>
          <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
            <p>Most UK PhD positions in physics are funded through EPSRC studentships. You receive a <strong>tax-free stipend</strong> for living costs, and tuition is covered.</p>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="p-2 rounded bg-blue-50 dark:bg-blue-950/20">
                <p className="font-medium text-blue-700 dark:text-blue-300">EPSRC Standard</p>
                <p>£19,237/year</p>
                <p>£1,603/month</p>
              </div>
              <div className="p-2 rounded bg-green-50 dark:bg-green-950/20">
                <p className="font-medium text-green-700 dark:text-green-300">London Weighting</p>
                <p>~£22,237/year</p>
                <p>~£1,853/month</p>
              </div>
            </div>
            <p className="mt-2">Benefits include: tax-free stipend, tuition covered, access to research funds, conference travel allowance, and sometimes enhanced stipend for CDT programs.</p>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">❓ FAQ</h3>
          <Accordion type="single" collapsible>
            {[
              { q: 'How do I apply for Commonwealth Scholarship from Nepal?', a: 'Apply through UGC Nepal! They are the nominating agency. Check their website (ugcnepal.edu.np) in September-October for announcements. Submit your application with all required documents. UGC nominates candidates to the Commonwealth Scholarship Commission in the UK.' },
              { q: 'What IELTS score do I need for UK PhD?', a: 'Most universities require IELTS 6.5 overall with no band below 6.0. Oxford and Cambridge require 7.0-7.5. Take IELTS early through British Council Nepal in Kathmandu. Score is valid for 2 years.' },
              { q: 'Can I apply for both Commonwealth and EPSRC funding?', a: 'Yes! Commonwealth is for international students specifically. EPSRC studentships are primarily for home (UK) students, but many universities now offer international fee waivers. Having both options gives you flexibility.' },
              { q: 'How long does UK student visa processing take from Nepal?', a: 'Typically 3-6 weeks after submitting your Tier 4 (General) student visa application. You need a CAS (Confirmation of Acceptance for Studies) from your university. Start the process as soon as you receive your unconditional offer.' },
              { q: 'Is health insurance mandatory in the UK?', a: 'Yes, the Immigration Health Surcharge (IHS) is mandatory as part of your visa application. It costs £776/year and gives you access to NHS healthcare. PhD students pay for 3 years upfront.' },
              { q: 'Can I bring my spouse to the UK?', a: 'Yes, on a dependent visa. Your spouse can work in the UK. You need to show sufficient funds (stipend usually qualifies). Each dependent needs their own visa application and IHS payment.' },
              { q: 'What is FindAPhD and how do I use it?', a: 'FindAPhD (findaphd.com) is the best website to search for UK PhD positions. You can filter by subject, funding, location, and deadline. Many positions are listed with full funding details. It\'s free to use.' },
              { q: 'How competitive are UK PhD positions for Nepali students?', a: 'Competitive but very achievable with a strong MSc from TU. Commonwealth Scholarship is the most reliable route. For EPSRC positions, focus on universities that offer international fee waivers. Strong research proposal and good references are key.' },
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
