"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"
import { useCart } from "@/components/providers/next-auth-provider"
import { toast } from "sonner"
import { UploadButton } from "@uploadthing/react"
import type { OurFileRouter } from "@/app/api/uploadthing/route"

type FlagType = "courbé" | "droit" | "incliné" | "rectangulaire"
type StandardHeight = "2m" | "2m50" | "2m80" | "3m20" | "3m80" | "4m50" | "5m"
type RectangularHeight = "2m30" | "2m70" | "3m30" | "3m90"
type BaseType = "water-22kg" | "water-15kg" | "beton" | "metal-7kg" | "metal-7.5kg" | "metal-10kg"
type BarreType = "with" | "without"

const standardHeights: StandardHeight[] = ["2m", "2m50", "2m80", "3m20", "3m80", "4m50", "5m"]
const rectangularHeights: RectangularHeight[] = ["2m30", "2m70", "3m30", "3m90"]

const baseTypes = [
  { id: "water-22kg" as BaseType, name: "Water Base 22kg", description: "Heavy-duty water-filled base" },
  { id: "water-15kg" as BaseType, name: "Water Base 15kg", description: "Medium water-filled base" },
  { id: "beton" as BaseType, name: "Béton Base", description: "Concrete base for maximum stability" },
  { id: "metal-7kg" as BaseType, name: "Metal Base 7kg", description: "Lightweight metal base" },
  { id: "metal-7.5kg" as BaseType, name: "Metal Base 7.5kg", description: "Standard metal base" },
  { id: "metal-10kg" as BaseType, name: "Metal Base 10kg", description: "Heavy-duty metal base" },
]

export default function FlagProductPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<FlagType>("courbé")
  const [selectedHeight, setSelectedHeight] = useState<StandardHeight | RectangularHeight>("2m")
  const [selectedBase, setSelectedBase] = useState<BaseType | null>(null)
  const [selectedBarre, setSelectedBarre] = useState<BarreType>("with")
  const [customLink, setCustomLink] = useState("")
  const [customImageUrl, setCustomImageUrl] = useState<string | null>(null)
  const { addToCart } = useCart()

  const getAvailableHeights = () => {
    return selectedType === "rectangulaire" ? rectangularHeights : standardHeights
  }

  const getFlagImageUrl = () => {
    return `/flag.png`
  }

  const getBaseImageUrl = (baseType: BaseType) => {
    return `/base.png`
  }

  const handleAddToCart = () => {
    if (!session) {
      router.push("/login")
    } else {
      addToCart({
        productId: `flag-${selectedType}-${selectedHeight}-${selectedBase || "no-base"}-${selectedBarre}`,
        name: `Flag ${selectedType} ${selectedHeight}`,
        image: customImageUrl || "/flag.png",
        quantity: 1,
        options: {
          type: selectedType,
          height: selectedHeight,
          base: selectedBase,
          barre: selectedBarre,
          customLink,
          customImage: customImageUrl,
        },
      })
      toast.success("Added to cart!")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(37.7,92.1%,50.2%,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(32.1,94.6%,43.7%,0.1),transparent_50%)]"></div>
      </div>

      {/* Header */}
      <header className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-slate-700 hover:text-slate-900 hover:bg-amber-100/50" onClick={() => router.push("/")}>
            ← Back to Products
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Professional Flags</h1>
              <p className="text-slate-600">
                High-quality flags perfect for events, advertising, and outdoor displays.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Flag and Base Selection */}
              <div className="space-y-8">
                {/* Flag Type Selection */}
                <Card className="bg-white/80 border-amber-200 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Flag Type</h3>
                    <div className="space-y-4">
                      {/* Standard Types */}
                      <div className="space-y-3">
                        <p className="text-sm text-slate-600 font-medium">Standard Types</p>
                        <div className="grid grid-cols-3 gap-4">
                          {(["courbé", "droit", "incliné"] as FlagType[]).map((type) => (
                            <Button
                              key={type}
                              variant={selectedType === type ? "default" : "outline"}
                              onClick={() => {
                                setSelectedType(type)
                                setSelectedHeight("2m")
                              }}
                              className={`h-auto p-6 flex flex-col items-center gap-3 transition-all duration-200 ${
                                selectedType === type
                                  ? "bg-gradient-to-r from-[hsl(37.7,92.1%,50.2%)] to-[hsl(32.1,94.6%,43.7%)] text-white border-none shadow-lg"
                                  : "bg-white/50 border-amber-200 text-slate-700 hover:bg-amber-50 hover:text-slate-900"
                              }`}
                            >
                              <Image
                                src="/flag.png"
                                alt={type}
                                width={120}
                                height={180}
                                className="object-contain"
                              />
                              <span className="capitalize text-sm font-medium">{type}</span>
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Rectangular Type */}
                      <div className="space-y-3">
                        <p className="text-sm text-slate-600 font-medium">Special Type</p>
                        <Button
                          variant={selectedType === "rectangulaire" ? "default" : "outline"}
                          onClick={() => {
                            setSelectedType("rectangulaire")
                            setSelectedHeight("2m30")
                          }}
                          className={`h-auto p-6 flex flex-col items-center gap-3 w-64 transition-all duration-200 ${
                            selectedType === "rectangulaire"
                              ? "bg-gradient-to-r from-[hsl(37.7,92.1%,50.2%)] to-[hsl(32.1,94.6%,43.7%)] text-white border-none shadow-lg"
                              : "bg-white/50 border-amber-200 text-slate-700 hover:bg-amber-50 hover:text-slate-900"
                          }`}
                        >
                          <Image
                            src="/flag.png"
                            alt="rectangulaire"
                            width={200}
                            height={150}
                            className="object-contain"
                          />
                          <span className="capitalize text-sm font-medium">Rectangulaire</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Height Selection */}
                <Card className="bg-white/80 border-amber-200 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Height</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {getAvailableHeights().map((height) => (
                        <Button
                          key={height}
                          variant={selectedHeight === height ? "default" : "outline"}
                          onClick={() => setSelectedHeight(height)}
                          className={`text-sm transition-all duration-200 ${
                            selectedHeight === height
                              ? "bg-gradient-to-r from-[hsl(37.7,92.1%,50.2%)] to-[hsl(32.1,94.6%,43.7%)] text-white border-none shadow-lg"
                              : "bg-white/50 border-amber-200 text-slate-700 hover:bg-amber-50 hover:text-slate-900"
                          }`}
                        >
                          {height}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Barre Selection */}
                <Card className="bg-white/80 border-amber-200 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Barre</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {(["with", "without"] as BarreType[]).map((type) => (
                        <Button
                          key={type}
                          variant={selectedBarre === type ? "default" : "outline"}
                          onClick={() => setSelectedBarre(type)}
                          className={`h-auto p-4 flex flex-col items-center gap-3 transition-all duration-200 ${
                            selectedBarre === type
                              ? "bg-gradient-to-r from-[hsl(37.7,92.1%,50.2%)] to-[hsl(32.1,94.6%,43.7%)] text-white border-none shadow-lg"
                              : "bg-white/50 border-amber-200 text-slate-700 hover:bg-amber-50 hover:text-slate-900"
                          }`}
                        >
                          <span className="capitalize text-sm font-medium">{type}</span>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Base Selection */}
                <Card className="bg-white/80 border-amber-200 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Base Selection</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Choose a base for your flag or select none if purchasing separately
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {/* No Base Option */}
                      <Card
                        className={`cursor-pointer transition-all duration-200 ${
                          selectedBase === null
                            ? "ring-2 ring-[hsl(37.7,92.1%,50.2%)] bg-white/90"
                            : "bg-white/50 hover:bg-amber-50"
                        }`}
                        onClick={() => setSelectedBase(null)}
                      >
                        <CardContent className="p-4">
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-32 h-32 bg-amber-50 rounded-lg flex items-center justify-center">
                              <span className="text-xs text-slate-600">No Base</span>
                            </div>
                            <div className="text-center">
                              <h4 className="font-medium text-slate-800">No Base</h4>
                              <p className="text-xs text-slate-600">Purchase separately</p>
                            </div>
                            {selectedBase === null && (
                              <Badge className="bg-gradient-to-r from-[hsl(37.7,92.1%,50.2%)] to-[hsl(32.1,94.6%,43.7%)] text-white border-none">
                                Selected
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Base Options */}
                      {baseTypes.map((base) => (
                        <Card
                          key={base.id}
                          className={`cursor-pointer transition-all duration-200 ${
                            selectedBase === base.id
                              ? "ring-2 ring-[hsl(37.7,92.1%,50.2%)] bg-white/90"
                              : "bg-white/50 hover:bg-amber-50"
                          }`}
                          onClick={() => setSelectedBase(base.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex flex-col items-center gap-3">
                              <Image
                                src="/base.png"
                                alt={base.name}
                                width={120}
                                height={120}
                                className="object-contain bg-amber-50 rounded-lg p-2"
                              />
                              <div className="text-center">
                                <h4 className="font-medium text-sm text-slate-800">{base.name}</h4>
                                <p className="text-xs text-slate-600">{base.description}</p>
                              </div>
                              {selectedBase === base.id && (
                                <Badge className="bg-gradient-to-r from-[hsl(37.7,92.1%,50.2%)] to-[hsl(32.1,94.6%,43.7%)] text-white border-none">
                                  Selected
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Custom Options */}
                <Card className="bg-white/80 border-amber-200 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Custom Options</h3>
                    <div className="space-y-6">
                      {/* Custom Link */}
                      <div className="space-y-2">
                        <Label htmlFor="customLink" className="text-slate-800">Custom Link</Label>
                        <Input
                          id="customLink"
                          type="url"
                          placeholder="Enter your custom link"
                          value={customLink}
                          onChange={(e) => setCustomLink(e.target.value)}
                          className="bg-white/50 border-amber-200 text-slate-700 placeholder:text-slate-400"
                        />
                      </div>

                      {/* Custom Image Upload */}
                      <Label htmlFor="customImage" className="text-slate-800">Custom Image</Label>
                      {session ? (
                        <div className="flex flex-col items-center justify-center w-full">
                          <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-amber-200 border-dashed rounded-lg bg-white/50 hover:bg-amber-50 transition cursor-pointer">
                            <Upload className="w-10 h-10 mb-3 text-amber-400" />
                            <span className="font-semibold text-slate-700 mb-1">Click or drag to upload your image</span>
                            <span className="text-xs text-slate-500 mb-4">JPG, PNG or JPEG, max 4MB</span>
                            <div className="w-full flex justify-center">
                              <UploadButton<OurFileRouter>
                                endpoint="productImage"
                                appearance={{
                                  button: "bg-gradient-to-r from-amber-400 to-orange-400 text-white font-semibold py-2 px-6 rounded-lg shadow hover:from-amber-500 hover:to-orange-500 transition-all duration-200",
                                  container: "flex flex-col items-center justify-center w-full",
                                }}
                                onClientUploadComplete={(res) => {
                                  if (res && res[0]?.url) {
                                    setCustomImageUrl(res[0].url);
                                    toast.success("Image uploaded!");
                                  }
                                }}
                                onUploadError={() => toast.error("Upload failed")}
                              />
                            </div>
                          </div>
                          {customImageUrl && (
                            <div className="mt-4">
                              <Image
                                src={customImageUrl}
                                alt="Preview"
                                width={200}
                                height={200}
                                className="rounded-lg object-contain"
                              />
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-amber-200 rounded-lg bg-white/50">
                          <span className="text-slate-600">Please log in to upload a custom image.</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Configuration Summary and Action Button */}
              <div className="lg:sticky lg:top-8 lg:self-start">
                <div className="space-y-8">
                  {/* Configuration Summary */}
                  <Card className="bg-white/80 border-amber-200 shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4 text-slate-800">Your Configuration</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Type:</span>
                          <span className="font-medium text-slate-800 capitalize">{selectedType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Height:</span>
                          <span className="font-medium text-slate-800">{selectedHeight}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Barre:</span>
                          <span className="font-medium text-slate-800 capitalize">{selectedBarre}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Base:</span>
                          <span className="font-medium text-slate-800">
                            {selectedBase ? baseTypes.find((b) => b.id === selectedBase)?.name : "None"}
                          </span>
                        </div>
                        {customLink && (
                          <div className="flex justify-between">
                            <span className="text-slate-600">Custom Link:</span>
                            <span className="font-medium text-slate-800 truncate max-w-[200px]">{customLink}</span>
                          </div>
                        )}
                        {customImageUrl && (
                          <div className="flex justify-between">
                            <span className="text-slate-600">Custom Image:</span>
                            <span className="font-medium text-slate-800">{customImageUrl}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Action Button */}
                  <Button
                    size="lg"
                    onClick={handleAddToCart}
                    className="w-full bg-gradient-to-r from-[hsl(37.7,92.1%,50.2%)] to-[hsl(32.1,94.6%,43.7%)] text-white hover:from-[hsl(37.7,92.1%,45.2%)] hover:to-[hsl(32.1,94.6%,38.7%)] shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
