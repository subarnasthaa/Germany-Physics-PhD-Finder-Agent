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
  monthlyEur: number | null
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
  const [typeFilter, setTypeFilter] = useState('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/universities')
      .then((r) => r.json())
      .then((data: Institution[]) => {
        const filtered = data.filter(
          (inst) =>
            inst.type === 'Max Planck Institute' ||
            inst.type === 'Helmholtz Center' ||
            inst.type === 'Leibniz Institute'
        )
        setInstitutions(filtered)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = institutions.filter((inst) => {
    if (typeFilter !== 'all' && inst.type !== typeFilter) return false
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

  // Group by type
  const grouped = filtered.reduce<Record<string, Institution[]>>((acc, inst) => {
    if (!acc[inst.type]) acc[inst.type] = []
    acc[inst.type].push(inst)
    return acc
  }, {})

  const typeOrder = ['Max Planck Institute', 'Helmholtz Center', 'Leibniz Institute']
  const typeIcons: Record<string, typeof Atom> = {
    'Max Planck Institute': Atom,
    'Helmholtz Center': FlaskConical,
    'Leibniz Institute': Building2,
  }
  const typeColors: Record<string, string> = {
    'Max Planck Institute': 'from-red-600 to-red-700',
    'Helmholtz Center': 'from-blue-600 to-blue-700',
    'Leibniz Institute': 'from-green-600 to-green-700',
  }
  const typeBadgeColors: Record<string, string> = {
    'Max Planck Institute': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    'Helmholtz Center': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'Leibniz Institute': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 text-red-600 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <Card className="border-0 bg-gradient-to-r from-red-600 to-amber-600 text-white overflow-hidden">
        <CardContent className="p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-1">🔬 Research Institutes</h2>
          <p className="text-red-100 text-sm max-w-xl">
            Germany&apos;s world-renowned research organizations — Max Planck Society, Helmholtz Association,
            and Leibniz Association offer excellent PhD positions with TVöD E13 employment contracts.
            Most positions are English-speaking!
          </p>
        </CardContent>
      </Card>

      {/* Search + Filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search institutes, cities, fields..."
            className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
        >
          <option value="all">All Types</option>
          <option value="Max Planck Institute">Max Planck</option>
          <option value="Helmholtz Center">Helmholtz</option>
          <option value="Leibniz Institute">Leibniz</option>
        </select>
      </div>

      {/* Grouped Lists */}
      {typeOrder.map((type) => {
        const items = grouped[type]
        if (!items || items.length === 0) return null
        const Icon = typeIcons[type] || Atom
        const gradient = typeColors[type] || 'from-gray-600 to-gray-700'

        return (
          <div key={type}>
            {/* Type Header */}
            <div className={`rounded-lg bg-gradient-to-r ${gradient} text-white p-4 mb-3`}>
              <div className="flex items-center gap-3">
                <Icon className="size-6" />
                <div>
                  <h3 className="text-lg font-bold">{type}s</h3>
                  <p className="text-sm opacity-80">{items.length} institutions found</p>
                </div>
              </div>
            </div>

            {/* Institute Cards */}
            <div className="grid gap-3 md:grid-cols-2">
              {items.map((inst) => {
                const isExpanded = expandedId === inst.id
                const fieldsList = inst.fields.split('|').map((f) => f.trim()).filter(Boolean)

                return (
                  <Card key={inst.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${typeBadgeColors[inst.type] || ''}`}>
                          {inst.type === 'Max Planck Institute' ? 'MPI' : inst.type === 'Helmholtz Center' ? 'Helmholtz' : 'Leibniz'}
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
                          {inst.monthlyEur ? `€${inst.monthlyEur.toLocaleString()}/mo` : 'Varies'}
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
                        className="w-full mt-2 flex items-center justify-center gap-1 text-xs text-amber-600 hover:text-amber-700"
                      >
                        {isExpanded ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
                        {isExpanded ? 'Less' : 'Details'}
                      </button>

                      {isExpanded && (
                        <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 space-y-1.5 text-xs">
                          {inst.url && (
                            <a href={inst.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
                              <Globe className="size-3" /> {inst.url}
                            </a>
                          )}
                          {inst.department && <p><span className="text-gray-500">Dept:</span> {inst.department}</p>}
                          {inst.contractType && <p><span className="text-gray-500">Contract:</span> {inst.contractType}</p>}
                          {inst.phdType && <p><span className="text-gray-500">PhD Type:</span> {inst.phdType}</p>}
                          {inst.deadline && <p><span className="text-gray-500">Deadline:</span> {inst.deadline}</p>}
                          {inst.notableProfessors && <p><span className="text-gray-500">Notable:</span> {inst.notableProfessors}</p>}
                          {inst.notesForNepali && (
                            <p className="p-1.5 rounded bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300">
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
        )
      })}

      {/* IMPRS Info Card */}
      <Card className="border-amber-200 dark:border-amber-800/50">
        <CardContent className="p-4 md:p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <Atom className="size-4 text-red-600" />
            About IMPRS Programs
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            International Max Planck Research Schools (IMPRS) are structured PhD programs offered by Max Planck Institutes
            in collaboration with universities. They are fully English-taught, provide TVöD E13 (65%) employment contracts
            (~€1,800/month), and welcome international students. Nepali students are strongly encouraged to apply —
            no German language required! Programs typically start in fall with application deadlines in January-March.
          </p>
          <button
            onClick={() => onNavigate('universities')}
            className="mt-3 text-xs text-amber-600 hover:text-amber-700 font-medium"
          >
            Browse all institutions →
          </button>
        </CardContent>
      </Card>
    </div>
  )
}
