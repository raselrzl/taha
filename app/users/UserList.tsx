"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Client component (UserList.tsx)

async function handlePromoteToAdmin(userId: string) {
  try {
    const response = await fetch(`/api/users/${userId}/admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to promote user to admin");
    }

    const result = await response.json();
    toast.success(result.message);
    return true;
  } catch (error) {
    toast.error("Something went wrong. Please try again.");
    return false;
  }
}

async function handleRevokeAdmin(userId: string) {
  try {
    const response = await fetch(`/api/users/${userId}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to revoke admin status");
    }

    const result = await response.json();
    toast.success(result.message);
    return true;
  } catch (error) {
    toast.error("Something went wrong. Please try again.");
    return false;
  }
}

export function UserList({ users }: { users: Array<any> }) {
  const [updatedUsers, setUpdatedUsers] = useState(users);
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  const promoteToAdmin = async (userId: string) => {
    setLoadingUserId(userId); // Set loading state
    const success = await handlePromoteToAdmin(userId);

    if (success) {
      setUpdatedUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isAdmin: true } : user
        )
      );
    }
    setLoadingUserId(null); // Reset loading state
  };

  const revokeAdmin = async (userId: string) => {
    setLoadingUserId(userId); // Set loading state
    const success = await handleRevokeAdmin(userId);

    if (success) {
      setUpdatedUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isAdmin: false } : user
        )
      );
    }
    setLoadingUserId(null); // Reset loading state
  };

  return (
    <div className="overflow-x-auto mt-8">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-3 px-6 text-left text-sm font-semibold">Name</th>
            <th className="py-3 px-6 text-left text-sm font-semibold">Email</th>
            <th className="py-3 px-6 text-left text-sm font-semibold">Role</th>
            <th className="py-3 px-6 text-left text-sm font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {updatedUsers.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-6 text-sm">
                {user.firstName} {user.lastName}
              </td>
              <td className="py-3 px-6 text-sm">{user.email}</td>
              <td className="py-3 px-6 text-sm w-[120px]">
                {user.isAdmin ? "Admin" : "User"}
              </td>
              <td className="py-3 px-6 text-sm">
                {!user.isAdmin && (
                  <Button
                    onClick={() => promoteToAdmin(user.id)}
                    disabled={loadingUserId === user.id} // Disable the button while loading
                    className={`text-green-500 hover:text-green-700 ${
                      loadingUserId === user.id
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    } w-[120px]`} // Fixed width
                  >
                    {loadingUserId === user.id ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      "Make Admin"
                    )}
                  </Button>
                )}
                {user.isAdmin && (
                  <Button
                    onClick={() => revokeAdmin(user.id)}
                    disabled={loadingUserId === user.id} // Disable the button while loading
                    className={`text-red-500 hover:text-red-700 ${
                      loadingUserId === user.id
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    } w-[120px]`} // Fixed width
                  >
                    {loadingUserId === user.id ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      "Revoke Admin"
                    )}
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
