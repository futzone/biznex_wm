"use client";

import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Package,
  Warehouse,
  PackagePlus,
  PackageMinus,
  RotateCcw,
  Users,
  UserCheck,
  Truck,
  ClipboardList,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  children?: { label: string; href: string; icon: LucideIcon }[];
  roles?: ("ADMIN" | "WAREHOUSE_MANAGER" | "DEALER")[];
};

export function Sidebar() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = session?.user?.role;

  const [warehouseOpen, setWarehouseOpen] = useState(
    pathname.startsWith("/warehouse")
  );

  const navItems: NavItem[] = [
    {
      label: t("dashboard"),
      href: "/",
      icon: LayoutDashboard,
    },
    {
      label: t("products"),
      href: "/products",
      icon: Package,
      roles: ["ADMIN", "WAREHOUSE_MANAGER", "DEALER"],
    },
    {
      label: t("warehouse"),
      href: "/warehouse",
      icon: Warehouse,
      roles: ["ADMIN", "WAREHOUSE_MANAGER"],
      children: [
        {
          label: t("warehouseReceive"),
          href: "/warehouse/receive",
          icon: PackagePlus,
        },
        {
          label: t("warehouseSend"),
          href: "/warehouse/send",
          icon: PackageMinus,
        },
        {
          label: t("warehouseReturns"),
          href: "/warehouse/returns",
          icon: RotateCcw,
        },
      ],
    },
    {
      label: t("dealers"),
      href: "/dealers",
      icon: Users,
      roles: ["ADMIN", "WAREHOUSE_MANAGER"],
    },
    {
      label: t("clients"),
      href: "/clients",
      icon: UserCheck,
      roles: ["ADMIN", "WAREHOUSE_MANAGER", "DEALER"],
    },
    {
      label: t("suppliers"),
      href: "/suppliers",
      icon: Truck,
      roles: ["ADMIN", "WAREHOUSE_MANAGER"],
    },
    {
      label: t("movements"),
      href: "/movements",
      icon: ClipboardList,
      roles: ["ADMIN", "WAREHOUSE_MANAGER"],
    },
    {
      label: t("users"),
      href: "/users",
      icon: ShieldCheck,
      roles: ["ADMIN"],
    },
  ];

  const filteredItems = navItems.filter((item) => {
    if (!item.roles) return true;
    if (!role) return false;
    return item.roles.includes(role);
  });

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <aside className="card-elevated flex h-full w-64 flex-col border-r bg-sidebar">
      <div className="flex h-14 items-center px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold text-sidebar-primary">
            {tCommon("appName")}
          </span>
        </Link>
      </div>

      <Separator />

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="flex flex-col gap-1">
          {filteredItems.map((item) => (
            <li key={item.href}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => setWarehouseOpen(!warehouseOpen)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      isActive(item.href) &&
                        "bg-sidebar-accent text-sidebar-accent-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1 text-left">{item.label}</span>
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 shrink-0 transition-transform",
                        warehouseOpen && "rotate-90"
                      )}
                    />
                  </button>
                  {warehouseOpen && (
                    <ul className="ml-4 mt-1 flex flex-col gap-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={cn(
                              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                              "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                              isActive(child.href) &&
                                "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                            )}
                          >
                            <child.icon className="h-4 w-4 shrink-0" />
                            <span>{child.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive(item.href) &&
                      "bg-sidebar-accent text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
