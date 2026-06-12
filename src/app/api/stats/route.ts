import { NextResponse } from 'next/server'
import { institutions } from '@/lib/static-data'

export async function GET() {
  const totalInstitutions = institutions.filter((i) => i.type === 'University').length
  const totalMacDiarmid = institutions.filter((i) => i.id.startsWith('macdiarmid') || i.id === 'macdiarmid').length
  const totalGNS = institutions.filter((i) => i.id === 'gns').length
  const doctoralScholarships = institutions.filter((i) => i.funding?.doctoralScholarshipAvailable).length
  const manaakiNzEligible = institutions.filter((i) => i.funding?.manaakiNzEligible).length
  const macdiarmidNodes = institutions.filter((i) => i.funding?.macdiarmidNode).length

  const stipends = institutions.filter((i) => i.monthlyGbp).map((i) => i.monthlyGbp as number)
  const avgStipendNzd = stipends.length > 0 ? Math.round(stipends.reduce((a, b) => a + b, 0) / stipends.length) : 0

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

  // Top islands
  const islandCount: Record<string, number> = {}
  institutions.forEach((inst) => {
    islandCount[inst.country] = (islandCount[inst.country] || 0) + 1
  })
  const topStates = Object.entries(islandCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([state, count]) => ({ state, count }))

  return NextResponse.json({
    totalInstitutions,
    totalMacDiarmid,
    totalGNS,
    doctoralScholarships,
    manaakiNzEligible,
    macdiarmidNodes,
    avgStipendNzd,
    topFields,
    topStates,
  })
}
