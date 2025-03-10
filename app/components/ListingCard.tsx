import Image from "next/image";
import Link from "next/link";
import { useCountries } from "../lib/getCountries";
import {
  ArrowBigRight,
  ArrowDownRight,
  CircleChevronDown,
  CircleChevronRight,
  Heart,
} from "lucide-react";
import { AddToFavoriteButton, DeleteFromFavoriteButton } from "./SubmitButtons";
import { DeleteFromFavorite, addToFavorite } from "../actions";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

interface iAppProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
  userId: string | undefined;
  isInFavoriteList: boolean;
  favoriteId: string;
  homeId: string;
  pathName: string;
  title: string;
}

export function ListingCard({
  description,
  imagePath,
  location,
  price,
  userId,
  favoriteId,
  homeId,
  isInFavoriteList,
  title,
  pathName,
}: iAppProps) {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);

  return (
    <div className="flex flex-col ">
      <div className="relative h-72">
        <div className="overflow-hidden group">
          <Image
            src={`https://fnozlcmlibrmmxoeelqc.supabase.co/storage/v1/object/public/images/${imagePath}`}
            alt="Image of House"
            fill
            className="h-full object-cover rounded-md transform transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </div>

        {userId ? (
          <div className="z-10 absolute top-2 right-2">
            {isInFavoriteList ? (
              <form action={DeleteFromFavorite}>
                <input type="hidden" name="favoriteId" value={favoriteId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <DeleteFromFavoriteButton />
              </form>
            ) : (
              <form action={addToFavorite}>
                <input type="hidden" name="homeId" value={homeId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <AddToFavoriteButton />
              </form>
            )}
          </div>
        ) : (
          <div className="z-10 absolute top-2 right-2">
            <LoginLink className="w-full">
              <AddToFavoriteButton />
            </LoginLink>
          </div>
        )}
      </div>

      <Link href={`/home/${homeId}`} className="mt-2">
        <div className="flex justify-between">
          <h3 className="font-medium text-base">{title}</h3>
          <CircleChevronRight className="text-red-300" />
        </div>

        <p className="text-muted-foreground text-xs line-clamp-2">
          {description}
        </p>
        <p className="pt-2 text-muted-foreground">
          <span className="font-medium text-black">€{price}</span> Night
        </p>
      </Link>
    </div>
  );
}
