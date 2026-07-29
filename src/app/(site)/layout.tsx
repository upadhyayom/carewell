import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { FloatingActions } from "@/components/site/floating-actions";
import { Chatbot } from "@/components/site/chatbot";
import { ScrollProgress } from "@/components/site/scroll-fx";
import { clinic } from "@/lib/data/clinic";

/** Structured data for Google — helps the clinic show up with stars,
 *  hours and location in search results. */
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: clinic.name,
  description: "CGHS empanelled dental clinic in Dwarka, New Delhi for implants, root canal, braces, aligners and kids dentistry.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "A-11, Vipin Garden, Near Fakkad Baba Road, Dwarka Mor",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    postalCode: "110059",
    addressCountry: "IN",
  },
  telephone: clinic.phone,
  email: clinic.email,
  url: "https://carewell.clinic",
  openingHours: ["Mo-Sa 09:30-14:00"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: clinic.stats.googleRating,
    reviewCount: clinic.stats.googleReviews,
  },
  priceRange: "₹₹",
  sameAs: [clinic.social.instagram, clinic.social.facebook, clinic.social.youtube],
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingActions />
      <Chatbot />
    </div>
  );
}
