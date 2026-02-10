"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { getUsers, getDealers, createUser, updateUser, deleteUser } from "@/lib/actions";
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
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface User {
  id: string;
  name: string;
  login: string;
  role: string;
  phone: string | null;
  dealerId: string | null;
  dealer: { id: string; name: string } | null;
  createdAt: string;
}

interface Dealer {
  id: string;
  name: string;
}

export default function UsersPage() {
  const t = useTranslations("users");
  const tc = useTranslations("common");
  const tRoles = useTranslations("roles");

  const [users, setUsers] = useState<User[]>([]);
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    login: "",
    password: "",
    role: "DEALER" as string,
    phone: "",
    dealerId: "",
  });

  const fetchUsers = useCallback(async () => {
    try {
      const data = await getUsers();
      setUsers(data as any);
    } catch {
      // silently fail
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchDealers = useCallback(async () => {
    try {
      const data = await getDealers();
      setDealers(data as any);
    } catch {
      // silently fail
    }
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchDealers();
  }, [fetchUsers, fetchDealers]);

  function openAddDialog() {
    setEditingUser(null);
    setFormData({ name: "", login: "", password: "", role: "DEALER", phone: "", dealerId: "" });
    setDialogOpen(true);
  }

  function openEditDialog(user: User) {
    setEditingUser(user);
    setFormData({
      name: user.name,
      login: user.login,
      password: "",
      role: user.role,
      phone: user.phone || "",
      dealerId: user.dealerId || "",
    });
    setDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingUser) {
        await updateUser(editingUser.id, {
          name: formData.name,
          login: formData.login,
          password: formData.password || undefined,
          role: formData.role as any,
          phone: formData.phone,
          dealerId: formData.role === "DEALER" ? formData.dealerId : null,
        });
        toast.success(tc("success"));
      } else {
        if (!formData.password) {
          toast.error("Parol majburiy");
          setIsSubmitting(false);
          return;
        }
        await createUser({
          name: formData.name,
          login: formData.login,
          password: formData.password,
          role: formData.role as any,
          phone: formData.phone,
          dealerId: formData.role === "DEALER" ? formData.dealerId : undefined,
        });
        toast.success(tc("success"));
      }
      setDialogOpen(false);
      fetchUsers();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(user: User) {
    if (!confirm(`${user.name} ni o'chirmoqchimisiz?`)) return;
    try {
      await deleteUser(user.id);
      toast.success(tc("success"));
      fetchUsers();
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  const roleBadgeColor: Record<string, string> = {
    ADMIN: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    WAREHOUSE_MANAGER: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    DEALER: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">{tc("loading")}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <Button onClick={openAddDialog}>{t("addUser")}</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("name")}</TableHead>
                <TableHead>{t("login")}</TableHead>
                <TableHead>{t("role")}</TableHead>
                <TableHead>{t("phone")}</TableHead>
                <TableHead>{t("dealer")}</TableHead>
                <TableHead className="text-right">{tc("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    {tc("noData")}
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="font-mono text-sm">{user.login}</TableCell>
                    <TableCell>
                      <Badge className={roleBadgeColor[user.role] || ""} variant="secondary">
                        {tRoles(user.role as any)}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.phone || "—"}</TableCell>
                    <TableCell>{user.dealer?.name || "—"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" onClick={() => openEditDialog(user)}>
                          {tc("edit")}
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(user)}>
                          {tc("delete")}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingUser ? tc("edit") : t("addUser")}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>{t("name")} *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>{t("login")} *</Label>
              <Input
                value={formData.login}
                onChange={(e) => setFormData({ ...formData, login: e.target.value })}
                required
                autoComplete="off"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>
                {editingUser ? t("newPassword") : t("password")} {!editingUser && "*"}
              </Label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required={!editingUser}
                autoComplete="new-password"
                placeholder={editingUser ? t("passwordHint") : ""}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>{t("role")} *</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("selectRole")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">{tRoles("ADMIN")}</SelectItem>
                  <SelectItem value="WAREHOUSE_MANAGER">{tRoles("WAREHOUSE_MANAGER")}</SelectItem>
                  <SelectItem value="DEALER">{tRoles("DEALER")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.role === "DEALER" && (
              <div className="flex flex-col gap-2">
                <Label>{t("dealer")} *</Label>
                <Select
                  value={formData.dealerId}
                  onValueChange={(value) => setFormData({ ...formData, dealerId: value })}
                >
                  <SelectTrigger>
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
              </div>
            )}

            <div className="flex flex-col gap-2">
              <Label>{t("phone")}</Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+998901234567"
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                {tc("cancel")}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? tc("loading") : tc("save")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
