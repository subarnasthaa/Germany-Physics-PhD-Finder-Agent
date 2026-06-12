'use client'

import { useState, useMemo } from 'react'
import { BookOpen, CheckCircle2, Globe, Phone, MapPin, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Progress } from '@/components/ui/progress'
import { scholarships as allScholarships, searchScholarships } from '@/lib/static-data'

export default function AustraliaAwardsGuideTab() {
  const [searchQuery, setSearchQuery] = useState('')
  const [checkedDocs, setCheckedDocs] = useState<string[]>([])

  const scholarships = useMemo(() => {
    return searchQuery ? searchScholarships(searchQuery) : allScholarships
  }, [searchQuery])

  const requiredDocuments = [
    { id: 'passport', label: 'Valid Passport' },
    { id: 'degree', label: 'MSc Degree Certificate & Transcripts' },
    { id: 'cv', label: 'CV / Resume (Australian format preferred)' },
    { id: 'motivation', label: 'Research Proposal / Personal Statement' },
    { id: 'references', label: '2 Reference Letters (academic)' },
    { id: 'language', label: 'IELTS Score (minimum 6.5)' },
    { id: 'australia-awards-form', label: 'Australia Awards Application Form (online via OASIS)' },
    { id: 'photos', label: 'Passport Photos' },
    { id: 'health', label: 'Health Certificate / Medical Examination' },
    { id: 'nomination', label: 'Nomination Letter from employing institution (if applicable)' },
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
      <Card className="border-0 bg-gradient-to-r from-teal-600 via-green-600 to-teal-700 text-white overflow-hidden">
        <CardContent className="p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-1">🎓 Australia Awards Guide</h2>
          <p className="text-teal-100 text-sm max-w-xl">
            Complete guide to Australian scholarships for Nepali Physics students.
            The Australia Awards Scholarship is the most important funding route for Nepali students — full tuition, AUD $3,000/month stipend, airfare, and health insurance!
          </p>
        </CardContent>
      </Card>

      {/* Australia Awards PhD Scholarship Section */}
      <Card className="border-teal-200 dark:border-teal-800/50">
        <CardContent className="p-4 md:p-6">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center shrink-0">
              <BookOpen className="size-6 text-teal-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Australia Awards Scholarship 🌟</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                The MOST IMPORTANT scholarship for Nepali students! Fully funded by the Australian Government.
                Covers full tuition, AUD $3,000/month stipend, return airfare from Nepal, Overseas Student Health Cover (OSHC),
                establishment allowance, and supplementary academic support.
              </p>
              <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                <p>• <strong>Stipend:</strong> AUD $3,000/month (tax-free)</p>
                <p>• <strong>Tuition:</strong> Full tuition covered</p>
                <p>• <strong>Duration:</strong> Up to 4 years (PhD)</p>
                <p>• <strong>Travel:</strong> Return airfare from Nepal to Australia</p>
                <p>• <strong>Establishment Allowance:</strong> AUD $5,000 one-time</p>
                <p>• <strong>Health Insurance:</strong> OSHC covered</p>
                <p>• <strong>IELTS:</strong> Minimum 6.5 required (no band below 6.0)</p>
                <p>• <strong>Apply through:</strong> OASIS online system + Australian Awards Nepal Office</p>
              </div>
              <a href="https://australiaawardsnepal.org/" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-sm text-teal-600 hover:underline">
                Australia Awards Nepal →
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* RTP Stipend Section */}
      <Card className="border-green-200 dark:border-green-800/50">
        <CardContent className="p-4 md:p-6">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
              <BookOpen className="size-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">RTP (Research Training Program) Stipend</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                The Australian Government funds RTP stipends at all universities. AUD $32,192/year (2025 rate), tax-free.
                Available for both domestic and international students. Combined with tuition fee offset, this provides full funding.
              </p>
              <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                <p>• <strong>Stipend:</strong> AUD $32,192/year (2025 rate, tax-free)</p>
                <p>• <strong>Tuition:</strong> RTP Fee Offset covers full tuition at most universities</p>
                <p>• <strong>Duration:</strong> Up to 3.5 years (PhD)</p>
                <p>• <strong>Apply:</strong> Directly through university graduate research admissions</p>
                <p>• <strong>Fields:</strong> All physics disciplines</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Australian High Commission Nepal */}
      <Card className="border-gray-200 dark:border-gray-700">
        <CardContent className="p-4 md:p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">🇦🇺 Australian High Commission Nepal</h3>
          <div className="grid sm:grid-cols-2 gap-3 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-start gap-2">
              <MapPin className="size-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Address</p>
                <p>Bansbari, Kathmandu, Nepal</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="size-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Phone</p>
                <p>+977-1-4371678</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Globe className="size-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Australia Awards Nepal</p>
                <a href="https://australiaawardsnepal.org/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
                  australiaawardsnepal.org
                </a>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="size-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Visa Section</p>
                <p>Mon-Fri, via VFS Global Kathmandu</p>
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
              { step: 1, month: 'Mar-May 2025', desc: 'Research programs, identify supervisors, start IELTS preparation', color: 'bg-teal-500' },
              { step: 2, month: 'May-Jul 2025', desc: 'Apply for Australia Awards Scholarship via OASIS (typically opens May, deadline July)', color: 'bg-teal-600' },
              { step: 3, month: 'Aug-Oct 2025', desc: 'Submit university applications (Semester 1 2026 deadline usually Oct-Nov)', color: 'bg-green-600' },
              { step: 4, month: 'Nov-Dec 2025', desc: 'Receive admission offers; Australia Awards interview and selection', color: 'bg-teal-700' },
              { step: 5, month: 'Jan 2026', desc: 'Accept offers, apply for RTP stipend if not on Australia Awards', color: 'bg-green-700' },
              { step: 6, month: 'Jan-Feb 2026', desc: 'Apply for Australian student visa (Subclass 500); arrange accommodation', color: 'bg-teal-800' },
              { step: 7, month: 'Feb-Mar 2026', desc: 'Arrive in Australia, enroll, start your PhD research!', color: 'bg-green-600' },
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
            <p>Australian universities require IELTS as proof of English proficiency. Here are the typical minimum scores:</p>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="p-2 rounded bg-teal-50 dark:bg-teal-950/20">
                <p className="font-medium text-teal-700 dark:text-teal-300">IELTS 6.0-6.5</p>
                <p>Most universities (UTas, Flinders, JCU require 6.0; Go8 require 6.5)</p>
              </div>
              <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/20">
                <p className="font-medium text-amber-700 dark:text-amber-300">IELTS 7.0+</p>
                <p>Some competitive programs may require 7.0+</p>
              </div>
            </div>
            <p className="mt-2"><strong>Tip:</strong> Take IELTS early! IDP Nepal and British Council Nepal offer tests in Kathmandu regularly. Score is valid for 2 years. Australia Awards requires minimum 6.5 with no band below 6.0.</p>
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
              className="w-full h-9 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                  <div key={s.id} className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-teal-300 dark:hover:border-teal-700 transition-colors">
                    <p className="text-xs font-medium text-gray-900 dark:text-white">{s.title}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{s.content.slice(0, 100)}...</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* RTP Stipend Explanation */}
      <Card className="border-green-200 dark:border-green-800/50">
        <CardContent className="p-4 md:p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">💵 RTP Stipend Explained</h3>
          <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
            <p>Most Australian PhD positions in physics are funded through the Research Training Program (RTP). You receive a <strong>tax-free stipend</strong> for living costs, and tuition is covered by the RTP Fee Offset.</p>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="p-2 rounded bg-teal-50 dark:bg-teal-950/20">
                <p className="font-medium text-teal-700 dark:text-teal-300">RTP Standard</p>
                <p>AUD $32,192/year</p>
                <p>AUD $2,683/month</p>
              </div>
              <div className="p-2 rounded bg-green-50 dark:bg-green-950/20">
                <p className="font-medium text-green-700 dark:text-green-300">+ CSIRO Top-up</p>
                <p>AUD $7,000-10,000/year</p>
                <p>Total: ~$39,192-42,192/yr</p>
              </div>
            </div>
            <p className="mt-2">Benefits include: tax-free stipend, tuition covered (RTP Fee Offset), access to research funds, conference travel allowance, and potential CSIRO/ANSTO top-up scholarships.</p>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">❓ FAQ</h3>
          <Accordion type="single" collapsible>
            {[
              { q: 'How do I apply for Australia Awards Scholarship from Nepal?', a: 'Apply through the OASIS online system (oaas.dfat.gov.au). The Australia Awards Nepal office in Bansbari, Kathmandu manages the application process for Nepali students. Applications typically open in May and close in July each year. You need IELTS 6.5+, a strong academic record, and a research proposal.' },
              { q: 'What IELTS score do I need for Australian PhD?', a: 'Most universities require IELTS 6.5 overall with no band below 6.0. Some universities like UTas, Flinders, and JCU accept 6.0. Australia Awards requires minimum 6.5. Take IELTS through IDP Nepal or British Council Nepal in Kathmandu. Score is valid for 2 years.' },
              { q: 'Can I apply for both Australia Awards and RTP?', a: 'Yes! Australia Awards is a separate, fully-funded scholarship from the Australian Government specifically for developing countries including Nepal. RTP is available at all universities. If you get Australia Awards, you don\'t need RTP. If you don\'t get Australia Awards, you can still get RTP funding directly from universities.' },
              { q: 'How long does Australian student visa processing take from Nepal?', a: 'Typically 4-8 weeks after submitting your Subclass 500 (Student) visa application. You need a CoE (Confirmation of Enrolment) from your university and must show financial capacity. Apply through VFS Global in Kathmandu. Start as soon as you receive your offer.' },
              { q: 'Is health insurance mandatory in Australia?', a: 'Yes, Overseas Student Health Cover (OSHC) is mandatory for the entire duration of your visa. Australia Awards covers OSHC. For RTP students, you must purchase OSHC (approx. AUD $600/year). Most universities arrange this during enrollment.' },
              { q: 'Can I bring my spouse to Australia?', a: 'Yes, on a dependent visa (Subclass 500). Your spouse can work in Australia for up to 48 hours per fortnight. You need to show sufficient funds. Each dependent needs their own visa application and OSHC payment.' },
              { q: 'What is the Group of Eight (Go8)?', a: 'The Group of Eight represents Australia\'s leading research universities: ANU, Melbourne, Sydney, UNSW, Queensland, Monash, Adelaide, and UWA. These are the most research-intensive and highest-ranked Australian universities, similar to the UK\'s Russell Group.' },
              { q: 'How competitive are Australian PhD positions for Nepali students?', a: 'Very achievable! Australia Awards specifically targets developing countries including Nepal, making it more accessible than many European scholarships. RTP funding is widely available for international students. Strong MSc from TU with good grades and IELTS score makes you competitive.' },
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
