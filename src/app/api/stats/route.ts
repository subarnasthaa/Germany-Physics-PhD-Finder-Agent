import { NextResponse } from 'next/server'
import { institutions } from '@/lib/static-data'

export async function GET() {
  const totalInstitutions = institutions.length
  const totalMPI = institutions.filter((i) => i.type === 'Max Planck Institute').length
  const totalHelmholtz = institutions.filter((i) => i.type === 'Helmholtz Center').length
  const totalLeibniz = institutions.filter((i) => i.type === 'Leibniz Institute').length
  const tvodPositions = institutions.filter((i) => i.contractType.includes('TVöD')).length
  const englishOnly = institutions.filter((i) => i.languageInstruction === 'English' || i.languageInstruction === 'Both').length

  const stipends = institutions.filter((i) => i.monthlyEur).map((i) => i.monthlyEur as number)
  const avgStipendEur = stipends.length > 0 ? Math.round(stipends.reduce((a, b) => a + b, 0) / stipends.length) : 0

  // Top fields
  const fieldCount: Record<string, number> = {}
  institutions.forEach((inst) => {
    inst.fields.split('|').forEach((f) => {
      const field = f.trim()
      if (field) fieldCount[field] = (fieldCount[field] || 0) + 1
    })
  })
  const topFields = Object.entries(fieldCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([field, count]) => ({ field, count }))

  // Top states
  const stateCount: Record<string, number> = {}
  institutions.forEach((inst) => {
    stateCount[inst.state] = (stateCount[inst.state] || 0) + 1
  })
  const topStates = Object.entries(stateCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([state, count]) => ({ state, count }))

  return NextResponse.json({
    totalInstitutions,
    totalMPI,
    totalHelmholtz,
    totalLeibniz,
    tvodPositions,
    englishOnly,
    avgStipendEur,
    topFields,
    topStates,
  })
}
