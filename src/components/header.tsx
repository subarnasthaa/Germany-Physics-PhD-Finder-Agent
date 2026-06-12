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
  { id: 'mpi-labs', label: 'MacDiarmid & GNS', shortLabel: 'MacDiarmid' },
  { id: 'daad-guide', label: 'Manaaki NZ Guide', shortLabel: 'Manaaki' },
  { id: 'watchlist', label: 'Watchlist', shortLabel: 'Watch' },
  { id: 'alerts', label: 'Alerts', shortLabel: 'Alerts' },
  { id: 'agent', label: 'AI Agent', shortLabel: 'AI' },
]

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const targetDate = new Date('2026-02-23T00:00:00+13:00')

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
    <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 rounded-lg px-3 py-1.5">
      <Clock className="size-4 text-indigo-600 dark:text-indigo-400" />
      <div className="flex items-center gap-1 text-xs font-medium">
        {isExpired ? (
          <span className="text-indigo-600 dark:text-indigo-400">Semester 1 2026 Open!</span>
        ) : (
          <>
            <span className="text-indigo-700 dark:text-indigo-300 hidden sm:inline">Semester 1 Feb 2026:</span>
            <span className="text-indigo-700 dark:text-indigo-300 sm:hidden">Deadline:</span>
            <span className="font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
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
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-xl bg-indigo-700 text-white shadow-sm">
              <GraduationCap className="size-6" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight">
                New Zealand Physics PhD Finder
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

        <div className="md:hidden pb-2">
          <CountdownTimer />
        </div>

        <nav className="hidden md:flex gap-1 pb-0 -mb-px overflow-x-auto" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-indigo-700 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

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
                    ? 'bg-indigo-700 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/20'
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
