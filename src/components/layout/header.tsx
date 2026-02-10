"use client";

import { useSession, signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Sidebar } from "@/components/layout/sidebar";
import { Menu, LogOut } from "lucide-react";

export function Header() {
  const { data: session } = useSession();
  const t = useTranslations("auth");
  const tRoles = useTranslations("roles");
  const locale = useLocale();

  const userName = session?.user?.name || "";
  const userRole = session?.user?.role;

  function handleLogout() {
    signOut({ callbackUrl: `/${locale}/login` });
  }

  return (
    <header className="glass flex h-14 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        <ThemeToggle />

        {session?.user && (
          <div className="flex items-center gap-2">
            <span className="hidden text-sm font-medium sm:inline-block">
              {userName}
            </span>
            {userRole && (
              <Badge variant="secondary" className="text-xs">
                {tRoles(userRole)}
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              {t("logout")}
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
