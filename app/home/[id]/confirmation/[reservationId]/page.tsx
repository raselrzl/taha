/* eslint-disable @next/next/no-img-element */
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

// Fetch reservation data based on the reservationId
async function getReservationData(reservationId: string) {
  const reservation = await prisma.reservation.findUnique({
    where: { reservationId: reservationId },
    select: {
      reservationId: true,
      startDate: true,
      endDate: true,
      Home: {
        select: {
          title: true,
          price: true,
        },
      },
      User: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  return reservation;
}

export default async function ReservationConfirmation({
  params,
}: {
  params: { id: string; reservationId: string };
}) {
  // Await the params object to safely use its properties
  const { id, reservationId } = params;

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // Fetch reservation details based on the reservationId
  const reservationData = await getReservationData(reservationId);

  if (!reservationData) {
    return <p>Reservation not found.</p>;
  }

  // Destructure the reservation data for easy use
  const {
    reservationId: fetchedReservationId,
    startDate,
    endDate,
    Home,
    User,
  } = reservationData;

  // Handle fallback for null values, for example if Home or User is null
  const homeTitle = Home?.title ?? "Home Title Not Available";
  const homePrice = Home?.price ?? 0;
  const userName = User ? `${User.firstName} ${User.lastName}` : "Guest";

  // Calculate number of nights
  const checkInDate = new Date(startDate);
  const checkOutDate = new Date(endDate);
  const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
  const numberOfNights = timeDifference / (1000 * 3600 * 24); // Convert milliseconds to days
  const totalAmount = numberOfNights * homePrice; // Total amount to pay

  return (
    <div className="w-full sm:w-[90%] lg:w-[75%] max-w-[1200px] mx-auto mt-10 mb-12 px-4">
      <h1 className="font-medium text-2xl mb-5">Your Booking is Confirmed!</h1>

      {/* Reservation Summary */}
      <div className="border p-5 rounded-lg shadow-md">
        <div className="text-center">
          <div className="text-center">
            <h3 className="font-medium">{userName}</h3>
            <p className="text-sm text-muted-foreground">
              Your Reservation details
            </p>
            <p className="font-medium">
              Reservation ID: {fetchedReservationId}
            </p>
            <Link href={`/home/${id}`} className="text-blue-600 underline">
              View Booking Details
            </Link>
          </div>
        </div>

        <div className="flex justify-between items-center mb-5">
          <h2 className="font-medium text-lg">{homeTitle}</h2>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-5">
          <div>
            <p className="font-medium">Check-in:</p>
            <p>{checkInDate.toLocaleDateString()}</p>
          </div>
          <div>
            <p className="font-medium">Check-out:</p>
            <p>{checkOutDate.toLocaleDateString()}</p>
          </div>
          <div>
            {" "}
            <p className="text-xl font-semibold">
              €{homePrice} <span className="text-sm">Night</span>
            </p>
          </div>
        </div>

        {/* Total amount and total days */}
        <div className="mt-5">
          <p className="font-medium">Total Days: {numberOfNights} days</p>
          <p className="font-bold underline mt-1">Total Amount to Pay: €{totalAmount}</p>
        </div>

        <div className="flex justify-between mt-4 p-6">
          <Button className="w-auto" asChild variant="default">
            <Link href="/">Pay Now</Link>
          </Button>

          <Button className="w-auto" asChild variant="outline">
            <Link href="/">Pay via Invoice</Link>
          </Button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Button className="w-full" asChild variant="outline">
          <Link href="/">Go to Homepage</Link>
        </Button>
      </div>
    </div>
  );
}
