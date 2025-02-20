import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export async function GET() {
  noStore();
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || user === null || !user.id) {
    throw new Error("Smoething went wrong, i am srorry....");
  }

  let dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        email: user.email ?? "",
        firstName: user.given_name ?? "",
        lastName: user.family_name ?? "",
        id: user.id,
        isAdmin: false,
        profileImage:
          user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
      },
    });
  }
  if (user.email === "rasel6041@gmail.com") {
    dbUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        isAdmin: true, // Update to admin if the condition is met
      },
    });
  }

    // Check if running on localhost:3000 (development)
  const isDevelopment = process.env.NODE_ENV === "development";
  const redirectUrl = isDevelopment
    ? "http://localhost:3000" // Redirect to localhost for development
    : "https://taha-plum.vercel.app"; // Redirect to production URL

  return NextResponse.redirect(redirectUrl);
}
