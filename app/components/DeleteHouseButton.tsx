"use client"; // Ensure this is client-side

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function DeleteHouseButton({
  homeId,
  user
}: {
  homeId: string;
  user: any;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDelete = async () => {
    if (user?.id) {
      setLoading(true);
  
      try {
        const response = await fetch("/api/deleteHouse", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json", // Ensure the content type is correct
          },
          body: JSON.stringify({
            homeId: homeId, // Ensure the homeId is sent in the body
           
          }),
        });
        const result = await response.json();
        if (response.ok) {
          router.push("/"); // Redirect to the homepage after successful deletion
        } else {
          alert(result.message || "Error deleting the house");
        }
      } catch (error) {
        alert("An error occurred while deleting the house.");
      } finally {
        setLoading(false);
      }
    }
  };
  

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full"
          disabled={loading}
          onClick={() => setDialogOpen(true)}
        >
          {loading ? "Deleting..." : "Delete This House"}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogDescription>
          Once you delete this house, it cannot be undone.
        </DialogDescription>

        <DialogFooter>
          <Button variant="outline" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
