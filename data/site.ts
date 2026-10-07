// Shared structural site data: contact details, navigation, imagery and program
// metadata. All wording lives in locales/en.ts and locales/sw.ts.

export const site = {
  name: "Illchamus Community CBO",
  shortName: "ICDO",
  phone: "+254 720 058 540",
  phoneHref: "tel:+254720058540",
  whatsapp: "https://wa.me/254720058540",
  email: "illchamus@gmail.com",
  socials: [
    { label: "Facebook", icon: "mdi:facebook", href: "https://facebook.com/" },
    { label: "Instagram", icon: "mdi:instagram", href: "https://instagram.com/" },
    { label: "X", icon: "mdi:twitter", href: "https://x.com/" },
    { label: "YouTube", icon: "mdi:youtube", href: "https://youtube.com/" },
  ],
};

/** Policy pages show this as their "last updated" date (YYYY-MM-DD). Change it when the text changes. */
export const POLICIES_UPDATED = "2026-10-07";

type NavKey = "about" | "programs" | "events" | "gallery" | "news" | "contact";

export const navLinks: { to: string; key: NavKey }[] = [
  { to: "/about", key: "about" },
  { to: "/#programs", key: "programs" },
  { to: "/events", key: "events" },
  { to: "/gallery", key: "gallery" },
  { to: "/blog", key: "news" },
  { to: "/contact", key: "contact" },
];

export const utilityLinks: { to: string; key: "volunteer" | "partner" | "shop"; icon: string }[] = [
  { to: "/contact", key: "volunteer", icon: "heroicons:hand-raised" },
  { to: "/contact", key: "partner", icon: "heroicons:user-group" },
  { to: "/products", key: "shop", icon: "heroicons:shopping-bag" },
];

/** Unsplash photo ids. Pass to <Photo :id> (or img() for a plain URL). */
export const photos = {
  children: "1509099836639-18ba1795216d",
  classroom: "1567057419565-4349c49d8a04",
  learner: "1529390079861-591de354faf5",
  woman: "1531123897727-8f129e1688ce",
  portrait: "1566492031773-4f4e44671857",
  youthTech: "1531482615713-2afd69097998",
  savanna: "1489392191049-fc10c97e64b6",
  acacia: "1516026672322-bc52d61a55d5",
  acaciaDusk: "1547471080-7cc2caa01a7e",
  roller: "1535083783855-76ae62b2914e",
  giraffe: "1523805009345-7448845a9e53",
  elephant: "1535941339077-2dd1c7963098",
  soil: "1542601906990-b4d3fb778b09",
  hands: "1531206715517-5c0ba140b2b8",
  care: "1584515933487-779824d29309",
  giving: "1532629345422-7515f3d16bb6",
};

/** The organisation's own photo (a still from the community video). */
export const GATHERING = "/images/community-gathering.jpg";

/** Freely licensed photos of Lake Baringo and our program work (credits in data/credits.ts). */
export const baringo = {
  hippo: "/images/baringo/hippo.jpg",
  crocodile: "/images/baringo/crocodile.jpg",
  fisherman: "/images/baringo/fisherman.jpg",
  tilapia: "/images/baringo/tilapia.jpg",
  sunsetBoat: "/images/baringo/lake-sunset-boat.jpg",
  sunrise: "/images/baringo/lake-sunrise.jpg",
  deadTree: "/images/baringo/lake-dead-tree.jpg",
  beekeeping: "/images/baringo/beekeeping.jpg",
  beehives: "/images/baringo/beehives.jpg",
  kitchenGarden: "/images/baringo/kitchen-garden.jpg",
  farmerTraining: "/images/baringo/farmer-training.jpg",
};

/** Plain sized Unsplash URL, for places that need a string (e.g. share images). */
export const img = (id: string, w = 1200, h?: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ""}&q=75`;

export const impactStats = [
  { value: 5000, suffix: "+" },
  { value: 350, suffix: "+" },
  { value: 12, suffix: "" },
  { value: 250, prefix: "$", suffix: "K+" },
];

export type ProgramId = "education" | "health" | "culture" | "youth" | "livelihoods" | "environment";
export type Tone = "sun" | "lake" | "leaf" | "maroon";

/** Each program has an Unsplash `photo` id or a local `src` image. */
export const programs: { id: ProgramId; icon: string; tone: Tone; photo?: string; src?: string; participants: string }[] = [
  { id: "education", icon: "heroicons:academic-cap", tone: "sun", photo: photos.classroom, participants: "350+" },
  { id: "health", icon: "heroicons:heart", tone: "lake", photo: photos.care, participants: "500+" },
  { id: "culture", icon: "heroicons:sparkles", tone: "maroon", src: GATHERING, participants: "800+" },
  { id: "youth", icon: "heroicons:wrench-screwdriver", tone: "lake", src: baringo.farmerTraining, participants: "150+" },
  { id: "livelihoods", icon: "heroicons:sun", tone: "leaf", src: baringo.beehives, participants: "200+" },
  { id: "environment", icon: "heroicons:globe-europe-africa", tone: "leaf", src: baringo.sunsetBoat, participants: "300+" },
];

/** Names stay the same in every language; quotes and roles are in the locale files. */
export const testimonialNames = ["Sarah Mwangi", "Dr. James Kiprotich", "Elder John Kipchoge"];

export const toneClasses: Record<Tone, string> = {
  sun: "bg-sun-soft text-maroon",
  lake: "bg-lake-soft text-[#24647c]",
  leaf: "bg-leaf-soft text-leaf",
  maroon: "bg-[#f4e3e0] text-maroon",
};
