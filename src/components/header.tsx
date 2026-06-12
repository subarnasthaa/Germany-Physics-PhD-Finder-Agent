'use client'

import { useState, useEffect } from 'react'
import { GraduationCap, Clock, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: 'dashboard', label: 'Dashboard', shortLabel: 'Home' },
  { id: 'universities', label: 'Institutions', shortLabel: 'Instit.' },
  { id: 'mpi-labs', label: 'MPI & Labs', shortLabel: 'MPI' },
  { id: 'daad-guide', label: 'DAAD Guide', shortLabel: 'DAAD' },
  { id: 'watchlist', label: 'Watchlist', shortLabel: 'Watch' },
  { id: 'alerts', label: 'Alerts', shortLabel: 'Alerts' },
  { id: 'agent', label: 'AI Agent', shortLabel: 'AI' },
]

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const targetDate = new Date('2026-01-15T00:00:00+01:00')

    const updateCountdown = () => {
      const now = new Date()
      const diff = targetDate.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  const isExpired = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0

  return (
    <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-1.5">
      <Clock className="size-4 text-amber-600 dark:text-amber-400" />
      <div className="flex items-center gap-1 text-xs font-medium">
        {isExpired ? (
          <span className="text-red-600 dark:text-red-400">Winter 2026 Application Window Open!</span>
        ) : (
          <>
            <span className="text-amber-700 dark:text-amber-300 hidden sm:inline">Winter 2026 Deadline:</span>
            <span className="text-amber-700 dark:text-amber-300 sm:hidden">Deadline:</span>
            <span className="font-bold text-amber-600 dark:text-amber-400 tabular-nums">
              {timeLeft.days}d {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m {String(timeLeft.seconds).padStart(2, '0')}s
            </span>
          </>
        )}
      </div>
    </div>
  )
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top row: Logo + Countdown */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-xl bg-amber-600 text-white shadow-sm">
              <GraduationCap className="size-6" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight">
                Germany Physics PhD Finder
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                For Nepali MSc Physics Students | Tribhuvan University
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <CountdownTimer />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>

        {/* Countdown for mobile */}
        <div className="md:hidden pb-2">
          <CountdownTimer />
        </div>

        {/* Desktop Tab Navigation */}
        <nav className="hidden md:flex gap-1 pb-0 -mb-px overflow-x-auto" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Mobile Tab Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-2 grid grid-cols-4 gap-1" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => {
                  onTabChange(tab.id)
                  setMobileMenuOpen(false)
                }}
                className={`px-2 py-2 text-xs font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-amber-50 dark:hover:bg-amber-950/20'
                }`}
              >
                {tab.shortLabel}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
