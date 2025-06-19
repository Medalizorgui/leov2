"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

export default function UserManagementPage() {
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
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-6">
          <Link href="/admin">
            <Button variant="outline">← Back to Admin Dashboard</Button>
          </Link>
        </div>
        <Card className="border-amber-200 bg-white/80 backdrop-blur-xl shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-slate-800">All Users</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingUsers ? (
              <div className="text-slate-600">Loading users...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-amber-100/50">
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Role</th>
                      <th className="px-4 py-2 text-left">Phone</th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b last:border-0">
                        <td className="px-4 py-2">{user.name}</td>
                        <td className="px-4 py-2">{user.email}</td>
                        <td className="px-4 py-2 capitalize">{user.role}</td>
                        <td className="px-4 py-2">{user.phone}</td>
                        <td className="px-4 py-2">
                          <Button
                            size="sm"
                            variant="destructive"
                            disabled={removingId === user.id}
                            onClick={() => handleRemoveUser(user.id)}
                          >
                            {removingId === user.id ? "Removing..." : "Remove"}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 