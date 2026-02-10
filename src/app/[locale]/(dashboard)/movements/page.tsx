"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { getMovements, getDealers } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

interface Movement {
  id: string;
  type: string;
  quantity: number;
  createdAt: string;
  note: string | null;
  product?: {
    id: string;
    name: string;
    category: string;
  };
  dealer?: {
    id: string;
    name: string;
  } | null;
  supplier?: {
    id: string;
    name: string;
  } | null;
  performedBy?: {
    name: string;
  } | null;
}

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

export default function MovementsPage() {
  const t = useTranslations("movements");
  const tc = useTranslations("common");
  const tmt = useTranslations("movementType");

  const [movements, setMovements] = useState<Movement[]>([]);
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const limit = 20;

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [dealerFilter, setDealerFilter] = useState<string>("ALL");

  const fetchMovements = useCallback(async () => {
    try {
      setLoading(true);
      const filters: { from?: string; to?: string; type?: string; dealerId?: string; page?: number; limit?: number } = {};
      if (fromDate) filters.from = fromDate;
      if (toDate) filters.to = toDate;
      if (typeFilter !== "ALL") filters.type = typeFilter;
      if (dealerFilter !== "ALL") filters.dealerId = dealerFilter;
      filters.page = page;
      filters.limit = limit;

      const result = await getMovements(filters);
      setMovements(result.data as any);
      setHasMore(result.pagination.page < result.pagination.totalPages);
    } catch {
      toast.error(tc("error"));
    } finally {
      setLoading(false);
    }
  }, [fromDate, toDate, typeFilter, dealerFilter, page, tc]);

  const fetchDealersList = useCallback(async () => {
    try {
      const data = await getDealers();
      setDealers(data);
    } catch {
      // Silently fail
    }
  }, []);

  useEffect(() => {
    fetchDealersList();
  }, [fetchDealersList]);

  useEffect(() => {
    fetchMovements();
  }, [fetchMovements]);

  useEffect(() => {
    setPage(1);
  }, [fromDate, toDate, typeFilter, dealerFilter]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-end gap-4">
        <div className="grid gap-1.5">
          <Label>{t("date")} (from)</Label>
          <Input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-[160px]"
          />
        </div>
        <div className="grid gap-1.5">
          <Label>{t("date")} (to)</Label>
          <Input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-[160px]"
          />
        </div>
        <div className="grid gap-1.5">
          <Label>{t("type")}</Label>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">{tc("all")}</SelectItem>
              <SelectItem value="RECEIVE">{tmt("RECEIVE")}</SelectItem>
              <SelectItem value="SEND">{tmt("SEND")}</SelectItem>
              <SelectItem value="RETURN">{tmt("RETURN")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-1.5">
          <Label>{t("dealer")}</Label>
          <Select value={dealerFilter} onValueChange={setDealerFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">{tc("all")}</SelectItem>
              {dealers.map((dealer) => (
                <SelectItem key={dealer.id} value={dealer.id}>
                  {dealer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-10">
          <p className="text-muted-foreground">{tc("loading")}</p>
        </div>
      ) : movements.length === 0 ? (
        <div className="flex items-center justify-center py-10">
          <p className="text-muted-foreground">{tc("noData")}</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("date")}</TableHead>
                <TableHead>{t("type")}</TableHead>
                <TableHead>{t("product")}</TableHead>
                <TableHead>{t("quantity")}</TableHead>
                <TableHead>{t("dealer")}/{t("supplier")}</TableHead>
                <TableHead>{t("performedBy")}</TableHead>
                <TableHead>{t("note")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {movements.map((movement) => (
                <TableRow key={movement.id}>
                  <TableCell>
                    {new Date(movement.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={getMovementColor(movement.type)}>
                      {tmt(movement.type as any)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {movement.product ? (
                      <div>
                        <span className="font-medium">
                          {movement.product.name}
                        </span>
                        <span className="ml-1 text-muted-foreground text-xs">
                          ({movement.product.category})
                        </span>
                      </div>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{movement.quantity}</TableCell>
                  <TableCell>
                    {movement.dealer?.name || movement.supplier?.name || "-"}
                  </TableCell>
                  <TableCell>{movement.performedBy?.name || "-"}</TableCell>
                  <TableCell>{movement.note || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">{page}</span>
        <Button
          variant="outline"
          size="sm"
          disabled={!hasMore}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
