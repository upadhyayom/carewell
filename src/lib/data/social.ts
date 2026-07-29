/* ------------------------------------------------------------------ */
/* CareWell Dental Clinic — social media content calendar mock data        */
/* ------------------------------------------------------------------ */

import type { SocialPlatform, SocialPost } from "@/lib/data/types";
import { seeded } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Festival calendar with campaign ideas (Aug 2026 – Jan 2027)         */
/* ------------------------------------------------------------------ */

export const festivals: { date: string; name: string; idea: string }[] = [
  {
    date: "2026-08-28",
    name: "Raksha Bandhan",
    idea: "'Protect the smile you love' — sibling duo check-up offer: book together, second consultation free. Reel of a sister tying rakhi on her brother, cut to both in the chair getting matching clean-ups.",
  },
  {
    date: "2026-09-14",
    name: "Ganesh Chaturthi",
    idea: "Modak season = sugar season. Carousel: 'Enjoy the modaks, skip the cavities' — 5 post-sweet care tips, ending with a festive-week scaling offer at ₹999.",
  },
  {
    date: "2026-10-11",
    name: "Navratri",
    idea: "9 nights, 9 smile habits — one story per night matching each day's colour, from oil pulling myths to flossing technique. Garba-ready smile whitening slot bookings open.",
  },
  {
    date: "2026-10-29",
    name: "Karva Chauth",
    idea: "'The moon isn't the only thing worth looking at tonight' — couples' whitening package. Post: mehndi-hands holding a chaand-shaped mirror, teeth doing the shining.",
  },
  {
    date: "2026-11-08",
    name: "Diwali",
    idea: "Flagship campaign: 'Is baar Diwali, dil khol ke muskurao' — smile makeover consult camp all week, mithai survival guide reel, and team diya-lighting behind-the-scenes for trust-building.",
  },
  {
    date: "2026-11-14",
    name: "Children's Day",
    idea: "Free kids' dental check-up camp (ages 3–14) with 'My First Dental Visit' photo frame and bravery certificates. Parents post the certificate, tagging the clinic — built-in UGC loop.",
  },
  {
    date: "2026-12-25",
    name: "Christmas",
    idea: "'All I want for Christmas is... straight teeth' — aligner consult offer with Santa-cap team photo post, plus a candy-cane vs teeth myth-buster short.",
  },
  {
    date: "2027-01-01",
    name: "New Year",
    idea: "'New Year, New Smile' resolution campaign — 12-month smile plan giveaway, January whitening + scaling combo, and a poll story: which smile resolution are you picking?",
  },
];

/* ------------------------------------------------------------------ */
/* Content pillars                                                     */
/* ------------------------------------------------------------------ */

export const contentPillars: { name: SocialPost["pillar"]; share: number; color: string }[] = [
  { name: "Educational", share: 30, color: "#0ea5e9" },
  { name: "Testimonial", share: 20, color: "#22c55e" },
  { name: "Awareness", share: 15, color: "#8b5cf6" },
  { name: "Offer", share: 15, color: "#f59e0b" },
  { name: "Behind the Scenes", share: 10, color: "#ec4899" },
  { name: "Festival", share: 10, color: "#ef4444" },
];

/* ------------------------------------------------------------------ */
/* 8 ready-to-post AI templates                                        */
/* ------------------------------------------------------------------ */

export interface AiTemplate {
  type: string;
  title: string;
  caption: string;
  hashtags: string[];
  cta: string;
  imagePrompt: string;
  videoScript?: string;
}

export const aiTemplates: AiTemplate[] = [
  {
    type: "Reel — Testimonial",
    title: "Implant testimonial reel: 'Papa eats makki di roti again'",
    caption:
      "6 months ago, Mr. Yadav (68) couldn't bite into an apple. His dentures moved every time he laughed.\n\nToday? Fixed teeth in 3 days with All-on-4 implants — and at his daughter's wedding, he ate everything on the menu. 🌽\n\nDr. Smriti Sharma has placed 1,200+ implants at CareWell. Every case starts the same way: an honest CBCT scan and a written, itemised plan. No surprises, ever.\n\nMissing teeth are not a life sentence. Ask us how.",
    hashtags: ["#DentalImplants", "#AllOn4", "#DwarkaDentist", "#SmileRestored", "#CareWellDental", "#ImplantsIndia", "#SeniorCare"],
    cta: "DM 'IMPLANT' for a free CBCT consultation this week → link in bio",
    imagePrompt:
      "Warm documentary-style photo of a smiling Indian senior man in a cream kurta biting into a corn roti at a family dinner table, daughter laughing beside him, soft golden-hour lighting, shallow depth of field, joyful and dignified mood",
    videoScript:
      "HOOK (0–3s): Close-up of loose denture in a glass — 'For 6 years, his teeth slept in a glass.'\nBEAT 2 (3–10s): B-roll of Mr. Yadav walking into CareWell, quick cut of CBCT scan on screen. VO: 'One scan. One honest plan. Three days.'\nBEAT 3 (10–20s): Surgery-day montage (sterile pouches, Dr. Mehta gloving up, thumbs-up post-op). Text overlay: 'All-on-4 • Fixed teeth in 3 days'.\nBEAT 4 (20–28s): The payoff — wedding footage, him eating, family cheering. VO (his voice): 'Ab main sab kuch khaata hoon.'\nCTA (28–32s): Dr. Mehta to camera: 'Missing teeth? Come talk to us first.' End card: DM 'IMPLANT' / clinic logo.",
  },
  {
    type: "Carousel — Testimonial",
    title: "Braces journey carousel: 22 months of Manpreet's smile",
    caption:
      "Swipe to watch 22 months happen in 8 slides. ➡️\n\nManpreet came to us hiding his smile in every photo. Ceramic braces, monthly adjustments, zero missed appointments (we checked 😄) — and last month, we removed the braces.\n\nSlide 8 is his debonding-day face. That expression is why we do this.\n\nEvery smile journey at CareWell is photographed at each stage, so you always see your own progress — not stock photos.",
    hashtags: ["#BracesJourney", "#BeforeAndAfter", "#CeramicBraces", "#Orthodontist", "#DwarkaSmiles", "#CareWellDental", "#SmileTransformation"],
    cta: "Ready to start yours? Book a ₹0 ortho consult — link in bio",
    imagePrompt:
      "8-slide carousel: consistent front-facing close-up smile photos of a young Sikh man in a turban, same angle and lighting, showing orthodontic progress month 0, 3, 6, 9, 12, 16, 20, and final debonded smile with a wide genuine grin, clean white clinic background, subtle month label in corner of each slide",
  },
  {
    type: "Post — Offer",
    title: "Teeth whitening offer: 'Shaadi season starts in the mirror'",
    caption:
      "Wedding guest? Bride? Groom? The camera will find you. 📸\n\nThis month at CareWell: professional in-clinic teeth whitening at ₹7,999 (regular ₹12,000) — includes polish, shade photo before/after, and a take-home touch-up pen.\n\n✅ 60–90 minutes, done in one sitting\n✅ Gum-protected, dentist-supervised — not a salon shortcut\n✅ Up to 4 shades brighter, visible immediately\n\nSlots are limited to 4 per day because a doctor does every session. First come, first brighter.",
    hashtags: ["#TeethWhitening", "#ShaadiSeason", "#WeddingReady", "#DwarkaOffers", "#SmileBright", "#CareWellDental"],
    cta: "WhatsApp 'WHITE' to 98XXX-XXXXX to grab a slot before they're gone",
    imagePrompt:
      "Elegant flat-lay of Indian wedding invitation card, jasmine flowers and a hand mirror reflecting a bright white smile, marigold accents, warm festive tones, premium minimal aesthetic with text space at top",
  },
  {
    type: "Post — Educational (Kids)",
    title: "Kids dentistry: 'The 6-year molar nobody notices'",
    caption:
      "Parent quiz: your child's first PERMANENT tooth arrives at age 6 — behind all the milk teeth, without any tooth falling out first. 🦷\n\nMost parents miss it completely. And because it looks 'new', it's often the first tooth to get a cavity.\n\nThe fix is beautifully simple: a pit & fissure sealant. Painless, 10 minutes, no drilling — a protective coat over the grooves where 80% of kids' cavities start. At CareWell it costs less than two pizzas and protects for years.\n\nCheck tonight: count your child's teeth. If you find a bigger one hiding at the back, that's the one to protect.",
    hashtags: ["#KidsDentistry", "#ParentingTips", "#CavityFree", "#DentalSealants", "#PediatricDentist", "#DwarkaParents", "#CareWellDental"],
    cta: "Book a 15-min kids' check-up — happy visits always free for under-5s",
    imagePrompt:
      "Bright cheerful illustration-style image of a curious Indian child aged 6 looking into a hand mirror at their back teeth, mother pointing, friendly tooth character mascot waving from the corner, soft pastel clinic colours, playful educational vibe",
  },
  {
    type: "Post — Festival",
    title: "Diwali post: 'Mithai survival guide for your teeth'",
    caption:
      "Diwali diet: kaju katli for breakfast, soan papdi you didn't ask for, and 'bas ek aur' gulab jamun. We're not here to stop you. 🪔\n\nWe're here with the Mithai Survival Guide:\n\n1️⃣ Eat sweets WITH meals, not between them — saliva is your free mouthwash\n2️⃣ Sticky sweets (chikki, soan papdi) cling longest — rinse after\n3️⃣ Wait 30 mins after sweets before brushing\n4️⃣ Water > soft drinks between rounds of taash\n5️⃣ The morning-after scaling: ₹999 all festive week\n\nHappy Diwali from Dr. Mehta, Dr. Kapoor and the whole CareWell family. May your homes glow — and your smiles too. ✨",
    hashtags: ["#Diwali2026", "#HappyDiwali", "#MithaiSeason", "#DentalTips", "#FestiveSmile", "#DwarkaDiwali", "#CareWellDental"],
    cta: "Book the post-Diwali clean-up: ₹999 festive scaling, all week",
    imagePrompt:
      "Festive flat-lay of assorted Indian sweets (kaju katli, laddoo, gulab jamun) beside diyas and marigolds, with a toothbrush placed playfully among them like a hero, rich warm Diwali lighting, deep orange and gold palette, tasteful and premium",
  },
  {
    type: "Reel — Educational",
    title: "Myth-buster reel: 'Root canals hurt' — says who?",
    caption:
      "The myth refuses to die, so we filmed the truth. 🎬\n\nWe asked 5 real patients ONE question right after their root canal: 'Scale of 1–10, how much did that hurt?'\n\nTheir answers are in the reel. (Spoiler: the highest was a 2, and she meant the injection.)\n\nThe pain everyone fears is the TOOTHACHE BEFORE treatment. The root canal is what ends it. Modern anaesthesia + rotary tools = a long filling, nothing more.\n\nStill scared? Read the comments. Your future self with the saved tooth says thanks.",
    hashtags: ["#RootCanal", "#DentalMyths", "#MythBusted", "#PainlessDentistry", "#ToothacheRelief", "#CareWellDental", "#DwarkaDentist"],
    cta: "Toothache keeping you up? Same-day RCT slots — call now",
    imagePrompt:
      "Split-screen thumbnail: left side a worried man holding his jaw in dramatic red lighting labelled 'THE MYTH', right side the same man relaxed in a dental chair giving thumbs up in bright clean lighting labelled 'THE REALITY', bold text '1–10, how much did it hurt?'",
    videoScript:
      "HOOK (0–3s): Fast cuts of 5 patients, each about to answer. Text: 'We asked right after their root canal…'\nBEAT 2 (3–15s): Each patient answers to camera: '1'... 'honestly? 2'... 'I fell asleep, does that count?'... 'zero, the wait was worse'... '2, but only the injection'.\nBEAT 3 (15–24s): Dr. Kapoor to camera: 'The pain you're afraid of is the toothache BEFORE. The root canal is the cure, not the punishment.'\nBEAT 4 (24–30s): B-roll of rotary instrument, apex locator screen. Text overlay: '45–75 mins • usually one visit'.\nCTA (30–34s): 'Night-time toothache? We keep emergency slots daily.' End card + logo.",
  },
  {
    type: "Story — Behind the Scenes",
    title: "BTS story: 'What happens to instruments after your visit'",
    caption:
      "You never see this part, so we're showing you. 👀\n\nEvery single instrument at CareWell goes through 4 steps after EVERY patient: scrub → ultrasonic bath → sealed pouch → autoclave at 134°C. The pouch is opened in front of you, at the chair.\n\nTap through today's story to follow one mouth mirror through the whole journey — including the colour-change sterilisation indicator that proves the cycle worked.\n\nAsk to see our autoclave log any time. Seriously. We're proud of it.",
    hashtags: ["#BehindTheScenes", "#Sterilization", "#PatientSafety", "#DentalHygiene", "#CleanClinic", "#CareWellDental"],
    cta: "Sticker poll: 'Did you know clinics log every autoclave cycle?' Yes / TIL 🤯",
    imagePrompt:
      "Vertical story-format photo series: gloved hands scrubbing dental instruments at a steel sink, instruments in an ultrasonic cleaner with visible ripples, sealed sterilisation pouches with colour indicators, a modern autoclave with digital display reading 134°C, clinical bright lighting, documentary authenticity",
  },
  {
    type: "Story — Educational",
    title: "Aligner FAQ story: 'Ask us anything about invisible braces'",
    caption:
      "You asked (a LOT), we answered. Today's story = rapid-fire aligner FAQ with Dr. Anuj. 🎯\n\nQ1: Can anyone get aligners? — 'Mild to moderate cases, yes. Severe bites still need braces. The scan decides, not the trend.'\nQ2: Do they really work 22 hrs/day? — 'They work AS MUCH as you wear them. 22 hours is the deal.'\nQ3: Chai with trays on? — 'Nahi. Hot drinks warp trays and stain them. Trays out, chai in.'\nQ4: Cost? — '₹80K–₹2.2L depending on your case. EMI from ₹4,000/month.'\nQ5: How long? — 'Most cases: 8–18 months. You see the projected result on screen BEFORE paying.'\n\nQuestion box is open for round 2. 👇",
    hashtags: ["#ClearAligners", "#InvisibleBraces", "#AlignerFAQ", "#Orthodontics", "#StraightTeeth", "#DwarkaDentist", "#CareWellDental"],
    cta: "Drop your aligner question in the box — Dr. Kapoor answers tonight, 9 pm",
    imagePrompt:
      "Vertical story frame: friendly Indian male dentist in navy scrubs holding a clear aligner tray up to the camera, clean bright clinic background, bold question sticker graphics floating around, approachable expert energy",
  },
];

/* ------------------------------------------------------------------ */
/* 100-post content calendar (Jun–Aug 2026)                            */
/* ------------------------------------------------------------------ */

const titlePools: Record<SocialPost["pillar"], string[]> = {
  Educational: [
    "Monday Myth: Root canals hurt",
    "60-second guide: brushing you were never taught",
    "Why your gums bleed (and why that's not 'normal')",
    "Chai, coffee & your enamel — the honest ranking",
    "The 6-year molar every parent misses",
    "Sensitive teeth? Here's what's actually happening",
    "Wisdom tooth 101: remove or keep?",
    "Flossing vs interdental brushes — which wins?",
    "What a cavity looks like on X-ray vs in the mirror",
    "Mouthwash: helpful habit or marketing?",
  ],
  Testimonial: [
    "Patient story — Sneha's aligner journey",
    "Papa eats makki di roti again: Mr. Yadav's All-on-4",
    "22 months, 8 photos: Manpreet's braces glow-up",
    "'I fell asleep during my root canal' — Smriti's review",
    "From hiding her smile to wedding photos: Lakshmi's veneers",
    "5 patients rate their RCT pain 1–10",
    "Google review spotlight: this week's favourite",
    "A diabetic patient's gum turnaround story",
  ],
  Festival: [
    "Raksha Bandhan: protect the smile you love",
    "Modak season survival guide",
    "Navratri night 3: today's smile habit",
    "Karva Chauth couples' whitening reveal",
    "Diwali mithai survival guide",
    "Children's Day free check-up camp announcement",
    "Independence Day: freedom from tooth pain",
    "Teej special: bright smiles, brighter mehndi",
  ],
  Offer: [
    "₹999 festive scaling — this week only",
    "Shaadi-season whitening at ₹7,999",
    "Free ortho consult month for teens",
    "Implant camp: free CBCT with consultation",
    "Kids' sealant combo: 4 molars protected",
    "Couple whitening package launch",
    "Monsoon check-up offer: consult + X-ray ₹299",
    "EMI announcement: smile now, pay monthly",
  ],
  "Behind the Scenes": [
    "What happens to instruments after your visit",
    "Morning huddle: how we plan your day",
    "Meet Priya — the voice on our phone",
    "Unboxing: new intraoral scanner arrives",
    "How we sterilise: follow one mirror's journey",
    "Dr. Mehta's implant OT setup, step by step",
    "The lab visit: where your crown is born",
    "Team lunch: dentists eat sweets too",
  ],
  Awareness: [
    "Oral cancer: the 2-minute self-check",
    "Diabetes & gums: the loop nobody talks about",
    "Tobacco and your mouth — an honest look",
    "Pregnancy dental care: safe, needed, ignored",
    "World Smile Day: share your smile story",
    "Kids' screen time & teeth grinding link",
    "Why Indians lose more teeth to gums than cavities",
    "Sports guards: the ₹2,000 tooth insurance",
  ],
};

const captionSnippets = [
  "Full story in today's post — save it for later.",
  "Tag someone who needs to see this.",
  "Book via the link in bio or WhatsApp us.",
  "Watch till the end — the last tip matters most.",
  "Your questions in the comments, our answers tonight.",
  "Share this with your family group. Yes, that one.",
];

const pillarCycle: SocialPost["pillar"][] = [
  "Educational", "Testimonial", "Educational", "Offer", "Awareness",
  "Behind the Scenes", "Educational", "Testimonial", "Awareness", "Festival",
];

const formatsFor: Record<SocialPlatform, SocialPost["format"][]> = {
  Instagram: ["Reel", "Carousel", "Story", "Post", "Reel"],
  Facebook: ["Post", "Video", "Post"],
  YouTube: ["Short", "Video", "Short"],
  "Google Business": ["Post"],
};

function buildSocialPosts(): SocialPost[] {
  const gen = seeded(31);
  const pick = <T,>(arr: T[]): T => arr[Math.floor(gen() * arr.length)];
  const start = Date.UTC(2026, 5, 1); // 2026-06-01
  const today = Date.UTC(2026, 6, 19); // 2026-07-19
  const posts: SocialPost[] = [];

  for (let i = 0; i < 100; i++) {
    // spread 100 posts across 92 days (Jun 1 – Aug 31)
    const dayOffset = Math.floor((i * 91) / 99);
    const ts = start + dayOffset * 86400000;
    const date = new Date(ts).toISOString().slice(0, 10);

    const p = gen();
    const platform: SocialPlatform = p < 0.6 ? "Instagram" : p < 0.8 ? "Facebook" : p < 0.92 ? "YouTube" : "Google Business";
    const format = pick(formatsFor[platform]);
    const pillar = pillarCycle[i % pillarCycle.length];
    const title = pick(titlePools[pillar]);

    const isPast = ts < today;
    let status: SocialPost["status"];
    if (isPast) {
      status = "Published";
    } else {
      const daysAhead = (ts - today) / 86400000;
      const r = gen();
      if (daysAhead <= 10) status = r < 0.6 ? "Scheduled" : r < 0.9 ? "Approved" : "In Review";
      else if (daysAhead <= 25) status = r < 0.3 ? "Scheduled" : r < 0.55 ? "Approved" : r < 0.8 ? "In Review" : "Drafted";
      else status = r < 0.25 ? "In Review" : r < 0.6 ? "Drafted" : "Idea";
    }

    const post: SocialPost = {
      id: `SP-${String(i + 1).padStart(3, "0")}`,
      date,
      platform,
      format,
      title,
      pillar,
      status,
    };

    if (status !== "Idea" && gen() < 0.7) {
      post.caption = `${title} — ${pick(captionSnippets)}`;
    }

    if (status === "Published") {
      const viral = gen();
      const reach = Math.floor(800 + gen() * 4200 + (viral > 0.9 ? 15000 * gen() : 0));
      post.reach = reach;
      post.likes = Math.floor(reach * (0.04 + gen() * 0.06));
      post.comments = Math.floor(reach * (0.002 + gen() * 0.008));
    }

    posts.push(post);
  }
  return posts;
}

/** 100 posts across Jun–Aug 2026: published history + upcoming pipeline. */
export const socialPosts: SocialPost[] = buildSocialPosts();
