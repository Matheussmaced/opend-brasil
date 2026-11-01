import { NavLinks } from "./NavLinks";

export function MobileNav() {
  return (
    <nav className="flex items-center gap-1 rounded-lg bg-zinc-900 p-1 md:hidden">
      <NavLinks variant="mobile" />
    </nav>
  );
}
