/* ------------------------------------------------------------------ */
/* CareWell Dental Clinic — shared domain types                            */
/* ------------------------------------------------------------------ */

export type Role = "admin" | "doctor" | "receptionist";

export interface Doctor {
  id: string;
  name: string;
  role: string; // e.g. "Implantologist & Oral Surgeon"
  qualifications: string;
  experienceYears: number;
  specialities: string[];
  bio: string;
  rating: number;
  reviewCount: number;
  casesCompleted: number;
  availability: { day: string; slots: string }[];
  color: string; // tailwind tint for avatar
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  since: string;
  bio: string;
}

export interface Patient {
  id: string; // CW-P-1001
  name: string;
  age: number;
  gender: "Male" | "Female";
  phone: string;
  email: string;
  city: string;
  bloodGroup: string;
  allergies: string[];
  conditions: string[];
  registeredOn: string;
  lastVisit: string;
  totalSpent: number;
  outstanding: number;
  treatments: { date: string; treatment: string; doctorId: string; tooth?: string; status: "Completed" | "Ongoing" | "Planned"; cost: number }[];
  prescriptions: { date: string; doctorId: string; medicines: { name: string; dose: string; duration: string }[] }[];
  invoices: { id: string; date: string; items: string; amount: number; status: "Paid" | "Partial" | "Pending" }[];
  reports: { name: string; type: "X-Ray" | "OPG" | "CBCT" | "Blood Report"; date: string }[];
  notes: string;
}

export type AppointmentStatus =
  | "Confirmed"
  | "Checked In"
  | "In Chair"
  | "Completed"
  | "Cancelled"
  | "No Show"
  | "Pending";

export interface Appointment {
  id: string; // APT-2401
  patientId: string;
  patientName: string;
  phone: string;
  doctorId: string;
  treatment: string;
  date: string; // ISO date
  time: string; // "10:30 AM"
  durationMin: number;
  status: AppointmentStatus;
  source: "Website" | "WhatsApp" | "Phone" | "Walk-in" | "Meta Ads" | "Google";
  billing: { amount: number; status: "Paid" | "Partial" | "Pending" | "—" };
  notes?: string;
}

export type LeadStage =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Appointment"
  | "Visited"
  | "Treatment Started"
  | "Treatment Completed"
  | "Lost";

export interface LeadEvent {
  at: string;
  type: "created" | "call" | "whatsapp" | "email" | "stage" | "note" | "visit";
  text: string;
}

export interface Lead {
  id: string; // LD-3001
  name: string;
  phone: string;
  city: string;
  treatment: string;
  source: "Meta Ads" | "Google Ads" | "Website" | "WhatsApp" | "Referral" | "Walk-in" | "Instagram";
  campaign?: string;
  stage: LeadStage;
  value: number; // expected treatment value
  score: "Hot" | "Warm" | "Cold";
  owner: string; // staff name
  createdAt: string;
  nextFollowUp?: string;
  timeline: LeadEvent[];
  notes: string[];
}

export interface Treatment {
  slug: string;
  name: string;
  short: string; // one-liner
  category: "Surgical" | "Orthodontic" | "Cosmetic" | "Preventive" | "Restorative" | "Pediatric";
  icon: string; // lucide icon name
  hero: string;
  overview: string[];
  benefits: { title: string; text: string }[];
  procedure: { step: string; title: string; text: string }[];
  faqs: { q: string; a: string }[];
  priceMin: number;
  priceMax: number;
  priceNote: string;
  duration: string;
  sittings: string;
  beforeAfter: { label: string; note: string }[];
  emoji: string; // for lightweight visual gallery placeholders
}

export interface ConsentTemplate {
  slug: string;
  treatment: string;
  description: string;
  benefits: string[];
  risks: string[];
  complications: string[];
  alternatives: string[];
  aftercare: string[];
}

export interface ConsentForm {
  id: string; // CW-CF-260101-001
  patientId: string;
  patientName: string;
  doctorId: string;
  treatmentSlug: string;
  treatment: string;
  language: "English" | "Hindi";
  generatedAt: string;
  generatedBy: string;
  status: "Printed" | "Signed & Filed" | "Generated";
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: "Dental Tips" | "Kids Dentistry" | "Implants" | "Smile Design" | "Braces" | "Cosmetic Dentistry";
  author: string;
  authorRole: string;
  publishedAt: string;
  readMins: number;
  tags: string[];
  emoji: string;
  content: { heading?: string; paragraphs: string[] }[];
  featured?: boolean;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  treatment: string;
  text: string;
  source: "Google" | "Practo" | "JustDial";
}

export interface Course {
  slug: string;
  name: string;
  tagline: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  mode: "On-campus" | "Hybrid" | "Online";
  duration: string;
  fee: number;
  seats: number;
  enrolled: number;
  nextBatch: string;
  certification: string;
  overview: string[];
  curriculum: { module: string; topics: string[] }[];
  faculty: string[]; // doctor ids or names
  faqs: { q: string; a: string }[];
  outcomes: string[];
  featured?: boolean;
}

export interface StudentLead {
  id: string;
  name: string;
  phone: string;
  city: string;
  courseSlug: string;
  course: string;
  stage: "Enquiry" | "Application" | "Interview" | "Admitted" | "Payment Done" | "Completed" | "Dropped";
  createdAt: string;
  feePaid: number;
  feeTotal: number;
  batch: string;
  attendancePct?: number;
}

export type SocialPlatform = "Instagram" | "Facebook" | "YouTube" | "Google Business";

export interface SocialPost {
  id: string;
  date: string;
  platform: SocialPlatform;
  format: "Reel" | "Carousel" | "Story" | "Post" | "Video" | "Short";
  title: string;
  pillar: "Educational" | "Testimonial" | "Festival" | "Offer" | "Behind the Scenes" | "Awareness";
  status: "Idea" | "Drafted" | "In Review" | "Approved" | "Scheduled" | "Published";
  caption?: string;
  reach?: number;
  likes?: number;
  comments?: number;
}

export interface Campaign {
  id: string;
  name: string;
  platform: "Meta" | "Google";
  objective: string;
  status: "Active" | "Paused" | "Ended";
  startDate: string;
  spend: number;
  reach: number;
  impressions: number;
  clicks: number;
  leads: number;
  qualifiedLeads: number;
  appointments: number;
  revenue: number;
}

export interface Notification {
  id: string;
  type: "appointment" | "birthday" | "review" | "missed" | "payment" | "course";
  title: string;
  text: string;
  at: string;
  read: boolean;
}

export interface ActivityItem {
  id: string;
  at: string;
  actor: string;
  action: string;
  target: string;
  type: "lead" | "appointment" | "payment" | "consent" | "patient" | "social" | "course";
}

export interface Insight {
  id: string;
  kind: "trend" | "opportunity" | "alert" | "suggestion";
  title: string;
  text: string;
  metric?: string;
  delta?: string;
}
