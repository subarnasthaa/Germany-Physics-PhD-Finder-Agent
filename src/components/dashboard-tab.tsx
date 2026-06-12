'use client'

import { useState, useEffect } from 'react'
import {
  GraduationCap,
  Building2,
  Atom,
  FlaskConical,
  BookOpen,
  Clock,
  TrendingUp,
  ArrowRight,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Stats {
  totalInstitutions: number
  totalMPI: number
  totalHelmholtz: number
  totalLeibniz: number
  tvodPositions: number
  englishOnly: number
  avgStipendEur: number
}

interface DashboardTabProps {
  onNavigate: (tab: string) => void
  watchlistedIdsParam: string
}

export default function DashboardTab({ onNavigate }: DashboardTabProps) {
  const [stats, setStats] = useState<Stats | null>(null)
  const [topFields, setTopFields] = useState<{ field: string; count: number }[]>([])
  const [topStates, setTopStates] = useState<{ state: string; count: number }[]>([])
  const [recentAlerts, setRecentAlerts] = useState<{ name: string; deadline: string; urgent: boolean }[]>([])

  useEffect(() => {
    fetch('/api/stats')
      .then((r) => r.json())
      .then((data) => {
        setStats(data)
        if (data.topFields) setTopFields(data.topFields)
        if (data.topStates) setTopStates(data.topStates)
      })
      .catch(() => {})

    fetch('/api/alerts')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRecentAlerts(data.slice(0, 5).map((a: { name: string; deadline: string; daysLeft: number }) => ({
            name: a.name,
            deadline: a.deadline,
            urgent: a.daysLeft < 30,
          })))
        }
      })
      .catch(() => {})
  }, [])

  if (!stats) {
    return (
      <div className="space-y-6 p-4 md:p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-72 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  const maxFieldCount = Math.max(...topFields.map((f) => f.count), 1)
  const maxStateCount = Math.max(...topStates.map((s) => s.count), 1)

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Welcome Banner */}
      <Card className="border-0 bg-gradient-to-r from-amber-600 to-amber-700 text-white overflow-hidden">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="size-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
              <GraduationCap className="size-7" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">Willkommen! 🇩🇪</h2>
              <p className="text-amber-100 text-sm mb-4 max-w-xl">
                Find your Physics PhD in Germany — from universities to Max Planck Institutes,
                Helmholtz Centers, and Leibniz Institutes. Most positions are fully funded TVöD E13 employment!
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onNavigate('universities')}
                  className="bg-white text-amber-700 hover:bg-amber-50"
                >
                  Browse Institutions
                  <ArrowRight className="size-4 ml-1" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigate('daad-guide')}
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  DAAD Guide
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-amber-200 dark:border-amber-800/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <GraduationCap className="size-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalInstitutions}</p>
                <p className="text-xs text-gray-500">Total Institutions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 dark:border-red-800/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <Atom className="size-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalMPI}</p>
                <p className="text-xs text-gray-500">Max Planck Institutes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 dark:border-blue-800/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <FlaskConical className="size-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalHelmholtz}</p>
                <p className="text-xs text-gray-500">Helmholtz Centers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Building2 className="size-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.tvodPositions}</p>
                <p className="text-xs text-gray-500">TVöD E13 Funded</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Top Research Fields */}
        <Card>
          <CardContent className="p-4 md:p-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp className="size-4 text-amber-600" />
              Top Research Fields
            </h3>
            <div className="space-y-2.5">
              {topFields.slice(0, 8).map((f) => (
                <div key={f.field} className="flex items-center gap-3">
                  <span className="text-xs text-gray-600 dark:text-gray-400 w-28 shrink-0 truncate">{f.field}</span>
                  <div className="flex-1 h-5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${(f.count / maxFieldCount) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-500 w-8 text-right">{f.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top States */}
        <Card>
          <CardContent className="p-4 md:p-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <BookOpen className="size-4 text-amber-600" />
              Top States (Bundesländer)
            </h3>
            <div className="space-y-2">
              {topStates.slice(0, 8).map((s, i) => (
                <div key={s.state} className="flex items-center gap-3">
                  <span className={`size-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    i === 0 ? 'bg-amber-500 text-white' :
                    i === 1 ? 'bg-gray-400 text-white' :
                    i === 2 ? 'bg-amber-700 text-white' :
                    'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {i + 1}
                  </span>
                  <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">{s.state}</span>
                  <span className="text-sm font-medium text-amber-600">{s.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links + Recent Alerts */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 md:p-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Quick Links</h3>
            <div className="space-y-2">
              {[
                { label: 'DAAD Scholarship Guide', tab: 'daad-guide', icon: BookOpen },
                { label: 'My Watchlist', tab: 'watchlist', icon: Clock },
                { label: 'AI Agent', tab: 'agent', icon: Atom },
                { label: 'MPI & Research Labs', tab: 'mpi-labs', icon: FlaskConical },
              ].map((link) => {
                const Icon = link.icon
                return (
                  <button
                    key={link.tab}
                    onClick={() => onNavigate(link.tab)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-colors"
                  >
                    <Icon className="size-4 text-amber-600" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{link.label}</span>
                    <ArrowRight className="size-4 text-gray-400 ml-auto" />
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Recent Deadline Alerts</h3>
            {recentAlerts.length === 0 ? (
              <p className="text-xs text-gray-400">No upcoming deadlines</p>
            ) : (
              <div className="space-y-2">
                {recentAlerts.map((alert, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-2.5 rounded-lg border-l-4 ${
                      alert.urgent
                        ? 'border-l-red-500 bg-red-50 dark:bg-red-950/20'
                        : 'border-l-amber-500 bg-amber-50 dark:bg-amber-950/20'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{alert.name}</p>
                      <p className="text-xs text-gray-500">{alert.deadline}</p>
                    </div>
                    {alert.urgent && (
                      <span className="text-xs font-medium text-red-600 bg-red-100 dark:bg-red-900/30 px-2 py-0.5 rounded">
                        Urgent
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
