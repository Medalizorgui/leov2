"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/providers/next-auth-provider";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import Link from "next/link";

export function NavBar() {
  const { data: session } = useSession();
  const router = useRouter();
  const { cart, removeFromCart, clearCart } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full px-4 py-2 flex items-center justify-between bg-white/80 border-b border-amber-200 shadow-sm sticky top-0 z-30 backdrop-blur-md">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <img src="/logoLeo.jpg" alt="Leo Logo" className="w-10 h-10 rounded-xl object-cover" />
        <span className="font-bold text-lg text-slate-800">Leo</span>
      </Link>
      {/* Nav Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Cart Button */}
        <Button
          variant="outline"
          className="relative"
          onClick={() => setOpen(true)}
        >
          <ShoppingCart className="w-5 h-5" />
          {cart.length > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-[hsl(37.7,92.1%,50.2%)] to-[hsl(32.1,94.6%,43.7%)] text-white border-none px-2 py-0.5 text-xs">{cart.length}</Badge>
          )}
        </Button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="right" className="max-w-md w-full bg-white/90 border-amber-200">
            <SheetHeader>
              <SheetTitle className="text-2xl font-bold text-slate-800 mb-2">Your Cart</SheetTitle>
            </SheetHeader>
            {cart.length === 0 ? (
              <div className="text-slate-600 mt-8 text-center">Your cart is empty.</div>
            ) : (
              <div className="space-y-6 mt-6">
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
                <Button variant="destructive" className="w-full mt-4" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
        {/* Auth/Admin Buttons */}
        {session ? (
          <>
            {session.user.role === "ADMIN" && (
              <Button
                variant="default"
                onClick={() => router.push("/admin")}
                className="hidden md:inline-flex"
              >
                Admin Dashboard
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="hidden md:inline-flex"
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            variant="default"
            onClick={() => router.push("/login")}
            className="hidden md:inline-flex"
          >
            Login
          </Button>
        )}
        {/* Mobile Dropdown for Auth/Admin */}
        <div className="md:hidden">
          <select
            className="bg-white/80 border border-amber-200 rounded-md px-2 py-1 text-slate-700"
            onChange={e => {
              if (e.target.value === "login") router.push("/login");
              if (e.target.value === "logout") signOut({ callbackUrl: "/" });
              if (e.target.value === "admin") router.push("/admin");
            }}
            value=""
          >
            <option value="" disabled>Menu</option>
            {!session && <option value="login">Login</option>}
            {session && <option value="logout">Logout</option>}
            {session && session.user.role === "ADMIN" && <option value="admin">Admin Dashboard</option>}
          </select>
        </div>
      </div>
    </nav>
  );
} 