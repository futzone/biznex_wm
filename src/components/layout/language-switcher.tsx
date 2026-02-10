"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: "uz" | "ru") {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className="flex items-center gap-1">
      <Button
        variant={locale === "uz" ? "default" : "ghost"}
        size="sm"
        className={cn("h-7 px-2 text-xs font-medium")}
        onClick={() => switchLocale("uz")}
      >
        UZ
      </Button>
      <Button
        variant={locale === "ru" ? "default" : "ghost"}
        size="sm"
        className={cn("h-7 px-2 text-xs font-medium")}
        onClick={() => switchLocale("ru")}
      >
        RU
      </Button>
    </div>
  );
}
