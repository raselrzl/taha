/* eslint-disable @next/next/no-img-element */

import { createReservation } from "@/app/actions";
import { CaegoryShowcase } from "@/app/components/CategoryShowcase";
import { HomeMap } from "@/app/components/HomeMap";
import { SelectCalender } from "@/app/components/SelectCalender";
import { ReservationSubmitButton } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";
import { useCountries } from "@/app/lib/getCountries";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Bath, Bed, Toilet, Users } from "lucide-react";
import DeleteHouseButton from "@/app/components/DeleteHouseButton";

async function getData(homeid: string) {
  noStore();
  const data = await prisma.home.findUnique({
    where: {
      id: homeid,
    },
    select: {
      photos: {
        // Corrected field name from 'photo' to 'photos'
        select: {
          url: true, // Assuming you just want the URL of the photos
        },
      },
      description: true,
      guests: true,
      bedrooms: true,
      bathrooms: true,
      title: true,
      categoryName: true,
      price: true,
      country: true,
      Reservation: {
        where: {
          homeId: homeid,
        },
      },

      User: {
        select: {
          profileImage: true,
          firstName: true,
        },
      },
    },
  });

  return data;
}

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

export default async function HomeRoute({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const params = await paramsPromise;
  const data = await getData(params.id);
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(data?.country as string);
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const users = await getUsers();
  const isAdmin = users.some((u) => u.email === user?.email && u.isAdmin); // Check if the logged-in user is admin

  return (
    <div className="w-full sm:w-[90%] lg:w-[75%] max-w-[1200px] mx-auto mt-10 mb-12 px-4">
      <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
      <div className="relative sm:h-[350px] lg:h-[550px]">
        <Carousel>
          {/* Carousel content with items */}
          <CarouselContent>
            {data?.photos?.map((photo) => (
              <CarouselItem key={photo.url} className="flex justify-center">
                <Image
                  alt="Image of Home"
                  src={`https://fnozlcmlibrmmxoeelqc.supabase.co/storage/v1/object/public/images/${photo.url}`}
                  width={1000}
                  height={500}
                  className="sm:h-[350px] lg:h-[550px] object-cover w-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Carousel navigation arrows */}
          <CarouselPrevious className="absolute top-1/2 left-2 transform -translate-y-1/2">
            &lt; {/* Or use an icon for previous */}
          </CarouselPrevious>
          <CarouselNext className="absolute top-1/2 right-2 transform -translate-y-1/2">
            &gt; {/* Or use an icon for next */}
          </CarouselNext>
        </Carousel>
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-x-24 gap-y-8 mt-8">
        <div className="w-full lg:w-2/3">
          <h3 className="text-xl font-medium flex justify-between">
            {/* {country?.flag}  */}
            <p>{country?.label}</p> {/* / {country?.region} */}
            <p>
              €{data?.price}{" "}
              <span className="text-gray-600 text-sm">Night</span>
            </p>
          </h3>
          <div className="flex flex-row gap-x-1 text-muted-foreground text-xs">
            <p>
              {" "}
              <Users />
              {data?.guests} Guests
            </p>{" "}
            <p>
              {" "}
              <Bed />
              {data?.bedrooms} Bedrooms
            </p>
            <p>
              <Bath />
              {data?.bathrooms} Bathrooms
            </p>
          </div>

          <div className="flex items-center mt-6">
            <img
              src={
                data?.User?.profileImage ??
                "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              }
              alt="User Profile"
              className="w-11 h-11 rounded-full"
            />
            <div className="flex flex-col ml-4">
              <h3 className="font-medium">Hosted by {data?.User?.firstName}</h3>
              <p className="text-sm text-muted-foreground">Host since 2015</p>
            </div>
          </div>

          <Separator className="my-7" />

          <CaegoryShowcase categoryName={data?.categoryName as string} />

          <Separator className="my-7" />

          <p className="text-muted-foreground">{data?.description}</p>

          <Separator className="my-7" />

          <HomeMap locationValue={country?.value as string} />
        </div>

        <form action={createReservation} className="w-full lg:w-auto">
          <input type="hidden" name="homeId" value={params.id} />
          <input type="hidden" name="userId" value={user?.id} />

          <SelectCalender reservation={data?.Reservation} />

          {user?.id ? (
            <ReservationSubmitButton />
          ) : (
            <Button className="w-full" asChild>
              <Link href="/api/auth/login">Make a Reservation</Link>
            </Button>
          )}
        </form>

        {isAdmin && (
        <div className="mt-8">
          <DeleteHouseButton user={user} homeId={params.id} />
        </div>
      )}
      </div>
    </div>
  );
}
