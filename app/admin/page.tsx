"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  
  Settings, 
  Bell, 
  Search,
  
  UserPlus,
  FileText,
  Users
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoadingUsers(true);
    const res = await fetch("/api/admin/users");
    if (res.ok) {
      setUsers(await res.json());
    }
    setLoadingUsers(false);
  }

  async function handleRemoveUser(id: string) {
    if (!confirm("Are you sure you want to remove this user?")) return;
    setRemovingId(id);
    const res = await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setUsers(await res.json());
      toast.success("User removed");
    } else {
      toast.error("Failed to remove user");
    }
    setRemovingId(null);
  }

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

        {/* Main Content: Navigation to management sections */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row gap-8 items-center justify-center">
          <Link href="/admin/users" className="w-full md:w-1/2">
            <Card className="border-amber-200 bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all cursor-pointer">
              <CardContent className="p-8 flex flex-col items-center justify-center">
                <Users className="w-12 h-12 text-[hsl(37.7,92.1%,50.2%)] mb-4" />
                <h2 className="text-2xl font-bold text-slate-800 mb-2">User Management</h2>
                <p className="text-slate-600 text-center">View, manage, and remove users from the system.</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/admin/orders" className="w-full md:w-1/2">
            <Card className="border-amber-200 bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all cursor-pointer">
              <CardContent className="p-8 flex flex-col items-center justify-center">
                <FileText className="w-12 h-12 text-[hsl(32.1,94.6%,43.7%)] mb-4" />
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Orders Management</h2>
                <p className="text-slate-600 text-center">Consult and manage all orders placed by users.</p>
              </CardContent>
            </Card>
          </Link>
        </main>
      </div>
    </div>
  );
}