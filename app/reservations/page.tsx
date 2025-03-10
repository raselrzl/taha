import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ListingCard } from "../components/ListingCard";
import { NoItems } from "../components/NoItem";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { v4 as uuidv4 } from 'uuid';
async function getData(userId: string) {
  noStore();
  const data = await prisma.reservation.findMany({
    where: {
      userId: userId,
    },
    select: {
      Home: {
        select: {
          id: true,
          country: true,
          photos: { // Corrected field name from 'photo' to 'photos'
            select: {
              url: true, // Assuming you just want the URL of the photos
            },
          },
          description: true,
          title:true,
          price: true,
          Favorite: {
            where: {
              userId: userId,
            },
          },
        },
      },
    },
  });

  return data;
}

export default async function ReservationsRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user?.id) return redirect("/");
  const data = await getData(user.id);

  const generateReservationId = () => {
    return Math.floor(10000000 + Math.random() * 90000000); // Generates a random 8-digit number
  };
  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight text-center">
        My Reservations list
      </h2>

      {data.length === 0 ? (
        <NoItems
          title="Hey you dont have any Reservations"
          description="Please add a reservation to see it right here..."
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {data.map((item) => {
          const reservationId = generateReservationId();
          return (
            <ListingCard
              key={uuidv4()}
              description={item.Home?.description as string}
              location={item.Home?.country as string}
              pathName="/favorites"
              homeId={item.Home?.id as string}
              imagePath={item.Home?.photos?.[0]?.url as string}
              price={item.Home?.price as number}
              title={item.Home?.title as string}
              userId={user.id}
              favoriteId={item.Home?.Favorite[0]?.id as string}
              isInFavoriteList={
                (item.Home?.Favorite.length as number) > 0 ? true : false
              }
            />
          )})}
        </div>
      )}
    </section>
  );
}
