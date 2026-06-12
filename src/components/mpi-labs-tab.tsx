'use client'

import { useState, useEffect } from 'react'
import { Search, Atom, FlaskConical, Building2, Loader2, ChevronDown, ChevronUp, Globe, Banknote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Institution {
  id: string
  name: string
  city: string
  state: string
  type: string
  department: string
  researchGroup: string | null
  url: string
  fields: string
  phdType: string
  deadline: string
  contractType: string
  monthlyGbp: number | null
  languageInstruction: string
  englishLabLife: boolean
  notableProfessors: string
  notesForNepali: string
}

interface MPILabsTabProps {
  onNavigate: (tab: string) => void
  watchlistedIdsParam: string
}

export default function MPILabsTab({ onNavigate }: MPILabsTabProps) {
  const [institutions, setInstitutions] = useState<Institution[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/universities')
      .then((r) => r.json())
      .then((data: Institution[]) => {
        const filtered = data.filter(
          (inst) => inst.type === 'Research Institute'
        )
        setInstitutions(filtered)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = institutions.filter((inst) => {
    if (search) {
      const q = search.toLowerCase()
      return (
        inst.name.toLowerCase().includes(q) ||
        inst.city.toLowerCase().includes(q) ||
        inst.fields.toLowerCase().includes(q) ||
        inst.state.toLowerCase().includes(q)
      )
    }
    return true
  })

  const typeColors: Record<string, string> = {
    'Research Institute': 'from-green-600 to-teal-700',
  }
  const typeBadgeColors: Record<string, string> = {
    'Research Institute': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  }
  const typeLabels: Record<string, string> = {
    'Research Institute': 'Research Lab',
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 text-teal-600 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <Card className="border-0 bg-gradient-to-r from-teal-600 to-green-700 text-white overflow-hidden">
        <CardContent className="p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-1">🔬 CSIRO & ANSTO Research Laboratories</h2>
          <p className="text-teal-100 text-sm max-w-xl">
            Australia&apos;s world-renowned national research facilities — CSIRO (Commonwealth Scientific and Industrial Research Organisation)
            and ANSTO (Australian Nuclear Science and Technology Organisation) offer excellent PhD opportunities with top-up scholarships!
            Students are registered at partner universities while working at these world-class facilities!
          </p>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search labs, cities, fields..."
            className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Lab Cards */}
      {filtered.length > 0 && (
        <div>
          {/* Type Header */}
          <div className="rounded-lg bg-gradient-to-r from-green-600 to-teal-700 text-white p-4 mb-3">
            <div className="flex items-center gap-3">
              <FlaskConical className="size-6" />
              <div>
                <h3 className="text-lg font-bold">CSIRO Divisions & ANSTO</h3>
                <p className="text-sm opacity-80">{filtered.length} labs found</p>
              </div>
            </div>
          </div>

          {/* Lab Cards */}
          <div className="grid gap-3 md:grid-cols-2">
            {filtered.map((inst) => {
              const isExpanded = expandedId === inst.id
              const fieldsList = inst.fields.split('|').map((f) => f.trim()).filter(Boolean)

              return (
                <Card key={inst.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${typeBadgeColors[inst.type] || ''}`}>
                        {typeLabels[inst.type] || inst.type}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{inst.name}</h4>
                        <p className="text-xs text-gray-500">{inst.city}, {inst.state}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {fieldsList.slice(0, 4).map((f) => (
                        <span key={f} className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400">
                          {f}
                        </span>
                      ))}
                      {fieldsList.length > 4 && <span className="text-xs text-gray-400">+{fieldsList.length - 4}</span>}
                    </div>

                    <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Banknote className="size-3" />
                        {inst.monthlyGbp ? `AUD $${inst.monthlyGbp.toLocaleString()}/mo` : 'Varies'}
                      </span>
                      <span>{inst.languageInstruction}</span>
                      {inst.englishLabLife && (
                        <Badge variant="secondary" className="text-xs bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400">
                          English OK
                        </Badge>
                      )}
                    </div>

                    <button
                      onClick={() => setExpandedId(isExpanded ? null : inst.id)}
                      className="w-full mt-2 flex items-center justify-center gap-1 text-xs text-teal-600 hover:text-teal-700"
                    >
                      {isExpanded ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
                      {isExpanded ? 'Less' : 'Details'}
                    </button>

                    {isExpanded && (
                      <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 space-y-1.5 text-xs">
                        {inst.url && (
                          <a href={inst.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-teal-600 hover:underline">
                            <Globe className="size-3" /> {inst.url}
                          </a>
                        )}
                        {inst.department && <p><span className="text-gray-500">Division:</span> {inst.department}</p>}
                        {inst.contractType && <p><span className="text-gray-500">Funding:</span> {inst.contractType}</p>}
                        {inst.phdType && <p><span className="text-gray-500">PhD Type:</span> {inst.phdType}</p>}
                        {inst.deadline && <p><span className="text-gray-500">Deadline:</span> {inst.deadline}</p>}
                        {inst.notableProfessors && <p><span className="text-gray-500">Notable:</span> {inst.notableProfessors}</p>}
                        {inst.notesForNepali && (
                          <p className="p-1.5 rounded bg-teal-50 dark:bg-teal-950/20 text-teal-700 dark:text-teal-300">
                            🇳🇵 {inst.notesForNepali}
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <Atom className="size-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">No research labs match your search</p>
        </div>
      )}

      {/* CSIRO/ANSTO Info Card */}
      <Card className="border-teal-200 dark:border-teal-800/50">
        <CardContent className="p-4 md:p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <Atom className="size-4 text-teal-600" />
            About CSIRO & ANSTO Studentships
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            CSIRO (Commonwealth Scientific and Industrial Research Organisation) is Australia&apos;s national science agency,
            offering PhD top-up scholarships of AUD $7,000-10,000/year on top of the university RTP stipend across its divisions
            including Astronomy & Space Science, Energy, Manufacturing, Data61, Oceans & Atmosphere, and Mineral Resources.
            Students are registered at partner universities (ANU, Melbourne, UNSW, UQ, etc.) but conduct their research at CSIRO facilities.
            ANSTO (Australian Nuclear Science and Technology Organisation) operates the OPAL research reactor and the Australian Centre
            for Neutron Scattering, offering similar postgraduate scholarships. Both provide access to world-class facilities
            and direct industry research experience.
          </p>
          <button
            onClick={() => onNavigate('universities')}
            className="mt-3 text-xs text-teal-600 hover:text-teal-700 font-medium"
          >
            Browse all institutions →
          </button>
        </CardContent>
      </Card>
    </div>
  )
}
