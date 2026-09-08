"use client";

import { use, useState } from "react";
import { useMessages } from "next-intl";
import type { Messages } from "@/lib/i18n/messages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Loader2, CheckCircle, AlertCircle, ArrowLeft, ArrowRight, Shield, Wifi, Monitor, Smartphone } from "@/components/ui/icons";

const plansData = [
  {
    id: "starter-10mbps",
    name: "Starter",
    speed: "10 Mbps",
    pricing: { quarterly: 999 },
    features: { data: "Unlimited (FUP 3.3 TB)", ott: "Not included", tvChannels: "Not included", installation: "₹500 (refundable)", support: "Standard", staticIp: "Not available" },
    popular: false,
  },
  {
    id: "basic-50mbps",
    name: "Basic",
    speed: "50 Mbps",
    pricing: { monthly: 499, annual: 5389 },
    features: { data: "Unlimited (FUP 3.3 TB)", ott: "Not included", tvChannels: "Not included", installation: "Free on annual", support: "Standard", staticIp: "Not available" },
    popular: false,
  },
  {
    id: "standard-100mbps",
    name: "Standard",
    speed: "100 Mbps",
    pricing: { monthly: 699, annual: 7549 },
    features: { data: "Unlimited (FUP 3.3 TB)", ott: "8 Premium Apps", tvChannels: "50+ SD Channels", installation: "Free", support: "Priority", staticIp: "Available (₹199/mo)" },
    popular: true,
  },
  {
    id: "premium-300mbps",
    name: "Premium",
    speed: "300 Mbps",
    pricing: { monthly: 1499, annual: 16189 },
    features: { data: "Unlimited (FUP 3.3 TB)", ott: "8 Premium Apps", tvChannels: "200+ SD/HD Channels", installation: "Free", support: "Priority + Dedicated", staticIp: "Included" },
    popular: false,
  },
];

const steps = [
  { id: "plan", title: "Select Plan", icon: Wifi },
  { id: "personal", title: "Your Details", icon: Smartphone },
  { id: "address", title: "Address", icon: Monitor },
  { id: "kyc", title: "KYC Documents", icon: Shield },
  { id: "review", title: "Review & Submit", icon: CheckCircle },
];

const cycleOptions = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "annual", label: "Annual (Save 20%)" },
];

export default function ApplyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  use(params);
  const messages = useMessages() as Messages;
  
  const { common, apply, plans } = messages;

  const preSelectedPlan =
    typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("plan") : null;

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    planId: preSelectedPlan || "standard-100mbps",
    billingCycle: "monthly",
    fullName: "",
    mobile: "",
    email: "",
    aadhaarLast4: "",
    otp: "",
    otpVerified: false,
    pincode: "",
    state: "",
    district: "",
    city: "",
    area: "",
    landmark: "",
    lat: "",
    lng: "",
    aadhaarFront: null as File | null,
    aadhaarBack: null as File | null,
    selfie: null as File | null,
    agreeTerms: false,
    marketingConsent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  const selectedPlan = plansData.find(p => p.id === formData.planId) || plansData[2];
  const planPrice = selectedPlan.pricing[formData.billingCycle as keyof typeof selectedPlan.pricing] || selectedPlan.pricing.monthly || 0;
  const gst = Math.round(planPrice * 0.18);
  const totalWithGst = planPrice + gst;

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (step === 0) {
      if (!formData.planId) newErrors.planId = "Please select a plan";
      if (!formData.billingCycle) newErrors.billingCycle = "Please select a billing cycle";
    }
    
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
      if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
      else if (!/^[6-9]\d{9}$/.test(formData.mobile.replace(/\D/g, ""))) newErrors.mobile = "Invalid 10-digit mobile number";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
      if (!formData.aadhaarLast4.trim()) newErrors.aadhaarLast4 = "Last 4 digits of Aadhaar required";
      else if (!/^\d{4}$/.test(formData.aadhaarLast4)) newErrors.aadhaarLast4 = "Enter exactly 4 digits";
      if (!formData.otpVerified) newErrors.otp = "Please verify OTP";
    }
    
    if (step === 2) {
      if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
      else if (!/^[1-9][0-9]{5}$/.test(formData.pincode)) newErrors.pincode = "Invalid 6-digit pincode";
      if (!formData.state.trim()) newErrors.state = "State is required";
      if (!formData.district.trim()) newErrors.district = "District is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.area.trim()) newErrors.area = "Area/Colony is required";
    }
    
    if (step === 3) {
      if (!formData.aadhaarFront) newErrors.aadhaarFront = "Aadhaar front is required";
      if (!formData.aadhaarBack) newErrors.aadhaarBack = "Aadhaar back is required";
    }
    
    if (step === 4) {
      if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to terms and conditions";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setSubmitting(true);
    setSubmitStatus("idle");

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus("success");
      // In production: redirect to success page with ref
    } catch {
      setSubmitStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOtpSend = async () => {
    if (!/^[6-9]\d{9}$/.test(formData.mobile.replace(/\D/g, ""))) {
      setErrors(prev => ({ ...prev, mobile: "Invalid mobile number" }));
      return;
    }
    setOtpSent(true);
    setOtpTimer(60);
    const timer = setInterval(() => {
      setOtpTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    // In production: send OTP via SMS API
  };

  const handleOtpVerify = () => {
    if (formData.otp.length === 6) {
      // In production: verify OTP via API
      setFormData(prev => ({ ...prev, otpVerified: true }));
    }
  };

  const handleFileChange = (field: string, file: File | null) => {
    if (file && file.size > 2 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, [field]: "File must be less than 2 MB" }));
      return;
    }
    if (file && !["image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
      setErrors(prev => ({ ...prev, [field]: "Only JPG, PNG, PDF allowed" }));
      return;
    }
    setFormData(prev => ({ ...prev, [field]: file }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const handlePincodeLookup = async () => {
    if (!/^[1-9][0-9]{5}$/.test(formData.pincode)) return;
    // In production: call API to get address from pincode
    // Mock data for demo
    const mockData: Record<string, { state: string; district: string; city: string }> = {
      "490009": { state: "Chhattisgarh", district: "Durg", city: "Bhilai" },
      "492001": { state: "Chhattisgarh", district: "Raipur", city: "Raipur" },
      "462001": { state: "Madhya Pradesh", district: "Bhopal", city: "Bhopal" },
      "452001": { state: "Madhya Pradesh", district: "Indore", city: "Indore" },
    };
    const data = mockData[formData.pincode];
    if (data) {
      setFormData(prev => ({ ...prev, ...data }));
    }
  };

  return (
    <div className="flex-1 min-h-screen">
      {/* Progress Header */}
      <header className="sticky top-16 z-30 bg-background/80 backdrop-blur-lg border-b border-border/50 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="h-6 w-6 text-primary" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="2" />
                <path d="M16 8V24M8 16H24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="text-lg font-bold">P2P Broadband</span>
            </div>
            <div className="hidden md:flex items-center gap-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all ${
                    index < currentStep ? "bg-success text-white" : index === currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {index < currentStep ? <Check className="h-4 w-4" /> : index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-20 h-0.5 mx-2 transition-all ${index < currentStep ? "bg-success" : "bg-border"}`} />
                  )}
                  <span className={`text-xs font-medium ${index <= currentStep ? "text-foreground" : "text-muted-foreground"}`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl">
          {/* Step Content */}
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Step 1: Plan Selection */}
            <div className={`animate-slide-up ${currentStep !== 0 ? "hidden" : ""}`}>
              <div className="mb-6">
                <h2 className="text-h2 text-foreground">{apply.steps.plan}</h2>
                <p className="text-muted-foreground mt-1">{apply.plan.title}</p>
              </div>

              <div className="space-y-4">
                {plansData.map((plan) => (
                  <Card
                    key={plan.id}
                    className={`relative cursor-pointer transition-all border-2 ${formData.planId === plan.id ? "border-primary bg-accent/50" : "border-border hover:border-primary/50"}`}
                    onClick={() => setFormData(prev => ({ ...prev, planId: plan.id }))}
                  >
                    {plan.popular && (
                      <div className="absolute -top-2 right-4">
                        <Badge variant="success" className="text-xs">{plans.mostPopular}</Badge>
                      </div>
                    )}
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{plan.name}</h3>
                          <p className="text-muted-foreground text-sm">{plan.speed}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-foreground">₹{planPrice}</div>
                          <div className="text-xs text-muted-foreground">/month*</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Billing Cycle */}
              <div className="mt-6">
                <Label className="block mb-3 font-medium">{apply.plan.billingLabel}</Label>
                <Tabs defaultValue={formData.billingCycle} onValueChange={(v) => setFormData(prev => ({ ...prev, billingCycle: v }))}>
                  <TabsList className="grid grid-cols-3 gap-1">
                    {cycleOptions.map((cycle) => (
                      <TabsTrigger key={cycle.value} value={cycle.value} className="py-3">
                        {cycle.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>

              <p className="mt-4 text-xs text-muted-foreground text-center">
                * {common.gstNotice} • {plans.fairUsage}
              </p>
            </div>

            {/* Step 2: Personal Details */}
            <div className={`${currentStep !== 1 ? "hidden" : ""} animate-slide-up`}>
              <div className="mb-6">
                <h2 className="text-h2 text-foreground">{apply.steps.personal}</h2>
                <p className="text-muted-foreground mt-1">{apply.personal.title}</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">{apply.personal.fullName}</Label>
                  <Input
                    id="fullName"
                    placeholder={apply.personal.fullNamePlaceholder}
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    error={errors.fullName}
                    disabled={submitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile">{apply.personal.mobile}</Label>
                  <div className="flex gap-2">
                    <Input
                      id="mobile"
                      placeholder={apply.personal.mobilePlaceholder}
                      value={formData.mobile}
                      onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
                      error={errors.mobile}
                      disabled={submitting || formData.otpVerified}
                      className="flex-1"
                    />
                    {formData.otpVerified ? (
                      <Badge variant="success" className="self-end mb-1.5">{common.confirm}</Badge>
                    ) : (
                      <Button type="button" variant="outline" onClick={handleOtpSend} disabled={otpSent && otpTimer > 0 || submitting} className="self-end mb-1.5">
                        {otpSent && otpTimer > 0 ? `${apply.personal.resendOtp.replace("{seconds}", otpTimer.toString())}` : apply.personal.otpButton}
                      </Button>
                    )}
                  </div>
                </div>

                {otpSent && !formData.otpVerified && (
                  <div className="space-y-2">
                    <Label htmlFor="otp">{apply.personal.otpLabel}</Label>
                    <div className="flex gap-2">
                      <Input
                        id="otp"
                        placeholder={apply.personal.otpPlaceholder}
                        value={formData.otp}
                        onChange={(e) => setFormData(prev => ({ ...prev, otp: e.target.value.replace(/\D/g, "").slice(0, 6) }))}
                        error={errors.otp}
                        className="flex-1 text-center text-lg tracking-widest"
                        maxLength={6}
                      />
                      <Button type="button" variant="apple" onClick={handleOtpVerify} disabled={formData.otp.length !== 6 || submitting}>
                        {apply.personal.verifyOtp}
                      </Button>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">{apply.personal.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={apply.personal.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    error={errors.email}
                    disabled={submitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aadhaarLast4">{apply.personal.aadhaar}</Label>
                  <Input
                    id="aadhaarLast4"
                    placeholder={apply.personal.aadhaarPlaceholder}
                    value={formData.aadhaarLast4}
                    onChange={(e) => setFormData(prev => ({ ...prev, aadhaarLast4: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                    error={errors.aadhaarLast4}
                    disabled={submitting}
                    maxLength={4}
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Address */}
            <div className={`${currentStep !== 2 ? "hidden" : ""} animate-slide-up`}>
              <div className="mb-6">
                <h2 className="text-h2 text-foreground">{apply.steps.address}</h2>
                <p className="text-muted-foreground mt-1">{apply.address.title}</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pincode">{apply.address.pincode}</Label>
                  <div className="flex gap-2">
                    <Input
                      id="pincode"
                      placeholder={apply.address.pincodePlaceholder}
                      value={formData.pincode}
                      onChange={(e) => setFormData(prev => ({ ...prev, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) }))}
                      error={errors.pincode}
                      disabled={submitting}
                      maxLength={6}
                      className="flex-1"
                    />
                    <Button type="button" variant="outline" onClick={handlePincodeLookup} disabled={submitting}>
                      {apply.address.autoFill}
                    </Button>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">{apply.address.state}</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                      error={errors.state}
                      disabled={submitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">{apply.address.district}</Label>
                    <Input
                      id="district"
                      value={formData.district}
                      onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value }))}
                      error={errors.district}
                      disabled={submitting}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">{apply.address.city}</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                      error={errors.city}
                      disabled={submitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area">{apply.address.area}</Label>
                    <Input
                      id="area"
                      placeholder={apply.address.area}
                      value={formData.area}
                      onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
                      error={errors.area}
                      disabled={submitting}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="landmark">{apply.address.landmark}</Label>
                  <Input
                    id="landmark"
                    placeholder={apply.address.landmarkPlaceholder}
                    value={formData.landmark}
                    onChange={(e) => setFormData(prev => ({ ...prev, landmark: e.target.value }))}
                    disabled={submitting}
                  />
                </div>

                <Button type="button" variant="ghost" className="w-full justify-start">
                  <Monitor className="h-4 w-4 mr-2" />
                  {apply.address.useCurrentLocation}
                </Button>
              </div>
            </div>

            {/* Step 4: KYC Documents */}
            <div className={`${currentStep !== 3 ? "hidden" : ""} animate-slide-up`}>
              <div className="mb-6">
                <h2 className="text-h2 text-foreground">{apply.steps.kyc}</h2>
                <p className="text-muted-foreground mt-1">{apply.kyc.description}</p>
              </div>

              <div className="space-y-6">
                {[
                  { field: "aadhaarFront", label: apply.kyc.aadhaarFront, required: true },
                  { field: "aadhaarBack", label: apply.kyc.aadhaarBack, required: true },
                  { field: "selfie", label: apply.kyc.selfie, required: false },
                ].map((doc) => {
                  const selectedFile = formData[doc.field as keyof typeof formData] as File | null;
                  return (
                  <div key={doc.field} className="space-y-2">
                    <Label htmlFor={doc.field}>
                      {doc.label} {doc.required && <span className="text-destructive">*</span>}
                    </Label>
                    <div
                      className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${formData[doc.field as keyof typeof formData] ? "border-primary bg-accent/50" : "border-border hover:border-primary/50"}`}
                      onClick={() => document.getElementById(doc.field)?.click()}
                      onDrop={(e) => { e.preventDefault(); handleFileChange(doc.field, e.dataTransfer.files[0]); }}
                      onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add("border-primary", "bg-accent/50"); }}
                      onDragLeave={(e) => { e.currentTarget.classList.remove("border-primary", "bg-accent/50"); }}
                    >
                      <input
                        id={doc.field}
                        type="file"
                        accept="image/jpeg,image/png,application/pdf"
                        className="hidden"
                        onChange={(e) => handleFileChange(doc.field, e.target.files?.[0] ?? null)}
                        disabled={submitting}
                      />
                      {selectedFile ? (
                        <div className="flex items-center justify-center gap-3 text-success">
                          <CheckCircle className="h-6 w-6" />
                          <div>
                            <p className="font-medium">{selectedFile.name}</p>
                            <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-muted-foreground">{apply.kyc.dragDrop}</p>
                          <p className="text-xs text-muted-foreground mt-1">{apply.kyc.fileTypes}</p>
                        </div>
                      )}
                    </div>
                    {errors[doc.field] && <p className="text-sm text-destructive" role="alert">{errors[doc.field]}</p>}
                  </div>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Review & Submit */}
            <div className={`${currentStep !== 4 ? "hidden" : ""} animate-slide-up`}>
              <div className="mb-6">
                <h2 className="text-h2 text-foreground">{apply.steps.review}</h2>
              </div>

              <div className="space-y-6">
                {/* Plan Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wifi className="h-5 w-5 text-primary" />
                      {apply.review.planSummary}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{apply.personal.fullName}</span>
                      <span className="font-medium">{selectedPlan.name} ({selectedPlan.speed})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{plans.billingCycle[formData.billingCycle as keyof typeof plans.billingCycle] || formData.billingCycle}</span>
                      <span className="font-medium">₹{planPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">GST (18%)</span>
                      <span>+₹{gst}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>₹{totalWithGst}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Personal Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5 text-primary" />
                      {apply.review.personalSummary}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span>{formData.fullName}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Mobile</span><span>{formData.mobile}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span>{formData.email}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Aadhaar (last 4)</span><span>{formData.aadhaarLast4}</span></div>
                  </CardContent>
                </Card>

                {/* Address Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Monitor className="h-5 w-5 text-primary" />
                      {apply.review.addressSummary}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Pincode</span><span>{formData.pincode}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Address</span><span>{formData.area}, {formData.city}, {formData.district}, {formData.state}</span></div>
                    {formData.landmark && <div className="flex justify-between"><span className="text-muted-foreground">Landmark</span><span>{formData.landmark}</span></div>}
                  </CardContent>
                </Card>

                {/* Consent */}
                <Card>
                  <CardContent className="space-y-4 pt-0">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={(e) => setFormData(prev => ({ ...prev, agreeTerms: e.target.checked }))}
                        className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-primary"
                        required
                      />
                      <Label htmlFor="agreeTerms" className="text-sm cursor-pointer">
                        {apply.review.terms}
                      </Label>
                    </div>
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="marketingConsent"
                        checked={formData.marketingConsent}
                        onChange={(e) => setFormData(prev => ({ ...prev, marketingConsent: e.target.checked }))}
                        className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-primary"
                      />
                      <Label htmlFor="marketingConsent" className="text-sm cursor-pointer">
                        {apply.review.marketing}
                      </Label>
                    </div>
                    {errors.agreeTerms && <p className="text-sm text-destructive" role="alert">{errors.agreeTerms}</p>}
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <Button type="submit" className="w-full" size="xl" loading={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      {apply.review.submitting}
                    </>
                  ) : (
                    apply.review.submit
                  )}
                </Button>

                {submitStatus === "success" && (
                  <div className="animate-slide-up text-center p-6 rounded-2xl bg-success/10 border border-success/20" role="alert">
                    <CheckCircle className="h-12 w-12 mx-auto text-success mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{apply.review.success.title}</h3>
                    <p className="text-muted-foreground mb-4">{apply.review.success.message.replace("{ref}", "P2P-CONFIRMED")}</p>
                    <p className="text-sm text-success mb-6">{apply.review.success.whatsapp}</p>
                    <div className="space-y-2 text-left text-sm">
                      {apply.review.success.steps.map((step, i) => (
                        <div key={i} className="flex items-center gap-2 text-muted-foreground">
                          <span className="h-5 w-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium">{i + 1}</span>
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="animate-slide-up text-center p-4 rounded-xl bg-destructive/10 border border-destructive/20" role="alert">
                    <AlertCircle className="h-6 w-6 mx-auto text-destructive mb-2" />
                    <p className="text-destructive">Failed to submit. Please try again.</p>
                  </div>
                )}
              </div>
            </div>
          </form>

          {/* Navigation Buttons */}
          <div className="mt-8 flex items-center justify-between pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0 || submitting}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {common.previous}
            </Button>
            <div className="flex gap-3">
              {currentStep < steps.length - 1 ? (
                <Button type="button" onClick={handleNext} disabled={submitting} className="gap-2">
                  {common.next}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" form="apply-form" disabled={submitting} size="lg" className="gap-2">
                  {apply.review.submit}
                  <Check className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}