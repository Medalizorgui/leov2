"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useState, useEffect } from "react"
import React from "react"

export default function OrdersManagementPage() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
  }, [])

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
                      </tr>
                      {expanded === order.id && (
                        <tr>
                          <td colSpan={4} className="bg-amber-50/60 px-4 py-4">
                            <div className="space-y-4">
                              {order.items.map((item: any) => (
                                <div key={item.id} className="flex flex-col md:flex-row md:items-center gap-4 border-b pb-4 last:border-0">
                                  <Image src={item.image} alt={item.productName} width={80} height={80} className="rounded-lg bg-white p-2 border border-amber-100" />
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
      </div>
    </div>
  )
}
