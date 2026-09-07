"use client";

import { useRouter, usePathname } from "next/navigation";
import { locales, localeNames, localeFlags, type Locale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = (pathname.split("/")[1] as Locale) || "en";

  const handleLocaleChange = (locale: Locale) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPath);
    router.refresh();
  };

  return (
    <div className="relative inline-block" role="group" aria-label="Language selection">
      {locales.map((locale) => (
        <Button
          key={locale}
          variant={currentLocale === locale ? "apple" : "ghost"}
          size="sm"
          onClick={() => handleLocaleChange(locale)}
          aria-pressed={currentLocale === locale}
          className="gap-1.5 px-3"
        >
          <span aria-hidden="true">{localeFlags[locale]}</span>
          <span className="hidden sm:inline">{localeNames[locale]}</span>
        </Button>
      ))}
    </div>
  );
}