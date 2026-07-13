/* Scrub Society — Erin onboarding · conversation data
   All capture fields map onto the ProfileOnboarding spec (legacy steps 1–4 + step 5).
   Kept declarative so the same data drives the mobile chat, the desktop modal, and the static storyboard. */

window.ERIN = (function () {
  const professions = [
    { v: 'Registered Nurse (RN)', icon: 'stethoscope' },
    { v: 'LPN / LVN', icon: 'heart' },
    { v: 'CNA', icon: 'user' },
    { v: 'Nurse Practitioner', icon: 'stethoscope' },
    { v: 'Allied Health', icon: 'briefcase' },
    { v: 'Other', icon: 'plus' },
  ];

  // Specialty options keyed by profession — mirrors SPECIALTIES in ProfileOnboarding.tsx
  const specialtiesByProfession = {
    'Registered Nurse (RN)': [
      'Medical-Surgical', 'Emergency Room', 'Intensive Care (ICU)', 'Operating Room',
      'Labor & Delivery', 'Pediatrics', 'Oncology', 'Cardiac', 'Psychiatric', 'Home Health',
    ],
    'Nurse Practitioner': [
      'Family Practice', 'Acute Care', 'Psychiatric', 'Emergency', 'Women\u2019s Health',
    ],
    'Allied Health': [
      'Physical Therapist', 'Occupational Therapist', 'Respiratory Therapist',
      'Radiologic Tech', 'Med Lab Tech',
    ],
    'LPN / LVN': ['Long-term Care', 'Rehabilitation', 'Home Health', 'Hospice'],
    'CNA': ['Long-term Care', 'Home Health', 'Hospice', 'Acute Care'],
    'Other': ['Tell Erin in chat'],
  };

  const experience = ['Less than 1 year', '1\u20132 years', '3\u20135 years', '6+ years'];
  const radius = ['Within 50 mi', 'Within 100 mi', 'Within 250 mi', 'Anywhere in the U.S.'];
  const shift = ['Days', 'Mids', 'Nights', 'Rotating', 'Either works'];
  const availability = ['ASAP', 'In 2\u20134 weeks', 'In 1\u20132 months', 'Just exploring'];
  const locationSuggest = ['Denver, CO', 'Los Angeles, CA', 'Phoenix, AZ', 'Use current location'];

  // Ordered capture steps — these seven are the progress segments.
  const steps = [
    { id: 'profession', field: 'profession', type: 'single',
      ask: 'First — what do you do? Tap whatever\u2019s closest; you can fine-tune later.',
      profileField: 'professionSpecialties[].profession (legacy step 1)' },
    { id: 'specialty', field: 'specialties', type: 'multi',
      ask: 'Nice. Which units feel like home? Pick all that fit.',
      profileField: 'professionSpecialties[].specialty (legacy step 2)' },
    { id: 'experience', field: 'years', type: 'single',
      ask: 'How long have you been at it? Helps me match the right level of role.',
      profileField: 'yearsOfExperience (step 5)' },
    { id: 'location', field: 'location', type: 'location',
      ask: 'Where\u2019s home base? I measure travel distance from here.',
      profileField: 'city + state (step 5)' },
    { id: 'radius', field: 'radius', type: 'single',
      ask: 'How far are you willing to roam from {city}?',
      profileField: 'match preference \u00b7 net-new' },
    { id: 'shift', field: 'shift', type: 'single',
      ask: 'Days, nights, or whatever pays best? Your call.',
      profileField: 'match preference \u00b7 net-new' },
    { id: 'availability', field: 'availability', type: 'single',
      ask: 'Last one — when do you want to start?',
      profileField: 'match preference \u00b7 net-new' },
  ];

  const copy = {
    welcomeKicker: 'welcome to the society',
    welcomeHeadline: 'Belong everywhere.',
    welcomeBody:
      'Hi, I\u2019m Erin — your guide here. I\u2019ll ask a handful of quick questions and line up assignments that actually fit. Takes about a minute.',
    welcomeCta: 'Let\u2019s do it',
    welcomeSkip: 'I\u2019ll explore on my own',
    findingLead: 'Give me a sec — cross-checking pay, housing, and {state} license rules\u2026',
    matchIntro:
      'Okay. {n} assignments fit what you told me, sorted by best match. Here\u2019s the strongest one:',
    matchErin:
      'Strong fit — weekly pay beats your target by $340 and housing stipend\u2019s included. Your compact license covers Colorado, so credentialing is light.',
    seeAll: 'See all {n} matches',
    keepChatting: 'Ask Erin a question',
    resultsKicker: 'here\u2019s what i found for you',
  };

  // Canned answers used by the static storyboard + the hero match (kept coherent with SAMPLE_JOBS j1).
  const canned = {
    profession: 'Registered Nurse (RN)',
    specialties: ['Intensive Care (ICU)', 'Emergency Room'],
    years: '3\u20135 years',
    location: 'Denver, CO',
    radius: 'Within 100 mi',
    shift: 'Nights',
    availability: 'In 2\u20134 weeks',
  };

  const matchCount = 12;

  return {
    professions, specialtiesByProfession, experience, radius, shift, availability,
    locationSuggest, steps, copy, canned, matchCount,
  };
})();
