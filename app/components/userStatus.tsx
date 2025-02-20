/* "use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckCircle, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface iAppProps {
  id: string;
  status: boolean; // Boolean for isAdmin status
}

export function UserStatus({ id, status }: iAppProps) {
    const [users, setUsers] = useState<any[]>([]);
    const handleAdminStatusChange = async (userId: string) => {
        try {
          const response = await fetch(`/api/users/${userId}/change-admin`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          if (!response.ok) {
            throw new Error('Failed to update user status');
          }
    
          // Optimistically update the users' list locally
          const updatedUsers = users.map((user) =>
            user.id === userId ? { ...user, isAdmin: !user.isAdmin } : user
          );
          setUsers(updatedUsers); // Update the state
    
          toast.success("User status updated successfully.");
        } catch (error) {
          toast.error("Failed to update user status.");
        }
      };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="secondary">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {!status ? (
          <DropdownMenuItem asChild>
            <button onClick={() => handleAdminStatusChange(id)}>
              <CheckCircle className="size-4 mr-2" /> Mark as Admin
            </button>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem asChild>
            <button onClick={() => handleAdminStatusChange(id)}>
              <CheckCircle className="size-4 mr-2" /> Revoke Admin Status
            </button>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
 */