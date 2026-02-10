"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Link } from "@/i18n/routing";
import { getDashboardStats } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function WarehousePage() {
  const t = useTranslations("warehouse");
  const tc = useTranslations("common");
  const td = useTranslations("dashboard");

  const [warehouseQty, setWarehouseQty] = useState(0);
  const [dealerQty, setDealerQty] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getDashboardStats();
      setWarehouseQty(data.totalWarehouseQty ?? 0);
      setDealerQty(data.totalDealerQty ?? 0);
    } catch {
      toast.error(tc("error"));
    } finally {
      setLoading(false);
    }
  }, [tc]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t("title")}</h1>

      {/* Action Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{t("receiveTitle")}</CardTitle>
            <CardDescription>{t("receiveDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/warehouse/receive">
              <Button className="w-full">{t("receive")}</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("sendTitle")}</CardTitle>
            <CardDescription>{t("sendDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/warehouse/send">
              <Button className="w-full">{t("send")}</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("returnsTitle")}</CardTitle>
            <CardDescription>{t("returnsDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/warehouse/returns">
              <Button className="w-full">{t("returns")}</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{td("inWarehouse")}</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground">{tc("loading")}</p>
            ) : (
              <p className="text-3xl font-bold">{warehouseQty}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{td("withDealers")}</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground">{tc("loading")}</p>
            ) : (
              <p className="text-3xl font-bold">{dealerQty}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
