"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { getClients, getDealers, createClient, updateClient, deleteClient } from "@/lib/actions";
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

interface Client {
  id: string;
  name: string;
  businessName: string | null;
  phone: string | null;
  address: string | null;
  dealerId: string | null;
  dealer?: {
    id: string;
    name: string;
  } | null;
}

export default function ClientsPage() {
  const t = useTranslations("clients");
  const tc = useTranslations("common");

  const [clients, setClients] = useState<Client[]>([]);
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [deletingClient, setDeletingClient] = useState<Client | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    phone: "",
    address: "",
    dealerId: "",
  });

  const fetchClients = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getClients();
      setClients(data);
    } catch {
      toast.error(tc("error"));
    } finally {
      setLoading(false);
    }
  }, [tc]);

  const fetchDealersList = useCallback(async () => {
    try {
      const data = await getDealers();
      setDealers(data);
    } catch {
      // Silently fail; dealers list is optional for display
    }
  }, []);

  useEffect(() => {
    fetchClients();
    fetchDealersList();
  }, [fetchClients, fetchDealersList]);

  const openAddDialog = () => {
    setEditingClient(null);
    setFormData({ name: "", businessName: "", phone: "", address: "", dealerId: "" });
    setDialogOpen(true);
  };

  const openEditDialog = (client: Client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      businessName: client.businessName || "",
      phone: client.phone || "",
      address: client.address || "",
      dealerId: client.dealerId || "",
    });
    setDialogOpen(true);
  };

  const openDeleteDialog = (client: Client) => {
    setDeletingClient(client);
    setDeleteDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) return;

    setSaving(true);
    try {
      const payload = {
        ...formData,
        dealerId: formData.dealerId || undefined,
      };

      if (editingClient) {
        await updateClient(editingClient.id, payload);
      } else {
        await createClient(payload as { name: string; businessName?: string; phone?: string; address?: string; dealerId: string });
      }

      toast.success(tc("success"));
      setDialogOpen(false);
      fetchClients();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : tc("error");
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingClient) return;

    setSaving(true);
    try {
      await deleteClient(deletingClient.id);

      toast.success(tc("success"));
      setDeleteDialogOpen(false);
      setDeletingClient(null);
      fetchClients();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : tc("error");
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <Button onClick={openAddDialog}>{t("addClient")}</Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <p className="text-muted-foreground">{tc("loading")}</p>
        </div>
      ) : clients.length === 0 ? (
        <div className="flex items-center justify-center py-10">
          <p className="text-muted-foreground">{tc("noData")}</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("name")}</TableHead>
                <TableHead>{t("businessName")}</TableHead>
                <TableHead>{t("phone")}</TableHead>
                <TableHead>{t("address")}</TableHead>
                <TableHead>{t("dealer")}</TableHead>
                <TableHead className="text-right">{tc("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.businessName || "-"}</TableCell>
                  <TableCell>{client.phone || "-"}</TableCell>
                  <TableCell>{client.address || "-"}</TableCell>
                  <TableCell>{client.dealer?.name || "-"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(client)}
                      >
                        {tc("edit")}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => openDeleteDialog(client)}
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
              {editingClient ? tc("edit") : t("addClient")}
            </DialogTitle>
            <DialogDescription>
              {editingClient
                ? tc("edit") + " - " + editingClient.name
                : t("addClient")}
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
              <Label htmlFor="businessName">{t("businessName")}</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) =>
                  setFormData({ ...formData, businessName: e.target.value })
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
              <Label>{t("dealer")}</Label>
              <Select
                value={formData.dealerId}
                onValueChange={(value) =>
                  setFormData({ ...formData, dealerId: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("dealer")} />
                </SelectTrigger>
                <SelectContent>
                  {dealers.map((dealer) => (
                    <SelectItem key={dealer.id} value={dealer.id}>
                      {dealer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              {deletingClient?.name}
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
