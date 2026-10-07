// Shared site content: contact details, navigation, imagery and program data.

export const site = {
  name: "Illchamus Community CBO",
  shortName: "ICDO",
  tagline: "Preserving culture. Empowering community.",
  location: "Baringo County, Kenya",
  phone: "+254 720 058 540",
  phoneHref: "tel:+254720058540",
  whatsapp: "https://wa.me/254720058540",
  email: "illchamus@gmail.com",
  hours: "Mon – Fri, 8AM – 5PM EAT",
  socials: [
    { label: "Facebook", icon: "mdi:facebook", href: "https://facebook.com/" },
    { label: "Instagram", icon: "mdi:instagram", href: "https://instagram.com/" },
    { label: "X", icon: "mdi:twitter", href: "https://x.com/" },
    { label: "YouTube", icon: "mdi:youtube", href: "https://youtube.com/" },
  ],
};

export const navLinks = [
  { to: "/about", label: "About Us" },
  { to: "/#programs", label: "Programs" },
  { to: "/gallery", label: "Gallery" },
  { to: "/blog", label: "News & Stories" },
  { to: "/donate", label: "Ways to Give" },
  { to: "/contact", label: "Contact" },
];

export const utilityLinks = [
  { to: "/contact", label: "Volunteer", icon: "heroicons:hand-raised" },
  { to: "/contact", label: "Partner With Us", icon: "heroicons:user-group" },
  { to: "/products", label: "Shop", icon: "heroicons:shopping-bag" },
];

/** Build a sized Unsplash URL from a photo id. */
export const img = (id: string, w = 1200, h?: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ""}&q=75`;

// Photo ids checked to load and to suit the content. Swap these for the
// organisation's own photography when it is available.
export const photos = {
  children: "1509099836639-18ba1795216d",
  classroom: "1567057419565-4349c49d8a04",
  learner: "1529390079861-591de354faf5",
  woman: "1531123897727-8f129e1688ce",
  man: "1531384441138-2736e62e0919",
  portrait: "1566492031773-4f4e44671857",
  youthTech: "1531482615713-2afd69097998",
  savanna: "1489392191049-fc10c97e64b6",
  acacia: "1516026672322-bc52d61a55d5",
  acaciaDusk: "1547471080-7cc2caa01a7e",
  safari: "1516426122078-c23e76319801",
  roller: "1535083783855-76ae62b2914e",
  giraffe: "1523805009345-7448845a9e53",
  elephant: "1535941339077-2dd1c7963098",
  soil: "1542601906990-b4d3fb778b09",
  hands: "1531206715517-5c0ba140b2b8",
  care: "1584515933487-779824d29309",
  giving: "1532629345422-7515f3d16bb6",
  heart: "1469571486292-0ba58a3f068b",
};

export const impactStats = [
  { value: 5000, suffix: "+", label: "Lives impacted across Baringo County" },
  { value: 350, suffix: "+", label: "Students supported with school essentials" },
  { value: 12, suffix: "", label: "Villages and settlements reached" },
  { value: 250, prefix: "$", suffix: "K+", label: "Invested in community programs" },
];

export interface Program {
  id: string;
  title: string;
  category: string;
  icon: string;
  tone: "sun" | "lake" | "leaf" | "maroon";
  photo: string;
  summary: string;
  description: string;
  participants: string;
  duration: string;
  impact: string;
}

export const programs: Program[] = [
  {
    id: "education",
    title: "Scholarships & Mentorship",
    category: "Education",
    icon: "heroicons:academic-cap",
    tone: "sun",
    photo: photos.classroom,
    summary: "School fees, supplies and mentors so every child can learn.",
    description:
      "We provide scholarships, school supplies and one-to-one mentorship so every child has access to quality education. Mentors walk with learners through exams, career choices and the move into further study.",
    participants: "350+",
    duration: "Ongoing",
    impact: "95% stay in school",
  },
  {
    id: "health",
    title: "Community Health",
    category: "Health",
    icon: "heroicons:heart",
    tone: "lake",
    photo: photos.care,
    summary: "Mobile clinics and health education for remote families.",
    description:
      "Our Community Health Initiative brings essential care to remote areas through mobile clinics, health education and referrals. We focus on maternal health, child nutrition and disease prevention.",
    participants: "500+",
    duration: "Ongoing",
    impact: "2,000+ lives improved",
  },
  {
    id: "culture",
    title: "Cultural Heritage",
    category: "Culture",
    icon: "heroicons:sparkles",
    tone: "maroon",
    photo: photos.acaciaDusk,
    summary: "Music, dance, language and storytelling, passed on.",
    description:
      "Our annual Cultural Heritage Festival celebrates Illchamus traditions with music, dance, art and storytelling, bringing together every generation to preserve and share our heritage.",
    participants: "800+",
    duration: "3-day festival",
    impact: "Every generation together",
  },
  {
    id: "youth",
    title: "Youth & Digital Skills",
    category: "Youth",
    icon: "heroicons:computer-desktop",
    tone: "lake",
    photo: photos.youthTech,
    summary: "Computer literacy and leadership for young people.",
    description:
      "Young people aged 15–25 are paired with experienced community members for guidance and skills. Workshops cover computer literacy, leadership and career readiness.",
    participants: "150+",
    duration: "6 months",
    impact: "Leaders in every village",
  },
  {
    id: "livelihoods",
    title: "Women & Livelihoods",
    category: "Economic",
    icon: "heroicons:banknotes",
    tone: "leaf",
    photo: photos.woman,
    summary: "Training, savings groups and micro-finance for women.",
    description:
      "We support women and local entrepreneurs with business training, savings groups, micro-financing, market connections and mentorship so families can build sustainable livelihoods.",
    participants: "200+",
    duration: "12 months",
    impact: "150+ businesses started",
  },
  {
    id: "environment",
    title: "Lake Baringo Conservation",
    category: "Environment",
    icon: "heroicons:globe-europe-africa",
    tone: "leaf",
    photo: photos.roller,
    summary: "Protecting the lake, its birds and the land we share.",
    description:
      "We protect Lake Baringo and its ecosystems through clean-ups, education on sustainable practices and work with local authorities on conservation measures.",
    participants: "300+",
    duration: "Ongoing",
    impact: "Healthier shared land",
  },
];

export const testimonials = [
  {
    quote:
      "I joined the mentorship program as a quiet 16-year-old with big dreams. Today I lead a youth group of thirty and we have organised three community clean-ups.",
    name: "Sarah Mwangi",
    role: "Youth Mentorship graduate",
  },
  {
    quote:
      "In a single month the mobile clinic saw more than 200 patients who would otherwise have travelled over 50 km for care.",
    name: "Dr. James Kiprotich",
    role: "Community Health partner",
  },
  {
    quote:
      "Over 800 of us came together for the heritage festival. Our children heard the songs and stories that make us who we are.",
    name: "Elder John Kipchoge",
    role: "Cultural Heritage council",
  },
];

export const toneClasses: Record<Program["tone"], string> = {
  sun: "bg-sun-soft text-maroon",
  lake: "bg-lake-soft text-[#24647c]",
  leaf: "bg-leaf-soft text-leaf",
  maroon: "bg-[#f4e3e0] text-maroon",
};
