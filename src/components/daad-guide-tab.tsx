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
    { id: 'degree', label: 'MSc Degree Certificate & Transcripts (notarized + apostilled)' },
    { id: 'cv', label: 'CV/Resume (European format)' },
    { id: 'research-proposal', label: 'Research Proposal (detailed, 5-10 pages)' },
    { id: 'references', label: '2 Reference Letters (academic)' },
    { id: 'language', label: 'IELTS/TOEFL Score' },
    { id: 'daad-form', label: 'DAAD Application Form (online portal)' },
    { id: 'acceptance', label: 'Letter of Acceptance from German professor (Betreuer)' },
    { id: 'photos', label: 'Passport Photos' },
    { id: 'health', label: 'Health Insurance Proof' },
    { id: 'police', label: 'Police Clearance Certificate' },
    { id: 'apostille', label: 'Document Apostille (MOFA Nepal)' },
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
      <Card className="border-0 bg-gradient-to-r from-red-600 via-emerald-600 to-red-700 text-white overflow-hidden">
        <CardContent className="p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-1">🎓 DAAD Scholarship Guide</h2>
          <p className="text-red-100 text-sm max-w-xl">
            Complete guide to German scholarships for Nepali Physics students.
            The DAAD (German Academic Exchange Service) scholarship is the most important funding route for Nepali students — €1,300/month stipend, health insurance, travel allowance from Nepal, and NO tuition fees at German universities!
          </p>
        </CardContent>
      </Card>

      {/* DAAD Research Grants for Doctoral Candidates Section */}
      <Card className="border-red-200 dark:border-red-800/50">
        <CardContent className="p-4 md:p-6">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
              <BookOpen className="size-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">DAAD Research Grants for Doctoral Candidates 🌟</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                The MOST IMPORTANT scholarship for Nepali students! Fully funded by the German Government (DAAD).
                Covers €1,300/month living allowance, travel allowance from Nepal, full health insurance,
                research material allowance, and NO tuition fees at any German university.
              </p>
              <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                <p>• <strong>Living Allowance:</strong> €1,300/month (tax-free)</p>
                <p>• <strong>Tuition:</strong> NO tuition fees at German universities! (worth €0)</p>
                <p>• <strong>Duration:</strong> Up to 3 years (PhD)</p>
                <p>• <strong>Travel:</strong> Travel allowance from Nepal to Germany</p>
                <p>• <strong>Health Insurance:</strong> Full coverage for entire duration</p>
                <p>• <strong>Research Material Allowance:</strong> €460 one-time</p>
                <p>• <strong>IELTS:</strong> Minimum 6.0 required</p>
                <p>• <strong>Apply through:</strong> DAAD portal (deadline typically November each year)</p>
              </div>
              <a href="https://www.daad.de/" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-sm text-red-600 hover:underline">
                DAAD Official Website →
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TV-L E13 Research Positions Section */}
      <Card className="border-emerald-200 dark:border-emerald-800/50">
        <CardContent className="p-4 md:p-6">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
              <BookOpen className="size-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">TV-L E13 Research Positions</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Many German universities and research institutes hire PhD students as research assistants under the TV-L E13 pay scale.
                This is an employment contract rather than a scholarship — you earn a salary and pay social insurance, but receive pension benefits and full employee rights.
              </p>
              <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                <p>• <strong>Stipend:</strong> €1,950-2,138/month (TV-L E13, 65-75%)</p>
                <p>• <strong>Tuition:</strong> No tuition fees at German universities</p>
                <p>• <strong>Duration:</strong> 3-5 years (PhD)</p>
                <p>• <strong>Apply:</strong> Directly through professor/research group advertisements</p>
                <p>• <strong>MPI positions:</strong> TV-L E13 75-100% (€2,138-2,850/month)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* DAAD Regional Office & German Embassy Nepal */}
      <Card className="border-gray-200 dark:border-gray-700">
        <CardContent className="p-4 md:p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">🇩🇪 DAAD Regional Office & German Embassy Nepal</h3>
          <div className="grid sm:grid-cols-2 gap-3 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-start gap-2">
              <MapPin className="size-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Address</p>
                <p>Gyaneshwar, Kathmandu, Nepal (DAAD Information Centre)</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="size-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Phone</p>
                <p>+49-228-882-0 (DAAD Bonn)</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Globe className="size-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">DAAD Portal</p>
                <a href="https://www.daad.de/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">
                  daad.de
                </a>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="size-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">German Embassy</p>
                <p>Kathmandu (visa processing, 4-8 weeks)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Application Timeline */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">
            📅 Application Timeline for DAAD November Deadline
          </h3>
          <div className="space-y-3">
            {[
              { step: 1, month: 'Mar-May 2025', desc: 'Research programs, identify supervisors, start IELTS preparation', color: 'bg-red-500' },
              { step: 2, month: 'Jun-Sep 2025', desc: 'Contact potential supervisors, prepare research proposal', color: 'bg-red-600' },
              { step: 3, month: 'Oct-Nov 2025', desc: 'Apply for DAAD scholarship via portal (deadline typically Nov)', color: 'bg-emerald-600' },
              { step: 4, month: 'Dec 2025-Feb 2026', desc: 'DAAD selection process, interviews', color: 'bg-red-700' },
              { step: 5, month: 'Mar-May 2026', desc: 'Receive DAAD offer, apply for university admission', color: 'bg-emerald-700' },
              { step: 6, month: 'Jun-Jul 2026', desc: 'Apply for German student visa, arrange accommodation', color: 'bg-red-800' },
              { step: 7, month: 'Sep-Oct 2026', desc: 'Arrive in Germany, enroll, start your PhD! Willkommen!', color: 'bg-emerald-600' },
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
            <p>German universities require proof of English proficiency. Here are the typical requirements:</p>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="p-2 rounded bg-red-50 dark:bg-red-950/20">
                <p className="font-medium text-red-700 dark:text-red-300">IELTS 6.0-6.5</p>
                <p>Varies by university (DAAD requires minimum 6.0)</p>
              </div>
              <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/20">
                <p className="font-medium text-amber-700 dark:text-amber-300">TOEFL iBT 80+</p>
                <p>Some accept TOEFL iBT 80+ or Cambridge certificates</p>
              </div>
            </div>
            <p className="mt-2"><strong>Tip:</strong> Take IELTS early! IDP Nepal and British Council Nepal offer tests in Kathmandu regularly. Score is valid for 2 years. DAAD requires minimum IELTS 6.0, but many universities prefer 6.5. Some universities also accept TOEFL iBT 80+ or Cambridge certificates.</p>
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
              className="w-full h-9 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
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
                  <div key={s.id} className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-700 transition-colors">
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
      <Card className="border-emerald-200 dark:border-emerald-800/50">
        <CardContent className="p-4 md:p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">💶 Doctoral Stipend Explained</h3>
          <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
            <p>Most German PhD positions in physics are funded through TV-L E13 employment contracts or DAAD scholarships. You receive a <strong>stipend or salary</strong> for living costs, and there are NO tuition fees at any German university.</p>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="p-2 rounded bg-red-50 dark:bg-red-950/20">
                <p className="font-medium text-red-700 dark:text-red-300">Standard TV-L E13 (65%)</p>
                <p>~€1,950/month</p>
              </div>
              <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/20">
                <p className="font-medium text-emerald-700 dark:text-emerald-300">MPI TV-L E13 (75%)</p>
                <p>~€2,138/month</p>
              </div>
              <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/20">
                <p className="font-medium text-amber-700 dark:text-amber-300">DAAD</p>
                <p>€1,300/month</p>
              </div>
            </div>
            <p className="mt-2">No tuition fees anywhere in Germany! Benefits include: stipend/salary, no tuition, health insurance coverage, conference travel allowance (especially at Max Planck Institutes), research expense funds, and access to world-class facilities. Germany cost of living is moderate compared to other European countries.</p>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">❓ FAQ</h3>
          <Accordion type="single" collapsible>
            {[
              { q: 'How do I apply for DAAD scholarship from Nepal?', a: 'Apply through the DAAD online portal (daad.de). The DAAD Information Centre in Kathmandu can assist with queries. Applications typically have a deadline in November each year for the following academic year. You need IELTS 6.0+, a strong academic record, a detailed research proposal, and a letter of acceptance from a German professor (Betreuer).' },
              { q: 'What IELTS score do I need for German PhD?', a: 'DAAD requires minimum IELTS 6.0, but many German universities prefer 6.5. Requirements vary by university and program. Take IELTS through IDP Nepal or British Council Nepal in Kathmandu. Score is valid for 2 years. Some universities also accept TOEFL iBT 80+ or Cambridge certificates.' },
              { q: 'Can I apply for both DAAD and university position?', a: 'Yes! DAAD is a separate scholarship from the German Government. University positions (TV-L E13) are employment contracts from individual universities or research institutes. If you get DAAD, it covers your stipend and insurance. If not, you can still apply for TV-L E13 positions directly with professors. Apply for both to maximize your chances!' },
              { q: 'How long does German student visa processing take from Nepal?', a: 'Typically 4-8 weeks after submitting your application at the German Embassy in Kathmandu. You need an admission letter from a German university and proof of funding (DAAD scholarship letter or blocked account with €11,208). Schedule your embassy appointment early as slots fill up quickly during peak season.' },
              { q: 'What are Max Planck Institutes?', a: 'Max Planck Institutes (MPIs) are Germany\'s premier research organizations, comparable to the best research institutes worldwide. They focus on fundamental research across all scientific disciplines. For physics, notable ones include MPI for Physics (Munich), MPI for Solid State Research (Stuttgart), MPI for the Structure and Dynamics of Matter (Hamburg), and MPI for Gravitational Physics (Potsdam). PhD students at MPIs are typically paid at TV-L E13 75-100% (€2,138-2,850/month) and are co-enrolled at partner universities.' },
              { q: 'Can I bring my spouse to Germany?', a: 'Yes! On a family reunification visa, your spouse can join you in Germany. If you have a TV-L E13 position, your spouse is allowed to work full-time. If you are on a DAAD scholarship, your spouse may need to apply for a residence permit separately and work permission depends on their qualifications. Germany is generally family-friendly for international researchers.' },
              { q: 'Is health insurance mandatory in Germany?', a: 'Yes, health insurance is absolutely mandatory in Germany for everyone, including international students. DAAD scholarship holders receive health insurance coverage as part of their scholarship. For TV-L E13 positions, health insurance is included in your employment contract. For self-funded students, public health insurance costs approximately €110-120/month. You cannot enroll at a university or get a residence permit without proof of health insurance.' },
              { q: 'How competitive are German PhD positions for Nepali students?', a: 'Very achievable! Germany has one of the largest numbers of international PhD positions in the world, and there is a strong culture of welcoming international researchers. DAAD specifically supports students from developing countries including Nepal. TV-L E13 positions are widely available across 100+ universities and research institutes. Strong MSc from TU with good grades, IELTS score, and a compelling research proposal makes you competitive.' },
              { q: 'What is the TV-L E13 salary?', a: 'TV-L E13 is the collective bargaining pay scale for research assistants at German universities and public research institutes. It has different percentage levels: 50% (~€1,500/month), 65% (~€1,950/month), 75% (~€2,138/month), and 100% (~€2,850/month). For PhD students, 65-75% is most common. The salary is subject to taxes and social insurance contributions, but you receive pension benefits and full employee rights. Max Planck Institutes typically offer 75-100% positions.' },
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
