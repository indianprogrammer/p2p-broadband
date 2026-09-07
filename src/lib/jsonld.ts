export function generateLocalBusinessJsonLd(locale: string = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://p2pbroadband.in/#organization",
    name: "P2P BROADBAND & CCTV",
    alternateName: "P2P Broadband",
    description: locale === "hi" 
      ? "मध्य प्रदेश और छत्तीसगढ़ में हाई-स्पीड फाइबर इंटरनेट, टीवी चैनल और OTT ऐप्स के साथ।"
      : "High-speed fiber internet with TV channels & OTT apps across Madhya Pradesh & Chhattisgarh.",
    url: "https://p2pbroadband.in",
    telephone: "+91-99939-96840",
    email: "p2infra@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Dindayal, Supela, Khamariya",
      addressLocality: "Bhilai",
      addressRegion: "Chhattisgarh",
      postalCode: "490009",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 21.2052243,
      longitude: 81.3484489,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    priceRange: "₹333 - ₹1,769/month",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Credit Card, Debit Card, UPI, Net Banking",
    areaServed: [
      {
        "@type": "State",
        name: "Madhya Pradesh",
        containedInPlace: { "@type": "Country", name: "India" },
      },
      {
        "@type": "State",
        name: "Chhattisgarh",
        containedInPlace: { "@type": "Country", name: "India" },
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Broadband Plans",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Starter 10 Mbps",
          description: "10 Mbps unlimited data, quarterly billing",
          price: 999,
          priceCurrency: "INR",
          billingPeriod: "P3M",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "Basic 50 Mbps",
          description: "50 Mbps unlimited data, monthly billing",
          price: 499,
          priceCurrency: "INR",
          billingPeriod: "P1M",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "Standard 100 Mbps",
          description: "100 Mbps unlimited data with OTT & TV channels",
          price: 699,
          priceCurrency: "INR",
          billingPeriod: "P1M",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "Premium 300 Mbps",
          description: "300 Mbps unlimited data with full OTT & TV bundle",
          price: 1499,
          priceCurrency: "INR",
          billingPeriod: "P1M",
          availability: "https://schema.org/InStock",
        },
      ],
    },
    sameAs: [
      "https://maps.app.goo.gl/hXvcSq87b4PdavJV7",
      "https://www.facebook.com/p2pbroadband",
      "https://www.twitter.com/p2pbroadband",
      "https://www.instagram.com/p2pbroadband",
      "https://www.youtube.com/@p2pbroadband",
    ],
  };
}

export function generateProductJsonLd(planId: string, locale: string = "en") {
  const plans: Record<string, { name: string; description: string; price: number; billingPeriod: string }> = {
    "starter-10mbps": {
      name: "Starter 10 Mbps",
      description: "10 Mbps unlimited fiber internet with quarterly billing",
      price: 999,
      billingPeriod: "P3M",
    },
    "basic-50mbps": {
      name: "Basic 50 Mbps",
      description: "50 Mbps unlimited fiber internet",
      price: 499,
      billingPeriod: "P1M",
    },
    "standard-100mbps": {
      name: "Standard 100 Mbps",
      description: "100 Mbps unlimited fiber with 8 OTT apps & 50+ TV channels",
      price: 699,
      billingPeriod: "P1M",
    },
    "premium-300mbps": {
      name: "Premium 300 Mbps",
      description: "300 Mbps unlimited fiber with 8 OTT apps & 200+ TV channels, static IP included",
      price: 1499,
      billingPeriod: "P1M",
    },
  };

  const plan = plans[planId];
  if (!plan) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: plan.name,
    description: locale === "hi" ? plan.description.replace(/unlimited/g, "अनलिमिटेड").replace(/fiber/gi, "फाइबर") : plan.description,
    brand: {
      "@type": "Brand",
      name: "P2P Broadband",
    },
    offers: {
      "@type": "Offer",
      url: `https://p2pbroadband.in/${locale}/apply?plan=${planId}`,
      priceCurrency: "INR",
      price: plan.price,
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceCurrency: "INR",
        price: plan.price,
        billingPeriod: plan.billingPeriod,
      },
      seller: {
        "@type": "Organization",
        name: "P2P BROADBAND & CCTV",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "1247",
    },
  };
}

export function generateFAQJsonLd(faqs: Array<{ question: string; answer: string }>, locale: string = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: locale === "hi" ? faq.question : faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: locale === "hi" ? faq.answer : faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
