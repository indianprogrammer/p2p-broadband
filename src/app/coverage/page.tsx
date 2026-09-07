"use client";

import { use, useState, useCallback } from "react";
import { useMessages } from "next-intl";
import type { Messages } from "@/lib/i18n/messages";
import { localizedPath } from "@/lib/i18n/config";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, CheckCircle, AlertCircle, Clock, Search, Loader2 } from "lucide-react";

const mpDistricts = [
  "Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal",
  "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna",
  "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone",
  "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Niwari", "Panna", "Raisen", "Rajgarh",
  "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri",
  "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"
];

const cgDistricts = [
  "Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada",
  "Dhamtari", "Durg", "Gariaband", "Gaurela-Pendra-Marwahi", "Janjgir-Champa", "Jashpur", "Kabirdham",
  "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur",
  "Rajnandgaon", "Sakti", "Sarangarh-Bilaigarh", "Sukma", "Surajpur", "Surguja"
];

const allDistricts = [...mpDistricts, ...cgDistricts];

// Mock pincode data - in production this would come from an API/database
const pincodeData: Record<string, { state: string; district: string; city: string; status: "available" | "coming" | "unavailable"; pop: string }> = {
  "490009": { state: "Chhattisgarh", district: "Durg", city: "Bhilai", status: "available", pop: "Bhilai PoP" },
  "490001": { state: "Chhattisgarh", district: "Durg", city: "Durg", status: "available", pop: "Durg PoP" },
  "492001": { state: "Chhattisgarh", district: "Raipur", city: "Raipur", status: "available", pop: "Raipur PoP" },
  "482001": { state: "Madhya Pradesh", district: "Jabalpur", city: "Jabalpur", status: "available", pop: "Jabalpur PoP" },
  "462001": { state: "Madhya Pradesh", district: "Bhopal", city: "Bhopal", status: "available", pop: "Bhopal PoP" },
  "452001": { state: "Madhya Pradesh", district: "Indore", city: "Indore", status: "available", pop: "Indore PoP" },
  "474001": { state: "Madhya Pradesh", district: "Gwalior", city: "Gwalior", status: "available", pop: "Gwalior PoP" },
  "486001": { state: "Madhya Pradesh", district: "Rewa", city: "Rewa", status: "available", pop: "Rewa PoP" },
  "484001": { state: "Madhya Pradesh", district: "Satna", city: "Satna", status: "available", pop: "Satna PoP" },
  "470001": { state: "Madhya Pradesh", district: "Sagar", city: "Sagar", status: "available", pop: "Sagar PoP" },
};

function checkPincode(pincode: string) {
  const data = pincodeData[pincode];
  if (!data) {
    // Check if district is in our list
    const firstTwo = pincode.slice(0, 2);
    const isMP = ["45", "46", "47", "48"].includes(firstTwo);
    const isCG = ["49"].includes(firstTwo);
    
    if (isMP || isCG) {
      return {
        state: isMP ? "Madhya Pradesh" : "Chhattisgarh",
        district: "Unknown",
        city: "Unknown",
        status: "coming" as const,
        pop: "Nearest PoP: TBD"
      };
    }
    return null;
  }
  return data;
}

export default function CoveragePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const messages = useMessages() as Messages;
  
  const { common, coverage } = messages;

  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState<ReturnType<typeof checkPincode> | null>(null);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!/^[1-9][0-9]{5}$/.test(pincode)) {
      setError("Please enter a valid 6-digit pincode");
      return;
    }

    setChecking(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const data = checkPincode(pincode);
    setResult(data);
    setChecking(false);
  }, [pincode]);


  return (
    <div className="flex-1">
      {/* Page Header */}
      <section className="py-16 lg:py-24 bg-muted/30" aria-labelledby="coverage-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 id="coverage-heading" className="text-display text-foreground">
              {coverage.title}
            </h1>
            <p className="mt-4 text-body-lg text-muted-foreground">
              {coverage.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Pincode Checker */}
      <section className="py-16 lg:py-20" aria-labelledby="checker-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-h2">{coverage.checkPincode.label}</CardTitle>
                <p className="text-muted-foreground mt-2">
                  Enter your 6-digit pincode to check if we serve your area
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCheck} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pincode" className="text-sm font-medium">
                      {coverage.checkPincode.label}
                    </Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
                      <Input
                        id="pincode"
                        type="text"
                        placeholder={coverage.checkPincode.placeholder}
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        className="pl-10 text-center text-lg tracking-widest"
                        maxLength={6}
                        disabled={checking}
                        aria-describedby={error ? "pincode-error" : undefined}
                      />
                    </div>
                    {error && (
                      <p id="pincode-error" className="text-sm text-destructive" role="alert">
                        {error}
                      </p>
                    )}
                  </div>
                  <Button type="submit" className="w-full" size="lg" loading={checking}>
                    {checking ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                        {coverage.checkPincode.checking}
                      </>
                    ) : (
                      <>
                        {coverage.checkPincode.button}
                        <Search className="h-5 w-5" aria-hidden="true" />
                      </>
                    )}
                  </Button>
                </form>

                {result && (
                  <div className="mt-6 p-4 rounded-xl border animate-slide-up" role="status" aria-live="polite">
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${result.status === "available" ? "bg-success/10 text-success" : result.status === "coming" ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"}`}>
                        {result.status === "available" && <CheckCircle className="h-5 w-5" aria-hidden="true" />}
                        {result.status === "coming" && <Clock className="h-5 w-5" aria-hidden="true" />}
                        {result.status === "unavailable" && <AlertCircle className="h-5 w-5" aria-hidden="true" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-lg">
                          {result.status === "available" 
                            ? coverage.checkPincode.resultAvailable
                                .replace("{pincode}", pincode)
                                .replace("{district}", result.district)
                                .replace("{state}", result.state)
                            : result.status === "coming"
                            ? coverage.checkPincode.resultComingSoon
                                .replace("{pincode}", pincode)
                                .replace("{district}", result.district)
                                .replace("{state}", result.state)
                            : coverage.checkPincode.resultNotAvailable
                                .replace("{pincode}", pincode)
                        }
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground flex items-center gap-2">
                          <MapPin className="h-4 w-4" aria-hidden="true" />
                          {coverage.checkPincode.nearestPop.replace("{pop}", result.pop)}
                        </p>
                      </div>
                      <Badge variant={result.status === "available" ? "success" : result.status === "coming" ? "warning" : "destructive"}>
                        {coverage.map.legend[result.status as keyof typeof coverage.map.legend] || result.status}
                      </Badge>
                    </div>
                    
                    {result.status === "available" && (
                      <div className="mt-4 pt-4 border-t border-border flex flex-col sm:flex-row gap-3">
                        <Link href={localizedPath("en", "/apply")} className="flex-1">
                          <Button className="w-full" size="lg" variant="apple">
                            {common.applyNow}
                          </Button>
                        </Link>
                        <a href={`https://wa.me/919993996840?text=${encodeURIComponent(`Hi, I'm at pincode ${pincode} (${result.district}, ${result.state}). Interested in getting a connection.`)}`} 
                           target="_blank" rel="noopener noreferrer" className="flex-1">
                          <Button className="w-full" size="lg" variant="outline">
                            {common.whatsappMessage.replace("{plan}", "broadband")}
                          </Button>
                        </a>
                      </div>
                    )}
                    
                    {result.status === "coming" && (
                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground text-center">
                          Leave your number and we&apos;ll notify you when service launches in your area.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Coverage Stats */}
      <section className="py-12 bg-muted/30" aria-labelledby="stats-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-primary">{allDistricts.length}</div>
              <div className="text-sm text-muted-foreground">Total Districts</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary">{mpDistricts.length}</div>
              <div className="text-sm text-muted-foreground">Madhya Pradesh</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary">{cgDistricts.length}</div>
              <div className="text-sm text-muted-foreground">Chhattisgarh</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* District Lists */}
      <section className="py-16 lg:py-24" aria-labelledby="districts-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 id="districts-heading" className="text-h1 text-foreground">
              Districts We Serve
            </h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              Click on a district to see major pincodes (demo - full list in production)
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Madhya Pradesh */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-primary" aria-hidden="true" />
                  {coverage.states.mp} ({mpDistricts.length} Districts)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
                  {mpDistricts.map((district) => (
                    <button
                      key={district}
                      className="text-left p-3 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors group"
                      onClick={() => {
                        // In production: navigate to district detail page
                        console.log(`District: ${district}`);
                      }}
                    >
                      <span className="inline-flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                        {district}
                      </span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chhattisgarh */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-primary" aria-hidden="true" />
                  {coverage.states.cg} ({cgDistricts.length} Districts)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
                  {cgDistricts.map((district) => (
                    <button
                      key={district}
                      className="text-left p-3 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors group"
                      onClick={() => {
                        console.log(`District: ${district}`);
                      }}
                    >
                      <span className="inline-flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                        {district}
                      </span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-16 lg:py-24 bg-muted/30" aria-labelledby="map-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 id="map-heading" className="text-h2 text-foreground">
              {coverage.map.title}
            </h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              Interactive map showing coverage across MP & CG. Green = Fully Served, Yellow = Coming Soon, Red = Planned.
            </p>
          </div>

          <div className="aspect-video rounded-2xl border border-border bg-muted/50 flex items-center justify-center">
            <div className="text-center p-8">
              <MapPin className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" aria-hidden="true" />
              <h3 className="text-xl font-semibold mb-2">Interactive Map (Coming Soon)</h3>
              <p className="text-muted-foreground mb-6">
                Full Mapbox GL integration with district boundaries, PoP locations, and real-time availability.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                <span className="flex items-center gap-2"><Badge variant="success" className="h-6 px-2">Fully Served</Badge></span>
                <span className="flex items-center gap-2"><Badge variant="warning" className="h-6 px-2">Coming Soon</Badge></span>
                <span className="flex items-center gap-2"><Badge variant="outline" className="h-6 px-2">Planned</Badge></span>
                <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> PoP Location</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 text-center" aria-labelledby="coverage-cta-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="coverage-cta-heading" className="text-h2 text-foreground">
            Didn&apos;t Find Your Area?
          </h2>
          <p className="mt-4 text-body-lg text-muted-foreground max-w-2xl mx-auto">
            We&apos;re expanding rapidly. Leave your details and we&apos;ll notify you when we reach your neighborhood.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={localizedPath("en", "/contact")}>
              <Button size="lg" variant="apple" className="gap-2 w-full sm:w-auto">
                {common.contactUs}
              </Button>
            </Link>
            <a href={`https://wa.me/919993996840?text=${encodeURIComponent("Hi, I'd like to know when P2P Broadband will be available in my area.")}`} 
               target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                {common.whatsappMessage.replace("{plan}", "availability updates")}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}