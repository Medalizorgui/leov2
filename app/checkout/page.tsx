"use client";

import { useCart } from "@/components/providers/next-auth-provider";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function CheckoutPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Failed to place order");
      } else {
        setSuccess(true);
        clearCart();
        setTimeout(() => router.push("/orders"), 1500);
      }
    } catch (e) {
      setError("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex flex-col items-center py-12">
      <Card className="w-full max-w-2xl border-amber-200 bg-white/80 backdrop-blur-xl shadow-lg">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Checkout</h2>
          {cart.length === 0 ? (
            <div className="text-slate-600 text-center">Your cart is empty.</div>
          ) : (
            <div className="space-y-6">
              {cart.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 border-b pb-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-contain bg-gray-100" />
                  <div className="flex-1">
                    <div className="font-semibold text-slate-800">{item.name}</div>
                    <div className="text-xs text-slate-500">Qty: {item.quantity}</div>
                    {item.options && (
                      <div className="text-xs text-slate-500 mt-1">{Object.entries(item.options).map(([k, v]) => `${k}: ${v}`).join(", ")}</div>
                    )}
                  </div>
                  <Button size="sm" variant="outline" onClick={() => removeFromCart(item.productId)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                className="w-full bg-gradient-to-r from-[hsl(37.7,92.1%,50.2%)] to-[hsl(32.1,94.6%,43.7%)] text-white mt-4"
                onClick={handlePlaceOrder}
                disabled={loading}
              >
                {loading ? "Placing Order..." : "Place Order"}
              </Button>
              {error && <div className="text-red-600 text-center mt-2">{error}</div>}
              {success && <div className="text-green-600 text-center mt-2">Order placed! Redirecting...</div>}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 