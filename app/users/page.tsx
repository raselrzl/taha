// app/users/page.tsx
import prisma from "@/app/lib/db";
import { UserList } from "./UserList";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NoItems } from "../components/NoItem";

// Fetch users from the database
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

export default async function UsersPage() {
  const users = await getUsers();

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const adminUser = users.find((dbUser) => dbUser.isAdmin && dbUser.email === user?.email);
  if (!adminUser) {
    return redirect("/"); 
  }

  return (
    <div className="container mx-auto px-5 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight text-center">All Users</h2>

      {users.length === 0 ? (
         <NoItems
                title="There is no any user registered"
                description="if there is user you will see it right here..."
              />
      ) : (
        <UserList users={users} />
      )}
    </div>
  );
}
