"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";
import { getSuppliers, getProducts, warehouseReceive } from "@/lib/actions";
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

interface Supplier {
  id: string;
  name: string;
}

interface Product {
  id: string;
  category: string;
  name: string;
}

export default function WarehouseReceivePage() {
  const t = useTranslations("warehouse");
  const tc = useTranslations("common");
  const router = useRouter();

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [supplierId, setSupplierId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [suppliersData, productsData] = await Promise.all([
        getSuppliers(),
        getProducts(),
      ]);
      setSuppliers(suppliersData);
      setProducts(productsData as any);
    } catch {
      toast.error(tc("error"));
    } finally {
      setLoading(false);
    }
  }, [tc]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const canSubmit = supplierId && productId && quantity > 0;

  const handleSubmit = async () => {
    if (!canSubmit) return;

    setSubmitting(true);
    try {
      await warehouseReceive({
        supplierId,
        productId,
        quantity,
        note: note.trim() || undefined,
      });

      toast.success(`${tc("success")} — ${quantity} ${t("itemsCount")}`);
      setQuantity(1);
      setNote("");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : tc("error");
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSupplierId("");
    setProductId("");
    setQuantity(1);
    setNote("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => router.push("/warehouse")}>
          {tc("back")}
        </Button>
        <h1 className="text-2xl font-bold">{t("receiveTitle")}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("receiveDesc")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Select Supplier */}
          <div className="grid gap-2">
            <Label>{t("selectSupplier")} *</Label>
            {loading ? (
              <p className="text-sm text-muted-foreground">{tc("loading")}</p>
            ) : (
              <Select value={supplierId} onValueChange={setSupplierId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("selectSupplier")} />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((supplier) => (
                    <SelectItem key={supplier.id} value={supplier.id}>
                      {supplier.name}
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
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.category} — {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quantity */}
          <div className="grid gap-2">
            <Label>{t("quantity")} *</Label>
            <Input
              type="number"
              min={1}
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

          <div className="flex gap-4">
            <Button onClick={handleSubmit} disabled={!canSubmit || submitting}>
              {submitting ? tc("loading") : t("confirmReceive")}
            </Button>
            <Button variant="outline" onClick={handleReset}>
              {tc("cancel")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
