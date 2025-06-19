"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/providers/next-auth-provider"
import { toast } from "sonner"

type CounterType = "square" | "curved"

interface CounterSpec {
  type: CounterType
  name: string
  width: string
  height: string
  length: string
  description: string
}

const counterSpecs: CounterSpec[] = [
  {
    type: "square",
    name: "Professional Counter Square",
    width: "1m00",
    height: "0m94",
    length: "0m40",
    description: "Classic square design for professional presentations",
  },
  {
    type: "curved",
    name: "Professional Counter Curved",
    width: "1m20",
    height: "0m928",
    length: "0m45",
    description: "Modern curved design for enhanced visual appeal",
  },
]

export default function CounterPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<CounterType>("square")
  const [includeDrap, setIncludeDrap] = useState(false)
  const [customLink, setCustomLink] = useState("")
  const [customImage, setCustomImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const { addToCart } = useCart()

  const getCurrentCounter = () => {
    return counterSpecs.find((counter) => counter.type === selectedType) || counterSpecs[0]
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.type.startsWith("image/")) {
        setCustomImage(file)
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
      } else {
        alert("Please upload an image file (jpg, png, jpeg)")
      }
    }
  }

  const handleAddToCart = () => {
    if (!session) {
      router.push("/login")
    } else {
      addToCart({
        productId: `counter-${selectedType}-${includeDrap ? "drap" : "no-drap"}`,
        name: `Counter ${selectedType}${includeDrap ? " + Drap" : ""}`,
        image: "/Counter.jpg",
        quantity: 1,
        options: {
          type: selectedType,
          drap: includeDrap,
          customLink,
          customImage: customImage ? customImage.name : undefined,
        },
      })
      toast.success("Added to cart!")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 relative">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Configuration */}
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Professional Counters</h1>
                <p className="text-slate-600">
                  High-quality professional counters perfect for trade shows, exhibitions, and retail environments.
                  Available in square and curved designs with optional fabric covering.
                </p>
              </div>
              {/* Counter Type Selection */}
              <Card className="bg-white/80 border-amber-200 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Counter Type</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {counterSpecs.map((counter) => (
                      <Card
                        key={counter.type}
                        className={`cursor-pointer transition-all duration-200 ${selectedType === counter.type ? "ring-2 ring-[hsl(37.7,92.1%,50.2%)] bg-white/90" : "bg-white/50 hover:bg-amber-50"}`}
                        onClick={() => setSelectedType(counter.type)}
                      >
                        <CardContent className="p-6">
                          <div className="flex flex-col items-center gap-4">
                            <Image
                              src="/Counter.jpg"
                              alt={counter.name}
                              width={180}
                              height={120}
                              className="object-contain bg-gray-50 rounded-lg p-2"
                            />
                            <div className="text-center space-y-2">
                              <div className="flex items-center gap-2 justify-center">
                                <h4 className="font-semibold text-lg">{counter.name}</h4>
                                {selectedType === counter.type && <Badge className="bg-gradient-to-r from-[hsl(37.7,92.1%,50.2%)] to-[hsl(32.1,94.6%,43.7%)] text-white border-none">Selected</Badge>}
                              </div>
                              <p className="text-sm text-gray-600">{counter.description}</p>
                              <div className="grid grid-cols-3 gap-2 text-xs mt-3">
                                <div className="text-center">
                                  <span className="text-gray-500">Largeur</span>
                                  <div className="font-medium">{counter.width}</div>
                                </div>
                                <div className="text-center">
                                  <span className="text-gray-500">Hauteur</span>
                                  <div className="font-medium">{counter.height}</div>
                                </div>
                                <div className="text-center">
                                  <span className="text-gray-500">Longueur</span>
                                  <div className="font-medium">{counter.length}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
              {/* Drap Option */}
              <Card className="bg-white/80 border-amber-200 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Drap Option</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Add a professional fabric cover to enhance the appearance of your counter
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Without Drap */}
                    <Card
                      className={`cursor-pointer transition-all duration-200 ${!includeDrap ? "ring-2 ring-[hsl(37.7,92.1%,50.2%)] bg-white/90" : "bg-white/50 hover:bg-amber-50"}`}
                      onClick={() => setIncludeDrap(false)}
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center gap-3">
                          <Image
                            src="/Counter.jpg"
                            alt="Counter without drap"
                            width={150}
                            height={100}
                            className="object-contain bg-gray-50 rounded-lg p-2"
                          />
                          <div className="text-center">
                            <h4 className="font-medium">Without Drap</h4>
                            <p className="text-sm text-gray-600">Counter only</p>
                            {!includeDrap && (
                              <Badge className="bg-gradient-to-r from-[hsl(37.7,92.1%,50.2%)] to-[hsl(32.1,94.6%,43.7%)] text-white border-none mt-2">
                                Selected
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    {/* With Drap */}
                    <Card
                      className={`cursor-pointer transition-all duration-200 ${includeDrap ? "ring-2 ring-[hsl(37.7,92.1%,50.2%)] bg-white/90" : "bg-white/50 hover:bg-amber-50"}`}
                      onClick={() => setIncludeDrap(true)}
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center gap-3">
                          <Image
                            src="/Counter.jpg"
                            alt="Counter with drap"
                            width={150}
                            height={100}
                            className="object-contain bg-gray-50 rounded-lg p-2"
                          />
                          <div className="text-center">
                            <h4 className="font-medium">With Drap</h4>
                            <p className="text-sm text-gray-600">Counter + fabric cover</p>
                            {includeDrap && (
                              <Badge className="bg-gradient-to-r from-[hsl(37.7,92.1%,50.2%)] to-[hsl(32.1,94.6%,43.7%)] text-white border-none mt-2">
                                Selected
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
              {/* Product Features */}
              <Card className="bg-white/80 border-amber-200 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">Product Features</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Professional grade construction</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Easy assembly and disassembly</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Lightweight yet sturdy design</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Perfect for trade shows and events</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Optional fabric cover available</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Compact storage and transport</span>
                      </div>
                    </div>
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
                    <div className="space-y-2">
                      <Label htmlFor="customImage" className="text-slate-800">Custom Image</Label>
                      <div className="flex flex-col items-center justify-center w-full">
                        <label
                          htmlFor="customImage"
                          className="flex flex-col items-center justify-center w-full h-64 border-2 border-amber-200 border-dashed rounded-lg cursor-pointer bg-white/50 hover:bg-amber-50"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-4 text-slate-600" />
                            <p className="mb-2 text-sm text-slate-600">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-slate-500">JPG, PNG or JPEG</p>
                          </div>
                          <input
                            id="customImage"
                            type="file"
                            className="hidden"
                            accept="image/jpeg,image/png,image/jpg"
                            onChange={handleImageUpload}
                          />
                        </label>
                        {previewUrl && (
                          <div className="mt-4">
                            <Image
                              src={previewUrl}
                              alt="Preview"
                              width={200}
                              height={200}
                              className="rounded-lg object-contain"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* Right Column - Configuration Summary and Action Button */}
            <div className="lg:sticky lg:top-8 lg:self-start space-y-8">
              {/* Selected Product Preview */}
              <Card className="overflow-hidden bg-white/80 border-amber-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-shrink-0">
                      <Image
                        src="/Counter.jpg"
                        alt={`${getCurrentCounter().name} ${includeDrap ? "with drap" : "without drap"}`}
                        width={250}
                        height={180}
                        className="object-contain bg-gray-50 rounded-lg p-4"
                      />
                    </div>
                    <div className="flex-1 space-y-4">
                      <h4 className="text-xl font-semibold">
                        {getCurrentCounter().name}
                        {includeDrap && " + Drap"}
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-600">Type:</span>
                          <span className="font-medium ml-2 capitalize text-slate-800">{selectedType}</span>
                        </div>
                        <div>
                          <span className="text-slate-600">Drap:</span>
                          <span className="font-medium ml-2 text-slate-800">{includeDrap ? "Included" : "Not included"}</span>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h5 className="font-medium mb-2">Dimensions</h5>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Largeur:</span>
                            <div className="font-medium">{getCurrentCounter().width}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Hauteur:</span>
                            <div className="font-medium">{getCurrentCounter().height}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Longueur:</span>
                            <div className="font-medium">{getCurrentCounter().length}</div>
                          </div>
                        </div>
                      </div>
                      {customLink && (
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Custom Link:</span>
                          <span className="font-medium text-slate-800 truncate max-w-[200px]">{customLink}</span>
                        </div>
                      )}
                      {customImage && (
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Custom Image:</span>
                          <span className="font-medium text-slate-800">{customImage.name}</span>
                        </div>
                      )}
                    </div>
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
  )
}
