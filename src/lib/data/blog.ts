/* ------------------------------------------------------------------ */
/* CareWell Dental Clinic — blog mock data (deterministic)                 */
/* ------------------------------------------------------------------ */

import type { BlogPost } from "@/lib/data/types";
import { seeded } from "@/lib/utils";

const ANANYA = "Dr. Smriti Sharma";
const ANANYA_ROLE = "Implantologist & Oral Surgeon";
const ROHAN = "Dr. Anuj";
const ROHAN_ROLE = "Orthodontist & Cosmetic Dentist";

export const blogCategories: BlogPost["category"][] = [
  "Dental Tips",
  "Kids Dentistry",
  "Implants",
  "Smile Design",
  "Braces",
  "Cosmetic Dentistry",
];

/* ------------------------------------------------------------------ */
/* 10 featured, fully hand-written posts (newest first)                */
/* ------------------------------------------------------------------ */

const featuredPosts: BlogPost[] = [
  {
    slug: "dental-implant-cost-india-2026",
    title: "What Dental Implants Really Cost in India: The Honest 2026 Guide",
    excerpt:
      "From ₹25,000 budget implants to ₹55,000 premium systems — a surgeon breaks down exactly where your money goes, what the ads don't tell you, and when cheap becomes expensive.",
    category: "Implants",
    author: ANANYA,
    authorRole: ANANYA_ROLE,
    publishedAt: "2026-07-14",
    readMins: 9,
    tags: ["implant cost", "pricing guide", "EMI", "Dwarka"],
    emoji: "🦷",
    featured: true,
    content: [
      {
        paragraphs: [
          "Almost every implant consultation at CareWell starts the same way: a patient slides their phone across the desk and shows me an ad promising 'implants at ₹15,999'. Then they ask why our quote is ₹35,000 to ₹55,000 per tooth. It is a fair question, and it deserves a fair, itemised answer — which is what this guide is.",
          "An implant is not one product; it is a small surgical project with four separate cost centres: the titanium fixture, the abutment that connects it to your crown, the crown itself, and the surgical skill plus sterile setup needed to place it. When an ad quotes an impossibly low number, it is almost always quoting only the first item, with everything else billed later as a 'surprise'.",
        ],
      },
      {
        heading: "The real price bands in 2026",
        paragraphs: [
          "In NCR today, a single implant with a standard-grade Korean fixture (Osstem, Dentium) and a metal-ceramic crown typically runs ₹30,000–₹38,000 all-inclusive. Move to a Swiss or German system (Straumann, Nobel Biocare, Ankylos) with a zirconia crown and you are looking at ₹45,000–₹60,000. Full-arch solutions like All-on-4 range from ₹2.8 lakh to ₹4.5 lakh per jaw depending on the fixture brand and whether the final bridge is acrylic-on-titanium or full zirconia.",
          "Add-on procedures are where estimates genuinely vary between patients. Bone grafting adds ₹8,000–₹25,000, a sinus lift ₹18,000–₹35,000, and a CBCT scan ₹2,500–₹4,000. At CareWell we put every one of these on the written treatment plan before surgery, priced line by line, so the number you approve is the number you pay.",
        ],
      },
      {
        heading: "Why the same implant costs less than in the West",
        paragraphs: [
          "Patients flying in from the US or UK are often startled that the identical Straumann fixture — same box, same batch-number system — costs a third of what their dentist at home quoted. The fixture price is global; what differs is clinic overheads and professional fees. That is why dental tourism into India crossed an estimated $500 million in 2025, and Dwarka, with its airport access and corporate hospitals, takes a large slice of it.",
          "The flip side: within India, an implant priced dramatically below the market usually means a compromise you cannot see — a lookalike fixture without ISO 13485 certification, a reused healing abutment, or a crown milled from unverified blanks. Titanium sits inside your jawbone for decades. This is the one purchase where the warranty card matters more than the discount.",
        ],
      },
      {
        heading: "Making it affordable without making it cheap",
        paragraphs: [
          "Most of our implant patients now pay through 6–12 month no-cost EMI, which brings a ₹40,000 implant to roughly ₹3,300 a month — less than many phone EMIs. Corporate insurance rarely covers implants directly, but it often covers the extraction, radiographs and medications around the surgery, so bring your policy along and we will help you claim what is claimable.",
          "One more honest note: not every missing tooth needs an implant on day one. If the site has been edentulous for years and bone volume is good, waiting a few months to save comfortably changes nothing clinically. What does cost you is waiting with a fresh extraction socket, because bone melts away fastest in the first six months.",
        ],
      },
      {
        heading: "Questions to ask any implant surgeon",
        paragraphs: [
          "Before you sign anywhere — here or elsewhere — ask four things: Which fixture brand, and can I see the sticker for my records? Is the quote inclusive of abutment and crown? Who does the surgery, and how many implants have they placed? What exactly does the warranty cover, and is it registered with the manufacturer?",
          "A confident clinic answers all four in writing. At CareWell, every implant patient leaves with the fixture's traceability sticker pasted into their file and a warranty certificate. If you are comparing quotes across Dwarka, bring them to a consultation — I will happily tell you if a competitor's quote is genuinely good, because sometimes it is.",
        ],
      },
    ],
  },
  {
    slug: "braces-vs-clear-aligners-honest-comparison",
    title: "Braces vs Clear Aligners: An Orthodontist's Honest Comparison",
    excerpt:
      "Aligners are not 'better braces' and braces are not 'the old thing'. Dr. Anuj explains which tool wins for which problem — and when saving ₹40,000 is the smarter call.",
    category: "Braces",
    author: ROHAN,
    authorRole: ROHAN_ROLE,
    publishedAt: "2026-07-02",
    readMins: 8,
    tags: ["clear aligners", "metal braces", "orthodontics", "treatment comparison"],
    emoji: "😁",
    featured: true,
    content: [
      {
        paragraphs: [
          "Twice a week, someone sits in my chair and says, 'I want aligners because braces are outdated.' And twice a week I have to gently explain that braces and aligners are two different tools, not two generations of the same tool. A screwdriver did not become obsolete when the drill was invented.",
          "Both systems move teeth by applying controlled force. Braces do it through brackets and wires I adjust every month; aligners do it through a sequence of transparent trays designed on software and swapped every 10–14 days at home. The engineering difference decides which cases each handles best.",
        ],
      },
      {
        heading: "Where aligners genuinely win",
        paragraphs: [
          "For mild-to-moderate crowding, spacing, and relapse cases (teeth that shifted after old braces), aligners are excellent. They are invisible at speaking distance, removable for weddings and client meetings, and dramatically easier to keep clean — which matters if your gums bleed easily. Working professionals in Dwarka, New Delhi overwhelmingly choose them for exactly these reasons.",
          "They also front-load the planning. Because the entire movement is simulated before we start, you see your projected end-smile on screen at the consultation itself. With fixed braces, the plan lives in my head and my monthly adjustments; with aligners it lives in software we both can look at.",
        ],
      },
      {
        heading: "Where braces still beat aligners",
        paragraphs: [
          "Severe crowding, significant bite corrections, rotated canines and cases needing extractions are still braces territory. Brackets grip each tooth individually and can extrude, rotate and torque teeth in ways plastic trays struggle to. When an aligner company promises to fix a deep bite in eight months, an orthodontist somewhere winces.",
          "Braces also remove the compliance problem entirely. Aligners only work if they are on your teeth 20–22 hours a day. I have seen brilliant aligner plans fail because the trays spent more time in a pocket than in a mouth. Teenagers, chai-all-day drinkers, and anyone honest enough to admit they will 'forget' should think hard before choosing removable.",
        ],
      },
      {
        heading: "The money conversation",
        paragraphs: [
          "At CareWell in 2026: metal braces run ₹35,000–₹55,000, ceramic braces ₹55,000–₹75,000, and clear aligners ₹80,000–₹2,20,000 depending on case complexity and brand (Invisalign sits at the top, Indian systems like Toothsi-class labs and 32 Watts in the middle). All of these are payable over the 12–24 month treatment on monthly plans.",
          "Here is the honest part: if your case is severe, paying ₹1.8 lakh for aligners buys you a longer, riskier route to the same place ₹50,000 braces would reach. And if your case is mild, paying for premium aligners when a basic aligner package would do is equally wasteful. The diagnosis should choose the appliance — not Instagram.",
        ],
      },
      {
        heading: "How to decide in one visit",
        paragraphs: [
          "Come in for a scan. Our intraoral scanner builds a 3D model in about eight minutes, and I will show you what each option can achieve for your specific bite, with timelines and total costs side by side. No lab fees are committed until you decide.",
          "Whichever you choose, the unglamorous truth is that retention decides the final result. Teeth drift back for years after any orthodontic treatment, so budget for retainers and actually wear them at night. The best appliance is the one whose result you still have at your 40th birthday.",
        ],
      },
    ],
  },
  {
    slug: "wisdom-tooth-warning-signs",
    title: "7 Signs Your Wisdom Tooth Needs Attention (Not All of Them Hurt)",
    excerpt:
      "Pain is the last warning, not the first. An oral surgeon lists the earlier signals — from a bad taste to a stiff jaw — that a third molar is quietly causing trouble.",
    category: "Dental Tips",
    author: ANANYA,
    authorRole: ANANYA_ROLE,
    publishedAt: "2026-06-20",
    readMins: 6,
    tags: ["wisdom teeth", "oral surgery", "tooth pain", "extraction"],
    emoji: "🪥",
    featured: true,
    content: [
      {
        paragraphs: [
          "The most dangerous wisdom tooth in my clinic is never the one that hurts. It is the one the patient forgot about — the half-erupted lower third molar that has been silently decaying the healthy tooth in front of it for three years. By the time it aches, I am often extracting two teeth instead of one.",
          "Wisdom teeth erupt between 17 and 25, into jaws that, thanks to evolution and softer diets, frequently no longer have room for them. An impacted or tilted third molar is not automatically a problem. But it needs watching, and there are seven signals that watching time is over.",
        ],
      },
      {
        heading: "The early, painless signals",
        paragraphs: [
          "One: food constantly trapping at the very back, needing a toothpick after every meal — a sign the tooth is partially erupted with a gum flap over it. Two: a persistent bad taste or odour from one corner of the mouth, which usually means debris fermenting under that flap. Three: your cheek or tongue keeps catching on a tooth that seems to sit at an odd angle.",
          "Four is the sneakiest: pressure or a dull, hard-to-locate ache in front of the ear, often mistaken for a headache or 'stress'. Tilted lower wisdom teeth push against the second molar, and that chronic pressure refers pain upward. Patients see physicians, get migraine workups, and finally land in a dental chair where one X-ray explains everything.",
        ],
      },
      {
        heading: "The signals that mean this week, not this month",
        paragraphs: [
          "Five: swelling of the gum behind the last molar, especially with difficulty opening the mouth fully — this is pericoronitis, an infection of the gum flap, and it can escalate quickly. Six: pain on biting that shoots along the jaw. Seven: visible decay or a dark shadow on the tooth in front of the wisdom tooth; on X-ray this is the classic distal caries of the second molar, and it is the complication I most want to prevent.",
          "If you have fever with facial swelling, that is no longer a dental appointment — that is a same-day emergency, because infections in this region can track towards the throat. We keep two emergency slots open daily at the clinic for exactly this.",
        ],
      },
      {
        heading: "What removal actually looks like in 2026",
        paragraphs: [
          "Most extractions I do take 20–40 minutes under local anaesthesia. You feel pressure, not pain. Surgical extractions of deeply impacted teeth are planned on a CBCT scan so we know exactly where the nerve canal runs before any instrument touches you. Sutures come out, or dissolve, within a week; most office-goers take one day off, two at most.",
          "Costs at CareWell range from ₹3,000 for a simple extraction to ₹12,000 for a complex surgical impaction — and, importantly, an X-ray and consultation to tell you whether yours needs removal at all costs a few hundred rupees. Not every wisdom tooth must go. But every wisdom tooth deserves one good look before it decides for you.",
        ],
      },
    ],
  },
  {
    slug: "is-teeth-whitening-safe-science",
    title: "Is Teeth Whitening Safe? What the Science Actually Says",
    excerpt:
      "Charcoal powders, banana peels, salon 'laser deals' and clinical bleaching — a cosmetic dentist separates what whitens, what wastes money, and what permanently damages enamel.",
    category: "Cosmetic Dentistry",
    author: ROHAN,
    authorRole: ROHAN_ROLE,
    publishedAt: "2026-06-08",
    readMins: 7,
    tags: ["teeth whitening", "enamel safety", "cosmetic dentistry", "myths"],
    emoji: "💎",
    featured: true,
    content: [
      {
        paragraphs: [
          "A patient recently brought me a jar of activated charcoal powder she had used daily for a year. Her teeth were not whiter. They were flatter — the abrasive had sanded the surface gloss off her enamel, and the newly rough surface was actually picking up chai stains faster. She had paid ₹600 to make her staining problem worse.",
          "Whitening is one of the safest procedures in dentistry when done with the right chemistry, and one of the most quietly destructive when done with abrasion. The distinction is simple: real whitening happens by oxidation, not scrubbing.",
        ],
      },
      {
        heading: "How bleaching actually works",
        paragraphs: [
          "Professional whitening uses hydrogen peroxide (or carbamide peroxide, which breaks down into it). Peroxide molecules penetrate enamel and break apart the large pigmented molecules lodged in it — from tea, coffee, red wine, tobacco — into smaller, colourless fragments. The enamel itself is not thinned, etched or removed. Decades of studies, including long-term follow-ups, show no structural enamel damage from properly used peroxide.",
          "What peroxide does cause is temporary sensitivity, because it opens microscopic channels to the nerve for 24–48 hours. This is manageable: we pre-treat with potassium nitrate gel, and the sensitivity resolves fully. It is a side effect, not damage — an important difference the internet routinely confuses.",
        ],
      },
      {
        heading: "Clinic vs home kits vs salon offers",
        paragraphs: [
          "In-clinic whitening at CareWell (₹8,000–₹15,000) uses 25–40% peroxide with the gums physically sealed off with a protective barrier, and lifts shades in about 60–90 minutes. Dentist-supervised home kits (₹4,000–₹7,000) use 10–16% carbamide peroxide in custom trays over two weeks — slower, gentler, excellent for sensitive patients. Both are legitimate; the choice is speed versus comfort.",
          "What I cannot endorse are salon and mall kiosk 'laser whitening' offers. In India, handling high-concentration peroxide is a dental procedure for good reason: applied to unprotected gums it causes chemical burns, and I have treated those burns. If the person holding the syringe cannot read your gum health first, walk out.",
        ],
      },
      {
        heading: "What whitening cannot do",
        paragraphs: [
          "Peroxide only works on natural enamel. Crowns, veneers and fillings do not bleach — so if your front tooth has an old composite filling, whitening will lighten everything around it and leave the filling as a yellow island. We sequence this properly: whiten first, then replace visible fillings to match the new shade after two weeks.",
          "Internal stains are the other honest limitation. Greyish tetracycline banding and fluorosis mottling respond partially at best; for those, veneers or bonding are the real answer, and I would rather tell you that before you spend on bleaching than after. Results otherwise last one to three years depending on your chai-and-coffee habit, and top-up trays keep them going indefinitely.",
        ],
      },
      {
        heading: "The bottom line",
        paragraphs: [
          "Whitening done with peroxide, under supervision, on healthy teeth: safe, reversible-side-effect, well-studied. Whitening attempted with charcoal, lemon, baking soda or 'miracle' abrasive powders: permanent one-way enamel loss for zero shade change.",
          "Start with a ten-minute check-up. Sometimes what looks like yellowing is just tartar and surface stain, and a ₹1,500 scaling and polishing gets you 70% of the result you wanted — no bleaching required. An honest cosmetic dentist should always try the cheap fix first.",
        ],
      },
    ],
  },
  {
    slug: "diabetes-and-gum-disease-connection",
    title: "Diabetes and Gum Disease: The Two-Way Street Nobody Talks About",
    excerpt:
      "Your gums can raise your HbA1c, and your HbA1c can destroy your gums. Why every diabetic in India needs a dentist on their care team — and what a 'diabetic dental protocol' looks like.",
    category: "Dental Tips",
    author: ANANYA,
    authorRole: ANANYA_ROLE,
    publishedAt: "2026-05-24",
    readMins: 7,
    tags: ["diabetes", "gum disease", "periodontitis", "preventive care"],
    emoji: "🪥",
    featured: true,
    content: [
      {
        paragraphs: [
          "India has over 100 million people living with diabetes, and in my experience fewer than one in ten of them has ever been told by any doctor that gum disease is a recognised complication of diabetes — listed right alongside eye, kidney and nerve damage. Periodontitis is sometimes called the sixth complication, and it is the only one a patient can see in the mirror, bleeding, every morning.",
          "The relationship runs both ways, which is what makes it worth your attention. Diabetes makes gum disease worse; untreated gum disease makes diabetes harder to control. Break the loop at either end and both conditions improve.",
        ],
      },
      {
        heading: "Why high sugar wrecks gums",
        paragraphs: [
          "Elevated blood glucose thickens small blood vessels, starving gum tissue of oxygen and immune cells exactly where bacteria concentrate — at the gumline. It also sweetens saliva slightly, feeding those bacteria, and slows collagen repair, so the ligaments anchoring teeth heal poorly. The result: a diabetic with the same plaque as a non-diabetic loses bone around teeth roughly three times faster.",
          "The clinical picture I see weekly: a 50-year-old with an HbA1c of 9, gums that bleed at a touch, teeth that have started drifting apart, and breath their family has stopped mentioning. Often they have been rinsing with clove water for a year, treating the symptom of an infection that is quietly loosening every tooth.",
        ],
      },
      {
        heading: "Why infected gums raise your sugar",
        paragraphs: [
          "Severe periodontitis is not a small infection. Spread out flat, the inflamed tissue in a full mouth of deep gum pockets approximates a wound the size of your palm — draining inflammatory chemicals into the bloodstream around the clock. Those chemicals (TNF-alpha, IL-6) directly interfere with insulin's action.",
          "This is why treating gum disease measurably improves glycaemic control: meta-analyses consistently show that deep cleaning drops HbA1c by around 0.4 percentage points at three months — a reduction comparable to adding a second diabetes medication, for the price of a dental cleaning. When I share that number with physicians, they start referring.",
        ],
      },
      {
        heading: "The CareWell diabetic dental protocol",
        paragraphs: [
          "Every diabetic patient at our clinic gets a periodontal chart (pocket-depth mapping of all teeth) at the first visit, professional cleaning every three to four months instead of the standard six, and morning appointments scheduled after breakfast and medication to avoid hypoglycaemia in the chair. For surgical work like extractions or implants, we operate when HbA1c is documented under 8 and coordinate with your physician on timing.",
          "And yes — diabetics can absolutely get implants. Controlled diabetics show success rates close to non-diabetics; it is uncontrolled sugar that ruins healing. I have placed implants in dozens of well-managed diabetic patients who were told elsewhere it was impossible.",
        ],
      },
      {
        heading: "Three things to do this month",
        paragraphs: [
          "If you or a parent has diabetes: first, look for the early signs — bleeding on brushing, puffy or receding gums, persistent bad breath, or any tooth that feels slightly mobile. Second, book a periodontal screening; it takes fifteen minutes and costs less than a glucometer. Third, put dental cleaning on the same recall calendar as your HbA1c test — every three months, same week, so neither gets forgotten.",
          "Gum disease is painless until its final stage, which is precisely why it takes more teeth from Indian adults than cavities do. With diabetes in the picture, waiting for pain means waiting too long.",
        ],
      },
    ],
  },
  {
    slug: "smile-makeover-process-first-photo-to-reveal",
    title: "Inside a Smile Makeover: From First Photo to Final Reveal",
    excerpt:
      "What actually happens across the 3–6 visits of a smile design case — trial smiles you can wear home, the mock-up veto, and why we photograph you laughing, not smiling.",
    category: "Smile Design",
    author: ROHAN,
    authorRole: ROHAN_ROLE,
    publishedAt: "2026-05-11",
    readMins: 8,
    tags: ["smile makeover", "digital smile design", "veneers", "before after"],
    emoji: "✨",
    featured: true,
    content: [
      {
        paragraphs: [
          "The most important instrument in a smile makeover is not the drill. It is the camera. Before I touch a single tooth, I photograph a patient talking, laughing and at rest — because a smile designed only for a posed, frozen grin looks wrong the moment its owner starts speaking. Real smile design is designing for motion.",
          "A smile makeover is not one procedure; it is a coordinated plan that may combine whitening, veneers, gum contouring, aligners and crowns. What patients rarely realise is how reversible and previewable the process now is — you approve the smile before it exists.",
        ],
      },
      {
        heading: "Visit one: records and the honest conversation",
        paragraphs: [
          "We take a full photo series, an intraoral 3D scan, X-rays, and shade measurements. Then comes the conversation that shapes everything: what do you actually dislike? The answers are wonderfully specific — 'the one twisted tooth in every photo', 'my gums show too much when I laugh', 'the gap my son now has too'. Vague briefs like 'make it perfect' produce those chalk-white, piano-key celebrity smiles that photograph loudly and look artificial across a dinner table.",
          "This is also where I map your constraints honestly: budget, timeline (weddings are the great deadline of Indian cosmetic dentistry), and how much healthy tooth structure I am willing to touch. My rule is subtraction last — if aligners plus whitening can deliver 80% of the goal without cutting enamel, you will hear that option first, because enamel does not grow back.",
        ],
      },
      {
        heading: "The digital design and the trial smile",
        paragraphs: [
          "Your scans go into smile design software where we set tooth proportions against your face — the golden ratio makes a nice Instagram caption, but lip line, face shape and even personality matter more. A slightly rounded edge reads soft and youthful; a squarer edge reads assertive. You see the proposed design overlaid on your own laughing photos, not on a stock model.",
          "Then the part patients love: the mock-up. We 3D-print the design and transfer it onto your teeth in temporary resin — no drilling, twenty minutes — and you walk around with your future smile. Send selfies to your family. Wear it to dinner. This is your veto stage: roughly a third of patients request changes, usually 'a little less perfect, a little more me', and we adjust the design before anything permanent happens.",
        ],
      },
      {
        heading: "Execution and the reveal",
        paragraphs: [
          "Only after mock-up approval do we execute — whitening first if planned, then gum contouring (a 30-minute laser procedure that heals in days), then veneer preparation, which with modern ceramics removes as little as 0.3–0.5 mm of enamel. You wear precise temporaries for 7–10 days while a ceramist layers your veneers by hand; matching one veneer to a neighbouring natural tooth is genuinely harder than making eight, which is why single-tooth cases cost disproportionately more.",
          "The reveal appointment is choreographed at our clinic — veneers tried in with neutral gel, checked in daylight-balanced light, then bonded one by one. Total cost in 2026: a whitening-and-bonding makeover starts around ₹40,000; a six-veneer smile runs ₹1,20,000–₹2,40,000 depending on ceramic; gum contouring adds ₹8,000–₹15,000. Spread over the 4–6 week process, and with EMI, it is within reach of far more people than assume so.",
        ],
      },
      {
        heading: "What makes a makeover succeed",
        paragraphs: [
          "The failures I am asked to redo from elsewhere share one story: no mock-up, no motion photos, shade chosen from a paper card in five seconds. The successes share the opposite: a design the patient co-authored and pre-approved on their own face.",
          "So my one-line advice if you are considering this — anywhere, not just with us: do not let anyone touch your enamel until you have worn a version of the result. A clinic that resists doing a mock-up is telling you something.",
        ],
      },
    ],
  },
  {
    slug: "pregnancy-dental-care-trimester-guide",
    title: "Dental Care During Pregnancy: A Trimester-by-Trimester Guide",
    excerpt:
      "Yes, you can see a dentist while pregnant — and skipping it carries real risks. Which treatments are safe when, what 'pregnancy gingivitis' is, and the one myth about calcium that refuses to die.",
    category: "Dental Tips",
    author: ANANYA,
    authorRole: ANANYA_ROLE,
    publishedAt: "2026-04-26",
    readMins: 7,
    tags: ["pregnancy", "gingivitis", "women's health", "safe treatment"],
    emoji: "🪥",
    featured: true,
    content: [
      {
        paragraphs: [
          "The saddest dental emergencies I treat are pregnant women in their seventh month with a raging tooth infection that was a small cavity in their first — postponed because someone in the family said dental treatment harms the baby. Let me be direct: routine dental care during pregnancy is safe, endorsed by obstetric guidelines worldwide, and avoiding it is what carries the risk.",
          "An untreated dental infection means pain, poor eating, antibiotics that could have been avoided, and stress — none of which is good for a developing baby. Severe gum disease in pregnancy has been associated in multiple studies with preterm and low-birth-weight deliveries. The dental chair is not the danger; the abscess is.",
        ],
      },
      {
        heading: "First trimester (weeks 1–12): assess and stabilise",
        paragraphs: [
          "This is organogenesis, so we keep intervention minimal — but not zero. Check-ups, oral hygiene guidance and cleaning are all fine. Morning sickness deserves special mention: stomach acid from vomiting softens enamel, and brushing immediately afterwards scrubs that softened layer away. Rinse with water or a teaspoon of baking soda in water instead, and brush half an hour later.",
          "Tell us the moment you know you are pregnant, even for a routine visit. We defer elective X-rays and postpone non-urgent work, but if you arrive with swelling or an abscess, treatment proceeds — infection control always outranks trimester timing, in coordination with your obstetrician.",
        ],
      },
      {
        heading: "Second trimester (weeks 13–26): the treatment window",
        paragraphs: [
          "This is when we schedule anything that needs doing: fillings, root canals, extractions, deep cleaning. The baby's organ formation is complete, nausea has usually settled, and you can still lie back comfortably. Local anaesthesia with lignocaine is well studied and safe in pregnancy; you do not need to endure a filling without numbness out of misplaced caution.",
          "If an X-ray is genuinely needed, a modern digital periapical film delivers a vanishingly small dose — less radiation than a short flight — and we double-shield with a lead apron and thyroid collar. What we still postpone to after delivery: whitening, veneers, implant placement and anything purely elective.",
        ],
      },
      {
        heading: "Third trimester and 'pregnancy gingivitis'",
        paragraphs: [
          "From week 28, the main constraint is comfort — lying flat lets the uterus press on the vena cava, so we keep visits short and position you tilted to the left. Now, the condition affecting 60–70% of pregnant women: pregnancy gingivitis. Progesterone exaggerates the gum response to plaque, so gums bleed at the slightest touch, sometimes with small berry-like growths (pregnancy epulis) that alarm everyone and are almost always harmless, resolving after delivery.",
          "Bleeding gums in pregnancy are common — but not something to ignore, because plaque is still the trigger. A professional cleaning in the second trimester plus meticulous home brushing keeps it fully controlled. And the myth that will not die: the baby does not 'take calcium from your teeth'. Fetal calcium comes from diet and bone stores, never enamel. A tooth lost per child is a proverb, not physiology — what actually happens is nausea, snacking and skipped dental visits piling up for nine months.",
        ],
      },
      {
        heading: "A simple plan for nine months",
        paragraphs: [
          "Planning a pregnancy? Get a full dental check and cleaning first — it is the single highest-value dental appointment of the whole journey. Already pregnant? Book a cleaning in the second trimester, brush twice daily with fluoride toothpaste, rinse after vomiting rather than brushing, and report any swelling the same day.",
          "At CareWell we coordinate directly with your obstetrician for anything beyond routine care, and we keep written protocols for medications safe in pregnancy. Two healthy patients are in the chair at every visit; we treat it that way.",
        ],
      },
    ],
  },
  {
    slug: "veneer-types-compared-porcelain-composite-lumineers",
    title: "Porcelain, Composite or Lumineers? Every Veneer Type Compared",
    excerpt:
      "₹8,000 to ₹35,000 per tooth is a big range for 'a veneer'. A cosmetic dentist compares longevity, enamel cost, repairability and looks — with the cases where the cheap option is genuinely better.",
    category: "Smile Design",
    author: ROHAN,
    authorRole: ROHAN_ROLE,
    publishedAt: "2026-04-12",
    readMins: 8,
    tags: ["veneers", "composite bonding", "porcelain", "cost comparison"],
    emoji: "✨",
    featured: true,
    content: [
      {
        paragraphs: [
          "'Veneer' has become an umbrella word covering at least four quite different treatments, priced anywhere from ₹8,000 to ₹35,000 per tooth. Patients quote prices at me from three clinics and cannot understand the spread — usually because the three quotes are for three different products. Here is the full comparison I draw on the whiteboard for every smile design consult.",
          "All veneers do the same job: a thin facing over the front of a tooth to correct colour, shape, minor crowding or gaps. They differ in material, how much enamel must be removed, how long they last, and how they fail. That last one matters more than people think.",
        ],
      },
      {
        heading: "Composite veneers: the sculpted option",
        paragraphs: [
          "Composite veneers (₹8,000–₹12,000 per tooth at CareWell) are built directly on your tooth in a single sitting — I layer and sculpt tooth-coloured resin by hand, no lab involved. Minimal to zero drilling, one appointment, walk out with the result. For closing a gap, fixing a chipped edge, or a budget-conscious full-smile refresh before a wedding six weeks away, composite is genuinely the right call, not a compromise.",
          "The trade-offs: composite stains over time (chai, coffee, turmeric — the Indian kitchen is hard on resin), loses its polish in 3–5 years, and chips more easily than ceramic. The redeeming feature is repairability — a chipped composite veneer is patched in fifteen minutes; a chipped porcelain veneer is usually replaced entirely.",
        ],
      },
      {
        heading: "Porcelain veneers: the benchmark",
        paragraphs: [
          "Lab-made porcelain — these days usually lithium disilicate (e.max) — is the gold standard: ₹18,000–₹30,000 per tooth. Prepared conservatively (0.3–0.5 mm of enamel), scanned, and layered by a ceramist, porcelain has a translucency and light-play that resin cannot match, does not stain, and routinely lasts 10–15 years. Every 'celebrity smile' you have admired that did not look fake was almost certainly layered e.max.",
          "The costs beyond money: two to three visits, a lab wait of about a week in temporaries, and a small but permanent enamel commitment — a prepared tooth will always need a veneer or crown. This is why I refuse to place porcelain on candidates whose problem is really alignment; grinding healthy teeth to mask crookedness that aligners could fix in months is bad dentistry, whatever it pays.",
        ],
      },
      {
        heading: "Lumineers and no-prep veneers: the fine print",
        paragraphs: [
          "'No-prep' veneers — Lumineers being the famous brand — are ultra-thin (0.2–0.3 mm) porcelain bonded without drilling, at ₹25,000–₹35,000 per tooth. The honest catch: because they add a layer rather than replacing one, they slightly thicken and lengthen teeth. On small or inward-tilted teeth this is exactly what you want. On normal or prominent teeth it produces the bulky, opaque look people mean when they say 'horse teeth'.",
          "So no-prep is a case-selection story, not an upgrade story. Roughly one in five of my veneer patients is a genuinely good no-prep candidate. If a clinic offers Lumineers to everyone regardless of tooth position, they are selling the brand, not the diagnosis.",
        ],
      },
      {
        heading: "The decision grid",
        paragraphs: [
          "Budget tight, timeline short, minor corrections: composite. Wanting the definitive, longest-lasting, most natural result and willing to commit enamel: porcelain e.max. Small or retroclined teeth, terrified of drilling: assess for no-prep. Whole problem is really crooked teeth: none of the above — aligners first, then reassess, because you may only need whitening afterwards.",
          "Whatever you choose, ask to see the clinic's own before-and-after cases (not stock photos), confirm what the per-tooth price includes, and get the smile designed and mocked up before preparation. A veneer is the most visible thing a dentist ever makes for you. It deserves an unhurried decision.",
        ],
      },
    ],
  },
  {
    slug: "childs-first-dental-visit-guide",
    title: "Your Child's First Dental Visit: What Happens, and When to Come",
    excerpt:
      "First tooth or first birthday — whichever comes first. What a toddler's dental visit actually looks like, why we count teeth from your lap, and how to avoid raising a dental-phobic adult.",
    category: "Kids Dentistry",
    author: ANANYA,
    authorRole: ANANYA_ROLE,
    publishedAt: "2026-03-28",
    readMins: 6,
    tags: ["kids dentistry", "first visit", "milk teeth", "parenting"],
    emoji: "🧒",
    featured: true,
    content: [
      {
        paragraphs: [
          "Ask most Indian parents when a child should first see a dentist and the answer is some version of 'when something hurts' or 'when the permanent teeth come'. The professional answer is startlingly earlier: first tooth or first birthday, whichever comes first. Not because babies have dental problems — most don't — but because the first visit is really for the parents, and because a child who meets the dentist before anything hurts never learns to fear us.",
          "Every dental-phobic adult in my chair has an origin story, and it is almost always a first visit that happened at age seven, in pain, ending in an extraction. We can simply choose not to write that story.",
        ],
      },
      {
        heading: "What actually happens at a first visit",
        paragraphs: [
          "Nothing dramatic. For a baby or toddler we use a 'knee-to-knee' exam: you and I sit facing each other, your child lies back from your lap into mine, and I count teeth, check gums and look for early decay — total contact time, about two minutes. Older toddlers get a ride in the chair, a mirror to hold, and a 'counting game'. No instruments they haven't touched first, and nothing painful, ever, on a first visit.",
          "The longer part is the conversation: bottle and breastfeeding habits at night, sippy cups, when and how to brush, fluoride toothpaste amounts (a rice-grain smear under three, a pea from three to six), thumb-sucking, and what to do when they inevitably fall face-first learning to walk. Parents leave with answers to questions they didn't know to ask — that is the actual product of visit one.",
        ],
      },
      {
        heading: "'They're only milk teeth' — the costliest sentence in kids' dentistry",
        paragraphs: [
          "Milk teeth are not placeholders; they are the working dentition for the entire first decade — chewing, speech sounds, and crucially, holding space for the permanent teeth developing beneath them. Lose a milk molar early to decay, and the neighbours drift into the gap; the permanent tooth arrives to find its parking spot taken, and erupts crooked. A ₹1,500 filling at five prevents a ₹50,000 braces case at thirteen more often than parents believe.",
          "Early childhood caries — the pattern of rapid decay in upper front baby teeth from night-time milk or juice bottles — remains the most common chronic childhood disease we see, and it is almost entirely preventable: no bottle in bed after teeth erupt, water only at night, and a wiped or brushed mouth before sleep.",
        ],
      },
      {
        heading: "Building a child who likes the dentist",
        paragraphs: [
          "Words matter enormously. At home, please retire 'injection', 'drill', 'pain', and — the classic — 'if you don't brush the doctor will pull your tooth out'. We are not the punishment. Say instead: 'the doctor counts teeth and makes them strong'. Schedule morning appointments when children are fresh, never after school when they are tired and hungry.",
          "At CareWell we run 'happy visits' — a free five-minute hello where a nervous child simply sits in the chair, works the water spray, and takes a sticker. Two happy visits later, the same child opens wide for a filling without a murmur. Prevention completes the picture: fluoride varnish twice a year and pit-and-fissure sealants on the permanent molars (which arrive around age six, behind the milk teeth — many parents miss them entirely). A child raised this way reaches eighteen having never associated dentistry with pain. That, more than any filling, is the outcome worth booking early for.",
        ],
      },
    ],
  },
  {
    slug: "root-canal-myths-that-keep-patients-in-pain",
    title: "5 Root Canal Myths That Keep Patients in Pain",
    excerpt:
      "'It's the most painful thing ever.' 'It kills the tooth.' 'Just remove it instead.' A dentist dismantles the five myths that make Indians choose extraction over saving their own teeth.",
    category: "Dental Tips",
    author: ROHAN,
    authorRole: ROHAN_ROLE,
    publishedAt: "2026-03-10",
    readMins: 6,
    tags: ["root canal", "myths", "tooth pain", "endodontics"],
    emoji: "🪥",
    featured: true,
    content: [
      {
        paragraphs: [
          "No dental procedure carries more unearned fear than the root canal. Patients arrive white-knuckled, having read horror stories from an uncle's treatment in 1995, and leave an hour later asking, genuinely puzzled, 'that's it?' The gap between the reputation and the modern reality is now so wide that the myths themselves cause more suffering than the procedure — because they push people toward pulling out teeth that could have been saved.",
          "Here are the five I hear most, and what is actually true.",
        ],
      },
      {
        heading: "Myth 1: Root canals are extremely painful",
        paragraphs: [
          "The pain people associate with root canals is the toothache before treatment — an inflamed nerve in a closed chamber, which is genuinely among the worst pains humans experience. The root canal is what ends it. With modern local anaesthesia, the procedure itself feels like a long filling: vibration, water, mild boredom. Most patients tell us the anaesthetic injection — now given after numbing gel — was the only thing they felt all day.",
          "What changed since your uncle's story? Electronic apex locators that measure canal length digitally, rotary nickel-titanium files that clean canals in minutes instead of an hour of hand filing, and far better anaesthetics. A single-visit root canal at CareWell typically takes 45–75 minutes.",
        ],
      },
      {
        heading: "Myth 2: Better to just remove the tooth",
        paragraphs: [
          "Extraction feels decisive and costs less today — ₹1,500–₹3,000 against ₹6,000–₹12,000 for a root canal and crown... until you price the gap. A missing molar means either a bridge (grinding down two healthy neighbours, ₹15,000+), an implant (₹35,000+), or nothing — and 'nothing' means drifting neighbours, a bite that collapses inward, and the opposing tooth over-erupting into the space. Nature abhors a gap.",
          "No replacement matches a natural root's feedback and bone stimulation. The professional consensus is boring and unanimous: a savable tooth is worth saving. Extraction is the right call only when the tooth is truly beyond rescue — vertical fracture, massive decay below the gumline — and an honest dentist will show you the X-ray either way.",
        ],
      },
      {
        heading: "Myths 3 and 4: 'It kills the tooth' and 'it causes illness'",
        paragraphs: [
          "A root-canal-treated tooth is not 'dead wood'. It loses its nerve, yes, but it remains alive to your body — anchored by living ligament in living bone, functioning for decades. It does become more brittle, which is why the crown afterwards is not an upsell; skipping the crown on a back tooth is the single most common reason treated teeth later fracture.",
          "As for the internet claim that root canals cause arthritis, heart disease or cancer — this traces to the 'focal infection theory' of the 1920s, discredited for nearly a century and kept alive by one persistent documentary. Every major dental and medical body worldwide rejects it. What actually seeds infection into the bloodstream is the untreated abscess the root canal removes.",
        ],
      },
      {
        heading: "Myth 5: It takes many sittings and always fails eventually",
        paragraphs: [
          "Most straightforward cases are now completed in a single visit; a badly infected tooth may need two. Success rates for modern root canal treatment run 90–95% over ten-plus years, and even old treatments that flare up can usually be re-treated rather than extracted. Those are better odds than most things in medicine.",
          "If you take one thing from this: a toothache that wakes you at night, or pain that lingers minutes after hot tea, is the nerve asking for help — and the window for a smaller, cheaper fix is closing. Come in for an X-ray. The scariest part of a root canal in 2026 is the appointment reminder.",
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* 90 generated posts                                                  */
/* ------------------------------------------------------------------ */

const topicPools: Record<BlogPost["category"], string[]> = {
  "Dental Tips": [
    "Root Canal Treatment",
    "Scaling & Polishing",
    "Gum Disease Treatment",
    "Tooth Extraction",
    "Night Guards for Teeth Grinding",
    "Dental X-Rays",
    "Sensitive Teeth Treatment",
    "Bad Breath Treatment",
  ],
  "Kids Dentistry": [
    "Pit & Fissure Sealants",
    "Fluoride Varnish",
    "Kids' Cavity Prevention",
    "Milk Tooth Extraction",
    "Habit-Breaking Appliances",
    "Space Maintainers",
    "Pediatric Fillings",
  ],
  Implants: [
    "Single Tooth Implants",
    "All-on-4 Implants",
    "Bone Grafting",
    "Immediate Loading Implants",
    "Implant-Supported Dentures",
    "Sinus Lift Surgery",
    "Full Mouth Rehabilitation",
  ],
  "Smile Design": [
    "Digital Smile Design",
    "Porcelain Veneers",
    "Gum Contouring",
    "Composite Bonding",
    "Diastema Closure",
    "Smile Makeovers",
  ],
  Braces: [
    "Metal Braces",
    "Ceramic Braces",
    "Clear Aligners",
    "Retainers",
    "Early Orthodontic Screening",
    "Self-Ligating Braces",
    "Lingual Braces",
  ],
  "Cosmetic Dentistry": [
    "Teeth Whitening",
    "Zirconia Crowns",
    "Enamel Reshaping",
    "Laser Gum Depigmentation",
    "Composite Veneers",
    "Smile Correction",
  ],
};

const titleTemplates: ((t: string) => string)[] = [
  (t) => `5 Signs You Need ${t}`,
  (t) => `${t} in Dwarka, New Delhi: What It Really Costs`,
  (t) => `How We Approach ${t} at CareWell`,
  (t) => `${t}: 7 Questions Patients Ask Us Every Week`,
  (t) => `The Complete Patient's Guide to ${t}`,
  (t) => `${t} — Myths vs Facts`,
  (t) => `${t} and Pain: An Honest Conversation`,
  (t) => `When Is the Right Time for ${t}?`,
  (t) => `${t} Aftercare: Your Week-by-Week Recovery Plan`,
  (t) => `Why We Recommend ${t} Sooner Than You Think`,
  (t) => `${t} for Busy Professionals in Dwarka, New Delhi`,
  (t) => `What Your Dentist Wishes You Knew About ${t}`,
  (t) => `${t} at CareWell: Your First Visit, Step by Step`,
  (t) => `Second Opinions on ${t}: Mistakes We Help You Avoid`,
  (t) => `Paying for ${t}: EMI, Insurance and Honest Pricing`,
];

const excerptPool: ((t: string) => string)[] = [
  (t) => `Everything Dwarka patients ask us about ${t.toLowerCase()} — timelines, costs and the small details that decide the result.`,
  (t) => `A plain-language look at ${t.toLowerCase()}, written from real cases at our clinic rather than a textbook.`,
  (t) => `Thinking about ${t.toLowerCase()}? Here is what to expect before, during and after, with honest numbers.`,
  (t) => `We answer the questions our front desk hears every single week about ${t.toLowerCase()}.`,
  (t) => `The short, practical guide to ${t.toLowerCase()} — who needs it, who doesn't, and what it costs in 2026.`,
];

const heading1Pool = [
  "Why this matters more than you think",
  "What patients usually notice first",
  "The basics, minus the jargon",
  "What is actually going on",
  "First, the honest context",
];
const heading2Pool = [
  "What to expect at CareWell",
  "Costs, timelines and next steps",
  "How we do it differently",
  "Your questions, answered",
  "Practical next steps",
];

const openerPool: ((t: string) => string)[] = [
  (t) => `Every week at our Dwarka clinic, we meet patients who have put off ${t.toLowerCase()} for months because of fear, cost worries or plain confusion.`,
  (t) => `${t} is one of the most searched dental topics in India — and one of the most misunderstood.`,
  (t) => `If you have been told you need ${t.toLowerCase()}, the first thing to know is that modern techniques have made it far more comfortable than most people expect.`,
  (t) => `Patients often arrive at CareWell with screenshots of conflicting advice about ${t.toLowerCase()} from WhatsApp groups and YouTube.`,
  (t) => `Few treatments generate as many second-opinion visits at our clinic as ${t.toLowerCase()}, and usually the confusion is about basics, not fine print.`,
];

const factPool: string[] = [
  "Delaying treatment usually means a small problem becomes a bigger, costlier one — a filling today can be a root canal next year.",
  "Digital X-rays and intraoral scans let us show you exactly what is happening before we recommend anything at all.",
  "Most sittings take 30 to 60 minutes, and local anaesthesia keeps the procedure itself essentially painless.",
  "The right treatment depends on your specific case; two patients with the same complaint can need completely different plans.",
  "Age is rarely the barrier people assume — we treat everyone from toddlers to patients in their eighties.",
  "Good home care doubles the lifespan of almost any dental work, which is why we spend real time on brushing technique.",
];

const carewellPool: string[] = [
  "At CareWell, every treatment plan is written down with itemised pricing before we begin, so there are no surprises at billing.",
  "We follow strict four-step sterilisation for every instrument, and you are welcome to ask to see our autoclave logs.",
  "Dr. Smriti Sharma and Dr. Anuj review complex cases together, so difficult decisions get two specialist opinions.",
  "No-cost EMI options starting near ₹2,500 a month make larger treatment plans manageable for most families.",
  "Our front desk shares a written estimate on WhatsApp after every consultation, so you can decide at home without pressure.",
];

const closerPool: string[] = [
  "If you are in Dwarka, New Delhi or anywhere along Golf Course Road, walk-in consultations are available six days a week.",
  "Book a consultation and we will give you an honest answer — including, sometimes, that you do not need treatment at all.",
  "A ten-minute check-up twice a year remains the cheapest dental treatment you will ever buy.",
  "Bring your old X-rays or reports if you have them; they often save you both time and money.",
  "Questions before you visit? Message the clinic on WhatsApp and one of our doctors will reply within the day.",
];

const tagPools: Record<BlogPost["category"], string[]> = {
  "Dental Tips": ["oral health", "prevention", "tooth pain", "dental hygiene", "check-up"],
  "Kids Dentistry": ["kids dentistry", "milk teeth", "parenting", "cavity prevention", "pediatric"],
  Implants: ["implants", "missing teeth", "surgery", "bone health", "restoration"],
  "Smile Design": ["smile design", "veneers", "aesthetics", "makeover", "confidence"],
  Braces: ["braces", "aligners", "orthodontics", "teeth straightening", "retainers"],
  "Cosmetic Dentistry": ["cosmetic dentistry", "whitening", "smile", "aesthetics", "crowns"],
};

const categoryEmoji: Record<BlogPost["category"], string> = {
  "Dental Tips": "🪥",
  "Kids Dentistry": "🧒",
  Implants: "🦷",
  "Smile Design": "✨",
  Braces: "😁",
  "Cosmetic Dentistry": "💎",
};

const kebab = (s: string) =>
  s
    .toLowerCase()
    .replace(/[₹—]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function buildGeneratedPosts(): BlogPost[] {
  const gen = seeded(7);
  const pick = <T,>(arr: T[]): T => arr[Math.floor(gen() * arr.length)];
  const usedSlugs = new Set<string>(featuredPosts.map((p) => p.slug));
  const posts: BlogPost[] = [];
  const base = Date.UTC(2026, 5, 25); // 2026-06-25, keeps featured posts newest

  for (let i = 0; i < 90; i++) {
    const category = blogCategories[i % blogCategories.length];
    const topic = pick(topicPools[category]);
    const title = titleTemplates[i % titleTemplates.length](topic);

    let slug = kebab(title);
    if (usedSlugs.has(slug)) slug = `${slug}-${i}`;
    usedSlugs.add(slug);

    const bySmriti =
      category === "Implants" ||
      (category !== "Braces" && category !== "Cosmetic Dentistry" && category !== "Smile Design" && i % 2 === 0);

    const dayOffset = i * 10 + Math.floor(gen() * 6);
    const publishedAt = new Date(base - dayOffset * 86400000).toISOString().slice(0, 10);

    posts.push({
      slug,
      title,
      excerpt: pick(excerptPool)(topic),
      category,
      author: bySmriti ? ANANYA : ROHAN,
      authorRole: bySmriti ? ANANYA_ROLE : ROHAN_ROLE,
      publishedAt,
      readMins: 3 + Math.floor(gen() * 4),
      tags: [tagPools[category][i % tagPools[category].length], pick(tagPools[category]), "Dwarka"],
      emoji: categoryEmoji[category],
      content: [
        {
          heading: pick(heading1Pool),
          paragraphs: [
            `${pick(openerPool)(topic)} ${pick(factPool)}`,
            `${pick(factPool)} ${pick(factPool)}`,
          ],
        },
        {
          heading: pick(heading2Pool),
          paragraphs: [
            `${pick(carewellPool)} ${pick(carewellPool)}`,
            `${pick(factPool)} ${pick(closerPool)}`,
          ],
        },
      ],
    });
  }
  return posts;
}

/** 100 posts, newest first. First 10 are the featured, hand-written guides. */
export const blogPosts: BlogPost[] = [...featuredPosts, ...buildGeneratedPosts()];

export const findPost = (slug: string): BlogPost | undefined =>
  blogPosts.find((p) => p.slug === slug);

export const relatedPosts = (slug: string, n = 3): BlogPost[] => {
  const post = findPost(slug);
  if (!post) return [];
  return blogPosts.filter((p) => p.category === post.category && p.slug !== slug).slice(0, n);
};
