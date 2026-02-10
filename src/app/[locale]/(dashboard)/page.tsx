"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Package,
  Warehouse,
  Users,
  AlertTriangle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getDashboardStats } from "@/lib/actions";

type DashboardStats = {
  totalProducts: number;
  totalWarehouseQty: number;
  totalDealerQty: number;
  byCategory: { category: string; _count: number }[];
  lowStockProducts: {
    id: string;
    name: string;
    category: string;
    minStock: number;
    warehouseQty: number;
  }[];
  recentMovements: {
    id: string;
    type: string;
    quantity: number;
    productName: string;
    productCategory: string;
    dealerName: string | null;
    supplierName: string | null;
    performedByName: string;
    createdAt: string;
  }[];
};

function getMovementColor(type: string): string {
  switch (type) {
    case "RECEIVE":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "SEND":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "RETURN":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
    default:
      return "";
  }
}

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const tCommon = useTranslations("common");
  const tMovement = useTranslations("movementType");

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getDashboardStats();
        setStats(data as any);
      } catch {
        // silently fail
      } finally {
        setIsLoading(false);
      }
    }
    fetchStats();
  }, []);

  const statCards = [
    {
      title: t("totalProducts"),
      value: stats?.totalProducts ?? 0,
      icon: Package,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      title: t("inWarehouse"),
      value: stats?.totalWarehouseQty ?? 0,
      icon: Warehouse,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-500",
    },
    {
      title: t("withDealers"),
      value: stats?.totalDealerQty ?? 0,
      icon: Users,
      iconBg: "bg-green-500/10",
      iconColor: "text-green-500",
    },
    {
      title: t("lowStock"),
      value: stats?.lowStockProducts?.length ?? 0,
      icon: AlertTriangle,
      iconBg: "bg-red-500/10",
      iconColor: "text-red-500",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">{tCommon("loading")}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">{t("title")}</h1>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className="card-elevated animate-in">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.iconBg}`}
                >
                  <Icon className={`h-5 w-5 ${card.iconColor}`} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{card.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Low stock products */}
      {stats?.lowStockProducts && stats.lowStockProducts.length > 0 && (
        <Card className="card-elevated animate-in">
          <CardHeader>
            <CardTitle>{t("lowStock")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-2 pr-4 font-medium">{tCommon("status")}</th>
                    <th className="pb-2 pr-4 font-medium">Mahsulot</th>
                    <th className="pb-2 pr-4 font-medium">Omborxonada</th>
                    <th className="pb-2 font-medium">Min. zaxira</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.lowStockProducts.map((p) => (
                    <tr key={p.id} className="border-b last:border-0">
                      <td className="py-2 pr-4">
                        <Badge variant="secondary">{p.category}</Badge>
                      </td>
                      <td className="py-2 pr-4 font-medium">{p.name}</td>
                      <td className="py-2 pr-4 text-red-500 font-medium">{p.warehouseQty}</td>
                      <td className="py-2">{p.minStock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent movements */}
      {stats?.recentMovements && stats.recentMovements.length > 0 && (
        <Card className="card-elevated animate-in">
          <CardHeader>
            <CardTitle>{t("recentMovements")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-2 pr-4 font-medium">{tCommon("date")}</th>
                    <th className="pb-2 pr-4 font-medium">Turi</th>
                    <th className="pb-2 pr-4 font-medium">Mahsulot</th>
                    <th className="pb-2 pr-4 font-medium">Miqdor</th>
                    <th className="pb-2 font-medium">Diller/Yetkazuvchi</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentMovements.map((m) => (
                    <tr key={m.id} className="border-b last:border-0">
                      <td className="py-2 pr-4 text-muted-foreground">
                        {new Date(m.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-2 pr-4">
                        <Badge className={getMovementColor(m.type)}>
                          {tMovement(m.type as any)}
                        </Badge>
                      </td>
                      <td className="py-2 pr-4">
                        <span className="font-medium">{m.productName}</span>
                        <span className="ml-1 text-muted-foreground text-xs">
                          ({m.productCategory})
                        </span>
                      </td>
                      <td className="py-2 pr-4 font-medium">{m.quantity}</td>
                      <td className="py-2">
                        {m.dealerName || m.supplierName || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
