import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { isValidLocale } from "./config";

export default getRequestConfig(async ({ locale = "en" }) => {
  if (!isValidLocale(locale)) notFound();

  return {
    messages: (await import(`../../content/${locale}.json`)).default,
    locale,
  };
});