import Image from "next/image";
import Link from "next/link";
import DesktopLogo from "../../public/desktop2.png";
import MobileLogo from "../../public/mobile2.png";
import { UserNav } from "./UserNav";
/* import { SearchModalCompnent } from "./SearchComponent"; */

export function Navbar() {
  return (
    <nav className="w-full border-b">
      <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
        <Link href="/">
          <Image
            src={DesktopLogo}
            alt="Desktop Logo"
            className="w-48 h-14 hidden lg:block"
          />

          <Image
            src={MobileLogo}
            alt="Mobile Logo"
            className="block lg:hidden w-14 h-10"
          />
        </Link>

        {/* <SearchModalCompnent /> */}

        <UserNav />
      </div>
    </nav>
  );
}
