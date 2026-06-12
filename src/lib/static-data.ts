// ─────────────────────────────────────────────
// Static Data for New Zealand Physics PhD Finder Agent
// For Nepali MSc Physics Students from Tribhuvan University
// ─────────────────────────────────────────────

export interface Institution {
  id: string
  name: string
  city: string
  country: 'North Island' | 'South Island'
  type: 'University' | 'Research Institute'
  department: string
  researchGroup: string | null
  url: string
  fields: string
  phdType: string
  deadline: string
  admission: 'Rolling' | 'Semester-based'
  deadlines: {
    semester1_feb: string
    semester2_jul: string
    rolling: boolean
  }
  internationalTuitionNzd: number
  funding: {
    doctoralScholarshipAvailable: boolean
    doctoralStipendNzd: number
    manaakiNzEligible: boolean
    macdiarmidNode: boolean
    universityScholarships: boolean
  }
  ieltsMinimum: number
  contractType: string
  monthlyGbp: number | null // stores NZD/month value for API compat
  languageInstruction: string
  englishLabLife: boolean
  notableProfessors: string
  requiredDocuments: string
  notesForNepali: string
  watchlisted: boolean
  lastUpdated: string
  go8: boolean // kept for API compat, true for top-tier NZ unis
}

export interface ScholarshipInfo {
  id: string
  title: string
  category: string
  content: string
}

// ─────────────────────────────────────────────
// NEW ZEALAND UNIVERSITIES (ALL 8) & RESEARCH INSTITUTES
// ─────────────────────────────────────────────
export const institutions: Institution[] = [
  // ========================
  // 1. University of Auckland — Largest, top-ranked
  // ========================
  {
    id: 'uoa',
    name: 'University of Auckland',
    city: 'Auckland',
    country: 'North Island',
    type: 'University',
    department: 'Department of Physics',
    researchGroup: 'Photonics & Quantum Optics | Condensed Matter | Astrophysics | Medical Physics',
    url: 'https://www.auckland.ac.nz/en/science/about-science/schools-departments/physics.html',
    fields: 'Astrophysics|Quantum Optics|Condensed Matter|Photonics|Medical Physics|Biophysics|Materials Science|Geophysics',
    phdType: 'PhD (Research)',
    deadline: 'Rolling',
    admission: 'Rolling',
    deadlines: { semester1_feb: '2026-02-23', semester2_jul: '2026-07-13', rolling: true },
    internationalTuitionNzd: 38700,
    funding: {
      doctoralScholarshipAvailable: true,
      doctoralStipendNzd: 28000,
      manaakiNzEligible: true,
      macdiarmidNode: true,
      universityScholarships: true,
    },
    ieltsMinimum: 6.5,
    contractType: 'University of Auckland Doctoral Scholarship (NZD $28,000/year) + Manaaki NZ eligible',
    monthlyGbp: 2333,
    languageInstruction: 'English',
    englishLabLife: true,
    notableProfessors: 'Prof. Cather Simpson (Photonics), Prof. Richard Easther (Cosmology), Assoc. Prof. Miro Erkintalo (Nonlinear Optics), Dr. Natalie Plank (Materials)',
    requiredDocuments: 'MSc degree & transcripts, CV, Research proposal, 2 reference letters, IELTS 6.5, Supervisor acceptance',
    notesForNepali: 'Top-ranked NZ university. Strong quantum optics & photonics group. Manaaki NZ Scholarship covers full tuition + living. Auckland is most expensive city but also most job opportunities.',
    watchlisted: false,
    lastUpdated: '2025-03-05',
    go8: true,
  },

  // ========================
  // 2. Victoria University of Wellington — Condensed Matter, Quantum
  // ========================
  {
    id: 'vuw',
    name: 'Victoria University of Wellington',
    city: 'Wellington',
    country: 'North Island',
    type: 'University',
    department: 'School of Chemical and Physical Sciences',
    researchGroup: 'MacDiarmid Institute (VUW node) | Condensed Matter | Quantum Physics | Materials',
    url: 'https://www.wgtn.ac.nz/science/schools/chemical-physical-sciences',
    fields: 'Condensed Matter|Quantum Physics|Materials Science|Superconductivity|Nanophysics|Theoretical Physics|Optics',
    phdType: 'PhD (Research)',
    deadline: 'Rolling',
    admission: 'Rolling',
    deadlines: { semester1_feb: '2026-03-02', semester2_jul: '2026-07-20', rolling: true },
    internationalTuitionNzd: 35000,
    funding: {
      doctoralScholarshipAvailable: true,
      doctoralStipendNzd: 27500,
      manaakiNzEligible: true,
      macdiarmidNode: true,
      universityScholarships: true,
    },
    ieltsMinimum: 6.5,
    contractType: 'VUW Doctoral Scholarship (NZD $27,500/year) + MacDiarmid Institute top-up + Manaaki NZ eligible',
    monthlyGbp: 2292,
    languageInstruction: 'English',
    englishLabLife: true,
    notableProfessors: 'Prof. Ben Ruck (MacDiarmid Co-Director, Materials), Prof. Shaun Hendy (Complex Systems), Dr. Nicola Gaston (Computational Materials), Prof. Kate McGrath (Materials)',
    requiredDocuments: 'MSc degree & transcripts, CV, Research proposal, 2 reference letters, IELTS 6.5, Supervisor agreement',
    notesForNepali: 'Excellent condensed matter and materials physics. Key MacDiarmid Institute node. Wellington is the capital — great lifestyle, slightly cheaper than Auckland. Strong NZ-Asia research links.',
    watchlisted: false,
    lastUpdated: '2025-03-05',
    go8: true,
  },

  // ========================
  // 3. University of Canterbury — Astrophysics, Astronomy
  // ========================
  {
    id: 'uc',
    name: 'University of Canterbury',
    city: 'Christchurch',
    country: 'South Island',
    type: 'University',
    department: 'School of Physical and Chemical Sciences',
    researchGroup: 'Mt John Observatory | Astrophysics | Medical Physics | Lasers',
    url: 'https://www.canterbury.ac.nz/science/schools/physical-chemical-sciences/',
    fields: 'Astrophysics|Astronomy|Medical Physics|Laser Physics|Quantum Optics|Atmospheric Physics|Geophysics',
    phdType: 'PhD (Research)',
    deadline: 'Rolling',
    admission: 'Rolling',
    deadlines: { semester1_feb: '2026-02-23', semester2_jul: '2026-07-13', rolling: true },
    internationalTuitionNzd: 34000,
    funding: {
      doctoralScholarshipAvailable: true,
      doctoralStipendNzd: 27000,
      manaakiNzEligible: true,
      macdiarmidNode: false,
      universityScholarships: true,
    },
    ieltsMinimum: 6.5,
    contractType: 'UC Doctoral Scholarship (NZD $27,000/year) + Manaaki NZ eligible',
    monthlyGbp: 2250,
    languageInstruction: 'English',
    englishLabLife: true,
    notableProfessors: 'Prof. John Hearnshaw (Astrophysics), Dr. Karen Pollard (Stellar Astrophysics), Dr. Matthew Arnold (Medical Physics), Prof. Adrian McDonald (Atmospheric Physics)',
    requiredDocuments: 'MSc degree & transcripts, CV, Research proposal, 2 reference letters, IELTS 6.5, Supervisor acceptance',
    notesForNepali: 'Home of Mt John Observatory — best astronomical observatory in NZ. Strong astrophysics and medical physics. Christchurch is affordable with great outdoor lifestyle. Rebuilding after earthquakes with modern facilities.',
    watchlisted: false,
    lastUpdated: '2025-03-05',
    go8: true,
  },

  // ========================
  // 4. University of Otago — Quantum Optics, Medical Physics
  // ========================
  {
    id: 'otago',
    name: 'University of Otago',
    city: 'Dunedin',
    country: 'South Island',
    type: 'University',
    department: 'Department of Physics',
    researchGroup: 'Quantum Optics | Medical Physics | Photonics | Electronics',
    url: 'https://www.otago.ac.nz/physics/',
    fields: 'Quantum Optics|Medical Physics|Photonics|Electronics|Quantum Information|Atomic Physics|Condensed Matter',
    phdType: 'PhD (Research)',
    deadline: 'Rolling',
    admission: 'Rolling',
    deadlines: { semester1_feb: '2026-02-23', semester2_jul: '2026-07-13', rolling: true },
    internationalTuitionNzd: 33500,
    funding: {
      doctoralScholarshipAvailable: true,
      doctoralStipendNzd: 27000,
      manaakiNzEligible: true,
      macdiarmidNode: true,
      universityScholarships: true,
    },
    ieltsMinimum: 6.5,
    contractType: 'Otago Doctoral Scholarship (NZD $27,000/year) + MacDiarmid top-up + Manaaki NZ eligible',
    monthlyGbp: 2250,
    languageInstruction: 'English',
    englishLabLife: true,
    notableProfessors: 'Prof. David Hutchinson (Quantum Physics, MacDiarmid), Prof. Jevon Longdell (Quantum Optics), Dr. Harald Schwefel (Photonics), Dr. Mikhal Eremeev (Quantum Optics)',
    requiredDocuments: 'MSc degree & transcripts, CV, Research proposal, 2 reference letters, IELTS 6.5, Supervisor agreement',
    notesForNepali: 'Oldest NZ university. Strong quantum optics & quantum information groups. MacDiarmid Institute node. Dunedin is affordable student city. Very supportive environment for international students.',
    watchlisted: false,
    lastUpdated: '2025-03-05',
    go8: true,
  },

  // ========================
  // 5. Massey University — Applied Physics, Materials
  // ========================
  {
    id: 'massey',
    name: 'Massey University',
    city: 'Palmerston North',
    country: 'North Island',
    type: 'University',
    department: 'School of Natural and Computational Sciences',
    researchGroup: 'Applied Physics | Materials | Photonics | Sensors',
    url: 'https://www.massey.ac.nz/massey/learning/colleges/college-of-sciences/school-of-natural-computational-sciences/',
    fields: 'Applied Physics|Materials Science|Photonics|Sensors|Nanotechnology|Biophysics|Electronics',
    phdType: 'PhD (Research)',
    deadline: 'Rolling',
    admission: 'Rolling',
    deadlines: { semester1_feb: '2026-02-23', semester2_jul: '2026-07-13', rolling: true },
    internationalTuitionNzd: 31500,
    funding: {
      doctoralScholarshipAvailable: true,
      doctoralStipendNzd: 27000,
      manaakiNzEligible: true,
      macdiarmidNode: true,
      universityScholarships: true,
    },
    ieltsMinimum: 6.5,
    contractType: 'Massey Doctoral Scholarship (NZD $27,000/year) + MacDiarmid top-up + Manaaki NZ eligible',
    monthlyGbp: 2250,
    languageInstruction: 'English',
    englishLabLife: true,
    notableProfessors: 'Prof. Mark Waterland (MacDiarmid, Materials), Dr. Simon Granville (MacDiarmid, Thin Films), Dr. Lech Szymanski (Applied Physics)',
    requiredDocuments: 'MSc degree & transcripts, CV, Research proposal, 2 reference letters, IELTS 6.5, Supervisor acceptance',
    notesForNepali: 'Strong applied physics with MacDiarmid node. Palmerston North is very affordable — one of the cheapest NZ student cities. Great for families. Close to Wellington (2 hours).',
    watchlisted: false,
    lastUpdated: '2025-03-05',
    go8: false,
  },

  // ========================
  // 6. Auckland University of Technology (AUT) — Applied Physics
  // ========================
  {
    id: 'aut',
    name: 'Auckland University of Technology (AUT)',
    city: 'Auckland',
    country: 'North Island',
    type: 'University',
    department: 'School of Science',
    researchGroup: 'Applied Physics | Medical Physics | Radiation | Imaging',
    url: 'https://www.aut.ac.nz/study/study-options/science/subjects/physics',
    fields: 'Applied Physics|Medical Physics|Radiation Physics|Imaging|Biophysics|Environmental Physics',
    phdType: 'PhD (Research)',
    deadline: 'Rolling',
    admission: 'Rolling',
    deadlines: { semester1_feb: '2026-03-02', semester2_jul: '2026-07-20', rolling: true },
    internationalTuitionNzd: 30000,
    funding: {
      doctoralScholarshipAvailable: true,
      doctoralStipendNzd: 27000,
      manaakiNzEligible: true,
      macdiarmidNode: false,
      universityScholarships: true,
    },
    ieltsMinimum: 6.5,
    contractType: 'AUT Doctoral Scholarship (NZD $27,000/year) + Manaaki NZ eligible',
    monthlyGbp: 2250,
    languageInstruction: 'English',
    englishLabLife: true,
    notableProfessors: 'Dr. Andrew Lapthorn (Medical Physics), Dr. James Siers (Applied Physics), Dr. Sam Behnia (Imaging)',
    requiredDocuments: 'MSc degree & transcripts, CV, Research proposal, 2 reference letters, IELTS 6.5, Supervisor agreement',
    notesForNepali: 'Good for applied and medical physics. AUT is modern and growing rapidly. Auckland location means higher living costs but more job opportunities. Manaaki NZ eligible.',
    watchlisted: false,
    lastUpdated: '2025-03-05',
    go8: false,
  },

  // ========================
  // 7. Lincoln University — Environmental Physics
  // ========================
  {
    id: 'lincoln',
    name: 'Lincoln University',
    city: 'Lincoln (near Christchurch)',
    country: 'South Island',
    type: 'University',
    department: 'Department of Soil and Physical Sciences',
    researchGroup: 'Environmental Physics | Soil Physics | Agricultural Physics',
    url: 'https://www.lincoln.ac.nz/',
    fields: 'Environmental Physics|Soil Physics|Agricultural Physics|Climate Science|Hydrology|Geophysics|Remote Sensing',
    phdType: 'PhD (Research)',
    deadline: 'Rolling',
    admission: 'Rolling',
    deadlines: { semester1_feb: '2026-02-23', semester2_jul: '2026-07-13', rolling: true },
    internationalTuitionNzd: 28000,
    funding: {
      doctoralScholarshipAvailable: true,
      doctoralStipendNzd: 27000,
      manaakiNzEligible: true,
      macdiarmidNode: false,
      universityScholarships: true,
    },
    ieltsMinimum: 6.5,
    contractType: 'Lincoln Doctoral Scholarship (NZD $27,000/year) + Manaaki NZ eligible',
    monthlyGbp: 2250,
    languageInstruction: 'English',
    englishLabLife: true,
    notableProfessors: 'Prof. Keith Cameron (Environmental Physics), Prof. Hong Di (Soil Science), Dr. John Bright (Hydrology)',
    requiredDocuments: 'MSc degree & transcripts, CV, Research proposal, 2 reference letters, IELTS 6.5, Supervisor acceptance',
    notesForNepali: 'Best for environmental and agricultural physics. Very affordable South Island location. Small campus with close faculty-student interaction. Ideal for students interested in climate and environmental research.',
    watchlisted: false,
    lastUpdated: '2025-03-05',
    go8: false,
  },

  // ========================
  // 8. University of Waikato — Materials, Photonics
  // ========================
  {
    id: 'waikato',
    name: 'University of Waikato',
    city: 'Hamilton',
    country: 'North Island',
    type: 'University',
    department: 'School of Science',
    researchGroup: 'Materials Physics | Photonics | Electronics | Energy',
    url: 'https://www.waikato.ac.nz/study/subjects/physics',
    fields: 'Materials Science|Photonics|Electronics|Energy Physics|Condensed Matter|Nanotechnology|Computational Physics',
    phdType: 'PhD (Research)',
    deadline: 'Rolling',
    admission: 'Rolling',
    deadlines: { semester1_feb: '2026-03-02', semester2_jul: '2026-07-20', rolling: true },
    internationalTuitionNzd: 30500,
    funding: {
      doctoralScholarshipAvailable: true,
      doctoralStipendNzd: 27000,
      manaakiNzEligible: true,
      macdiarmidNode: true,
      universityScholarships: true,
    },
    ieltsMinimum: 6.5,
    contractType: 'Waikato Doctoral Scholarship (NZD $27,000/year) + MacDiarmid top-up + Manaaki NZ eligible',
    monthlyGbp: 2250,
    languageInstruction: 'English',
    englishLabLife: true,
    notableProfessors: 'Prof. Mark Bowden (MacDiarmid, Materials), Dr. Shen Chong (Photonics), Dr. Khai Do (Materials), Dr. Rob Thesis (Energy)',
    requiredDocuments: 'MSc degree & transcripts, CV, Research proposal, 2 reference letters, IELTS 6.5, Supervisor agreement',
    notesForNepali: 'MacDiarmid Institute node with materials and photonics research. Hamilton is affordable and close to Auckland (1.5 hours). Good for students wanting lower cost of living with access to Auckland.',
    watchlisted: false,
    lastUpdated: '2025-03-05',
    go8: false,
  },

  // ========================
  // 9. GNS Science — Geophysics, Nuclear
  // ========================
  {
    id: 'gns',
    name: 'GNS Science',
    city: 'Lower Hutt (Wellington)',
    country: 'North Island',
    type: 'Research Institute',
    department: 'Geophysics & Nuclear Science Division',
    researchGroup: 'Geophysics | Seismology | Volcanology | Nuclear Physics | Isotope Research',
    url: 'https://www.gns.cri.nz/',
    fields: 'Geophysics|Seismology|Volcanology|Nuclear Physics|Isotope Physics|Geochemistry|Plate Tectonics|Radiation Physics',
    phdType: 'PhD (co-tutelle with university partner)',
    deadline: 'Rolling',
    admission: 'Rolling',
    deadlines: { semester1_feb: '2026-02-23', semester2_jul: '2026-07-13', rolling: true },
    internationalTuitionNzd: 0,
    funding: {
      doctoralScholarshipAvailable: true,
      doctoralStipendNzd: 28000,
      manaakiNzEligible: false,
      macdiarmidNode: false,
      universityScholarships: false,
    },
    ieltsMinimum: 6.5,
    contractType: 'GNS PhD Scholarship (NZD $28,000/year) — tuition covered by partner university',
    monthlyGbp: 2333,
    languageInstruction: 'English',
    englishLabLife: true,
    notableProfessors: 'Dr. John Townend (Seismology), Dr. Gill Jolly (Volcanology), Dr. Andrew R.L. Mason (Isotope Physics), Dr. Stephen Bannister (Geophysics)',
    requiredDocuments: 'MSc degree & transcripts, CV, Research proposal, 2 reference letters, IELTS 6.5, Co-supervisor agreement with university partner',
    notesForNepali: 'NZ premier geophysics and nuclear research institute. Operates the National Isotope Centre. Students enrolled at VUW or other partner universities but conduct research at GNS. Ideal for geophysics enthusiasts from Nepal.',
    watchlisted: false,
    lastUpdated: '2025-03-05',
    go8: false,
  },

  // ========================
  // 10. MacDiarmid Institute — Materials, Quantum
  // ========================
  {
    id: 'macdiarmid',
    name: 'MacDiarmid Institute for Advanced Materials and Nanotechnology',
    city: 'Wellington (HQ at VUW)',
    country: 'North Island',
    type: 'Research Institute',
    department: 'Centre of Research Excellence',
    researchGroup: 'Advanced Materials | Quantum Devices | Nanotechnology | Photonics | Superconductivity',
    url: 'https://www.macdiarmid.ac.nz/',
    fields: 'Materials Science|Quantum Physics|Nanotechnology|Photonics|Superconductivity|Thin Films|Sensors|Energy Materials',
    phdType: 'PhD (enrolled at node university)',
    deadline: 'Rolling',
    admission: 'Rolling',
    deadlines: { semester1_feb: '2026-02-23', semester2_jul: '2026-07-13', rolling: true },
    internationalTuitionNzd: 0,
    funding: {
      doctoralScholarshipAvailable: true,
      doctoralStipendNzd: 27000,
      manaakiNzEligible: false,
      macdiarmidNode: true,
      universityScholarships: false,
    },
    ieltsMinimum: 6.5,
    contractType: 'MacDiarmid PhD Scholarship (NZD $27,000/year) + conference travel + research funds',
    monthlyGbp: 2250,
    languageInstruction: 'English',
    englishLabLife: true,
    notableProfessors: 'Prof. Ben Ruck (VUW, Materials), Prof. David Hutchinson (Otago, Quantum), Prof. Mark Bowden (Waikato, Materials), Prof. Mark Waterland (Massey, Materials), Prof. Justin Hodgkiss (VUW, Photonics)',
    requiredDocuments: 'MSc degree & transcripts, CV, Research proposal, 2 reference letters, IELTS 6.5, MacDiarmid supervisor agreement',
    notesForNepali: 'NZ Centre of Research Excellence spanning 5 universities. Students enrolled at node universities (VUW, Otago, Massey, Waikato, Auckland). Extra conference travel and research funds. Highly recommended for materials and quantum physics.',
    watchlisted: false,
    lastUpdated: '2025-03-05',
    go8: false,
  },

  // ========================
  // 11. Callaghan Innovation — Applied Physics, Materials
  // ========================
  {
    id: 'callaghan',
    name: 'Callaghan Innovation',
    city: 'Wellington / Auckland',
    country: 'North Island',
    type: 'Research Institute',
    department: 'Advanced Materials & Physics Division',
    researchGroup: 'Applied Physics | Advanced Materials | Sensors | Photonics',
    url: 'https://www.callaghaninnovation.govt.nz/',
    fields: 'Applied Physics|Advanced Materials|Sensors|Photonics|Nanotechnology|Surface Science|Electron Microscopy',
    phdType: 'PhD (co-tutelle with university partner)',
    deadline: 'Rolling',
    admission: 'Rolling',
    deadlines: { semester1_feb: '2026-02-23', semester2_jul: '2026-07-13', rolling: true },
    internationalTuitionNzd: 0,
    funding: {
      doctoralScholarshipAvailable: true,
      doctoralStipendNzd: 27500,
      manaakiNzEligible: false,
      macdiarmidNode: false,
      universityScholarships: false,
    },
    ieltsMinimum: 6.5,
    contractType: 'Callaghan Innovation PhD Scholarship (NZD $27,500/year)',
    monthlyGbp: 2292,
    languageInstruction: 'English',
    englishLabLife: true,
    notableProfessors: 'Dr. John Abrahamson (Materials), Dr. Rod Vaughan (Surface Science), Dr. Nicola Stanley (Photonics)',
    requiredDocuments: 'MSc degree & transcripts, CV, Research proposal, 2 reference letters, IELTS 6.5, Co-supervisor agreement',
    notesForNepali: "NZ's applied research agency. Students co-enrolled at universities. Access to world-class electron microscopy and surface analysis facilities. Great for applied physics students wanting industry connections.",
    watchlisted: false,
    lastUpdated: '2025-03-05',
    go8: false,
  },
]

// ─────────────────────────────────────────────
// SCHOLARSHIPS
// ─────────────────────────────────────────────
export const scholarships: ScholarshipInfo[] = [
  // ===== Manaaki New Zealand Scholarships =====
  {
    id: 'manaaki-nz',
    title: 'Manaaki New Zealand Scholarship (MOST IMPORTANT for Nepali!)',
    category: 'Manaaki NZ Scholarship',
    content: 'Fully funded scholarship by the New Zealand Government for students from developing countries including Nepal. Covers: full tuition fees, NZD $1,500/month living allowance, return airfare from Nepal, health and travel insurance, establishment allowance upon arrival. Duration: Up to 4 years for PhD. IELTS: Minimum 6.5 with no band below 6.0. Apply through the Manaaki NZ online portal. The NZ High Commission in Kathmandu manages the process for Nepali applicants. This is the BEST scholarship option for Nepali students — it covers EVERYTHING!',
  },
  {
    id: 'manaaki-nz-application',
    title: 'Manaaki NZ Application Process for Nepal',
    category: 'Manaaki NZ Scholarship',
    content: 'Step 1: Check eligibility on manaaki.nz — must be a Nepali citizen, have MSc degree, under 40 years for PhD. Step 2: Apply online through the Manaaki NZ portal (typically opens February-April each year). Step 3: Submit required documents — MSc transcripts, IELTS 6.5+, CV, research proposal, 2 reference letters, passport copy. Step 4: If shortlisted, attend interview at NZ High Commission Kathmandu. Step 5: If selected, receive offer and apply for NZ student visa. Step 6: Travel to NZ and begin your PhD! Contact: NZ High Commission Kathmandu, Bansbari Heights, Maharajgunj, Kathmandu.',
  },
  {
    id: 'manaaki-nz-benefits',
    title: 'Manaaki NZ Benefits Breakdown',
    category: 'Manaaki NZ Scholarship',
    content: 'Full tuition fees covered (NZD $28,000-38,700/year value). Living allowance: NZD $1,500/month (tax-free). Return airfare from Kathmandu to NZ. Health and travel insurance for entire duration. Establishment allowance: NZD $3,000 one-time (for setting up in NZ). Supplementary academic support. Reunion airfare for family if applicable. Total value: NZD $80,000-120,000+ for a 3-4 year PhD. This is comparable to Australia Awards but in NZ with lower cost of living.',
  },

  // ===== NZ Commonwealth Scholarship =====
  {
    id: 'nz-commonwealth',
    title: 'New Zealand Commonwealth Scholarship',
    category: 'Government Scholarships',
    content: 'Prestigious scholarship for citizens of Commonwealth countries including Nepal. Covers full tuition, living allowance (NZD $1,350/month), return airfare, and health insurance. Duration: Up to 4 years for PhD. Requires strong academic record and IELTS 6.5+. Apply through the NZ Ministry of Foreign Affairs and Trade (MFAT) portal. Very competitive but highly valued.',
  },

  // ===== NZ ASEAN Scholarship =====
  {
    id: 'nz-asean',
    title: 'New Zealand ASEAN Scholarship',
    category: 'Government Scholarships',
    content: 'Available for students from ASEAN member states. While Nepal is not an ASEAN member, some Nepali students may be eligible under regional development programs. Check the MFAT website for current eligibility. Covers full tuition, living allowance, airfare, and insurance. Apply through the Manaaki NZ portal.',
  },

  // ===== University Doctoral Scholarships =====
  {
    id: 'uoa-doctoral',
    title: 'University of Auckland Doctoral Scholarship',
    category: 'University Doctoral Scholarships',
    content: 'NZD $28,000/year stipend + full tuition coverage. Available for both domestic and international students. Competitive — requires strong academic record. Apply directly through the University of Auckland when applying for PhD admission. Can be combined with other funding sources. 3-4 year duration.',
  },
  {
    id: 'vuw-doctoral',
    title: 'Victoria University of Wellington Doctoral Scholarship',
    category: 'University Doctoral Scholarships',
    content: 'NZD $27,500/year stipend + full tuition coverage. VUW offers several doctoral scholarship rounds per year. MacDiarmid Institute students may receive additional top-up. Apply through VUW scholarship portal. Strong in condensed matter and quantum physics. 3-4 year duration.',
  },
  {
    id: 'otago-doctoral',
    title: 'University of Otago Doctoral Scholarship',
    category: 'University Doctoral Scholarships',
    content: 'NZD $27,000/year stipend + full tuition coverage. Otago is the oldest NZ university with strong quantum optics and medical physics groups. MacDiarmid Institute node provides additional support. Apply through Otago scholarship office. Rolling applications accepted. 3-4 year duration.',
  },
  {
    id: 'uc-doctoral',
    title: 'University of Canterbury Doctoral Scholarship',
    category: 'University Doctoral Scholarships',
    content: 'NZD $27,000/year stipend + full tuition coverage. Strong astrophysics program with access to Mt John Observatory. Medical physics and laser physics also strong. Apply through UC scholarship portal. 3-4 year duration.',
  },
  {
    id: 'massey-doctoral',
    title: 'Massey University Doctoral Scholarship',
    category: 'University Doctoral Scholarships',
    content: 'NZD $27,000/year stipend + full tuition coverage. MacDiarmid Institute node with materials and applied physics. Palmerston North is one of the most affordable NZ cities. Apply through Massey scholarship portal. 3-4 year duration.',
  },
  {
    id: 'waikato-doctoral',
    title: 'University of Waikato Doctoral Scholarship',
    category: 'University Doctoral Scholarships',
    content: 'NZD $27,000/year stipend + full tuition coverage. MacDiarmid Institute node. Hamilton is affordable and close to Auckland. Good for materials and photonics research. Apply through Waikato scholarship portal. 3-4 year duration.',
  },
  {
    id: 'aut-doctoral',
    title: 'AUT Doctoral Scholarship',
    category: 'University Doctoral Scholarships',
    content: 'NZD $27,000/year stipend + full tuition coverage. Good for applied physics and medical physics. Modern facilities and growing research profile. Apply through AUT scholarship portal. 3-4 year duration.',
  },
  {
    id: 'lincoln-doctoral',
    title: 'Lincoln University Doctoral Scholarship',
    category: 'University Doctoral Scholarships',
    content: 'NZD $27,000/year stipend + full tuition coverage. Best for environmental and agricultural physics. Very affordable South Island location. Small campus with personalized attention. Apply through Lincoln scholarship portal. 3-4 year duration.',
  },

  // ===== MacDiarmid Institute Scholarships =====
  {
    id: 'macdiarmid-phd',
    title: 'MacDiarmid Institute PhD Scholarship',
    category: 'MacDiarmid Institute',
    content: 'NZD $27,000/year stipend + tuition covered at node university + NZD $3,000/year conference travel + NZD $2,000/year research expenses. Available at all MacDiarmid node universities: Auckland, VUW, Otago, Massey, Waikato. Students are enrolled at the node university but part of the MacDiarmid research community. Access to shared facilities across NZ. Apply by contacting a MacDiarmid principal investigator at any node university.',
  },
  {
    id: 'macdiarmid-topup',
    title: 'MacDiarmid Institute Top-up for University Scholars',
    category: 'MacDiarmid Institute',
    content: 'If you receive a university doctoral scholarship at a MacDiarmid node, you may be eligible for a MacDiarmid top-up of NZD $2,000-5,000/year additional stipend + conference travel funds. This effectively increases your annual stipend to NZD $29,000-32,000. Contact the MacDiarmid Institute for current top-up rates and availability.',
  },

  // ===== NZ High Commission Nepal =====
  {
    id: 'nz-high-commission',
    title: 'NZ High Commission Nepal — Contact & Information',
    category: 'NZ High Commission Nepal',
    content: 'Address: Bansbari Heights, Maharajgunj, Kathmandu, Nepal. Phone: +977-1-4371-678. Email: nzhckathmandu@mfat.govt.nz. Website: mfat.govt.nz. The NZ High Commission manages Manaaki NZ Scholarship applications for Nepali students. Visit during working hours (Mon-Fri, 9AM-5PM) for scholarship inquiries. Visa applications processed through Immigration NZ online portal. Processing time for student visa: typically 4-8 weeks.',
  },
  {
    id: 'nz-visa-nepal',
    title: 'NZ Student Visa Process for Nepali Students',
    category: 'NZ High Commission Nepal',
    content: 'Apply online through Immigration New Zealand (immigration.govt.nz). You need: offer of place from NZ university, evidence of funds (or Manaaki NZ scholarship letter), health certificate, police clearance from Nepal, IELTS score, passport. Visa fee: approximately NPR 25,000-30,000. Processing time: 4-8 weeks. You can include spouse and children on dependent visa. Spouse can work in NZ. Use the VFS Global office in Kathmandu for biometrics if required.',
  },
]

// ─────────────────────────────────────────────
// SEARCH FUNCTION
// ─────────────────────────────────────────────
export function searchScholarships(query: string): ScholarshipInfo[] {
  const q = query.toLowerCase()
  return scholarships.filter(
    (s) =>
      s.title.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.content.toLowerCase().includes(q)
  )
}
