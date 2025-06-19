"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OrdersManagementPage() {
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
            <div className="text-slate-600">Orders management coming soon...</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 