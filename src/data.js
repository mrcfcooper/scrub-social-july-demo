// ─── Scrub Society Social — seeded demo data ────────────────────────────────
// All people, facilities, and content are fictional demo data except the
// named internal personas (swap in PERSONAS below if you want them fictional).
// Content is seeded from the team's social workshop call.

// ─── Photo manifest ──────────────────────────────────────────────────────────
// Semantic key -> filename in src/assets/photos/. PhotoFrame renders the image
// when the file exists (cover-fit, speech-bubble corner) and falls back to the
// flat brand wash when it doesn't — so the demo works before art lands.
// Shot list with generation prompts: see the restyle plan (commit 3 notes).
export const PHOTOS = {
  "job-pacific-view": "job-pacificview.jpg",
  "job-sunrise-regional": "job-sunrise.jpg",
  "job-gulf-coast": "job-gulfcoast.jpg",
  "facility-pacific-view": "facility-pacificview.jpg",
  "diary-sunset-cliffs": "diary-sunsetcliffs.jpg",
  "diary-potluck": "diary-potluck.jpg",
  "diary-dog-beach": "diary-dogbeach.jpg",
  "feed-sunrise-parking": "feed-sunrise-parking.jpg",
  "city-san-diego": "city-sandiego.jpg",
};

export const PERSONAS = {
  traveler: {
    id: "suzie",
    name: "Suzie Marin",
    handle: "@suzie_icu",
    role: "Travel Nurse · ICU",
    initials: "SM",
    color: "#CEDBFE",
    status: "Traveling",
    trust: 96,
    completion: 80,
  },
  recruiter: {
    id: "ashley",
    name: "Ashley H.",
    handle: "@ashley_recruits",
    role: "Recruiter · TravelMed Staffing",
    initials: "AH",
    color: "#82ABF4",
    status: "Booking now",
    trust: 98,
    completion: 100,
  },
  mentor: {
    id: "brandy",
    name: "Brandy P.",
    handle: "@brandy_travelrn",
    role: "Founding Nurse Advisor · 18 yrs RN",
    initials: "BP",
    color: "#421A31",
    status: "Mentoring",
    trust: 99,
    completion: 100,
  },
};

export const ATTRIB = {
  rachel: { who: "Rachel", quote: "My big, big dream… a diary for each assignment." },
  rachelSplit: { who: "Rachel", quote: "I don't want real questions to get lost because a funny meme was in the feed." },
  rachelTop8: { who: "Rachel", quote: "Like MySpace with their top eight, but it can be a recruiter or anything." },
  rachelMadFace: { who: "Rachel", quote: "If you put a mad face, it won't let you fill in the comment box." },
  brandyTesting: { who: "Brandy", quote: "I feel like I'm blindsided by testing at these facilities that no one told me about." },
  brandyMentor: { who: "Brandy", quote: "If they need a mentor, let's put it in their face. Don't make them search for it." },
  brandyMod: { who: "Brandy", quote: "Bam, bam, bam — approve, approve, decline. Automated moderation makes life easy." },
  brandyHistory: { who: "Brandy", quote: "I look at what they've commented… okay, I trust this person a little bit more." },
  ashleyHuman: { who: "Ashley", quote: "Showing that recruiters are real humans too. We're not all jerks behind a computer screen." },
  ashleyReviews: { who: "Ashley", quote: "Giving us an area to get reviews would be really good. A way to post our hottest jobs." },
  ashleyRecs: { who: "Ashley", quote: "Here's Brandy's 5 recommended recruiters, and it links to our profiles." },
  ashleyYeti: { who: "Ashley", quote: "You recommended me 5 people? Here's your Yeti cooler." },
  ashleyAnon: { who: "Ashley", quote: "Allow me to post anonymously too, so I can answer with my real thoughts." },
  jennaBadges: { who: "Jenna", quote: "Badges saying how long they've been traveling, or if they're a pet lover or a dog mom." },
  amberRoommate: { who: "Amber", quote: "An opportunity to find a roommate, or travelers on assignment in your location." },
  amberModRule: { who: "Amber", quote: "The only thing we don't allow is negative with a name attached." },
  jennyPins: { who: "Jenny", quote: "Little digital pins of the places they've traveled — a travel magnet for that state." },
  jennyTrip: { who: "Jenny", quote: "Instead of hotels it's hospitals. TripAdvisor, but for healthcare travelers." },
  jennyComplete: { who: "Jenny", quote: "What is our bare minimum profile? And what badge do we provide for that?" },
  harpsterTrust: { who: "Harpster", quote: "This person is 98% positive — I'm not going to get totally hosed. Confidence within the social graph." },
  harpsterCreeper: { who: "Harpster", quote: "I'd be more of a consumer than a publisher. Just make sure you don't boot me out." },
  harpsterBan: { who: "Harpster", quote: "They could keep the app for jobs, but not participate in the social pieces." },
  harpsterGraph: { who: "Harpster", quote: "All graph databases, Cooper. I need 7 degrees of Brandy." },
  harpsterSelfie: { who: "Harpster", quote: "Prompt someone to take a selfie at their assignment — that's an engagement thing." },
  cooperStructured: { who: "Cooper", quote: "50 terms you can choose from, feelings and emojis — much more managed." },
};

export const FACILITY = {
  id: "pacific-view",
  name: "Pacific View Medical Center",
  city: "San Diego, CA",
  type: "Hospital · Level II Trauma",
  score: 88,
  scoreLabel: "Great for travelers",
  workedHere: 42,
  askable: 11,
  stats: { beds: 420, ratio: "1:2 ICU", parking: "Free structure, 5-min walk", scrubs: "Navy (facility-provided in ICU)" },
  vibe: [
    { k: "Charge nurse support", v: 4.6 },
    { k: "Float policy fairness", v: 3.8 },
    { k: "Orientation quality", v: 4.2 },
    { k: "Traveler friendliness", v: 4.7 },
  ],
  qa: [
    {
      id: "q1",
      q: "Was there any mandatory testing when you arrived? I keep getting blindsided by this.",
      askedBy: "Dana W. · RN, Med/Surg",
      answers: [
        {
          by: "Brandy P.",
          badge: "Founding Nurse Advisor",
          verified: true,
          text: "Yes — day one of orientation there's an EKG rhythm strip test and a med calc test (90 mins, 80% to pass, one retake). Nobody told me either, so I asked the educator and pinned the answer here. Bring your own calculator; phones aren't allowed.",
          helpful: 34,
        },
        {
          by: "Maya C. · ICU Traveler",
          verified: false,
          text: "Can confirm the rhythm strip test. It's fair — nothing exotic, mostly blocks and lethal rhythms.",
          helpful: 12,
        },
      ],
    },
    {
      id: "q2",
      q: "Is the ICU float pool traveler-first? My last contract floated me 6 times in 13 weeks.",
      askedBy: "Anonymous traveler",
      answers: [
        {
          by: "Recruiter · TravelMed",
          anon: true,
          text: "Answering anonymously so I can be straight with you: travelers float first here, but the contract caps it at once per week and never outside your competency. Get the cap in writing on your confirmation page — the facility honors it.",
          helpful: 21,
        },
      ],
    },
    {
      id: "q3",
      q: "Pet-friendly housing within 20 minutes? Traveling with a 60-lb dog.",
      askedBy: "Jordan R. · ER Traveler",
      answers: [
        {
          by: "Suzie Marin",
          text: "Ocean Beach — whole neighborhood is dog people. My complex (Seaside Flats) took my lab with no breed limit. Dog beach is 10 minutes from the unit.",
          helpful: 18,
        },
      ],
    },
  ],
  payReports: [
    { rate: "$3,480/wk", spec: "ICU", agency: "TravelMed", when: "2 wks ago", verified: true },
    { rate: "$3,290/wk", spec: "ER", agency: "MedBridge", when: "1 mo ago", verified: true },
    { rate: "$3,050/wk", spec: "Tele", agency: "Anonymous", when: "1 mo ago", verified: false },
  ],
  insiderNotes: [
    { icon: "car", text: "Badge access to the parking structure takes ~3 days. Use Lot C with your orientation paper until then." },
    { icon: "coffee", text: "Skip the cafeteria coffee. Bluebird Café across the street opens at 5:30 and knows the night shift order." },
    { icon: "clipboard-check", text: "Timekeeping is UKG — submit by Sunday 10pm or your recruiter has to chase payroll." },
  ],
};

export const JOBS = [
  {
    id: "j1",
    title: "ICU RN — Travel",
    facility: "Pacific View Medical Center",
    facilityId: "pacific-view",
    city: "San Diego, CA",
    weekly: "$3,480/wk",
    hourly: "$62/hr",
    shift: "Nights · 3x12",
    start: "Aug 3",
    length: "13 weeks",
    photo: "job-pacific-view",
    social: { workedHere: 42, diaries: 6, score: 88, answeredQs: 11 },
    recruiter: "Ashley H.",
  },
  {
    id: "j2",
    title: "ICU RN — Travel",
    facility: "Sunrise Regional Medical",
    facilityId: null,
    city: "Las Vegas, NV",
    weekly: "$3,600/wk",
    hourly: "$68/hr",
    shift: "Days · 3x12",
    start: "Jul 27",
    length: "13 weeks",
    photo: "job-sunrise-regional",
    social: { workedHere: 27, diaries: 3, score: 91, answeredQs: 7 },
    recruiter: "Maya Collins",
  },
  {
    id: "j3",
    title: "ER RN — Travel",
    facility: "Gulf Coast General",
    facilityId: null,
    city: "Tampa, FL",
    weekly: "$3,120/wk",
    hourly: "$58/hr",
    shift: "Nights · 3x12",
    start: "Aug 10",
    length: "13 weeks",
    photo: "job-gulf-coast",
    social: { workedHere: 19, diaries: 2, score: 84, answeredQs: 4 },
    recruiter: "Ashley H.",
  },
];

export const DIARY = {
  author: "Maya C.",
  authorRole: "ICU Traveler · 9 contracts",
  facility: "Pacific View Medical Center",
  facilityId: "pacific-view",
  city: "San Diego, CA",
  dates: "Feb – May 2026",
  ratings: [
    { k: "Facility", v: 5 },
    { k: "Recruiter (Ashley H.)", v: 5 },
    { k: "Agency (TravelMed)", v: 4 },
    { k: "Housing", v: 4 },
  ],
  photos: [
    { key: "diary-sunset-cliffs", label: "Sunset Cliffs meetup", tone: "#82ABF4" },
    { key: "diary-potluck", label: "Unit potluck, week 6", tone: "#BBAFEF" },
    { key: "diary-dog-beach", label: "Dog beach Sundays", tone: "#CEDBFE" },
  ],
  yelp: [
    { icon: "scissors", k: "Hair", v: "Luna Studio, Hillcrest — ask for Sam, traveler discount" },
    { icon: "utensils", k: "Ate here weekly", v: "Oscar's Mexican Seafood — $12 and unreasonable quality" },
    { icon: "paw-print", k: "Pet friendly", v: "Seaside Flats, no breed limit, 15 min to unit" },
    { icon: "map", k: "Day off", v: "Torrey Pines hike, then La Jolla cove. Do it before June gloom" },
  ],
  entries: [
    { week: "Week 1", text: "Orientation is two days and they actually pay you for both. Rhythm strip test on day one — see my answer on the facility Q&A." },
    { week: "Week 6", text: "Unit potluck. Travelers were invited without it being weird. This ICU treats you like staff, not a rental." },
    { week: "Week 13", text: "Extended? No. Cried at the dog beach? A little. Would come back tomorrow. Five stars." },
  ],
  jobsBelow: ["j1"],
};

export const FEED = {
  questions: [
    {
      id: "p1",
      author: "Destiny H.",
      role: "Nursing Student · Med/Surg",
      community: "ICU Travelers",
      when: "2h",
      text: "Is 2 years of ICU experience really necessary before traveling? I see jobs listed with 1 year minimum. Which is real?",
      reactions: [
        { icon: "thumbs-up", label: "Helpful", n: 4 },
        { icon: "users", label: "Same shift", n: 2 },
      ],
      comments: 6,
      mentorAnswered: true,
    },
    {
      id: "p2",
      author: "Anonymous traveler",
      role: "Verified member",
      community: "Pay Intel",
      when: "5h",
      anon: true,
      text: "Quoted $58/hr for tele at a facility publicly advertising $68/hr. Asked for the breakdown and the number moved. Always ask for the breakdown.",
      reactions: [
        { icon: "dollar", label: "Pay intel", n: 9 },
        { icon: "flag", label: "Red flag", n: 3 },
      ],
      comments: 11,
    },
    {
      id: "p3",
      author: "Tomás R.",
      role: "Staff Nurse · Tele",
      community: "New Travelers",
      when: "8h",
      text: "Staff for 3 years, tele/stepdown. What do I actually need to get ICU-ready before my first contract?",
      reactions: [{ icon: "thumbs-up", label: "Helpful", n: 2 }],
      comments: 4,
    },
  ],
  lounge: [
    {
      id: "p4",
      author: "Sofia M.",
      role: "Travel Nurse · Peds",
      community: "San Diego Travelers",
      when: "1h",
      text: "Assignment selfie challenge: badge, sunrise, 0 patients in the background. Week 4 in San Diego and I get it now.",
      photo: { key: "feed-sunrise-parking", label: "Sunrise over the parking structure", tone: "#82ABF4" },
      reactions: [
        { icon: "heart", label: "Respect", n: 7 },
        { icon: "map-pin", label: "Been there", n: 5 },
      ],
      comments: 3,
      attrib: "harpsterSelfie",
    },
    {
      id: "p5",
      author: "Keisha M.",
      role: "Travel Nurse · NICU",
      community: "Las Vegas Travelers",
      when: "6h",
      text: "The no-state-income-tax difference is real. Same gross, $400/wk more take-home than my Florida contract. Do the math before you sign.",
      reactions: [
        { icon: "dollar", label: "Pay intel", n: 12 },
        { icon: "thumbs-up", label: "Helpful", n: 6 },
      ],
      comments: 8,
    },
  ],
  meetup: {
    title: "San Diego travelers happy hour",
    day: "THU",
    time: "7pm",
    detail: "Ocean Beach Brewery · 14 going",
    sub: "Posted in San Diego Travelers · TravCon crew welcome",
  },
  roommate: {
    title: "Roommate board · San Diego",
    detail: "3 travelers on assignment near Pacific View looking to share housing",
    sub: "2 are dog people. You'd get along.",
  },
  erin: {
    text: "You've got 2 years of ICU and your license is compact. Pacific View in San Diego pays $3,480/wk, 42 Society members have worked there, and 11 questions are already answered — want the inside scoop before you apply?",
    actions: ["Show me the facility intel", "Ask someone who worked there"],
  },
};

export const RECRUITER = {
  name: "Ashley H.",
  agency: "TravelMed Staffing",
  years: 13,
  bio: "I met half my travelers at the very first Gypsy Nurse events. My whole thing is letting people know who I am as a person — here's my family, here's why I'm passionate about this.",
  rating: 4.9,
  reviews: 127,
  booked: 57,
  recommendedBy: ["Brandy P.", "Maya C.", "+4 travelers"],
  reviewsList: [
    { by: "Maya C.", stars: 5, text: "Sat with me for an hour before my first contract and answered all my million questions. My recruiter for life." },
    { by: "Jordan R.", stars: 5, text: "Got my float cap in writing when the facility pushed back. That's the whole job, honestly." },
  ],
  hotJobs: [
    { title: "ICU RN · Pacific View, San Diego", pay: "$3,480/wk", tag: "18 saves this week" },
    { title: "ER RN · Gulf Coast General, Tampa", pay: "$3,120/wk", tag: "Starts Aug 10" },
  ],
  ambassador: { referred: 5, booked: 3, reward: "Yeti cooler", progress: 60 },
};

export const MENTOR = {
  name: "Brandy P.",
  title: "Founding Nurse Advisor",
  years: "18 years RN · 30+ contracts",
  bio: "I mentor new travelers through their first contract. Ask me anything — the only bad question is the one you get blindsided by later.",
  answered: 86,
  helpfulVotes: 1240,
  mentees: 23,
  history: [
    { where: "Pacific View Q&A", text: "Answered: mandatory testing on arrival", when: "2d" },
    { where: "New Travelers", text: "Answered: first contract packing list", when: "4d" },
    { where: "Pay Intel", text: "Commented: how agency margins actually work", when: "1w" },
  ],
  queue: [
    { text: "Facility review · Sunrise Regional · 4/5 'Charge nurses actually help…'", status: "approved" },
    { text: "Comment · auto-rejected · profanity filter", status: "auto" },
    { text: "Pay report · $3,290/wk ER · awaiting verification", status: "pending" },
  ],
};

export const GRAPH = {
  nodes: [
    { id: "you", label: "You", sub: "Suzie Marin", x: 50, y: 320, tone: "#CEDBFE" },
    { id: "ashley", label: "Ashley H.", sub: "Recruiter · booked you, Feb '26", x: 165, y: 200, tone: "#82ABF4" },
    { id: "pv", label: "Pacific View", sub: "Facility · 42 members worked here", x: 175, y: 390, tone: "#F9F2E8" },
    { id: "maya", label: "Maya C.", sub: "Traveler · same unit, spring '26", x: 290, y: 300, tone: "#CEDBFE" },
    { id: "brandy", label: "Brandy P.", sub: "Founding Nurse Advisor", x: 395, y: 180, tone: "#421A31" },
  ],
  edges: [
    ["you", "ashley"],
    ["you", "pv"],
    ["ashley", "maya"],
    ["pv", "maya"],
    ["maya", "brandy"],
    ["ashley", "brandy"],
  ],
  path: ["you", "ashley", "brandy"],
};

export const BADGES = [
  { icon: "paw-print", label: "Dog mom" },
  { icon: "briefcase", label: "18 contracts" },
  { icon: "map", label: "12 states" },
  { icon: "mic", label: "TravCon '25" },
  { icon: "moon", label: "Night shift" },
];

export const PINS = ["CA", "TX", "FL", "AZ", "NV", "WA", "CO", "TN", "NC", "OR", "NM", "UT"];

export const TOP8 = [
  { k: "Recruiter", v: "Ashley H.", icon: "star" },
  { k: "City", v: "San Diego", icon: "map-pin" },
  { k: "Facility", v: "Pacific View", icon: "building" },
  { k: "Travel friend", v: "Maya C.", icon: "heart" },
  { k: "Coffee", v: "Bluebird Café", icon: "coffee" },
  { k: "Mentor", v: "Brandy P.", icon: "compass" },
  { k: "Agency", v: "TravelMed", icon: "briefcase" },
  { k: "Beach", v: "Ocean Beach", icon: "paw-print" },
];

// The complete reference list: every attribution in the demo, grouped by
// asker, with where to see it built. The Guide renders these as full quotes.
export const GUIDE = [
  { who: "Rachel", items: [
    { id: "rachel", see: "Diary tab", route: "/diary" },
    { id: "rachelSplit", see: "Feed → Questions / Lounge tabs", route: "/" },
    { id: "rachelMadFace", see: "Facility → Write a review", route: "/facility/pacific-view" },
    { id: "rachelTop8", see: "Profile → My top 8", route: "/profile" },
  ]},
  { who: "Brandy", items: [
    { id: "brandyTesting", see: "Facility Q&A, first question", route: "/facility/pacific-view" },
    { id: "brandyMentor", see: "The Get-a-mentor button, every screen", route: "/mentor" },
    { id: "brandyMod", see: "Mentor → Moderation queue", route: "/mentor" },
    { id: "brandyHistory", see: "Mentor → Contribution history", route: "/mentor" },
  ]},
  { who: "Ashley", items: [
    { id: "ashleyHuman", see: "Switch persona → Ashley", route: "/recruiter" },
    { id: "ashleyReviews", see: "Recruiter → Reviews + hottest jobs", route: "/recruiter" },
    { id: "ashleyRecs", see: "Recruiter → Recommended by", route: "/recruiter" },
    { id: "ashleyAnon", see: "Recruiter → Answer as anonymous + Facility Q&A", route: "/recruiter" },
    { id: "ashleyYeti", see: "Recruiter → Ambassador rewards", route: "/recruiter" },
  ]},
  { who: "Jenna", items: [
    { id: "jennaBadges", see: "Profile → Badges", route: "/profile" },
  ]},
  { who: "Amber", items: [
    { id: "amberRoommate", see: "Feed → Roommate board", route: "/" },
    { id: "amberModRule", see: "Facility → Write a review", route: "/facility/pacific-view" },
  ]},
  { who: "Jenny", items: [
    { id: "jennyTrip", see: "Job detail → What the Society knows", route: "/jobs/j1" },
    { id: "jennyPins", see: "Profile → Where I've been", route: "/profile" },
    { id: "jennyComplete", see: "Profile → Profile strength", route: "/profile" },
  ]},
  { who: "Harpster", items: [
    { id: "harpsterTrust", see: "Profile → trust chips", route: "/profile" },
    { id: "harpsterCreeper", see: "Profile → consumer mode", route: "/profile" },
    { id: "harpsterBan", see: "Mentor → Ban from social", route: "/mentor" },
    { id: "harpsterGraph", see: "Graph tab", route: "/graph" },
    { id: "harpsterSelfie", see: "Feed → The lounge, selfie challenge", route: "/" },
  ]},
  { who: "Cooper", items: [
    { id: "cooperStructured", see: "Diary → Log this assignment + review composer", route: "/diary" },
  ]},
];
