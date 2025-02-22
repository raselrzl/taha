import prisma from "@/app/lib/db"; // Prisma client import
import { redirect } from "next/navigation"; // For redirecting non-admin users
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"; // For getting user session
import { ReservationList } from "./ReservationList";

// Fetch all reservations with related User and Home data
async function getReservations() {
    return await prisma.reservation.findMany({
      include: {
        User: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        Home: {
          select: {
            id: true,
            title: true,
            price: true,
            country: true,
          },
        },
      },
    }).then(reservations =>
      reservations.map(reservation => ({
        ...reservation,
        startDate: reservation.startDate.toISOString(), // Format startDate as a string
        endDate: reservation.endDate.toISOString(),     // Format endDate as a string
      }))
    );
  }
  


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
// Page Component to display all reservations
export default async function ReservationsPage() {
  const reservations = await getReservations();

  const users = await getUsers();
 
   const { getUser } = getKindeServerSession();
   const user = await getUser();
 
   const adminUser = users.find((dbUser) => dbUser.isAdmin && dbUser.email === user?.email);
   if (!adminUser) {
     return redirect("/"); 
   }
  return (
    <div className="container mx-auto px-5 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight text-center">All Reservations</h2>

      {reservations.length === 0 ? (
        <p className="text-center mt-6">No reservations found.</p>
      ) : (
        <ReservationList reservations={reservations} />
      )}
    </div>
  );
}
