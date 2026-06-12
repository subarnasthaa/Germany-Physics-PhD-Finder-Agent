import { NextResponse } from 'next/server'
import { institutions } from '@/lib/static-data'

export async function GET() {
  const totalInstitutions = institutions.filter((i) => i.type === 'University').length
  const totalCSIRO = institutions.filter((i) => i.id.startsWith('csiro')).length
  const totalANSTO = institutions.filter((i) => i.id === 'ansto').length
  const rtpFunded = institutions.filter((i) => i.funding?.rtpAvailable).length
  const australiaAwardsEligible = institutions.filter((i) => i.funding?.australiaAwardsEligible).length
  const go8Count = institutions.filter((i) => i.go8).length

  const stipends = institutions.filter((i) => i.monthlyGbp).map((i) => i.monthlyGbp as number)
  const avgStipendAud = stipends.length > 0 ? Math.round(stipends.reduce((a, b) => a + b, 0) / stipends.length) : 0

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
    stateCount[inst.country] = (stateCount[inst.country] || 0) + 1
  })
  const topStates = Object.entries(stateCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([state, count]) => ({ state, count }))

  return NextResponse.json({
    totalInstitutions,
    totalCSIRO,
    totalANSTO,
    rtpFunded,
    australiaAwardsEligible,
    go8Count,
    avgStipendAud,
    topFields,
    topStates,
  })
}
