import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/db";

// This handles POST requests to promote a user to admin
export async function POST(req: NextRequest, {
    params: paramsPromise,
  }: {
    params: Promise<{ id: string }>;
  }) {
    const params = await paramsPromise;

  try {
    // Find the user by ID
    const user = await prisma.user.findUnique({
      where: { id: String(params.id) },
    });

    // If the user doesn't exist, return a 404 error
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // If the user is already an admin, return a 400 error
    if (user.isAdmin) {
      return NextResponse.json(
        { error: "User is already an admin" },
        { status: 400 }
      );
    }

    // Promote the user to admin
    const updatedUser = await prisma.user.update({
      where: { id: String(params.id) },
      data: {
        isAdmin: true, // Set the isAdmin field to true
      },
    });

    // Respond with a success message and the updated user
    return NextResponse.json(
      { message: "User promoted to admin successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to promote user to admin" },
      { status: 500 }
    );
  }
}
