// Shared sample results for the Jobs list rebuild.
// Mirrors the shape the live JobCard consumes (role, facility, location, shift, pay, tags).
const JOBS_DATA = [
  { id: 'j1', role: 'ICU travel RN',     hospital: 'HCA Presbyterian',    city: 'Denver, CO',      start: 'mar 24', weeks: 13, shift: 'Nights · 3×12',  pay: 2840, tags: ['Housing stipend', 'Weekly pay'],  agency: 'Aya',               specialty: 'ICU',     verified: true,  compact: true },
  { id: 'j2', role: 'L&D travel RN',     hospital: 'Cedars-Sinai',        city: 'Los Angeles, CA', start: 'apr 7',  weeks: 13, shift: 'Days · 3×12',    pay: 3120, tags: ['Premium pay', 'Rapid hire'],     agency: 'Cross Country',     specialty: 'L&D',     verified: true,  compact: false },
  { id: 'j3', role: 'MedSurg travel RN', hospital: 'Mass General',        city: 'Boston, MA',      start: 'mar 31', weeks: 8,  shift: 'Rotating',       pay: 2410, tags: ['Short contract'],                agency: 'Aureus',            specialty: 'MedSurg', verified: false, compact: true },
  { id: 'j4', role: 'ER travel RN',      hospital: 'Sentara Norfolk',     city: 'Norfolk, VA',     start: 'apr 14', weeks: 13, shift: 'Nights · 3×12',  pay: 2680, tags: ['Coastal', 'Weekly pay'],         agency: 'Medical Solutions', specialty: 'ER',      verified: true,  compact: false },
  { id: 'j5', role: 'PCU travel RN',     hospital: 'Banner Desert',       city: 'Mesa, AZ',        start: 'apr 21', weeks: 13, shift: 'Days · 3×12',    pay: 2530, tags: ['Sunbelt', 'Extension likely'],   agency: 'TaleMed',           specialty: 'PCU',     verified: false, compact: true },
  { id: 'j6', role: 'OR travel RN',      hospital: 'UW Medical Center',   city: 'Seattle, WA',     start: 'may 5',  weeks: 13, shift: 'Days · 4×10',    pay: 3015, tags: ['Level I trauma', 'Premium pay'],  agency: 'Trustaff',          specialty: 'OR',      verified: true,  compact: false },
];

const initials = (name) => name.split(' ').map((w) => w[0]).slice(0, 2).join('');

Object.assign(window, { JOBS_DATA, initials });
