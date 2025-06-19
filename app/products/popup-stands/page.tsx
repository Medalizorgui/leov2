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

type PopupType = "plat" | "curve"

interface PopupSize {
  id: string
  name: string
  width: string
  height: string
  description: string
}

const platSizes: PopupSize[] = [
  { id: "1/3", name: "1/3", width: "0m75", height: "2m25", description: "Compact size" },
  { id: "2/3", name: "2/3", width: "1m50", height: "2m25", description: "Medium size" },
  { id: "3/3", name: "3/3", width: "2m25", height: "2m25", description: "Large size" },
  { id: "4/3", name: "4/3", width: "3m00", height: "2m25", description: "Extra large size" },
]

const curveSizes: PopupSize[] = [
  { id: "3/3", name: "3/3", width: "2m09", height: "2m25", description: "Large curved" },
  { id: "4/3", name: "4/3", width: "2m78", height: "2m25", description: "Extra large curved" },
]

export default function PopupStandPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<PopupType>("plat");
  const [selectedSize, setSelectedSize] = useState<string>("1/3");
  const [customLink, setCustomLink] = useState("");
  const [customImage, setCustomImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { addToCart } = useCart();

  const getAvailableSizes = () => {
    return selectedType === "plat" ? platSizes : curveSizes;
  };

  const getProductImageUrl = () => {
    return `/Stand-pop.png?height=300&width=400&text=Popup+${selectedType}+${selectedSize.replace("/", "-")}`;
  };

  const getCurrentSize = () => {
    const sizes = getAvailableSizes();
    return sizes.find((size) => size.id === selectedSize) || sizes[0];
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setCustomImage(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        alert("Please upload an image file (jpg, png, jpeg)");
      }
    }
  };

  const handleAddToCart = () => {
    if (!session) {
      router.push("/login");
    } else {
      addToCart({
        productId: `popup-stands-${selectedType}-${selectedSize}`,
        name: `Pop-up Stand ${selectedType} ${selectedSize}`,
        image: "/Stand-pop.png",
        quantity: 1,
        options: {
          type: selectedType,
          size: selectedSize,
          customLink,
          customImage: customImage ? customImage.name : undefined,
        },
      });
      toast.success("Added to cart!");
    }
  };

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
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Pop-up Stands</h1>
                <p className="text-slate-600">
                  Professional pop-up display stands perfect for trade shows, exhibitions, and promotional events.
                  Available in flat and curved designs with multiple size options.
                </p>
              </div>
              {/* Type Selection */}
              <Card className="bg-white/80 border-amber-200 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Stand Type</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <Button
                      variant={selectedType === "plat" ? "default" : "outline"}
                      onClick={() => {
                        setSelectedType("plat");
                        setSelectedSize("1/3");
                      }}
                      className={`h-auto p-6 flex flex-col items-center gap-4 transition-all duration-200 ${selectedType === "plat" ? "bg-gradient-to-r from-[hsl(37.7,92.1%,50.2%)] to-[hsl(32.1,94.6%,43.7%)] text-white border-none shadow-lg" : "bg-white/50 border-amber-200 text-slate-700 hover:bg-amber-50 hover:text-slate-900"}`}
                    >
                      <Image
                        src="/Stand-pop.png"
                        alt="Plat popup stand"
                        width={160}
                        height={120}
                        className="object-contain"
                      />
                      <div className="text-center">
                        <span className="text-lg font-medium">Plat</span>
                        <p className="text-xs text-gray-600 mt-1">Flat display surface</p>
                      </div>
                    </Button>
                    <Button
                      variant={selectedType === "curve" ? "default" : "outline"}
                      onClick={() => {
                        setSelectedType("curve");
                        setSelectedSize("3/3");
                      }}
                      className={`h-auto p-6 flex flex-col items-center gap-4 transition-all duration-200 ${selectedType === "curve" ? "bg-gradient-to-r from-[hsl(37.7,92.1%,50.2%)] to-[hsl(32.1,94.6%,43.7%)] text-white border-none shadow-lg" : "bg-white/50 border-amber-200 text-slate-700 hover:bg-amber-50 hover:text-slate-900"}`}
                    >
                      <Image
                        src="/Stand-pop.png"
                        alt="Curve popup stand"
                        width={160}
                        height={120}
                        className="object-contain"
                      />
                      <div className="text-center">
                        <span className="text-lg font-medium">Curve</span>
                        <p className="text-xs text-gray-600 mt-1">Curved display surface</p>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              {/* Size Selection */}
              <Card className="bg-white/80 border-amber-200 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Size Options - {selectedType === "plat" ? "Plat" : "Curve"}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getAvailableSizes().map((size) => (
                      <Card
                        key={size.id}
                        className={`cursor-pointer transition-all duration-200 ${selectedSize === size.id ? "ring-2 ring-[hsl(37.7,92.1%,50.2%)] bg-white/90" : "bg-white/50 hover:bg-amber-50"}`}
                        onClick={() => setSelectedSize(size.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <Image
                              src="/Stand-pop.png"
                              alt={`${selectedType} ${size.name}`}
                              width={120}
                              height={100}
                              className="object-contain bg-gray-50 rounded-lg p-2"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold text-lg">{size.name}</h4>
                                {selectedSize === size.id && <Badge className="bg-gradient-to-r from-[hsl(37.7,92.1%,50.2%)] to-[hsl(32.1,94.6%,43.7%)] text-white border-none">Selected</Badge>}
                              </div>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Width:</span>
                                  <span className="font-medium">{size.width}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Height:</span>
                                  <span className="font-medium">{size.height}</span>
                                </div>
                                <p className="text-gray-600 mt-2">{size.description}</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
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
                        <span>Easy setup and breakdown</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Lightweight aluminum frame</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>High-quality fabric graphics</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Includes carrying case</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Professional appearance</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Durable construction</span>
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
                        src="/Stand-pop.png"
                        alt={`${selectedType} ${selectedSize} popup stand`}
                        width={200}
                        height={150}
                        className="object-contain bg-gray-50 rounded-lg p-4"
                      />
                    </div>
                    <div className="flex-1 space-y-3">
                      <h4 className="text-xl font-semibold capitalize text-slate-800">
                        Pop-up Stand {selectedType} - {selectedSize}
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-600">Type:</span>
                          <span className="font-medium ml-2 capitalize text-slate-800">{selectedType}</span>
                        </div>
                        <div>
                          <span className="text-slate-600">Size:</span>
                          <span className="font-medium ml-2 text-slate-800">{selectedSize}</span>
                        </div>
                        <div>
                          <span className="text-slate-600">Width:</span>
                          <span className="font-medium ml-2 text-slate-800">{getCurrentSize().width}</span>
                        </div>
                        <div>
                          <span className="text-slate-600">Height:</span>
                          <span className="font-medium ml-2 text-slate-800">{getCurrentSize().height}</span>
                        </div>
                      </div>
                      <p className="text-slate-600">{getCurrentSize().description}</p>
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
  );
}
