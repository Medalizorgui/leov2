import Image from "next/image";
import { Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

  <div className="min-h-screen w-full relative overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(37.7,92.1%,50.2%,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(32.1,94.6%,43.7%,0.1),transparent_50%)]"></div>
    </div>

    <div className="relative z-10 min-h-screen">
      {/* Header */}
      <header className="border-b border-amber-200 bg-white/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Image
                src="/logoLeo.jpg"
                alt="Company Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <h1 className="text-2xl font-bold text-slate-800">Products</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-600 w-5 h-5" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-10 bg-white/50 border-amber-200 text-slate-700 placeholder:text-slate-400 focus:border-[hsl(37.7,92.1%,50.2%)] focus:ring-[hsl(37.7,92.1%,50.2%)] transition-all duration-200"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-600 hover:text-slate-800 hover:bg-amber-100/50"
              >
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Product Cards */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="border-amber-200 bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-200">
              <CardContent className="p-6">
                <div className="aspect-square relative rounded-lg overflow-hidden mb-4">
                  <Image
                    src={`/product${i}.jpg`}
                    alt={`Product ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Product {i}</h3>
                <p className="text-slate-600 mb-4">Description of product {i}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-slate-800">$99.99</span>
                  <Button className="bg-gradient-to-r from-[hsl(37.7,92.1%,50.2%)] to-[hsl(32.1,94.6%,43.7%)] hover:from-[hsl(37.7,92.1%,45.2%)] hover:to-[hsl(32.1,94.6%,38.7%)] text-white">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  </div> 