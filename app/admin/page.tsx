import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Activity, 
  TrendingUp, 
  Settings, 
  Bell, 
  Search,
  MoreVertical,
  ArrowUpRight,
  Calendar,
  Filter,
  Download,
  Sparkles,
  BarChart3,
  PieChart,
  Target,
  UserPlus,
  ArrowUp,
  DollarSign,
  User,
  ArrowDown,
  FileText
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";

export default function AdminDashboard() {
  return (
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
                <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-600 w-5 h-5" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-10 bg-white/50 border-amber-200 text-slate-700 placeholder:text-slate-400 focus:border-[hsl(37.7,92.1%,50.2%)] focus:ring-[hsl(37.7,92.1%,50.2%)] transition-all duration-200"
                  />
                </div>
                <Link href="/admin/register">
                  <Button className="bg-gradient-to-r from-[hsl(37.7,92.1%,50.2%)] to-[hsl(32.1,94.6%,43.7%)] hover:from-[hsl(37.7,92.1%,45.2%)] hover:to-[hsl(32.1,94.6%,38.7%)] text-white">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Register User
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-600 hover:text-slate-800 hover:bg-amber-100/50"
                >
                  <Bell className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-600 hover:text-slate-800 hover:bg-amber-100/50"
                >
                  <Settings className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stats Cards */}
            <Card className="border-amber-200 bg-white/80 backdrop-blur-xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Users</p>
                    <h3 className="text-2xl font-bold text-slate-800">2,543</h3>
                  </div>
                  <div className="p-3 rounded-full bg-amber-100/50">
                    <Users className="w-6 h-6 text-[hsl(37.7,92.1%,50.2%)]" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm text-green-600">
                    <ArrowUp className="w-4 h-4 mr-1" />
                    <span>12% from last month</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-200 bg-white/80 backdrop-blur-xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Active Sessions</p>
                    <h3 className="text-2xl font-bold text-slate-800">1,234</h3>
                  </div>
                  <div className="p-3 rounded-full bg-amber-100/50">
                    <Activity className="w-6 h-6 text-[hsl(37.7,92.1%,50.2%)]" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm text-green-600">
                    <ArrowUp className="w-4 h-4 mr-1" />
                    <span>8% from last hour</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-200 bg-white/80 backdrop-blur-xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Revenue</p>
                    <h3 className="text-2xl font-bold text-slate-800">$45,231</h3>
                  </div>
                  <div className="p-3 rounded-full bg-amber-100/50">
                    <DollarSign className="w-6 h-6 text-[hsl(37.7,92.1%,50.2%)]" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm text-green-600">
                    <ArrowUp className="w-4 h-4 mr-1" />
                    <span>23% from last month</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-200 bg-white/80 backdrop-blur-xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Conversion Rate</p>
                    <h3 className="text-2xl font-bold text-slate-800">3.2%</h3>
                  </div>
                  <div className="p-3 rounded-full bg-amber-100/50">
                    <TrendingUp className="w-6 h-6 text-[hsl(37.7,92.1%,50.2%)]" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm text-red-600">
                    <ArrowDown className="w-4 h-4 mr-1" />
                    <span>2% from last week</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <Card className="lg:col-span-2 border-amber-200 bg-white/80 backdrop-blur-xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-slate-800">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-start space-x-4">
                      <div className="p-2 rounded-full bg-amber-100/50">
                        <User className="w-5 h-5 text-[hsl(37.7,92.1%,50.2%)]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">User {i} logged in</p>
                        <p className="text-sm text-slate-600">2 hours ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-amber-200 bg-white/80 backdrop-blur-xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-slate-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full bg-gradient-to-r from-[hsl(37.7,92.1%,50.2%)] to-[hsl(32.1,94.6%,43.7%)] hover:from-[hsl(37.7,92.1%,45.2%)] hover:to-[hsl(32.1,94.6%,38.7%)] text-white">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add New User
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-[hsl(37.7,92.1%,50.2%)] to-[hsl(32.1,94.6%,43.7%)] hover:from-[hsl(37.7,92.1%,45.2%)] hover:to-[hsl(32.1,94.6%,38.7%)] text-white">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-[hsl(37.7,92.1%,50.2%)] to-[hsl(32.1,94.6%,43.7%)] hover:from-[hsl(37.7,92.1%,45.2%)] hover:to-[hsl(32.1,94.6%,38.7%)] text-white">
                    <Settings className="w-4 h-4 mr-2" />
                    System Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}