"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";
import { getDealers, getStock, getProducts, warehouseReturns } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Dealer {
  id: string;
  name: string;
}

interface Product {
  id: string;
  category: string;
  name: string;
}

interface StockItem {
  productId: string;
  quantity: number;
}

export default function WarehouseReturnsPage() {
  const t = useTranslations("warehouse");
  const tc = useTranslations("common");
  const router = useRouter();

  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [dealerStock, setDealerStock] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [dealerId, setDealerId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [note, setNote] = useState("");

  const fetchInitialData = useCallback(async () => {
    try {
      setLoading(true);
      const [dealersData, productsData] = await Promise.all([
        getDealers(),
        getProducts(),
      ]);
      setDealers(dealersData);
      setProducts(productsData as any);
    } catch {
      toast.error(tc("error"));
    } finally {
      setLoading(false);
    }
  }, [tc]);

  const fetchDealerStock = useCallback(async () => {
    if (!dealerId) {
      setDealerStock([]);
      return;
    }
    try {
      const stockData = await getStock({ locationType: "DEALER", locationId: dealerId });
      setDealerStock(stockData as any);
    } catch {
      toast.error(tc("error"));
    }
  }, [dealerId, tc]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  useEffect(() => {
    setProductId("");
    setQuantity(1);
    fetchDealerStock();
  }, [fetchDealerStock]);

  // Diller tanlansa — diler stockidagi mahsulotlar, aks holda barcha mahsulotlar
  const availableProducts = dealerId
    ? products.filter((p) =>
        dealerStock.some((s) => s.productId === p.id && s.quantity > 0)
      )
    : products;

  const selectedStockQty = dealerId
    ? dealerStock.find((s) => s.productId === productId)?.quantity ?? 0
    : null;

  const canSubmit = productId && quantity > 0 && (
    !dealerId || (selectedStockQty !== null && quantity <= selectedStockQty)
  );

  const handleClearDealer = () => {
    setDealerId("");
    setProductId("");
    setQuantity(1);
    setDealerStock([]);
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;

    setSubmitting(true);
    try {
      await warehouseReturns({
        dealerId: dealerId || undefined,
        productId,
        quantity,
        clientName: clientName.trim() || undefined,
        clientPhone: clientPhone.trim() || undefined,
        clientAddress: clientAddress.trim() || undefined,
        note: note.trim() || undefined,
      });

      toast.success(`${tc("success")} — ${quantity} ${t("itemsCount")}`);
      setProductId("");
      setQuantity(1);
      setClientName("");
      setClientPhone("");
      setClientAddress("");
      setNote("");
      if (dealerId) fetchDealerStock();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : tc("error");
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => router.push("/warehouse")}>
          {tc("back")}
        </Button>
        <h1 className="text-2xl font-bold">{t("returnsTitle")}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("returnsDesc")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Select Dealer (optional) */}
          <div className="grid gap-2">
            <Label>{t("selectDealerOptional")}</Label>
            {loading ? (
              <p className="text-sm text-muted-foreground">{tc("loading")}</p>
            ) : (
              <div className="flex gap-2">
                <Select value={dealerId} onValueChange={setDealerId}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("selectDealerOptional")} />
                  </SelectTrigger>
                  <SelectContent>
                    {dealers.map((dealer) => (
                      <SelectItem key={dealer.id} value={dealer.id}>
                        {dealer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {dealerId && (
                  <Button variant="outline" size="sm" onClick={handleClearDealer}>
                    {t("clearSelection")}
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Client info */}
          <div className="grid gap-4">
            <Label className="text-base font-medium">{t("clientInfo")}</Label>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="grid gap-1">
                <Label className="text-sm text-muted-foreground">{t("clientName")}</Label>
                <Input
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder={t("clientName")}
                />
              </div>
              <div className="grid gap-1">
                <Label className="text-sm text-muted-foreground">{t("clientPhone")}</Label>
                <Input
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder={t("clientPhone")}
                />
              </div>
              <div className="grid gap-1">
                <Label className="text-sm text-muted-foreground">{t("clientAddress")}</Label>
                <Input
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                  placeholder={t("clientAddress")}
                />
              </div>
            </div>
          </div>

          {/* Select Product */}
          <div className="grid gap-2">
            <Label>{t("selectProduct")} *</Label>
            {availableProducts.length === 0 ? (
              <p className="text-sm text-muted-foreground">{tc("noData")}</p>
            ) : (
              <Select value={productId} onValueChange={setProductId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("selectProduct")} />
                </SelectTrigger>
                <SelectContent>
                  {availableProducts.map((product) => {
                    const stockQty = dealerId
                      ? dealerStock.find((s) => s.productId === product.id)?.quantity ?? 0
                      : null;
                    return (
                      <SelectItem key={product.id} value={product.id}>
                        {product.category} — {product.name}
                        {stockQty !== null ? ` (${stockQty})` : ""}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            )}
            {productId && selectedStockQty !== null && (
              <p className="text-sm text-muted-foreground">
                {t("availableQty")}: {selectedStockQty}
              </p>
            )}
          </div>

          {/* Quantity */}
          {productId && (
            <div className="grid gap-2">
              <Label>{t("quantity")} *</Label>
              <Input
                type="number"
                min={1}
                max={selectedStockQty !== null ? selectedStockQty : undefined}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-[200px]"
              />
            </div>
          )}

          {/* Note */}
          <div className="grid gap-2">
            <Label>{tc("note")}</Label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder={tc("note")}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <Button onClick={handleSubmit} disabled={!canSubmit || submitting}>
            {submitting ? tc("loading") : t("confirmReturn")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
