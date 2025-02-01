import { createCategoryPage } from "@/app/actions";
import { CreatioBottomBar } from "@/app/components/CreationBottomBar";
import { SelctetCategory } from "@/app/components/SelectedCategory";
import { use } from "react";

export default function StrucutreRoute({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Which of these best describe your Home?
        </h2>
      </div>

      <form action={createCategoryPage}>
      <input type="hidden" name="homeId" value={id ?? ""} />
        <SelctetCategory />

        <CreatioBottomBar />
      </form>
    </>
  );
}
