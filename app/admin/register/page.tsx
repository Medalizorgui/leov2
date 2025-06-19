"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  Shield,
  CheckCircle,
  UserCheck
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPasswordStrength(checkPasswordStrength(password));
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    if (passwordStrength <= 4) return "bg-[hsl(37.7,92.1%,50.2%)]";
    return "bg-[hsl(32.1,94.6%,43.7%)]";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength <= 3) return "Fair";
    if (passwordStrength <= 4) return "Good";
    return "Strong";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to register user");
      }

      router.push("/admin");
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,#fbbf24_0%,transparent_60%)] opacity-20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#f59e42_0%,transparent_70%)] opacity-10"></div>
      </div>

      <div className="relative z-10 min-h-screen w-full lg:grid lg:grid-cols-2">
        {/* Registration Form Section */}
        <div className="flex items-center justify-center py-12 px-4 lg:px-8">
          <div className="w-full max-w-md">
            {/* Logo/Brand */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-[hsl(37.7,92.1%,50.2%)] to-[hsl(32.1,94.6%,43.7%)] mb-4 shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Join Us Today</h1>
              <p className="text-slate-400">Create your account to get started</p>
            </div>

            <Card className="border-amber-300 bg-white/90 backdrop-blur-xl shadow-xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-800 font-semibold">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400 w-5 h-5" />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        required
                        className="pl-12 bg-white/70 border-amber-200 text-slate-700 placeholder:text-slate-400 focus:border-amber-400 focus:ring-amber-300 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-800 font-semibold">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400 w-5 h-5" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        className="pl-12 bg-white/70 border-amber-200 text-slate-700 placeholder:text-slate-400 focus:border-amber-400 focus:ring-amber-300 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-slate-800 font-semibold">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400 w-5 h-5" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        required
                        onChange={handlePasswordChange}
                        className="pl-12 pr-12 bg-white/70 border-amber-200 text-slate-700 placeholder:text-slate-400 focus:border-amber-400 focus:ring-amber-300 transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400 hover:text-amber-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {/* Password Strength Indicator */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">Password strength</span>
                        <span className={`text-xs font-medium ${
                          passwordStrength <= 2 ? 'text-red-400' : 
                          passwordStrength <= 3 ? 'text-yellow-400' : 
                          passwordStrength <= 4 ? 'text-[hsl(37.7,92.1%,50.2%)]' : 
                          'text-[hsl(32.1,94.6%,43.7%)]'
                        }`}>
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-slate-800 font-semibold">Account Type</Label>
                    <div className="relative">
                      <Select 
                        value={role}
                        onValueChange={(value) => setRole(value as "USER" | "ADMIN")}
                      >
                        <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white focus:border-[hsl(37.7,92.1%,50.2%)] focus:ring-[hsl(37.7,92.1%,50.2%)]">
                          <div className="flex items-center space-x-2">
                            {role === "ADMIN" ? (
                              <Shield className="w-4 h-4 text-[hsl(32.1,94.6%,43.7%)]" />
                            ) : (
                              <UserCheck className="w-4 h-4 text-[hsl(37.7,92.1%,50.2%)]" />
                            )}
                            <SelectValue placeholder="Select your role" />
                          </div>
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="USER" className="text-white hover:bg-slate-700 focus:bg-slate-700">
                            <div className="flex items-center space-x-2">
                              <UserCheck className="w-4 h-4 text-[hsl(37.7,92.1%,50.2%)]" />
                              <span>User</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="ADMIN" className="text-white hover:bg-slate-700 focus:bg-slate-700">
                            <div className="flex items-center space-x-2">
                              <Shield className="w-4 h-4 text-[hsl(32.1,94.6%,43.7%)]" />
                              <span>Admin</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <input type="hidden" name="role" value={role} />

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      <p className="text-red-600 text-sm text-center">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading || !role}
                    className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-yellow-400 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl group"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Creating account...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span>Create Account</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <p className="text-center text-slate-400 text-sm mt-6">
              Already have an account? 
              <Link href="/login" className="text-[hsl(37.7,92.1%,50.2%)] hover:underline ml-1">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center lg:p-12 relative">
          <div className="text-center space-y-8 max-w-lg">
            <div className="relative">
              <div className="w-40 h-40 mx-auto rounded-3xl bg-gradient-to-br from-amber-300 to-amber-400 p-1 shadow-2xl">
                <div className="w-full h-full rounded-3xl bg-white flex items-center justify-center">
                  <div className="text-center">
                    <CheckCircle className="w-16 h-16 text-[hsl(37.7,92.1%,50.2%)] mx-auto mb-2" />
                    <p className="text-white font-semibold">Secure</p>
                  </div>
                </div>
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-200 to-yellow-200 rounded-3xl blur-xl opacity-20 animate-pulse"></div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white">Join Our Platform</h2>
              <p className="text-xl text-slate-300 leading-relaxed">
                Get access to powerful tools and features designed to enhance your productivity
              </p>
              
              {/* Feature List */}
              <div className="space-y-4 text-left">
                {[
                  { icon: Shield, title: "Secure & Private", desc: "Your data is protected with enterprise-grade security" },
                  { icon: Sparkles, title: "Premium Features", desc: "Access advanced tools and analytics" },
                  { icon: UserCheck, title: "Role-Based Access", desc: "Customized experience based on your role" },
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-slate-800/30 backdrop-blur-sm">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[hsl(37.7,92.1%,50.2%)] to-[hsl(32.1,94.6%,43.7%)] flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{feature.title}</h3>
                      <p className="text-slate-400 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}