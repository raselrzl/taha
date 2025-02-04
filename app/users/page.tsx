import prisma from "@/app/lib/db";

async function getUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
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
        <div className="overflow-x-auto mt-8">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-3 px-6 text-left text-sm font-semibold">Name</th>
                <th className="py-3 px-6 text-left text-sm font-semibold">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6 text-sm">{user.firstName} {user.lastName}</td>
                  <td className="py-3 px-6 text-sm">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
