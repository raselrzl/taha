// app/users/page.tsx
import prisma from "@/app/lib/db";
import { UserList } from "./UserList";

// Fetch users on the server
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

  return (
    <div className="container mx-auto px-5 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight text-center">All Users</h2>

      {users.length === 0 ? (
        <p className="text-center mt-6">No users found.</p>
      ) : (
        <UserList users={users} />
      )}
    </div>
  );
}
