'use client'

import { useState, useMemo } from 'react'
import { BookOpen, CheckCircle2, Globe, Phone, MapPin, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Progress } from '@/components/ui/progress'
import { scholarships as allScholarships, searchScholarships } from '@/lib/static-data'

export default function DAADGuideTab() {
  const [searchQuery, setSearchQuery] = useState('')
  const [checkedDocs, setCheckedDocs] = useState<string[]>([])

  const scholarships = useMemo(() => {
    return searchQuery ? searchScholarships(searchQuery) : allScholarships
  }, [searchQuery])

  const requiredDocuments = [
    { id: 'passport', label: 'Valid Passport' },
    { id: 'degree', label: 'MSc Degree Certificate & Transcripts' },
    { id: 'cv', label: 'CV / Resume (Europass format)' },
    { id: 'motivation', label: 'Motivation Letter / Research Proposal' },
    { id: 'references', label: '2 Reference Letters' },
    { id: 'language', label: 'Language Proof (IELTS/TOEFL or TestDaF/DSH)' },
    { id: 'daad-form', label: 'DAAD Application Form (online)' },
    { id: 'photos', label: 'Passport Photos' },
    { id: 'health', label: 'Health Insurance Documentation' },
    { id: 'apostille', label: 'Document Apostille/Attestation' },
  ]

  const toggleDoc = (id: string) => {
    setCheckedDocs((prev) => prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id])
  }

  const daadCategories = scholarships.reduce<Record<string, typeof scholarships>>((acc, s) => {
    if (!acc[s.category]) acc[s.category] = []
    acc[s.category].push(s)
    return acc
  }, {})

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <Card className="border-0 bg-gradient-to-r from-amber-600 via-yellow-500 to-red-600 text-white overflow-hidden">
        <CardContent className="p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-1">🎓 DAAD Scholarship Guide</h2>
          <p className="text-amber-100 text-sm max-w-xl">
            Complete guide to German academic scholarships for Nepali Physics students.
            DAAD (Deutscher Akademischer Austauschdienst) is the world&apos;s largest funding organization for international academic exchange.
          </p>
        </CardContent>
      </Card>

      {/* DAAD Research Grants Section */}
      <Card className="border-amber-200 dark:border-amber-800/50">
        <CardContent className="p-4 md:p-6">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
              <BookOpen className="size-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">DAAD Research Grants</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                The most popular DAAD program for PhD students. Provides monthly stipend of €934-1,200,
                health insurance, and travel allowance. Open to all nationalities including Nepal.
              </p>
              <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                <p>• <strong>Stipend:</strong> €934/month (standard) or €1,200/month (with lab fee)</p>
                <p>• <strong>Duration:</strong> Up to 3 years (extensions possible)</p>
                <p>• <strong>Travel Allowance:</strong> One-time international travel grant</p>
                <p>• <strong>Health Insurance:</strong> Covered by DAAD</p>
                <p>• <strong>Language:</strong> English sufficient for most science programs</p>
              </div>
              <a href="https://www.daad.de/go/study/thousands-of-programmes-to-choose-from/" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-sm text-blue-600 hover:underline">
                Browse DAAD Programmes →
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* German Embassy Nepal */}
      <Card className="border-gray-200 dark:border-gray-700">
        <CardContent className="p-4 md:p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">🇩🇪 German Embassy in Nepal</h3>
          <div className="grid sm:grid-cols-2 gap-3 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-start gap-2">
              <MapPin className="size-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Address</p>
                <p>Pani Pokhari, Kathmandu, Nepal</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="size-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Phone</p>
                <p>+977-1-4423820 / 4412786</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Globe className="size-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Website</p>
                <a href="https://www.kathmandu.diplo.de" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  kathmandu.diplo.de
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
            📅 Application Timeline for Winter 2026 Intake
          </h3>
          <div className="space-y-3">
            {[
              { step: 1, month: 'Jan-Mar', desc: 'Research programs, contact potential supervisors', color: 'bg-amber-500' },
              { step: 2, month: 'Apr-May', desc: 'Prepare documents, take language tests (IELTS/TOEFL)', color: 'bg-amber-600' },
              { step: 3, month: 'Jun-Jul', desc: 'Submit DAAD scholarship application (deadline usually July)', color: 'bg-amber-700' },
              { step: 4, month: 'Aug-Sep', desc: 'University application deadlines for winter semester', color: 'bg-red-600' },
              { step: 5, month: 'Oct-Nov', desc: 'Receive admission letter, apply for visa', color: 'bg-red-700' },
              { step: 6, month: 'Dec-Jan', desc: 'Visa processing, arrange accommodation', color: 'bg-red-800' },
              { step: 7, month: 'Mar-Apr', desc: 'Arrive in Germany, enroll, start research!', color: 'bg-amber-600' },
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
              className="w-full h-9 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          {Object.entries(daadCategories).map(([category, items]) => (
            <div key={category} className="mb-4">
              <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 flex items-center gap-2">
                <Badge variant="outline" className="text-xs">{items.length}</Badge>
                {category}
              </h4>
              <div className="grid gap-2 sm:grid-cols-2">
                {items.slice(0, 4).map((s) => (
                  <div key={s.id} className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-700 transition-colors">
                    <p className="text-xs font-medium text-gray-900 dark:text-white">{s.title}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{s.content.slice(0, 100)}...</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* TVöD Explanation */}
      <Card className="border-green-200 dark:border-green-800/50">
        <CardContent className="p-4 md:p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">💶 TVöD E13 Salary Explained</h3>
          <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
            <p>Most German PhD positions are <strong>employment positions</strong>, not stipends. You are an employee of the university/institute with full social benefits.</p>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/20">
                <p className="font-medium text-amber-700 dark:text-amber-300">TVöD E13 (65%)</p>
                <p>~€1,800/month gross</p>
                <p>~€1,500-1,600/month net</p>
              </div>
              <div className="p-2 rounded bg-green-50 dark:bg-green-950/20">
                <p className="font-medium text-green-700 dark:text-green-300">TVöD E13 (75%)</p>
                <p>~€2,100/month gross</p>
                <p>~€1,700-1,800/month net</p>
              </div>
            </div>
            <p className="mt-2">Benefits include: health insurance, pension contribution, unemployment insurance, 30 days paid vacation/year.</p>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">❓ FAQ</h3>
          <Accordion type="single" collapsible>
            {[
              { q: 'Do I need to know German?', a: 'No! Most physics PhD programs are in English. MPI IMPRS programs are fully English. For daily life, basic German helps but many international researchers live comfortably with English only.' },
              { q: 'What is the difference between IMPRS and individual PhD?', a: 'IMPRS (International Max Planck Research School) is a structured program with coursework and cohort. Individual PhD is a direct position with a professor. Both are fully funded.' },
              { q: 'Can I apply for DAAD and a university position simultaneously?', a: 'Yes! In fact, you should. DAAD provides a stipend while university positions are employment (TVöD). Having both options gives you flexibility.' },
              { q: 'How long does visa processing take from Nepal?', a: 'Typically 4-8 weeks after submitting your application at the German Embassy in Kathmandu. Start the process as soon as you receive your admission letter.' },
              { q: 'Is health insurance mandatory?', a: 'Yes, mandatory in Germany. If you have a TVöD position, it is automatically deducted from your salary. DAAD scholars get insurance through DAAD.' },
              { q: 'Can I bring my spouse?', a: 'Yes, on a family reunification visa. Your spouse can work in Germany. You need to show sufficient income and accommodation.' },
              { q: 'What about Blue Card?', a: 'PhD researchers can qualify for the EU Blue Card which offers faster permanent residency. You need a job offer with minimum salary threshold.' },
              { q: 'How competitive are MPI positions?', a: 'Very competitive but attainable. MPI receives many international applicants. Strong research experience and good MSc grades from TU can make you competitive.' },
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
