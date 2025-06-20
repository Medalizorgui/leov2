"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useState, useEffect } from "react"
import React from "react"
import { UploadButton } from "@uploadthing/react"
import type { OurFileRouter } from "@/app/api/uploadthing/route"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function OrdersManagementPage() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [editingItem, setEditingItem] = useState<any | null>(null)
  const [isAdding, setIsAdding] = useState<string | null>(null)
  const [form, setForm] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
  }, [])

  const handleEdit = (item: any) => {
    setEditingItem(item)
    setForm({ ...item })
    setDialogOpen(true)
  }
  const handleAdd = (orderId: string) => {
    setIsAdding(orderId)
    setForm({ orderId, productId: "", productName: "", productType: "", size: "", image: "", link: "", quantity: 1, options: {} })
    setDialogOpen(true)
  }
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return
    setLoading(true)
    await fetch("/api/admin/order-items", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
    setOrders((prev) => prev.map(order => ({ ...order, items: order.items.filter((i: any) => i.id !== id) })))
    setLoading(false)
  }
  const handleSave = async () => {
    setLoading(true)
    const method = editingItem ? "PUT" : "POST"
    const res = await fetch("/api/admin/order-items", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
    const data = await res.json()
    if (editingItem) {
      setOrders((prev) => prev.map(order => ({ ...order, items: order.items.map((i: any) => i.id === data.id ? data : i) })))
      setEditingItem(null)
    } else {
      setOrders((prev) => prev.map(order => order.id === form.orderId ? { ...order, items: [...order.items, data] } : order))
      setIsAdding(null)
    }
    setLoading(false)
    setDialogOpen(false)
  }
  const handleCancel = () => {
    setEditingItem(null)
    setIsAdding(null)
    setDialogOpen(false)
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-6">
          <Link href="/admin">
            <Button variant="outline">← Back to Admin Dashboard</Button>
          </Link>
        </div>
        <Card className="border-amber-200 bg-white/80 backdrop-blur-xl shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-slate-800">Orders Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-amber-100/50">
                    <th className="px-4 py-2 text-left">Order Date</th>
                    <th className="px-4 py-2 text-left">User</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Items</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <React.Fragment key={order.id}>
                      <tr className="border-b last:border-0 hover:bg-amber-50 cursor-pointer" onClick={() => setExpanded(expanded === order.id ? null : order.id)}>
                        <td className="px-4 py-2 text-slate-800 font-medium">{order.createdAt}</td>
                        <td className="px-4 py-2">{order.user.name}</td>
                        <td className="px-4 py-2">{order.user.email}</td>
                        <td className="px-4 py-2">{order.items.length}</td>
                        <td className="px-4 py-2"><Button size="sm" onClick={e => { e.stopPropagation(); handleAdd(order.id) }}>Add Item</Button></td>
                      </tr>
                      {expanded === order.id && (
                        <tr>
                          <td colSpan={5} className="bg-amber-50/60 px-4 py-4">
                            <div className="space-y-4">
                              {order.items.map((item: any) => (
                                <div key={item.id} className="flex flex-col md:flex-row md:items-center gap-4 border-b pb-4 last:border-0">
                                  <div className="flex flex-col items-center">
                                    <Image src={item.image || item.originalImage || "/placeholder.png"} alt={item.productName} width={80} height={80} className="rounded-lg bg-white p-2 border border-amber-100" />
                                    <Button size="sm" variant="outline" className="mt-2" onClick={() => handleEdit(item)}>Edit</Button>
                                    <Button size="sm" variant="destructive" className="mt-1" onClick={() => handleDelete(item.id)}>Delete</Button>
                                  </div>
                                  <div className="flex-1">
                                    <div className="font-semibold text-slate-800 text-lg">{item.productName}</div>
                                    <div className="text-xs text-slate-500 mb-1">Type: {item.productType} {item.size && `| Size: ${item.size}`}</div>
                                    <div className="flex flex-wrap gap-2 mb-1">
                                      {item.options && Object.entries(item.options).map(([k, v]) => (
                                        <Badge key={k} className="bg-gradient-to-r from-[hsl(37.7,92.1%,50.2%)] to-[hsl(32.1,94.6%,43.7%)] text-white border-none">
                                          {k}: {String(v)}
                                        </Badge>
                                      ))}
                                    </div>
                                    {item.link && (
                                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-amber-700 underline text-xs">Custom Link</a>
                                    )}
                                    <div className="text-xs text-slate-600 mt-1">Quantity: <span className="font-semibold">{item.quantity}</span></div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        {dialogOpen && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-amber-100">
              <DialogHeader>
                <DialogTitle>{editingItem ? "Edit Item" : "Add Item"}</DialogTitle>
                <DialogDescription>
                  {editingItem
                    ? "Update the order item details below."
                    : "Add a new item to this order."}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-row gap-8 justify-center items-start mb-6">
                <div className="flex flex-col items-center w-40">
                  <span className="text-xs font-semibold text-amber-700 mb-1">Original Product Image</span>
                  <div className="rounded-lg bg-white border-2 border-amber-200 p-2 mb-2 w-32 h-32 flex items-center justify-center">
                    <Image
                      src={editingItem?.originalImage || "/placeholder.png"}
                      alt="Original"
                      width={96}
                      height={96}
                      className="object-contain rounded"
                    />
                  </div>
                  <span className="text-xs text-slate-500 text-center">Product's default image</span>
                </div>
                <div className="flex flex-col items-center w-40">
                  <span className="text-xs font-semibold text-orange-700 mb-1">Custom Uploaded Image</span>
                  <div className="rounded-lg bg-white border-2 border-orange-200 p-2 mb-2 w-32 h-32 flex items-center justify-center">
                    <Image
                      src={form.image || "/placeholder.png"}
                      alt="Custom"
                      width={96}
                      height={96}
                      className="object-contain rounded"
                    />
                  </div>
                  <UploadButton<OurFileRouter>
                    endpoint="productImage"
                    appearance={{
                      button:
                        "bg-gradient-to-r from-amber-400 to-orange-400 text-white font-semibold py-2 px-4 rounded-lg shadow hover:from-amber-500 hover:to-orange-500 transition-all duration-200 text-xs",
                      container: "flex flex-col items-center justify-center w-full",
                    }}
                    onClientUploadComplete={(res) => {
                      if (res && res[0]?.url)
                        setForm((f: any) => ({ ...f, image: res[0].url }));
                    }}
                    onUploadError={() => alert("Upload failed")}
                  />
                  <span className="text-xs text-slate-500 mt-1 text-center">Upload a custom image for this order item.</span>
                </div>
              </div>
              <form className="space-y-4 mt-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="productName" className="text-slate-800">Product Name</Label>
                  <Input id="productName" value={form.productName || ""} onChange={e => setForm((f: any) => ({ ...f, productName: e.target.value }))} aria-invalid={!form.productName} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="productType" className="text-slate-800">Product Type</Label>
                  <Input id="productType" value={form.productType || ""} onChange={e => setForm((f: any) => ({ ...f, productType: e.target.value }))} aria-invalid={!form.productType} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="size" className="text-slate-800">Size</Label>
                  <Input id="size" value={form.size || ""} onChange={e => setForm((f: any) => ({ ...f, size: e.target.value }))} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="quantity" className="text-slate-800">Quantity</Label>
                  <Input id="quantity" type="number" value={form.quantity || 1} onChange={e => setForm((f: any) => ({ ...f, quantity: Number(e.target.value) }))} min={1} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="link" className="text-slate-800">Link</Label>
                  <Input id="link" value={form.link || ""} onChange={e => setForm((f: any) => ({ ...f, link: e.target.value }))} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="productId" className="text-slate-800">Product ID</Label>
                  <Input id="productId" value={form.productId || ""} onChange={e => setForm((f: any) => ({ ...f, productId: e.target.value }))} aria-invalid={!form.productId} />
                </div>
              </form>
              <DialogFooter className="mt-6">
                <Button type="submit" onClick={handleSave} disabled={loading} className="bg-gradient-to-r from-amber-400 to-orange-400 text-white font-semibold px-6 py-2 rounded-lg shadow hover:from-amber-500 hover:to-orange-500 transition-all duration-200">
                  {loading ? "Saving..." : "Save"}
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant="outline" onClick={handleCancel} className="border-amber-200 text-slate-700 hover:bg-amber-50">
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
