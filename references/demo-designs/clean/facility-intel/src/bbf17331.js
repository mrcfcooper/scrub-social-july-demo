/* Facility Intel — sample data.
   Verified facility facts are "live". Community-derived signals
   (score, ratings, reviews, diaries) are Phase 3 / target-state. */
window.FAC = {
  name: 'Pacific View Medical Center',
  city: 'San Diego, CA',
  market: 'Coastal market',
  type: 'Acute care · Level II Trauma',
  beds: '450 beds',
  system: 'Pacific Health Network',
  recognition: 'Magnet® designated',
  charting: 'Epic',
  units: ['ICU', 'PCU', 'ER', 'Tele', 'CVICU'],

  // community-derived (Phase 3)
  score: 86,
  overall: 4.3,
  reviewCount: 23,
  diaryCount: 7,
  contributorCount: 14,

  metaTiles: [
    { icon: 'building', label: 'Facility type', value: 'Level II Trauma' },
    { icon: 'stethoscope', label: 'Charting', value: 'Epic' },
    { icon: 'award', label: 'Recognition', value: 'Magnet®' },
    { icon: 'map-pin', label: 'Market', value: 'Coastal · high COL' },
  ],

  ratings: [
    { label: 'Charge nurse support', value: 4.6 },
    { label: 'Unit culture', value: 4.4 },
    { label: 'Would return', value: 4.5 },
    { label: 'Workload & ratios', value: 4.1 },
    { label: 'Orientation', value: 3.9 },
    { label: 'Float fairness', value: 3.6 },
  ],

  culture: [
    'Strong night-shift culture',
    'Traveler-friendly charge nurses',
    'High acuity',
    'Direct & organized',
    '1:2 ICU ratios common',
    'Navy scrubs on ICU',
    'Structured orientation',
  ],

  notes: [
    {
      icon: 'car', title: 'Parking', status: 'Plan ahead',
      body: 'Garage fills early. Budget extra time in week one — nights park easier once you learn the rhythm.',
      sources: 5,
    },
    {
      icon: 'clipboard-check', title: 'Charting', status: 'Epic',
      body: 'Template-heavy but fast once oriented. Epic comfort meaningfully lowers first-week friction.',
      sources: 6,
    },
    {
      icon: 'shuffle', title: 'Float', status: 'Possible',
      body: 'Floats to ICU stepdown happen but stay reasonable. Ask about the float policy during your interview.',
      sources: 4,
    },
    {
      icon: 'home', title: 'Housing', status: 'Competitive',
      body: 'Coastal rent runs high and moves fast. Start your search before the offer is fully signed.',
      sources: 5,
    },
  ],

  reviews: [
    {
      quote: 'Busy but organized. The charge nurses actually want travelers to succeed — I never felt like an outsider on nights.',
      role: 'ICU RN', length: '13-week assignment', when: 'winter 2025',
      tags: ['Night shift', 'Helpful charge nurses', 'Would return'],
    },
    {
      quote: 'Orientation is compact. Ask your questions early and you are fine by the end of week one.',
      role: 'PCU RN', length: '13-week assignment', when: 'fall 2024',
      tags: ['Compact orientation', 'Clear checklist'],
    },
    {
      quote: 'Parking is the least glamorous part. Get there early week one, learn the garage, and it stops being a problem.',
      role: 'ER RN', length: '8-week assignment', when: 'summer 2024',
      tags: ['Garage fills early', 'Budget time'],
    },
  ],

  diaries: [
    {
      unit: 'ICU', shift: 'Nights', length: '13 weeks', when: 'completed 2025',
      sections: ['Testing: EKG', 'Float: ICU stepdown', 'Charting: Epic', 'Ratios: 1:2'],
      note: 'Worth it if you like structure, beach-city energy, and a recruiter who replies fast.',
      flag: 'Would return',
    },
    {
      unit: 'PCU', shift: 'Days', length: '13 weeks', when: 'completed 2024',
      sections: ['Housing: start early', 'Pace: fast', 'Orientation: compact'],
      note: 'San Diego housing was the real puzzle. The facility team was direct and well organized.',
      flag: 'Housing note',
    },
  ],

  relatedJobs: [
    { role: 'ICU RN — Nights', hospital: 'Pacific View Medical Center', city: 'San Diego, CA', weeks: 13, shift: 'Nights', tags: ['Epic'], pay: 2640, start: 'Jul 15' },
    { role: 'PCU RN — Nights', hospital: 'Pacific View Medical Center', city: 'San Diego, CA', weeks: 13, shift: 'Nights', tags: ['Tele'], pay: 2410, start: 'Aug 5' },
    { role: 'ER RN — Days', hospital: 'Pacific View Medical Center', city: 'San Diego, CA', weeks: 12, shift: 'Days', tags: ['Level II'], pay: 2530, start: 'Jul 28' },
  ],
};
