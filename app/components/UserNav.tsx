/* eslint-disable @next/next/no-img-element */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { createAirbnbHome } from "../actions";
import prisma from "@/app/lib/db";

async function getUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      isAdmin: true,
      profileImage: true,
    },
  });
}

export async function UserNav() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const createHomewithId = createAirbnbHome.bind(null, {
    userId: user?.id as string,
  });

  // Get users list to check if the current user is admin
  const users = await getUsers();
  const isAdmin = users.some((u) => u.email === user?.email && u.isAdmin); // Check if the logged-in user is admin

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
          <MenuIcon className="text-red-400 w-8 h-8 lg:w-5 lg:h-5" />
          <img
            src={
              user?.picture ??
              "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
            }
            alt="Image of the user"
            className="rounded-full h-8 w-8 hidden lg:block"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {user ? (
          <>
            {/* Show admin-specific links if user is admin */}
            {isAdmin && (
              <>
                <DropdownMenuItem>
                  <form action={createHomewithId} className="w-full">
                    <button type="submit" className="w-full text-start">
                      Add Advertisement
                    </button>
                  </form>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/my-homes" className="w-full">
                    My Advertisement Lists
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/users" className="w-full">
                    Users List
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/reservations/allreservation" className="w-full">
                    All Reservations
                  </Link>
                </DropdownMenuItem>
              </>
            )}

            {/* Show user-specific links */}
            <DropdownMenuItem>
              <Link href="/favorites" className="w-full">
                My Favorites list
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/reservations" className="w-full">
                My Reservations
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogoutLink className="w-full">Logout</LogoutLink>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <RegisterLink className="w-full">Register</RegisterLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LoginLink className="w-full">Login</LoginLink>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
