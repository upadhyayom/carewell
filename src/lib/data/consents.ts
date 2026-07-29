import type { ConsentForm, ConsentTemplate } from "./types";
import { patients } from "./people";
import { seeded } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* CareWell Dental — consent templates & generated consent forms       */
/* All data is deterministic (seeded PRNG) — SSR-safe.                 */
/* ------------------------------------------------------------------ */

export const consentTemplates: ConsentTemplate[] = [
  {
    slug: "dental-implants",
    treatment: "Dental Implants",
    description:
      "Dental implant therapy involves the surgical placement of one or more titanium fixtures into the maxillary or mandibular bone under local anaesthesia, followed by a healing period of 3–6 months to allow osseointegration, and subsequent restoration with an abutment and prosthetic crown or bridge. Treatment is planned using CBCT imaging to assess bone volume and the position of anatomical structures. Ancillary procedures such as bone grafting or sinus floor elevation may be required and will be discussed prior to surgery.",
    benefits: [
      "Fixed replacement of missing teeth without preparation of adjacent natural teeth",
      "Restoration of chewing efficiency approaching that of natural dentition",
      "Preservation of alveolar bone through functional loading",
      "Long-term documented success rates exceeding 95% at 10 years",
      "Improved speech, aesthetics and denture stability where applicable",
    ],
    risks: [
      "Implant failure to osseointegrate, reported in approximately 2–5% of cases, requiring removal and possible re-placement",
      "Post-operative pain, swelling, bruising and restricted mouth opening for several days",
      "Injury to the inferior alveolar nerve causing temporary or, rarely, permanent paresthesia of the lip, chin or tongue",
      "Sinus membrane perforation during upper posterior implant placement",
      "Infection at the surgical site (peri-implantitis) which may compromise the implant",
      "Damage to adjacent teeth or roots during placement",
      "Higher failure risk in smokers and patients with uncontrolled diabetes",
    ],
    complications: [
      "Peri-implant bone loss requiring additional grafting or maintenance therapy",
      "Screw loosening or fracture of prosthetic components over time",
      "Gum recession around the implant affecting aesthetics",
      "Need for additional surgical procedures if healing is compromised",
    ],
    alternatives: [
      "Fixed dental bridge supported by adjacent natural teeth",
      "Removable partial or complete denture",
      "No treatment — with progressive bone resorption, drifting of adjacent teeth and reduced chewing function over time",
    ],
    aftercare: [
      "Bite firmly on the gauze pack for 45 minutes after surgery and avoid disturbing the surgical site with your tongue or fingers.",
      "Apply cold packs externally for the first 24 hours in 15-minute intervals to limit swelling.",
      "Take all prescribed antibiotics and analgesics exactly as directed, completing the full antibiotic course.",
      "Do not smoke or consume alcohol for a minimum of 72 hours; smoking significantly increases the risk of implant failure.",
      "Eat soft, cool foods for 48 hours and avoid chewing on the surgical side until reviewed.",
      "Rinse gently with warm saline or prescribed chlorhexidine mouthwash from the day after surgery; do not rinse forcefully on the day of surgery.",
      "Attend all scheduled review appointments, including the healing check and annual radiographic follow-up.",
    ],
  },
  {
    slug: "root-canal",
    treatment: "Root Canal Treatment",
    description:
      "Root canal treatment (endodontic therapy) involves removal of the inflamed or infected pulp tissue from within the tooth, mechanical and chemical disinfection of the root canal system using rotary instrumentation and irrigants, and obturation of the canals with an inert filling material. The procedure is performed under local anaesthesia and rubber dam isolation, in one or two visits. A full-coverage crown is strongly recommended following treatment to protect the tooth against fracture.",
    benefits: [
      "Elimination of pulpal infection and relief of associated pain",
      "Retention of the natural tooth and its function in the dental arch",
      "Prevention of spread of infection to surrounding bone and tissues",
      "Avoidance of extraction and the cost of prosthetic replacement",
      "Documented long-term success rates of 90–95% when restored with a crown",
    ],
    risks: [
      "Post-operative tenderness or flare-up of infection requiring medication or additional visits",
      "Instrument separation (file breakage) within a canal, which may be retained or require referral",
      "Perforation of the root or pulp chamber floor during access or instrumentation",
      "Missed or inaccessible accessory canals leading to persistent infection",
      "Root fracture during or after treatment, which may necessitate extraction",
      "Failure of treatment (5–10% of cases) requiring re-treatment, apical surgery or extraction",
      "Temporary numbness or reaction related to local anaesthesia",
    ],
    complications: [
      "Discolouration of the treated tooth over time",
      "Fracture of the weakened tooth if the recommended crown is not placed",
      "Persistent periapical infection requiring endodontic re-treatment or apicoectomy",
      "Hypochlorite irrigant extrusion causing pain and swelling (rare)",
    ],
    alternatives: [
      "Extraction of the tooth followed by implant, bridge or denture replacement",
      "Extraction without replacement, accepting drifting of adjacent teeth and loss of chewing function",
      "No treatment — the infection will not resolve on its own and may progress to abscess, facial swelling and systemic involvement",
    ],
    aftercare: [
      "Do not chew on the treated tooth until the permanent restoration or crown is placed.",
      "Take prescribed analgesics as directed; mild tenderness on biting for 2–3 days is expected.",
      "Contact the clinic promptly if swelling, severe pain or fever develops.",
      "Maintain normal brushing and flossing around the treated tooth.",
      "Schedule and attend the crown appointment within 2–4 weeks as advised.",
      "Report immediately if the temporary filling dislodges or fractures.",
    ],
  },
  {
    slug: "braces",
    treatment: "Braces",
    description:
      "Fixed orthodontic treatment involves bonding brackets to the teeth and engaging archwires that apply controlled forces to move teeth into the planned positions over a period of approximately 12–24 months. Adjustment visits are required every 4–6 weeks. Treatment is planned from cephalometric and panoramic radiographs, study models and clinical photographs, and may include extraction of selected teeth where arch space analysis requires it. Retention with fixed and/or removable retainers is mandatory after appliance removal.",
    benefits: [
      "Correction of crowding, spacing, rotations and bite discrepancies",
      "Improved ability to clean teeth, reducing long-term risk of decay and gum disease",
      "Improved distribution of biting forces and reduced abnormal tooth wear",
      "Enhanced dental and facial aesthetics",
      "Stable, predictable results for complex tooth movements",
    ],
    risks: [
      "White-spot lesions or decalcification of enamel around brackets with inadequate oral hygiene",
      "Gum inflammation and, in susceptible patients, gum recession during treatment",
      "External root resorption (shortening of root tips), usually minor but occasionally significant",
      "Relapse of tooth positions after treatment if retainers are not worn as instructed",
      "Soft-tissue irritation or ulceration from brackets and wires",
      "Treatment duration exceeding the estimate due to missed appointments, breakages or biological variation",
      "Devitalisation of a previously traumatised tooth during movement (rare)",
    ],
    complications: [
      "Bracket debonding or wire breakage requiring unscheduled visits",
      "Temporomandibular joint discomfort during bite correction",
      "Allergic reaction to nickel-containing components (rare)",
      "Need for revision of the treatment plan, including mid-course extraction decisions",
    ],
    alternatives: [
      "Clear aligner therapy, where the malocclusion is within its scope",
      "Limited or sectional orthodontic treatment addressing only the front teeth",
      "Restorative camouflage (veneers/crowns) for minor alignment concerns",
      "No treatment — accepting the existing alignment, with continued difficulty cleaning and possible progressive wear or drift",
    ],
    aftercare: [
      "Brush after every meal using the interdental and orthodontic brushes demonstrated, paying attention to the gumline around each bracket.",
      "Avoid hard, sticky and chewy foods (nuts, candy, chikki, hard rotis torn with front teeth) that debond brackets.",
      "Wear elastics exactly as instructed; inconsistent wear extends treatment time.",
      "Use the orthodontic wax provided for any wire or bracket irritation and report unresolved trauma to the clinic.",
      "Attend adjustment appointments every 4–6 weeks without fail.",
      "After debonding, wear retainers precisely as prescribed — teeth will relapse without retention.",
      "Continue six-monthly professional cleaning throughout treatment.",
    ],
  },
  {
    slug: "aligners",
    treatment: "Clear Aligners",
    description:
      "Clear aligner therapy moves teeth using a sequential series of removable, custom-fabricated transparent trays, each worn for approximately 7–10 days. Tooth-coloured composite attachments may be bonded to selected teeth and interproximal enamel reduction (IPR) performed where the digital plan requires space. Aligners must be worn 20–22 hours per day; treatment success is directly dependent on patient compliance. Refinement aligners are commonly required to finalise tooth positions, and retention is mandatory on completion.",
    benefits: [
      "Discreet, near-invisible correction of tooth alignment",
      "Removable appliance permitting normal eating and oral hygiene",
      "Digital treatment simulation showing projected outcome before commencement",
      "Fewer and shorter clinical visits than fixed appliances",
      "Reduced soft-tissue irritation compared with brackets and wires",
    ],
    risks: [
      "Failure of teeth to track with the planned movement, requiring refinement trays or conversion to fixed appliances",
      "Treatment failure or prolongation due to inadequate daily wear time",
      "Interproximal reduction involves removal of small amounts of enamel, which is irreversible",
      "Relapse of tooth positions if retainers are not worn after treatment",
      "Transient discomfort or pressure with each new aligner",
      "Temporary alteration of speech during the adaptation period",
      "Certain complex movements (severe rotations, large bite corrections) may not be fully achievable",
    ],
    complications: [
      "Attachment debonding requiring replacement visits",
      "Aligner breakage or loss requiring replacement trays at possible additional cost",
      "Gum irritation from aligner edges requiring adjustment",
      "Mid-course correction requiring new impressions and revised tray series",
    ],
    alternatives: [
      "Fixed orthodontic appliances (metal or ceramic braces), which do not depend on wear-time compliance",
      "Limited treatment addressing only the anterior teeth",
      "No treatment — accepting the current alignment, with possible progression of crowding over time",
    ],
    aftercare: [
      "Wear aligners 20–22 hours daily, removing them only for meals and oral hygiene.",
      "Brush and floss before reinserting aligners; never eat or drink anything other than water with aligners in place.",
      "Clean aligners daily with a soft brush and cool water; never use hot water, which distorts the trays.",
      "Use chewies for a few minutes after inserting each new tray to ensure full seating.",
      "Store aligners in the case provided — never in a pocket or napkin.",
      "Retain each previous tray until instructed to discard it, in case a current tray is lost.",
      "Attend review appointments every 6–8 weeks and wear retainers as prescribed on completion.",
    ],
  },
  {
    slug: "smile-design",
    treatment: "Smile Design",
    description:
      "Digital smile design is a planned programme of cosmetic dental treatment which may combine porcelain or composite veneers, crowns, professional tooth whitening, gingival (gum) recontouring and minor orthodontic alignment, sequenced according to a digitally designed and patient-approved plan. A diagnostic mock-up (trial smile) is provided in the mouth prior to any irreversible procedure. The specific procedures, materials and fees applicable to this patient are itemised in the attached treatment plan.",
    benefits: [
      "Comprehensive, coordinated improvement of tooth shape, shade, proportion and gum symmetry",
      "Preview and approval of the intended result through a reversible mock-up before treatment",
      "Single integrated plan and estimate rather than piecemeal treatment",
      "Conservative sequencing that prioritises enamel preservation where possible",
      "Durable ceramic materials with documented long-term performance",
    ],
    risks: [
      "Tooth preparation for veneers or crowns involves irreversible removal of enamel",
      "Post-operative sensitivity to temperature, usually transient",
      "Ceramic chipping or fracture, particularly in patients who clench or grind",
      "Debonding of a veneer requiring re-cementation or replacement",
      "Colour match limitations, especially against single adjacent natural teeth",
      "Gingival recontouring carries risk of transient discomfort and minor regrowth or asymmetry",
      "Pulpal irritation following preparation occasionally necessitating root canal treatment",
    ],
    complications: [
      "Need for endodontic treatment of a prepared tooth developing irreversible pulpitis",
      "Marginal staining or gum recession over years affecting aesthetics",
      "Fracture requiring laboratory remake at possible additional cost",
      "Adjustment of bite or replacement of restorations in patients with untreated bruxism",
    ],
    alternatives: [
      "Staged single-procedure treatment (e.g. whitening alone, or bonding of selected teeth)",
      "Orthodontic alignment alone, followed by reassessment of cosmetic needs",
      "Composite bonding as a reversible, lower-cost alternative to porcelain",
      "No treatment — the appearance concerns are cosmetic and no health deterioration is implied by declining",
    ],
    aftercare: [
      "Avoid biting hard objects (ice, pens, bottle caps, walnut shells) with restored front teeth.",
      "Wear the provided night guard every night if prescribed — this is essential in patients who grind.",
      "Maintain meticulous brushing and daily flossing at restoration margins.",
      "Avoid strongly staining foods and beverages for 48 hours after whitening components of treatment.",
      "Attend the two-week post-delivery review and six-monthly maintenance appointments.",
      "Report chipping, roughness or debonding promptly rather than continuing to bite on the affected tooth.",
    ],
  },
  {
    slug: "veneers",
    treatment: "Veneers",
    description:
      "Veneer treatment involves bonding thin facings of porcelain (laboratory-fabricated) or composite resin (directly sculpted) to the prepared labial surfaces of teeth to modify their colour, shape or minor position. Porcelain veneers require removal of approximately 0.3–0.7 mm of enamel, which is irreversible, and are cemented at a second visit following laboratory fabrication. Composite veneers are completed in a single visit and are repairable but less durable.",
    benefits: [
      "Correction of discolouration, chips, small gaps and minor irregularities",
      "Substantially more conservative than full-coverage crowns",
      "Porcelain offers high stain resistance and natural translucency",
      "Composite option available in a single visit at lower cost",
      "Documented survival of porcelain veneers above 90% at 10 years",
    ],
    risks: [
      "Enamel removal for porcelain veneers is irreversible; the teeth will always require a restoration",
      "Post-operative thermal sensitivity, usually resolving within weeks",
      "Veneer fracture or chipping under excessive load",
      "Debonding of the veneer requiring re-cementation",
      "Marginal staining over time, particularly with composite veneers",
      "Pulpal irritation occasionally progressing to the need for root canal treatment",
      "Shade-match limitations against adjacent natural teeth",
    ],
    complications: [
      "Replacement of the veneer at the end of its service life (porcelain 10–15 years; composite 4–7 years)",
      "Gum recession exposing the veneer margin over years",
      "Fracture requiring laboratory remake at additional cost",
      "Accelerated wear or fracture in untreated bruxism without night-guard protection",
    ],
    alternatives: [
      "Professional tooth whitening for discolouration without shape change",
      "Direct composite bonding as a reversible, more economical option",
      "Orthodontic alignment for position-related concerns",
      "No treatment — the condition is cosmetic and declining treatment carries no health consequence",
    ],
    aftercare: [
      "Do not bite directly into very hard foods with veneered teeth; cut hard fruit into pieces.",
      "Wear the prescribed night guard if you clench or grind.",
      "Brush twice daily with a non-abrasive fluoride toothpaste and floss at the veneer margins.",
      "Limit strongly staining beverages in the first 48 hours after composite veneer placement.",
      "Attend six-monthly reviews for professional polishing of margins.",
      "Report any chip, crack or debonding immediately.",
    ],
  },
  {
    slug: "teeth-whitening",
    treatment: "Teeth Whitening",
    description:
      "Professional tooth whitening employs carbamide or hydrogen peroxide gel applied to the enamel surfaces under clinical supervision, with gingival tissues isolated by a protective resin barrier, typically in three to four cycles activated over a single visit. A supplementary take-home regimen with custom trays may be prescribed. Whitening affects natural tooth structure only; existing crowns, veneers and fillings will not change shade.",
    benefits: [
      "Improvement of tooth shade typically by 4–8 shades in a single supervised session",
      "Non-invasive procedure with no removal of tooth structure",
      "Gingival protection and pre-treatment examination minimise adverse effects",
      "Results may be maintained long-term with periodic take-home top-ups",
      "Immediate, measurable outcome recorded against a standard shade guide",
    ],
    risks: [
      "Transient tooth sensitivity in approximately one third of patients, typically resolving within 48 hours",
      "Gingival irritation or transient blanching if gel contacts the gum despite isolation",
      "Uneven results in the presence of white-spot lesions, fluorosis or banding",
      "Tetracycline-type discolouration responds slowly and incompletely",
      "Existing restorations will not lighten and may require replacement to match the new shade",
      "Relapse of shade over 12–18 months depending on dietary and tobacco habits",
    ],
    complications: [
      "Prolonged sensitivity requiring desensitising treatment (uncommon)",
      "Need for restoration replacement to match the whitened dentition",
      "Over-whitening or translucency of incisal edges with excessive home use against advice",
      "Soft-tissue ulceration from ill-fitting home trays if used contrary to instruction",
    ],
    alternatives: [
      "Supervised take-home tray whitening alone over 2–3 weeks",
      "Veneers or bonding for discolouration unresponsive to bleaching",
      "Scaling and polishing alone, which removes surface stain but does not alter intrinsic shade",
      "No treatment — tooth shade is a cosmetic concern with no health implication",
    ],
    aftercare: [
      "Avoid tea, coffee, red wine, cola, turmeric-rich food and tobacco for 48 hours after the session.",
      "Use the provided desensitising or fluoride toothpaste for one week.",
      "Avoid very hot or very cold food and drink for 24–48 hours if sensitivity is present.",
      "Do not smoke; smoking reverses whitening rapidly and stains the enamel.",
      "Use take-home trays only as instructed and never exceed the prescribed gel contact time.",
      "Maintain six-monthly professional cleaning to preserve the result.",
    ],
  },
  {
    slug: "kids-dentistry",
    treatment: "Kids Dentistry",
    description:
      "Paediatric dental treatment for this child may include examination, fluoride varnish application, pit-and-fissure sealants, restoration of carious primary or permanent teeth, pulp therapy (pulpotomy/pulpectomy) with stainless steel crowns where indicated, extraction of unrestorable primary teeth, space maintainers, and habit-management appliances. Behaviour-guidance techniques including tell-show-do and positive reinforcement are used; the parent or guardian remains present throughout and treatment proceeds only with their consent.",
    benefits: [
      "Relief of pain and elimination of active dental infection in the child",
      "Preservation of primary teeth that guide jaw growth and hold space for permanent successors",
      "Prevention of decay through sealants and fluoride at a fraction of restorative cost",
      "Early detection and interception of developing bite and habit problems",
      "Establishment of positive dental behaviour reducing lifelong dental anxiety",
    ],
    risks: [
      "Local anaesthesia carries risk of transient numbness; the child must be supervised against lip or cheek biting until sensation returns",
      "Restorations and stainless steel crowns in primary teeth may require repair or replacement before natural exfoliation",
      "Pulp therapy may fail, requiring extraction of the treated primary tooth",
      "A traumatised or deeply carious tooth may lose vitality despite conservative treatment",
      "Uncooperative behaviour may require deferral, treatment modification, or referral for treatment under sedation or general anaesthesia",
      "Early loss of a primary tooth may result in space loss requiring a space maintainer",
    ],
    complications: [
      "Post-operative soreness or transient gum irritation following restorative treatment",
      "Cheek or lip trauma from post-anaesthetic biting in young children",
      "Sealant loss requiring reapplication at review visits",
      "Interference of a failed primary tooth restoration with the erupting permanent successor (uncommon)",
    ],
    alternatives: [
      "Stabilisation with interim therapeutic restorations and intensive prevention, where cooperation is limited",
      "Silver diamine fluoride application to arrest selected carious lesions (causes black staining of the lesion)",
      "Treatment under sedation or general anaesthesia in hospital for extensive needs in very young or anxious children",
      "No treatment — untreated decay in children progresses to pain, abscess, damage to the developing permanent tooth and possible facial-space infection",
    ],
    aftercare: [
      "Supervise the child until local anaesthesia wears off; do not allow biting or sucking of the numb lip or cheek.",
      "Provide soft food and adequate fluids on the day of treatment.",
      "Brush the child's teeth twice daily with a pea-sized amount of fluoride toothpaste, assisting until at least age 8.",
      "Restrict sugary snacks and drinks to mealtimes; avoid bedtime bottles containing milk or juice.",
      "Give any prescribed medication in the stated paediatric dose only.",
      "Report persistent pain, swelling or fever to the clinic promptly.",
      "Attend six-monthly recall visits for fluoride application and monitoring.",
    ],
  },
  {
    slug: "scaling",
    treatment: "Scaling & Polishing",
    description:
      "Scaling involves removal of plaque, calculus (tartar) and surface stains from the crowns and root surfaces of the teeth using ultrasonic and hand instruments, followed by polishing of the enamel surfaces. Where periodontal pockets are present, deep scaling and root planing is performed below the gumline under local anaesthesia, usually across two visits. The procedure is the standard first-line treatment for gingivitis and periodontitis.",
    benefits: [
      "Removal of the bacterial deposits responsible for gum inflammation, bleeding and halitosis",
      "First-line treatment and prevention of periodontal (gum) disease, the leading cause of adult tooth loss",
      "Removal of extrinsic surface stains, improving appearance",
      "Reduction of periodontal pocket depths following root planing",
      "Opportunity for full-mouth screening and early detection of other conditions",
    ],
    risks: [
      "Transient tooth sensitivity to cold for several days following removal of deposits",
      "Minor gum bleeding and soreness for 24–48 hours",
      "Teeth may feel slightly mobile or 'gappy' after removal of large calculus deposits that were splinting them",
      "Gum recession may become more apparent as inflamed, swollen tissue shrinks to healthy contours",
      "In advanced periodontitis, scaling alone may be insufficient and periodontal surgery may be required",
      "Bacteraemia risk in patients with specific cardiac conditions, for whom antibiotic cover will be arranged where indicated",
    ],
    complications: [
      "Persistent dentine hypersensitivity requiring desensitising treatment",
      "Localised gum abscess if deep deposits are incompletely resolved (requiring further instrumentation)",
      "Ultrasonic instrumentation is modified or avoided in patients with certain unshielded cardiac pacemakers",
      "Recurrence of deposits and inflammation without adherence to home care and recall",
    ],
    alternatives: [
      "Hand instrumentation alone where ultrasonic use is contraindicated",
      "Periodontal surgery for pockets unresponsive to non-surgical therapy",
      "No treatment — gum disease progresses silently to bone loss, mobility and eventual tooth loss, and cannot be resolved by home brushing alone",
    ],
    aftercare: [
      "Continue normal brushing twice daily from the same evening, gently over any tender areas.",
      "Use the prescribed desensitising toothpaste if cold sensitivity occurs.",
      "Rinse with warm saline twice daily for 3–4 days if the gums are sore.",
      "Clean between the teeth daily with floss or the interdental brushes sized for you.",
      "Avoid tobacco in all forms; it masks gum bleeding while accelerating bone loss.",
      "Attend the recall visit at the interval advised (six-monthly, or four-monthly for higher-risk patients).",
    ],
  },
  {
    slug: "extraction",
    treatment: "Tooth Extraction",
    description:
      "Extraction is the removal of a tooth that is unrestorable due to caries, fracture, advanced periodontal disease, or as part of a planned orthodontic or prosthetic treatment. The procedure is performed under local anaesthesia; teeth with curved, divergent or fractured roots may require a surgical (open) approach including gum reflection, bone removal or tooth sectioning. Options for replacement of the extracted tooth will be discussed prior to the procedure.",
    benefits: [
      "Removal of the source of pain and infection",
      "Prevention of spread of infection to adjacent teeth and surrounding tissues",
      "Resolution of problems associated with an unrestorable or hopelessly mobile tooth",
      "Creation of space where extraction is part of an orthodontic plan",
      "Preparation of the mouth for planned prosthetic replacement",
    ],
    risks: [
      "Post-operative pain, swelling and bruising for several days",
      "Bleeding from the socket, occasionally requiring additional local measures",
      "Dry socket (alveolar osteitis) in 2–5% of cases, more common in smokers, causing pain 2–4 days post-operatively",
      "Infection of the extraction site requiring antibiotics",
      "Root or bone fracture during removal, which may require a surgical approach or leaving a small, sterile root fragment where retrieval poses greater risk",
      "Damage to adjacent teeth or restorations",
      "Oro-antral communication (sinus opening) during removal of upper posterior teeth, requiring closure",
    ],
    complications: [
      "Prolonged numbness from local anaesthetic or nerve proximity (rare)",
      "Delayed healing in smokers, diabetics and patients on certain medications (including bisphosphonates)",
      "Jaw joint discomfort from prolonged mouth opening",
      "Drifting of adjacent teeth and over-eruption of opposing teeth if the space is not replaced",
    ],
    alternatives: [
      "Root canal treatment and restoration, where the tooth is savable",
      "Periodontal treatment to attempt retention of a mobile tooth",
      "No treatment — a non-vital or infected tooth will not heal spontaneously; infection may progress to abscess, facial swelling and systemic illness",
    ],
    aftercare: [
      "Bite firmly on the gauze pack for 45 minutes; replace once if oozing continues.",
      "Do not spit forcefully, rinse vigorously, or drink through a straw for 72 hours — protect the blood clot.",
      "Do not smoke or consume alcohol for at least 72 hours.",
      "Apply a cold pack externally in 15-minute intervals on the day of extraction to limit swelling.",
      "Eat soft, cool foods for 24–48 hours and chew on the opposite side.",
      "Begin gentle warm saline rinses from the day after extraction, three times daily for five days.",
      "Take prescribed medicines as directed and contact the clinic if severe pain begins 2–4 days after extraction.",
    ],
  },
  {
    slug: "wisdom-tooth",
    treatment: "Wisdom Tooth Removal",
    description:
      "Surgical removal of an impacted third molar involves reflection of a gum flap, removal of overlying bone where required, sectioning of the tooth, and closure with sutures, performed under local anaesthesia with or without oral sedation. Pre-operative assessment includes panoramic radiography and, where the roots of a lower third molar lie in proximity to the inferior alveolar nerve canal, CBCT imaging to map the relationship prior to surgery.",
    benefits: [
      "Resolution of recurrent pericoronitis (infection of the gum flap over the impacted tooth)",
      "Prevention of caries and root damage to the adjacent second molar",
      "Elimination of food trapping and chronic discomfort at the site",
      "Removal of an unrestorable, decayed or cystic third molar",
      "Prevention of future complications identified on radiographic assessment",
    ],
    risks: [
      "Post-operative pain, swelling and restricted mouth opening, typically peaking at 48 hours and resolving over 5–7 days",
      "Dry socket, occurring in approximately 5% of lower third molar surgeries and more frequently in smokers",
      "Temporary paresthesia (numbness/tingling) of the lip, chin or tongue in 1–2% of lower cases due to nerve proximity; permanent alteration is rare (under 1%)",
      "Post-operative infection requiring antibiotics or drainage",
      "Bleeding requiring additional local measures",
      "Oro-antral communication during upper third molar removal, requiring closure",
      "Fracture of the mandible (extremely rare, associated with deep impactions)",
    ],
    complications: [
      "Trismus (restricted opening) lasting beyond one week",
      "Damage to restorations on the adjacent second molar",
      "Retained root fragment deliberately left where retrieval endangers the nerve, with radiographic follow-up",
      "Prolonged nerve-related symptoms requiring monitoring and, rarely, referral",
    ],
    alternatives: [
      "Operculectomy (removal of the gum flap alone) for selected upright teeth, with risk of recurrence",
      "Antibiotics and irrigation for acute episodes — a temporising measure that does not address the cause",
      "Coronectomy (removal of the crown, leaving the roots) in selected very-high nerve-risk cases",
      "No treatment — recurrent infection, damage to the second molar, and cyst formation may follow, with surgery becoming more complex with age",
    ],
    aftercare: [
      "Bite on the gauze pack for 45 minutes; apply cold packs externally for the first 24 hours.",
      "Do not smoke, use straws, or spit forcefully for 72 hours to protect against dry socket.",
      "Take the full course of prescribed antibiotics and analgesics as directed.",
      "Eat cool, soft foods for 48 hours; avoid chewing at the surgical site for one week.",
      "Begin gentle warm saline rinses from the second day, three to four times daily.",
      "Expect peak swelling at 48 hours — this is normal healing; contact the clinic if swelling worsens after day three or fever develops.",
      "Attend the one-week review for wound assessment and suture removal where required.",
    ],
  },
  {
    slug: "dentures",
    treatment: "Dentures",
    description:
      "Denture treatment involves fabrication of a removable prosthesis — complete (replacing all teeth in an arch) or partial (replacing selected teeth, retained by clasps on remaining natural teeth) — constructed over a series of visits including primary and definitive impressions, jaw-relation records, a wax try-in for patient approval, and final delivery with adjustment visits. Implant-retained overdenture options, where applicable, involve additional surgical consent.",
    benefits: [
      "Restoration of chewing function, speech and facial support after tooth loss",
      "Non-surgical, reversible and economical replacement of multiple missing teeth",
      "Patient approval of aesthetics at the wax try-in stage before final processing",
      "Cast partial frameworks distribute forces onto remaining teeth in a controlled manner",
      "Existing dentures may later be stabilised with implants where indicated",
    ],
    risks: [
      "An adaptation period of 2–4 weeks with altered speech, increased salivation and reduced chewing efficiency is normal",
      "Sore spots requiring adjustment visits during the settling-in period",
      "Lower complete dentures have inherently limited stability due to reduced ridge and tongue movement",
      "Ongoing resorption of the residual ridge causes gradual loosening, requiring reline or remake over time",
      "Clasped natural teeth in partial dentures carry increased plaque retention and require meticulous hygiene",
      "Fracture of the denture base or teeth if dropped or subjected to excessive force",
    ],
    complications: [
      "Denture stomatitis (fungal irritation) under a denture worn continuously without hygiene or overnight rest",
      "Traumatic ulceration from an unadjusted pressure point",
      "Gagging or intolerance in a minority of patients, occasionally requiring design modification",
      "Loss or wear of clasp retention over years requiring repair",
    ],
    alternatives: [
      "Implant-supported fixed bridges or implant-retained overdentures for superior stability",
      "Fixed bridgework on natural teeth for shorter spans",
      "No treatment — remaining without replacement leads to progressive ridge resorption, drifting of remaining teeth, reduced nutrition and altered facial appearance",
    ],
    aftercare: [
      "Remove and clean the denture after meals with a denture brush and mild soap — not toothpaste, which abrades the acrylic.",
      "Remove the denture overnight and store it in plain water to rest the underlying tissues.",
      "Clean any remaining natural teeth and the gums, palate and tongue twice daily.",
      "Begin with soft foods cut small, chewing on both sides simultaneously, and progress gradually.",
      "Return for the scheduled adjustment visits rather than tolerating or self-adjusting sore spots.",
      "Handle the denture over a folded towel or basin of water to prevent fracture if dropped.",
      "Attend annual reviews; expect a reline or remake as the ridge changes shape over the years.",
    ],
  },
  {
    slug: "general-treatment",
    treatment: "General Dental Treatment",
    description:
      "This consent covers routine dental procedures including clinical and radiographic examination, restorations (fillings), administration of local anaesthesia, and associated diagnostic and preventive care as identified during examination and discussed with the patient. The specific procedures planned for this patient, together with materials and fees, are recorded in the accompanying treatment plan, which forms part of this consent.",
    benefits: [
      "Diagnosis and treatment of dental disease at its earliest and least expensive stage",
      "Restoration of decayed or fractured teeth to form and function",
      "Relief of pain and prevention of progression to more complex treatment",
      "Preservation of natural teeth and supporting structures",
      "Documented records and radiographs supporting continuity of care",
    ],
    risks: [
      "Local anaesthesia may cause transient numbness, bruising at the injection site, or rarely temporary nerve irritation",
      "Deep restorations may cause post-operative sensitivity and, in a proportion of cases, later require root canal treatment",
      "Restorations have a finite lifespan and will require monitoring, repair or replacement",
      "Removal of decay may reveal deeper involvement than visible on radiographs, changing the recommended treatment mid-procedure",
      "Dental radiographs involve very low doses of ionising radiation, minimised by digital sensors and taken only when clinically justified",
      "Allergic reaction to dental materials or medication (rare)",
    ],
    complications: [
      "Fracture of a heavily filled tooth requiring a crown or extraction",
      "High points on new fillings requiring adjustment",
      "Food trapping at restoration margins requiring recontouring",
      "Failure or dislodgement of a restoration requiring replacement",
    ],
    alternatives: [
      "Alternative restorative materials (composite, glass ionomer, ceramic) with differing costs and longevity, as discussed",
      "Deferral of non-urgent treatment with monitoring at recall visits",
      "No treatment — dental decay and gum disease are progressive; delay generally increases the complexity and cost of eventual treatment",
    ],
    aftercare: [
      "Avoid chewing until local anaesthesia has fully worn off to prevent biting the lip, cheek or tongue.",
      "Avoid very hard or sticky food on a new restoration for 24 hours.",
      "Report any high spot, roughness or persistent sensitivity on a new filling for adjustment.",
      "Brush twice daily with a fluoride toothpaste and clean between the teeth daily.",
      "Take any prescribed medication exactly as directed.",
      "Attend six-monthly examination and cleaning appointments.",
    ],
  },
];

export const findConsentTemplate = (slug: string) =>
  consentTemplates.find((t) => t.slug === slug);

/* ------------------------------------------------------------------ */
/* Generated consent form records (deterministic, seeded)              */
/* ------------------------------------------------------------------ */

/** Weighted pool — implants, root canals, extractions & braces dominate day-to-day paperwork. */
const slugPool: string[] = [
  "dental-implants", "dental-implants", "dental-implants",
  "root-canal", "root-canal", "root-canal",
  "extraction", "extraction",
  "braces", "braces",
  "wisdom-tooth", "wisdom-tooth",
  "aligners",
  "smile-design",
  "veneers",
  "teeth-whitening",
  "kids-dentistry",
  "scaling",
  "dentures",
  "general-treatment",
];

/** Surgical/restorative paperwork goes to Dr. Smriti; ortho/cosmetic to Dr. Anuj. */
const doctorForSlug: Record<string, string> = {
  "dental-implants": "dr-ananya",
  "root-canal": "dr-ananya",
  extraction: "dr-ananya",
  "wisdom-tooth": "dr-ananya",
  scaling: "dr-ananya",
  dentures: "dr-ananya",
  "general-treatment": "dr-ananya",
  braces: "dr-rohan",
  aligners: "dr-rohan",
  "smile-design": "dr-rohan",
  veneers: "dr-rohan",
  "teeth-whitening": "dr-rohan",
  "kids-dentistry": "dr-rohan",
};

const generateConsentForms = (): ConsentForm[] => {
  const rnd = seeded(42);
  const startMs = Date.UTC(2026, 0, 5); // 2026-01-05
  const dayMs = 86_400_000;
  const totalDays = 196; // 2026-01-05 .. 2026-07-19 inclusive

  /** Treatments that never apply to our 8-year-old patient (CW-P-1003). */
  const adultOnly = new Set([
    "dental-implants", "wisdom-tooth", "dentures", "smile-design", "veneers", "braces", "aligners",
  ]);

  const forms: ConsentForm[] = [];
  for (let i = 0; i < 100; i++) {
    const slug = slugPool[Math.floor(rnd() * slugPool.length)];
    const template = findConsentTemplate(slug)!;
    let idx = (i + Math.floor(rnd() * 4)) % patients.length;
    if (slug === "kids-dentistry") {
      idx = 2; // Aarav Gupta, our paediatric patient
    } else if (adultOnly.has(slug) && patients[idx].id === "CW-P-1003") {
      idx = (idx + 1) % patients.length;
    }
    const patient = patients[idx];

    const day = Math.floor(rnd() * totalDays);
    const hour = 9 + Math.floor(rnd() * 10); // 09:00–18:59 IST-style clinic hours
    const minute = Math.floor(rnd() * 60);
    const generatedAt = new Date(startMs + day * dayMs + hour * 3_600_000 + minute * 60_000).toISOString();
    const mmdd = generatedAt.slice(5, 7) + generatedAt.slice(8, 10);

    const langRoll = rnd();
    const byRoll = rnd();
    const statusRoll = rnd();

    forms.push({
      id: `CW-CF-26${mmdd}-${String(i + 1).padStart(3, "0")}`,
      patientId: patient.id,
      patientName: patient.name,
      doctorId: doctorForSlug[slug],
      treatmentSlug: slug,
      treatment: template.treatment,
      language: langRoll < 0.72 ? "English" : "Hindi",
      generatedAt,
      generatedBy: byRoll < 0.55 ? "Priya Sharma" : "Amit Verma",
      status:
        statusRoll < 0.6 ? "Signed & Filed" : statusRoll < 0.85 ? "Printed" : "Generated",
    });
  }

  // Newest first
  forms.sort((a, b) => (a.generatedAt < b.generatedAt ? 1 : a.generatedAt > b.generatedAt ? -1 : 0));
  return forms;
};

import { DEMO_DATA } from "@/lib/demo";
export const consentForms: ConsentForm[] = DEMO_DATA ? generateConsentForms() : [];
