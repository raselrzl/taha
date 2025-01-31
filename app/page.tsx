import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MapFilterItems } from "./components/MapFilterItems";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="container mx-auto px-5 lg:px-10">
      <Suspense fallback={<div>Loading...</div>}>
        <MapFilterItems />
      </Suspense>
    </div>
  );
}
