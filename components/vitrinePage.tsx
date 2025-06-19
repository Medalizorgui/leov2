import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Sparkles, Star, Award, Heart } from "lucide-react"
import Link from "next/link"

export default function VitrinePage() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,#fbbf24_0%,transparent_60%)] opacity-20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#f59e42_0%,transparent_70%)] opacity-10"></div>
      </div>

      <div className="relative z-10">
        {/* Header with Logo */}
        <header className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center space-y-6">
            <div className="w-40 h-40 rounded-3xl bg-gradient-to-br from-[hsl(37.7,92.1%,50.2%)] to-[hsl(32.1,94.6%,43.7%)] p-1 shadow-xl">
              <div className="w-full h-full rounded-3xl bg-slate-900 flex items-center justify-center">
                <Image
                  src="/logoLeo.jpg"
                  alt="Leo Logo"
                  width={120}
                  height={120}
                  className="rounded-2xl"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Description Section */}
        <section className="container mx-auto px-4 py-12 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Crafted with Excellence</h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
              Discover our carefully curated collection of premium products, each designed with meticulous attention to
              detail and crafted to elevate your everyday experience. We believe in quality, innovation, and timeless
              design that speaks to the modern lifestyle.
            </p>
          </div>
        </section>

        {/* Products Display */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Popup Stand Product */}
            <Link href="/products/popup-stands" className="group">
              <Card className="group hover:shadow-xl transition-all duration-300 border-amber-200 bg-white/90 backdrop-blur-sm cursor-pointer">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="w-28 h-28 rounded-xl bg-gradient-to-r from-[hsl(37.7,92.1%,50.2%)] to-[hsl(32.1,94.6%,43.7%)] flex items-center justify-center mb-4 overflow-hidden group-hover:scale-105 transition-transform">
                    <Image src="/Stand-pop.png" alt="Pop-up Stand" width={90} height={90} className="object-contain" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2 text-center">Pop-up Stand</h3>
                  <p className="text-slate-600 leading-relaxed text-center text-sm">
                    Professional pop-up display stands perfect for trade shows, exhibitions, and promotional events. Available in flat and curved designs.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-amber-600 group-hover:underline">View Details <ArrowRight className="w-4 h-4" /></span>
                </CardContent>
              </Card>
            </Link>
            {/* Counter Product */}
            <Link href="/products/Counter" className="group">
              <Card className="group hover:shadow-xl transition-all duration-300 border-amber-200 bg-white/90 backdrop-blur-sm cursor-pointer">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="w-28 h-28 rounded-xl bg-gradient-to-r from-[hsl(32.1,94.6%,43.7%)] to-[hsl(37.7,92.1%,50.2%)] flex items-center justify-center mb-4 overflow-hidden group-hover:scale-105 transition-transform">
                    <Image src="/Counter.jpg" alt="Counter" width={90} height={90} className="object-contain" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2 text-center">Counter</h3>
                  <p className="text-slate-600 leading-relaxed text-center text-sm">
                    High-quality professional counters for trade shows, exhibitions, and retail. Choose from square or curved designs, with optional fabric cover.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-amber-600 group-hover:underline">View Details <ArrowRight className="w-4 h-4" /></span>
                </CardContent>
              </Card>
            </Link>
            {/* Flags Product */}
            <Link href="/products/flags" className="group">
              <Card className="group hover:shadow-xl transition-all duration-300 border-amber-200 bg-white/90 backdrop-blur-sm cursor-pointer">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="w-28 h-28 rounded-xl bg-gradient-to-r from-[hsl(37.7,92.1%,50.2%)] to-[hsl(32.1,94.6%,43.7%)] flex items-center justify-center mb-4 overflow-hidden group-hover:scale-105 transition-transform">
                    <Image src="/flag.png" alt="Flags" width={90} height={90} className="object-contain" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2 text-center">Flags</h3>
                  <p className="text-slate-600 leading-relaxed text-center text-sm">
                    High-quality flags for events, advertising, and outdoor displays. Multiple shapes, sizes, and base options available.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-amber-600 group-hover:underline">View Details <ArrowRight className="w-4 h-4" /></span>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-12 text-center">
          <div className="border-t border-slate-700 pt-8">
            <p className="text-slate-300">© 2024 Leo. Crafted with passion and precision.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
