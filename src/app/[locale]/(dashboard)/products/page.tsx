"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  getProducts,
  getProductCategories,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
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
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Product {
  id: string;
  category: string;
  name: string;
  description: string | null;
  minStock: number;
  warehouseQty?: number;
}

export default function ProductsPage() {
  const t = useTranslations("products");
  const tc = useTranslations("common");

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    category: "",
    name: "",
    description: "",
    minStock: 0,
  });

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const filters: { category?: string; search?: string } = {};
      if (categoryFilter !== "ALL") filters.category = categoryFilter;
      if (search.trim()) filters.search = search.trim();

      const data = await getProducts(filters);
      setProducts(data as any);
    } catch {
      toast.error(tc("error"));
    } finally {
      setLoading(false);
    }
  }, [categoryFilter, search, tc]);

  const fetchCategories = useCallback(async () => {
    try {
      const data = await getProductCategories();
      setCategories(data);
    } catch {
      // Silently fail
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  function openAddDialog() {
    setEditingProduct(null);
    setFormData({
      category: "",
      name: "",
      description: "",
      minStock: 0,
    });
    setDialogOpen(true);
  }

  function openEditDialog(product: Product) {
    setEditingProduct(product);
    setFormData({
      category: product.category,
      name: product.name,
      description: product.description || "",
      minStock: product.minStock,
    });
    setDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.category.trim() || !formData.name.trim()) return;

    setIsSubmitting(true);
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, {
          category: formData.category,
          name: formData.name,
          description: formData.description || undefined,
          minStock: formData.minStock,
        });
      } else {
        await createProduct({
          category: formData.category,
          name: formData.name,
          description: formData.description || undefined,
          minStock: formData.minStock,
        });
      }
      toast.success(tc("success"));
      setDialogOpen(false);
      fetchProducts();
      fetchCategories();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(product: Product) {
    if (!confirm(`${product.name} ni o'chirmoqchimisiz?`)) return;
    try {
      await deleteProduct(product.id);
      toast.success(tc("success"));
      fetchProducts();
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <div className="flex flex-col gap-6 animate-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <Button onClick={openAddDialog} className="btn-glow">
          <Plus className="mr-2 h-4 w-4" />
          {t("addProduct")}
        </Button>
      </div>

      {/* Filters */}
      <Card className="card-elevated">
        <CardContent className="flex flex-wrap items-center gap-4 p-4">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder={t("category")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">{tc("all")}</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder={tc("search")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[250px]"
          />
        </CardContent>
      </Card>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-10">
          <p className="text-muted-foreground">{tc("loading")}</p>
        </div>
      ) : products.length === 0 ? (
        <div className="flex items-center justify-center py-10">
          <p className="text-muted-foreground">{tc("noData")}</p>
        </div>
      ) : (
        <Card className="card-elevated">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("category")}</TableHead>
                  <TableHead>{t("name")}</TableHead>
                  <TableHead>{t("description")}</TableHead>
                  <TableHead>{t("minStock")}</TableHead>
                  <TableHead>{t("warehouseQty")}</TableHead>
                  <TableHead className="text-right">{tc("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Badge variant="secondary">{product.category}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.description || "—"}</TableCell>
                    <TableCell>{product.minStock}</TableCell>
                    <TableCell>
                      <span
                        className={
                          (product.warehouseQty ?? 0) <= product.minStock
                            ? "text-red-500 font-medium"
                            : ""
                        }
                      >
                        {product.warehouseQty ?? 0}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openEditDialog(product)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDelete(product)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Product Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? tc("edit") : t("addProduct")}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>{t("category")} *</Label>
              <Input
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                placeholder="Printer, Router, Monoblok..."
                list="category-list"
              />
              <datalist id="category-list">
                {categories.map((cat) => (
                  <option key={cat} value={cat} />
                ))}
              </datalist>
            </div>

            <div className="flex flex-col gap-2">
              <Label>{t("name")} *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="HP LaserJet 1102"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>{t("description")}</Label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder={t("description")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>{t("minStock")}</Label>
              <Input
                type="number"
                min={0}
                value={formData.minStock}
                onChange={(e) => setFormData({ ...formData, minStock: parseInt(e.target.value) || 0 })}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                {tc("cancel")}
              </Button>
              <Button type="submit" disabled={isSubmitting} className="btn-glow">
                {isSubmitting ? tc("loading") : tc("save")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
