"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";
import { getDealer } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StockItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    category: string;
    name: string;
  };
}

interface Client {
  id: string;
  name: string;
  businessName: string | null;
  phone: string | null;
}

interface DealerDetail {
  id: string;
  name: string;
  contactPerson: string | null;
  phone: string | null;
  address: string | null;
  region: string | null;
  stocks: StockItem[];
  clients: Client[];
}

export default function DealerDetailPage() {
  const t = useTranslations("dealers");
  const tc = useTranslations("common");
  const tp = useTranslations("products");
  const tCl = useTranslations("clients");
  const router = useRouter();
  const params = useParams();
  const dealerId = params.id as string;

  const [dealer, setDealer] = useState<DealerDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDealer = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getDealer(dealerId);
      setDealer(data as any);
    } catch {
      toast.error(tc("error"));
    } finally {
      setLoading(false);
    }
  }, [dealerId, tc]);

  useEffect(() => {
    fetchDealer();
  }, [fetchDealer]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <p className="text-muted-foreground">{tc("loading")}</p>
      </div>
    );
  }

  if (!dealer) {
    return (
      <div className="flex items-center justify-center py-10">
        <p className="text-muted-foreground">{tc("noData")}</p>
      </div>
    );
  }

  const totalStock = dealer.stocks?.reduce((sum, s) => sum + s.quantity, 0) ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => router.push("/dealers")}>
          {tc("back")}
        </Button>
        <h1 className="text-2xl font-bold">{dealer.name}</h1>
      </div>

      {/* Dealer Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>{t("details")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm text-muted-foreground">{t("name")}</p>
              <p className="font-medium">{dealer.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("contactPerson")}</p>
              <p className="font-medium">{dealer.contactPerson || "-"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("phone")}</p>
              <p className="font-medium">{dealer.phone || "-"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("region")}</p>
              <p className="font-medium">{dealer.region || "-"}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-sm text-muted-foreground">{t("address")}</p>
              <p className="font-medium">{dealer.address || "-"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs: Stock | Clients */}
      <Tabs defaultValue="stock">
        <TabsList>
          <TabsTrigger value="stock">
            {tp("title")} ({totalStock})
          </TabsTrigger>
          <TabsTrigger value="clients">
            {tCl("title")} ({dealer.clients?.length ?? 0})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stock" className="mt-4">
          {dealer.stocks?.length === 0 ? (
            <div className="flex items-center justify-center py-10">
              <p className="text-muted-foreground">{tc("noData")}</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{tp("category")}</TableHead>
                    <TableHead>{tp("name")}</TableHead>
                    <TableHead>{tp("quantity")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dealer.stocks?.map((stock) => (
                    <TableRow key={stock.id}>
                      <TableCell>
                        <Badge variant="secondary">{stock.product.category}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {stock.product.name}
                      </TableCell>
                      <TableCell className="font-medium">{stock.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="clients" className="mt-4">
          {dealer.clients?.length === 0 ? (
            <div className="flex items-center justify-center py-10">
              <p className="text-muted-foreground">{tc("noData")}</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{tCl("name")}</TableHead>
                    <TableHead>{tCl("businessName")}</TableHead>
                    <TableHead>{tCl("phone")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dealer.clients?.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">
                        {client.name}
                      </TableCell>
                      <TableCell>{client.businessName || "-"}</TableCell>
                      <TableCell>{client.phone || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
