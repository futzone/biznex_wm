"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";
import { getDealers, getStock, getProducts, warehouseSend } from "@/lib/actions";
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

export default function WarehouseSendPage() {
  const t = useTranslations("warehouse");
  const tc = useTranslations("common");
  const router = useRouter();

  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [warehouseStock, setWarehouseStock] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [dealerId, setDealerId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [dealersData, productsData, stockData] = await Promise.all([
        getDealers(),
        getProducts(),
        getStock({ locationType: "WAREHOUSE" }),
      ]);
      setDealers(dealersData);
      setProducts(productsData as any);
      setWarehouseStock(stockData as any);
    } catch {
      toast.error(tc("error"));
    } finally {
      setLoading(false);
    }
  }, [tc]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const selectedStockQty = warehouseStock.find(
    (s) => s.productId === productId
  )?.quantity ?? 0;

  const canSubmit = dealerId && productId && quantity > 0 && quantity <= selectedStockQty;

  const handleSubmit = async () => {
    if (!canSubmit) return;

    setSubmitting(true);
    try {
      await warehouseSend({
        dealerId,
        productId,
        quantity,
        note: note.trim() || undefined,
      });

      toast.success(`${tc("success")} — ${quantity} ${t("itemsCount")}`);
      setQuantity(1);
      setNote("");
      // Refresh stock
      const stockData = await getStock({ locationType: "WAREHOUSE" });
      setWarehouseStock(stockData as any);
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
        <h1 className="text-2xl font-bold">{t("sendTitle")}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("sendDesc")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Select Dealer */}
          <div className="grid gap-2">
            <Label>{t("selectDealer")} *</Label>
            {loading ? (
              <p className="text-sm text-muted-foreground">{tc("loading")}</p>
            ) : (
              <Select value={dealerId} onValueChange={setDealerId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("selectDealer")} />
                </SelectTrigger>
                <SelectContent>
                  {dealers.map((dealer) => (
                    <SelectItem key={dealer.id} value={dealer.id}>
                      {dealer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Select Product */}
          <div className="grid gap-2">
            <Label>{t("selectProduct")} *</Label>
            <Select value={productId} onValueChange={setProductId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("selectProduct")} />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => {
                  const stockQty = warehouseStock.find(
                    (s) => s.productId === product.id
                  )?.quantity ?? 0;
                  return (
                    <SelectItem key={product.id} value={product.id}>
                      {product.category} — {product.name} ({stockQty})
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {productId && (
              <p className="text-sm text-muted-foreground">
                {t("availableQty")}: {selectedStockQty}
              </p>
            )}
          </div>

          {/* Quantity */}
          <div className="grid gap-2">
            <Label>{t("quantity")} *</Label>
            <Input
              type="number"
              min={1}
              max={selectedStockQty}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-[200px]"
            />
          </div>

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
            {submitting ? tc("loading") : t("confirmSend")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
