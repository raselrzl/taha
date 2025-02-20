"use server";

import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { supabase } from "./lib/supabase";
import { revalidatePath } from "next/cache";
import path from "path";

export async function createAirbnbHome({ userId }: { userId: string }) {
  const data = await prisma.home.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAT: "desc",
    },
  });

  if (data === null) {
    const data = await prisma.home.create({
      data: {
        userId: userId,
      },
    });

    return redirect(`/create/${data.id}/structure`);
  }else if (
    !data.addedCategory &&
    !data.addedDescription &&
    !data.addedLoaction
  ) {
    return redirect(`/create/${data.id}/structure`);
  } else if (data.addedCategory && !data.addedDescription) {
    return redirect(`/create/${data.id}/description`);
  }  else if (
    data.addedCategory &&
    data.addedDescription &&
    !data.addedLoaction
  ) {
    return redirect(`/create/${data.id}/address`);
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    data.addedLoaction
  ) {
    const data = await prisma.home.create({
      data: {
        userId: userId,
      },
    });

    return redirect(`/create/${data.id}/structure`);
  }
}

  
  

export async function createCategoryPage(formData: FormData) {
  const categoryName = formData.get("categoryName") as string;
  const homeId = formData.get("homeId") as string;
  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      categoryName: categoryName,
      addedCategory: true,
    },
  });

  return redirect(`/create/${homeId}/description`);
}

export async function CreateDescription(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price");
  const homeId = formData.get("homeId") as string;

  const guestNumber = formData.get("guest") as string;
  const roomNumber = formData.get("room") as string;
  const bathroomsNumber = formData.get("bathroom") as string;

  // Get all image files (since we are allowing multiple images)
  const imageFiles = formData.getAll("images") as File[];

  // Array to store image URLs
  const imageUrls: string[] = [];

  try {
    // Upload each image to Supabase storage
    for (const imageFile of imageFiles) {
      const { data: imageData, error } = await supabase.storage
        .from("images")
        .upload(`${imageFile.name}-${new Date()}`, imageFile, {
          cacheControl: "2592000",
          contentType: imageFile.type,
        });

      if (error) {
        console.error("Error uploading image:", error);
        continue;  // Skip this image if there was an error
      }

      // Store the image URL
      if (imageData?.path) {
        imageUrls.push(imageData.path);
      }
    }

    // If no images were uploaded, throw an error
    if (imageUrls.length === 0) {
      throw new Error("No images uploaded.");
    }

    // Update the Home model with multiple photos
    await prisma.home.update({
      where: {
        id: homeId,
      },
      data: {
        title: title,
        description: description,
        price: Number(price),
        bedrooms: roomNumber,
        bathrooms: bathroomsNumber,
        guests: guestNumber,
        photos: { create: imageUrls.map((url) => ({ url })) }, // Save each URL as a Photo entry
        addedDescription: true,
      },
    });

    // After successful update, redirect
    return redirect(`/create/${homeId}/address`);

  } catch (error) {
    console.error("Error during the description creation:", error);
    // Optionally handle the error in the UI, like setting an error state
    throw error;  // Throw the error to make sure the form's action completes correctly
  }
}



/* export async function CreateDescription(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price");
  const imageFile = formData.get("image") as File;
  const homeId = formData.get("homeId") as string;

  const guestNumber = formData.get("guest") as string;
  const roomNumber = formData.get("room") as string;
  const bathroomsNumber = formData.get("bathroom") as string;

  const { data: imageData } = await supabase.storage
    .from("images")
    .upload(`${imageFile.name}-${new Date()}`, imageFile, {
      cacheControl: "2592000",
      contentType: "image/png",
    });

  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      title: title,
      description: description,
      price: Number(price),
      bedrooms: roomNumber,
      bathrooms: bathroomsNumber,
      guests: guestNumber,
      photo: imageData?.path,
      addedDescription: true,
    },
  });

  return redirect(`/create/${homeId}/address`);
} */

export async function createLocation(formData: FormData) {
  const homeId = formData.get("homeId") as string;
  const countryValue = formData.get("countryValue") as string;
  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      addedLoaction: true,
      country: countryValue,
    },
  });

  return redirect("/");
}

export async function addToFavorite(formData: FormData) {
  const homeId = formData.get("homeId") as string;
  const userId = formData.get("userId") as string;
  const pathName = formData.get("pathName") as string;

  const data = await prisma.favorite.create({
    data: {
      homeId: homeId,
      userId: userId,
    },
  });

  revalidatePath(pathName);
}

export async function DeleteFromFavorite(formData: FormData) {
  const favoriteId = formData.get("favoriteId") as string;
  const pathName = formData.get("pathName") as string;
  const userId = formData.get("userId") as string;

  const data = await prisma.favorite.delete({
    where: {
      id: favoriteId,
      userId: userId,
    },
  });

  revalidatePath(pathName);
}

export async function createReservation(formData: FormData) {
  const userId = formData.get("userId") as string;
  const homeId = formData.get("homeId") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;

  const data = await prisma.reservation.create({
    data: {
      userId: userId,
      endDate: endDate,
      startDate: startDate,
      homeId: homeId,
    },
  });

  return redirect("/");
}
