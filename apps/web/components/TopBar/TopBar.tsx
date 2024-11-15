import Link from "next/link";
import { ProfileMenu } from "../ProfileMenu/ProfileMenu";
import { Logo } from "components/Logo/Logo";

export async function TopBar() {
  return (
    <header className="hidden bg-white py-4 md:block">
      <div className="max-w-container-lg mx-auto flex items-center justify-between px-4">
        <Link prefetch={false} href="/" className="text-3xl font-bold">
          <Logo className="fill-black h-20 w-auto p-2 " />
        </Link>

        <ProfileMenu />
      </div>
    </header>
  );
}
