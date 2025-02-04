import { createCategoryPage } from "@/app/actions";
import { CreatioBottomBar } from "@/app/components/CreationBottomBar";
import { SelctetCategory } from "@/app/components/SelectedCategory";

export default async function StrucutreRoute({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  // Await params once before using its properties
  const params = await paramsPromise;

  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Which of these best describe your Home?
        </h2>
      </div>

      <form action={createCategoryPage}>
        <input type="hidden" name="homeId" value={params.id} />
        <SelctetCategory />

        <CreatioBottomBar />
      </form>
    </>
  );
}
