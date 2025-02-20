// pages/api/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/db";

// This is the handler for API route
export async function POST(req: NextRequest, {
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const params = await paramsPromise;

  try {
    // Fetch the user from the database
    const user = await prisma.user.findUnique({
      where: { id: String(params.id) },
    });

    // If the user does not exist
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // If the user is not an admin
    if (!user.isAdmin) {
      return NextResponse.json(
        { error: "User is already a normal user" },
        { status: 400 }
      );
    }

    // Revoke the admin status
    const updatedUser = await prisma.user.update({
      where: { id: String(params.id) },
      data: {
        isAdmin: false,
      },
    });

    // Respond with a success message
    return NextResponse.json(
      { message: "Admin status revoked successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to revoke admin status" },
      { status: 500 }
    );
  }
}
