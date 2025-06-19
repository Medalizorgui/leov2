"use client";
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setIsLoading(false);
        return;
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(37.7,92.1%,50.2%,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(32.1,94.6%,43.7%,0.1),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 min-h-screen w-full lg:grid lg:grid-cols-2">
        {/* Login Section */}
        <div className="flex items-center justify-center py-12 px-4 lg:px-8">
          <div className="w-full max-w-md">
            <Card className="border-amber-200 bg-white/80 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-800 font-medium">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-600 w-5 h-5" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        className="pl-12 bg-white/50 border-amber-200 text-slate-700 placeholder:text-slate-400 focus:border-[hsl(37.7,92.1%,50.2%)] focus:ring-[hsl(37.7,92.1%,50.2%)] transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-slate-800 font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-600 w-5 h-5" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        required
                        className="pl-12 pr-12 bg-white/50 border-amber-200 text-slate-700 placeholder:text-slate-400 focus:border-[hsl(37.7,92.1%,50.2%)] focus:ring-[hsl(37.7,92.1%,50.2%)] transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-600 hover:text-slate-800 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      <p className="text-red-600 text-sm text-center">{error}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <Link 
                      href="/forgot-password" 
                      className="text-sm text-slate-600 hover:text-[hsl(37.7,92.1%,50.2%)] transition-colors duration-200"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-[hsl(37.7,92.1%,50.2%)] to-[hsl(32.1,94.6%,43.7%)] hover:from-[hsl(37.7,92.1%,45.2%)] hover:to-[hsl(32.1,94.6%,38.7%)] text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl group"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span>Sign In</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Branding Section */}
        <div className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center lg:p-12 relative">
          <div className="text-center space-y-8 max-w-lg">
            <div className="relative">
              <div className="w-40 h-40 mx-auto rounded-3xl bg-gradient-to-br from-[hsl(37.7,92.1%,50.2%)] to-[hsl(32.1,94.6%,43.7%)] p-1 shadow-2xl">
                <div className="w-full h-full rounded-3xl bg-white flex items-center justify-center">
                  <Image
                    src="/logoLeo.jpg"
                    alt="Company Logo"
                    width={120}
                    height={120}
                    className="rounded-2xl"
                  />
                </div>
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-[hsl(37.7,92.1%,50.2%)] to-[hsl(32.1,94.6%,43.7%)] rounded-3xl blur-xl opacity-20 animate-pulse"></div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-slate-800">Your Company</h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                Experience the future of business management with our cutting-edge platform
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}