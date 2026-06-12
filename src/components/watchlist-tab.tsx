'use client'

import { useState, useEffect } from 'react'
import { Star, Trash2, Search, MapPin, Banknote, Languages } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface Institution {
  id: string
  name: string
  city: string
  state: string
  type: string
  department: string
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

interface WatchlistTabProps {
  watchlistedIds: string[]
  toggleWatchlist: (id: string) => void
  onNavigate: (tab: string) => void
  watchlistedIdsParam: string
}

export default function WatchlistTab({ watchlistedIds, toggleWatchlist, onNavigate }: WatchlistTabProps) {
  const [allInstitutions, setAllInstitutions] = useState<Institution[]>([])
  const [fieldFilter, setFieldFilter] = useState('all')

  useEffect(() => {
    fetch('/api/universities')
      .then((r) => r.json())
      .then((data: Institution[]) => setAllInstitutions(data))
      .catch(() => {})
  }, [])

  const institutions = allInstitutions.filter((inst) => watchlistedIds.includes(inst.id))

  const allFields = Array.from(new Set(institutions.flatMap((i) => i.fields.split('|').map((f) => f.trim()).filter(Boolean)))).sort()
  const filtered = fieldFilter === 'all'
    ? institutions
    : institutions.filter((i) => i.fields.includes(fieldFilter))

  if (watchlistedIds.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <Star className="size-16 text-gray-300 dark:text-gray-600 mb-4" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Your watchlist is empty</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
          Star institutions you&apos;re interested in to track their deadlines and funding info
        </p>
        <Button onClick={() => onNavigate('universities')} className="bg-amber-600 hover:bg-amber-700 text-white">
          Browse Institutions
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          My Watchlist ({institutions.length})
        </h2>
        {allFields.length > 1 && (
          <select
            value={fieldFilter}
            onChange={(e) => setFieldFilter(e.target.value)}
            className="h-9 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
          >
            <option value="all">All Fields</option>
            {allFields.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((inst) => {
          const typeColor = inst.type === 'Max Planck Institute'
            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
            : inst.type === 'Helmholtz Center'
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
            : inst.type === 'Leibniz Institute'
            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
            : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'

          return (
            <Card key={inst.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{inst.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <MapPin className="size-3" />
                      <span>{inst.city}, {inst.state}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleWatchlist(inst.id)}
                    className="p-1.5 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColor}`}>
                    {inst.type === 'Max Planck Institute' ? 'MPI' : inst.type === 'Helmholtz Center' ? 'Helmholtz' : inst.type === 'Leibniz Institute' ? 'Leibniz' : 'University'}
                  </span>
                  {inst.contractType.includes('TVöD') && (
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      TVöD E13
                    </Badge>
                  )}
                  {(inst.languageInstruction === 'English' || inst.languageInstruction === 'Both') && (
                    <Badge variant="secondary" className="text-xs bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400">
                      English OK
                    </Badge>
                  )}
                </div>

                <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Banknote className="size-3.5 text-green-500" />
                    <span>{inst.monthlyEur ? `€${inst.monthlyEur.toLocaleString()}/month` : 'Stipend varies'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Languages className="size-3.5 text-blue-500" />
                    <span>{inst.languageInstruction}</span>
                  </div>
                  <p className="text-gray-500">Deadline: {inst.deadline || 'Rolling'}</p>
                  {inst.fields && (
                    <p className="text-gray-500">Fields: {inst.fields.replace(/\|/g, ', ')}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
