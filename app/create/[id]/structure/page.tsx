'use client';
import { useState, useEffect } from 'react';
import { createCategoryPage } from "@/app/actions";
import { CreatioBottomBar } from "@/app/components/CreationBottomBar";
import { SelctetCategory } from "@/app/components/SelectedCategory";

export default function StrucutreRoute({ params }: { params: { id: string } }) {
    const [id, setId] = useState<string | null>(null);

    useEffect(() => {
        const fetchParams = async () => {
          const unwrappedParams = await params; // Unwrap the params Promise
          if (unwrappedParams?.id) {
            setId(unwrappedParams.id); // Set the id once it's available
          }
        };
    
        fetchParams(); // Invoke the function
      }, [params]);
    
      if (!id) {
        return <div>Loading...</div>; // Show a loading message until `id` is available
      }
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Which of these best describe your Home?
        </h2>
      </div>

      <form action={createCategoryPage}>
        <input type="hidden" name="homeId" value={id} />
        <SelctetCategory />

        <CreatioBottomBar />
      </form>
    </>
  );
}
