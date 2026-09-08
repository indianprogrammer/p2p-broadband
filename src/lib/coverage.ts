export type CoverageStatus = "available" | "partial" | "planned";

export interface CoveragePoint {
  city: string;
  state: "Madhya Pradesh" | "Chhattisgarh";
  lat: number;
  lng: number;
  status: CoverageStatus;
  pincode?: string;
}

export const SERVED_POPS: CoveragePoint[] = [
  { city: "Bhilai", state: "Chhattisgarh", lat: 21.19, lng: 81.31, status: "available", pincode: "490009" },
  { city: "Durg", state: "Chhattisgarh", lat: 21.19, lng: 81.28, status: "available", pincode: "490001" },
  { city: "Raipur", state: "Chhattisgarh", lat: 21.25, lng: 81.63, status: "available", pincode: "492001" },
  { city: "Jabalpur", state: "Madhya Pradesh", lat: 23.18, lng: 79.98, status: "available", pincode: "482001" },
  { city: "Bhopal", state: "Madhya Pradesh", lat: 23.26, lng: 77.41, status: "available", pincode: "462001" },
  { city: "Indore", state: "Madhya Pradesh", lat: 22.72, lng: 75.85, status: "available", pincode: "452001" },
  { city: "Gwalior", state: "Madhya Pradesh", lat: 26.22, lng: 78.17, status: "available", pincode: "474001" },
  { city: "Rewa", state: "Madhya Pradesh", lat: 24.53, lng: 81.3, status: "available", pincode: "486001" },
  { city: "Satna", state: "Madhya Pradesh", lat: 24.6, lng: 80.82, status: "available", pincode: "484001" },
  { city: "Sagar", state: "Madhya Pradesh", lat: 23.83, lng: 78.74, status: "available", pincode: "470001" },
];

export const PARTIAL_POPS: CoveragePoint[] = [
  { city: "Ujjain", state: "Madhya Pradesh", lat: 23.18, lng: 75.79, status: "partial" },
  { city: "Ratlam", state: "Madhya Pradesh", lat: 23.33, lng: 75.04, status: "partial" },
  { city: "Khargone", state: "Madhya Pradesh", lat: 21.82, lng: 75.61, status: "partial" },
  { city: "Chhindwara", state: "Madhya Pradesh", lat: 22.06, lng: 78.94, status: "partial" },
  { city: "Seoni", state: "Madhya Pradesh", lat: 22.09, lng: 79.55, status: "partial" },
  { city: "Balaghat", state: "Madhya Pradesh", lat: 21.8, lng: 80.19, status: "partial" },
  { city: "Bilaspur", state: "Chhattisgarh", lat: 22.08, lng: 82.15, status: "partial" },
  { city: "Korba", state: "Chhattisgarh", lat: 22.35, lng: 82.68, status: "partial" },
];

export const PLANNED_POPS: CoveragePoint[] = [
  { city: "Betul", state: "Madhya Pradesh", lat: 21.9, lng: 77.9, status: "planned" },
  { city: "Vidisha", state: "Madhya Pradesh", lat: 23.53, lng: 77.81, status: "planned" },
  { city: "Katni", state: "Madhya Pradesh", lat: 23.84, lng: 80.39, status: "planned" },
  { city: "Mandla", state: "Madhya Pradesh", lat: 22.6, lng: 80.37, status: "planned" },
  { city: "Morena", state: "Madhya Pradesh", lat: 26.5, lng: 77.99, status: "planned" },
  { city: "Khandwa", state: "Madhya Pradesh", lat: 21.83, lng: 76.35, status: "planned" },
  { city: "Neemuch", state: "Madhya Pradesh", lat: 24.48, lng: 74.86, status: "planned" },
  { city: "Rajnandgaon", state: "Chhattisgarh", lat: 21.09, lng: 81.03, status: "planned" },
  { city: "Mahasamund", state: "Chhattisgarh", lat: 21.11, lng: 82.1, status: "planned" },
];

export const allCoveragePoints: CoveragePoint[] = [
  ...SERVED_POPS,
  ...PARTIAL_POPS,
  ...PLANNED_POPS,
];

export function findPointByPincode(pincode: string): CoveragePoint | undefined {
  return SERVED_POPS.find((p) => p.pincode === pincode);
}