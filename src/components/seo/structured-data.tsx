import Script from "next/script";
import {
  generatePersonSchema,
  generateWebsiteSchema,
  generateServiceSchema,
} from "@/lib/schema";

export function StructuredData() {
  const personSchema = generatePersonSchema();
  const websiteSchema = generateWebsiteSchema();
  const serviceSchema = generateServiceSchema();

  return (
    <>
      {/* Person Schema */}
      <Script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      {/* Website Schema */}
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      {/* Service Schema */}
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
    </>
  );
}
