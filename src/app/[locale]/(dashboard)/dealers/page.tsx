"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";
import { getDealers, createDealer, updateDealer, deleteDealer } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Dealer {
  id: string;
  name: string;
  contactPerson: string | null;
  phone: string | null;
  address: string | null;
  region: string | null;
  _count?: {
    stocks: number;
    clients: number;
  };
}

export default function DealersPage() {
  const t = useTranslations("dealers");
  const tc = useTranslations("common");
  const router = useRouter();

  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingDealer, setEditingDealer] = useState<Dealer | null>(null);
  const [deletingDealer, setDeletingDealer] = useState<Dealer | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    contactPerson: "",
    phone: "",
    address: "",
    region: "",
  });

  const fetchDealers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getDealers();
      setDealers(data);
    } catch {
      toast.error(tc("error"));
    } finally {
      setLoading(false);
    }
  }, [tc]);

  useEffect(() => {
    fetchDealers();
  }, [fetchDealers]);

  const openAddDialog = () => {
    setEditingDealer(null);
    setFormData({ name: "", contactPerson: "", phone: "", address: "", region: "" });
    setDialogOpen(true);
  };

  const openEditDialog = (e: React.MouseEvent, dealer: Dealer) => {
    e.stopPropagation();
    setEditingDealer(dealer);
    setFormData({
      name: dealer.name,
      contactPerson: dealer.contactPerson || "",
      phone: dealer.phone || "",
      address: dealer.address || "",
      region: dealer.region || "",
    });
    setDialogOpen(true);
  };

  const openDeleteDialog = (e: React.MouseEvent, dealer: Dealer) => {
    e.stopPropagation();
    setDeletingDealer(dealer);
    setDeleteDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) return;

    setSaving(true);
    try {
      if (editingDealer) {
        await updateDealer(editingDealer.id, formData);
      } else {
        await createDealer(formData);
      }

      toast.success(tc("success"));
      setDialogOpen(false);
      fetchDealers();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : tc("error");
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingDealer) return;

    setSaving(true);
    try {
      await deleteDealer(deletingDealer.id);

      toast.success(tc("success"));
      setDeleteDialogOpen(false);
      setDeletingDealer(null);
      fetchDealers();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : tc("error");
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const handleRowClick = (dealerId: string) => {
    router.push(`/dealers/${dealerId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <Button onClick={openAddDialog}>{t("addDealer")}</Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <p className="text-muted-foreground">{tc("loading")}</p>
        </div>
      ) : dealers.length === 0 ? (
        <div className="flex items-center justify-center py-10">
          <p className="text-muted-foreground">{tc("noData")}</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("name")}</TableHead>
                <TableHead>{t("contactPerson")}</TableHead>
                <TableHead>{t("phone")}</TableHead>
                <TableHead>{t("region")}</TableHead>
                <TableHead>{t("stockCount")}</TableHead>
                <TableHead>Mijozlar</TableHead>
                <TableHead className="text-right">{tc("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dealers.map((dealer) => (
                <TableRow
                  key={dealer.id}
                  className="cursor-pointer"
                  onClick={() => handleRowClick(dealer.id)}
                >
                  <TableCell className="font-medium">{dealer.name}</TableCell>
                  <TableCell>{dealer.contactPerson || "-"}</TableCell>
                  <TableCell>{dealer.phone || "-"}</TableCell>
                  <TableCell>{dealer.region || "-"}</TableCell>
                  <TableCell>{dealer._count?.stocks ?? 0}</TableCell>
                  <TableCell>{dealer._count?.clients ?? 0}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => openEditDialog(e, dealer)}
                      >
                        {tc("edit")}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={(e) => openDeleteDialog(e, dealer)}
                      >
                        {tc("delete")}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingDealer ? tc("edit") : t("addDealer")}
            </DialogTitle>
            <DialogDescription>
              {editingDealer
                ? tc("edit") + " - " + editingDealer.name
                : t("addDealer")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">{t("name")} *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contactPerson">{t("contactPerson")}</Label>
              <Input
                id="contactPerson"
                value={formData.contactPerson}
                onChange={(e) =>
                  setFormData({ ...formData, contactPerson: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">{t("phone")}</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">{t("address")}</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="region">{t("region")}</Label>
              <Input
                id="region"
                value={formData.region}
                onChange={(e) =>
                  setFormData({ ...formData, region: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              {tc("cancel")}
            </Button>
            <Button onClick={handleSubmit} disabled={saving || !formData.name.trim()}>
              {saving ? tc("loading") : tc("save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{tc("delete")}</DialogTitle>
            <DialogDescription>
              {deletingDealer?.name}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              {tc("cancel")}
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={saving}
            >
              {saving ? tc("loading") : tc("confirm")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
