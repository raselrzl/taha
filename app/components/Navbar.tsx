import Image from "next/image";
import Link from "next/link";
import DesktopLogo from "../../public/rpdl2.png";
import MobileLogo from "../../public/rpml1.png";
import { UserNav } from "./UserNav";
import { SearchModalCompnent } from "./SearchComponent";

export function Navbar() {
  return (
    <nav className="w-full border-b">
      <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-2">
        <Link href="/">
          <Image
            src={DesktopLogo}
            alt="Desktop Logo"
            className="w-52 h-20 hidden lg:block"
          />

          <Image
            src={MobileLogo}
            alt="Mobile Logo"
            className="block lg:hidden w-12 h-10"
          />
        </Link>

        <SearchModalCompnent />

        <UserNav />
      </div>
    </nav>
  );
}
