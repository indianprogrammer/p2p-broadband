"use client";

import { use, useState } from "react";
import { useMessages } from "next-intl";
import type { Messages } from "@/lib/i18n/messages";
import { localizedPath } from "@/lib/i18n/config";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Clock, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const messages = useMessages() as Messages;

  const { contact } = messages;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pincode: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ""))) newErrors.phone = "Invalid 10-digit mobile number";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^[1-9][0-9]{5}$/.test(formData.pincode)) newErrors.pincode = "Invalid 6-digit pincode";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", pincode: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  return (
    <div className="flex-1">
      {/* Page Header */}
      <section className="py-16 lg:py-24 bg-muted/30" aria-labelledby="contact-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 id="contact-heading" className="text-display text-foreground">
              {contact.title}
            </h1>
            <p className="mt-4 text-body-lg text-muted-foreground">
              {contact.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 lg:py-24" aria-labelledby="form-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 id="form-heading" className="text-h2 text-foreground mb-6">
                {contact.form.title}
              </h2>
              
              {submitStatus === "success" && (
                <div className="mb-6 p-4 rounded-xl bg-success/10 border border-success/20 flex items-center gap-3 animate-slide-up" role="alert">
                  <CheckCircle className="h-5 w-5 text-success" aria-hidden="true" />
                  <p className="text-success">{contact.form.success}</p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-3 animate-slide-up" role="alert">
                  <AlertCircle className="h-5 w-5 text-destructive" aria-hidden="true" />
                  <p className="text-destructive">{contact.form.error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="space-y-2">
                  <Label htmlFor="name">{contact.form.name}</Label>
                  <Input
                    id="name"
                    placeholder={contact.form.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    error={errors.name}
                    disabled={submitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{contact.form.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={contact.form.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    error={errors.email}
                    disabled={submitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{contact.form.phone}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={contact.form.phonePlaceholder}
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                    error={errors.phone}
                    disabled={submitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pincode">{contact.form.pincode}</Label>
                  <Input
                    id="pincode"
                    placeholder={contact.form.pincodePlaceholder}
                    value={formData.pincode}
                    onChange={(e) => handleChange("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
                    error={errors.pincode}
                    disabled={submitting}
                    maxLength={6}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{contact.form.message}</Label>
                  <Textarea
                    id="message"
                    placeholder={contact.form.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    error={errors.message}
                    disabled={submitting}
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" loading={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      {contact.form.submit}
                      <Send className="h-5 w-5" aria-hidden="true" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info & Quick Actions */}
            <div>
              <div className="space-y-8">
                {/* Contact Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-6 w-6 text-primary" aria-hidden="true" />
                      {contact.info.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
                        <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-medium">{contact.info.phone.label}</h4>
                        <a href="tel:+919993996840" className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                          {contact.info.phone.value}
                        </a>
                        <p className="text-sm text-muted-foreground mt-1">{contact.info.phone.hours}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
                        <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-medium">{contact.info.email.label}</h4>
                        <a href="mailto:p2infra@gmail.com" className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                          {contact.info.email.value}
                        </a>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
                        <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-medium">{contact.info.address.label}</h4>
                        <address className="not-italic text-foreground">
                          {contact.info.address.value}
                        </address>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
                        <Clock className="h-5 w-5 text-primary" aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-medium">{contact.info.maps.label}</h4>
                        <a href={contact.info.maps.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          Open in Google Maps
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-6 w-6 text-primary" aria-hidden="true" />
                      {contact.quickActions.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <a href={`https://wa.me/919993996840?text=${encodeURIComponent("Hi, I'm interested in P2P Broadband. Please contact me.")}`} 
                       target="_blank" rel="noopener noreferrer" className="flex w-full">
                      <Button variant="outline" className="w-full justify-start gap-3" size="lg">
                        <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.466-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378 9.86 9.86 0 01-.397-.435c-.174-.248-.297-.572-.297-.939 0-.361.099-.708.272-.99.198-.248.644-.83 1.112-1.394.496-.563 1.046-1.272 1.295-1.648.248-.374.398-.606.52-.738.124-.148.248-.198.421-.198.117 0 .243.01.392.074.273.124.644.505 1.092 1.079.447.578.792 1.197.916 1.472.1.223.148.497.074.737-.074.249-.248.422-.52.57-.273.148-.695.124-1.112-.025-.417-.148-1.091-.505-1.667-.94-.579-.46-1.135-.883-1.654-1.224-.519-.347-.99-.52-1.446-.57-.45-.05-.882-.025-1.283.074-.636.124-1.153.448-1.47.867-.316.417-.447.867-.47 1.017-.023.174-.11.448-.236.695l-.099.174c-.297.373-1.134.99-1.632 1.34-.578.398-1.06.648-1.372.768-.312.124-.669.124-1.073-.025zm1.561-1.53c.273-.149 1.52-.79 1.647-.89.117-.083.213-.15.297-.223.134-.134.167-.297.1-.446-.074-.149-.57-.982-.771-1.393-.2-.416-.421-.737-.694-.916-.273-.174-.695-.2-.916-.099-.248.074-.52.248-.816.447-.298.198-.669.472-1.14.816-.47.347-.792.644-1.014.867-.223.223-.421.472-.57.839-.149.373-.149.816-.074 1.091.074.248.447.719 1.065 1.296.617.578 1.389 1.34 1.948 2.116.125.174.198.297.222.422.024.125.024.248-.025.372-.049.124-.198.223-.497.272l-.321.049c-.222.024-.545.024-.816-.049-.347-.098-1.041-.373-1.52-.94-.479-.564-.768-1.24-.792-1.413-.023-.174-.098-.421-.074-.57.025-.149.124-.248.248-.323.198-.099.792-.173 1.647-.347.597-.124 1.068-.272 1.42-.497.35-.222.57-.421.792-.52.222-.099.421-.099.619-.074.224.025.398.124.52.223.125.099.222.248.272.446.05.198.05.421-.025.595-.074.149-.598.838-1.092 1.56-.497.72-1.196 1.622-1.494 1.969-.298.348-.572.548-.867.67-.297.124-.644.124-.99.025-.224-.099-.372-.248-.47-.447-.098-.173-.173-.373-.173-.57 0-.198.074-.422.222-.595.249-.323.793-.67 1.569-1.14.771-.47 1.596-.79 2.172-.89.579-.1.966-.074 1.263.074.297.149.57.373.816.648.248.273.421.62.52.99.098.373.074.747-.025 1.065-.099.324-.322.694-.598.94-.272.248-.57.447-.89.57-.322.124-.67.124-.99.025z" />
                        </svg>
                        {contact.quickActions.whatsapp}
                      </Button>
                    </a>
                    <a href="tel:+919993996840" className="flex w-full">
                      <Button variant="outline" className="w-full justify-start gap-3" size="lg">
                        <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
                        {contact.quickActions.call}
                      </Button>
                    </a>
                    <Link href={localizedPath("en", "/apply")} className="flex w-full">
                      <Button variant="outline" className="w-full justify-start gap-3" size="lg">
                        <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                        {contact.quickActions.apply}
                      </Button>
                    </Link>
                    <Link href={localizedPath("en", "/coverage")} className="flex w-full">
                      <Button variant="outline" className="w-full justify-start gap-3" size="lg">
                        <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                        {contact.quickActions.checkCoverage}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 lg:py-24 bg-muted/30" aria-labelledby="map-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 id="map-heading" className="text-h2 text-foreground">
              Visit Our Office
            </h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              We&apos;re located in Bhilai, Chhattisgarh. Drop by during business hours for a demo.
            </p>
          </div>

          <div className="aspect-video rounded-2xl border border-border bg-muted/50 flex items-center justify-center overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.123!2d81.3484489!3d21.2052243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x27ead2e66cae514f%3A0x73b76d2191b16cb6!2sP2P%20BROADBAND%20%26%20CCTV!5e0!3m2!1sen!2sin!4v1699345678901"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="P2P Broadband Office Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
}