import { site } from "~/data/site";

/** Organisation details for Google (NGO structured data), added once in app.vue. */
export function useSiteSchema() {
  const origin = useSiteOrigin();
  useJsonLd({
    "@context": "https://schema.org",
    "@type": "NGO",
    "@id": `${origin}/#organization`,
    name: site.name,
    alternateName: [site.shortName, "Illchamus Community Development Organization", "Il Chamus Community"],
    url: origin,
    logo: `${origin}/logo.png`,
    image: `${origin}/images/og-image.jpg`,
    description:
      "Community based organisation preserving Illchamus culture and supporting families through education, health, livelihoods and Lake Baringo conservation in Baringo County, Kenya.",
    email: site.email,
    telephone: site.phone.replace(/\s/g, ""),
    areaServed: { "@type": "AdministrativeArea", name: "Baringo County, Kenya" },
    address: { "@type": "PostalAddress", addressRegion: "Baringo County", addressCountry: "KE" },
    knowsAbout: ["Illchamus culture", "Lake Baringo conservation", "Education", "Community health"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: site.email,
      telephone: site.phone.replace(/\s/g, ""),
      availableLanguage: ["English", "Swahili"],
    },
  });
}
