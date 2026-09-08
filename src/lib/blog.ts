export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  body: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "welcome-p2p-broadband",
    title: "Welcome to P2P Broadband: High-Speed Internet for Central India",
    excerpt:
      "We're excited to launch our new website and share our mission to bring fiber internet to every home in Madhya Pradesh and Chhattisgarh.",
    category: "news",
    date: "2026-09-01",
    readTime: "3 min read",
    body: [
      { type: "p", text: "Welcome to the new P2P Broadband website. We built this space to make choosing, installing, and managing your fiber internet connection simpler than ever — whether you are at home in Bhilai, a small business in Indore, or a family in Raipur." },
      { type: "h2", text: "Who we are" },
      { type: "p", text: "P2P Broadband is a licensed Category-A Internet Service Provider based in Bhilai, Chhattisgarh. We run a modern GPON fiber network and also provide CCTV installation for homes and businesses. Our team is local, our support is in your language, and our technicians are never more than a short drive away." },
      { type: "h2", text: "What we offer" },
      { type: "ul", items: [
        "Fiber internet plans from 10 Mbps to 300 Mbps with unlimited data and no sync fees",
        "Free Wi-Fi 6 dual-band router on annual plans",
        "Bundled TV channels and OTT apps like Disney+ Hotstar, SonyLIV, ZEE5, and JioCinema",
        "Same-day installation in select areas and remote support within hours",
      ]},
      { type: "p", text: "We believe fast, reliable internet is a basic utility. Our mission is to connect every home and business across the 55 districts of Madhya Pradesh and 33 districts of Chhattisgarh with a fiber line that does not bend, buffer, or break." },
      { type: "h2", text: "How to get started" },
      { type: "p", text: "Check your pincode on our coverage page, pick the plan that fits your family, and apply online. Our team will confirm availability, schedule installation, and have you online the same week — usually the same day." },
    ],
  },
  {
    slug: "new-300mbps-plan",
    title: "Introducing 300 Mbps Plan with Full OTT & TV Bundle",
    excerpt:
      "Our new Premium plan includes 200+ TV channels, 8 premium OTT apps, free Wi-Fi 6 router, and static IP — all for ₹1,499/month.",
    category: "offers",
    date: "2026-08-15",
    readTime: "2 min read",
    body: [
      { type: "p", text: "Heavy households, content creators, and small offices — your plan is here. The new Premium 300 Mbps fiber plan bundles everything you need for ₹1,499/month before GST." },
      { type: "h2", text: "What's included" },
      { type: "ul", items: [
        "300 Mbps download speed with unlimited monthly data (3.3 TB FUP)",
        "200+ SD/HD TV channels with the premium STB bundle",
        "8 premium OTT apps: Disney+ Hotstar, SonyLIV, ZEE5, JioCinema, Discovery+, Sun NXT, Eros Now, and Hoichoi",
        "A static IP address included for servers, NAS, and remote access",
        "Free installation plus a Wi-Fi 6 dual-band router on annual commitment",
      ]},
      { type: "p", text: "With 300 Mbps you can stream 4K and even 8K content on multiple TVs, host heavy video calls, download large files instantly, and run a connected smart home without a single moment of contention." },
      { type: "h2", text: "Priority support included" },
      { type: "p", text: "Premium customers get dedicated priority support in addition to our 24/7 network monitoring. Most issues are resolved remotely within two hours, and local field visits are typically scheduled within 24 hours." },
      { type: "p", text: "Upgrade today from the plans page — changes take effect from your next billing cycle with no change fee." },
    ],
  },
  {
    slug: "network-expansion-2024",
    title: "Network Expansion: Now Covering All 88 Districts",
    excerpt:
      "We've completed our rollout across all 55 districts of MP and 33 districts of Chhattisgarh. Check if your area is covered!",
    category: "expansion",
    date: "2026-07-20",
    readTime: "4 min read",
    body: [
      { type: "p", text: "We have a big milestone to celebrate: P2P Broadband now covers all 88 districts across Madhya Pradesh and Chhattisgarh — 55 districts in MP and 33 districts in Chhattisgarh." },
      { type: "h2", text: "What this means for you" },
      { type: "ul", items: [
        "Fiber service is available in cities, towns, and large villages across both states",
        "New connections are being provisioned every week as local zones go live",
        "The same plans, prices, and support standards apply everywhere",
      ]},
      { type: "h2", text: "Coverage can be street-specific" },
      { type: "p", text: "State and district coverage is just the start — availability at your exact address depends on local fiber ducts and access points. That is why we built a pincode checker: enter your pincode on the coverage page and we'll tell you immediately whether service is available at your location." },
      { type: "h2", text: "Still not covered?" },
      { type: "p", text: "If your pincode shows 'not yet available', leave your details and we will contact you the moment your area goes live. Expansion follows demand, so every request helps us prioritise the next zone." },
      { type: "p", text: "Check availability now on the coverage page." },
    ],
  },
  {
    slug: "wifi6-router-benefits",
    title: "Why Wi-Fi 6 Router Matters for Your Home Internet",
    excerpt:
      "Learn how our free Wi-Fi 6 router improves speed, coverage, and device capacity for modern smart homes.",
    category: "tips",
    date: "2026-06-10",
    readTime: "5 min read",
    body: [
      { type: "p", text: "Your fiber connection is only as good as the Wi-Fi that delivers it. Even a 300 Mbps line can feel slow over an ageing router. That's why every annual P2P Broadband plan includes a Wi-Fi 6 dual-band router at no extra cost." },
      { type: "h2", text: "What makes Wi-Fi 6 different" },
      { type: "ul", items: [
        "Faster speeds on the 5 GHz band with more efficient data encoding",
        "Better performance when many devices share the network at once",
        "Lower latency for gaming and video calls",
        "Improved range and signal quality through wider channels",
      ]},
      { type: "h2", text: "A real difference for smart homes" },
      { type: "p", text: "A typical Indian household now runs 10–20 connected devices — smartphones, laptops, TVs, speakers, and smart appliances. Older routers slow down as each device competes for airtime. Wi-Fi 6 handles this congestion gracefully, keeping every device fast at the same time." },
      { type: "h2", text: "Realistic expectations" },
      { type: "p", text: "Your Wi-Fi will typically deliver 90–95% of your plan speed; the full speed is always available over a wired Ethernet cable. For power users and offices, we also offer static IP and a direct fiber connection." },
      { type: "p", text: "Ask about the free Wi-Fi 6 router when you apply — it comes with every annual plan." },
    ],
  },
  {
    slug: "monsoon-network-readiness",
    title: "Monsoon Ready: How We Keep You Connected During Rains",
    excerpt:
      "Our network engineering team shares how we maintain 99.9% uptime even during heavy monsoons in Central India.",
    category: "news",
    date: "2026-05-15",
    readTime: "3 min read",
    body: [
      { type: "p", text: "Monsoons in Central India can be intense. Heavy rain, wind, and lightning are exactly when you need your internet the most — to work from home, keep kids studying, and stay in touch with family. Here's how we keep the network up through the wet season." },
      { type: "h2", text: "Built for the climate" },
      { type: "ul", items: [
        "Fibre optics are buried or weather-sealed along protected routes",
        "Weatherproof enclosures and surge protection at the premises",
        "A backup power path on our distribution nodes to survive local outages",
      ]},
      { type: "h2", text: "Monitoring and response" },
      { type: "p", text: "Our network is monitored 24/7. When a segment degrades, we know before you do. Most issues are diagnosed and fixed remotely within two hours. If a field visit is needed, our local technicians arrive within 24 hours — through the rain included." },
      { type: "h2", text: "What you can do" },
      { type: "p", text: "Keep your router plugged into a surge protector, position it high and central, and register for our WhatsApp support number so you can report an outage in seconds. You can reach us at +91 99939 96840, 10 AM to 7 PM, Monday to Saturday." },
      { type: "p", text: "A little preparation plus a well-built network means your work and entertainment never stop — whatever the weather outside." },
    ],
  },
  {
    slug: "referral-program-launch",
    title: "Refer a Friend, Get 1 Month Free!",
    excerpt:
      "Our new referral program rewards you and your friends. Share your unique code and enjoy free internet.",
    category: "offers",
    date: "2026-04-01",
    readTime: "2 min read",
    body: [
      { type: "p", text: "People who love their internet tell their friends — and now we're making that worthwhile. The P2P Broadband referral program gives you one month of free service for every friend who joins on a monthly, quarterly, or annual plan." },
      { type: "h2", text: "How it works" },
      { type: "ul", items: [
        "You receive a unique referral code from your account or WhatsApp support",
        "Share your code with friends, family, or colleagues in MP and Chhattisgarh",
        "When their connection goes live, you both get one month free applied to your next bill",
      ]},
      { type: "h2", text: "Fair and simple rules" },
      { type: "p", text: "There is no cap on how many friends you can refer — each successful connection earns another free month. Credits apply automatically to your next billing cycle, and there's nothing to claim or chase." },
      { type: "h2", text: "Get your code" },
      { type: "p", text: "Message us on WhatsApp at +91 99939 96840 with the word REFER, and we'll send your unique code plus a shareable link for WhatsApp, Facebook, and Instagram. Good internet is better shared." },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getPostSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}