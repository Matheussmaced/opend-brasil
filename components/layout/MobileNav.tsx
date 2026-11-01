import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { SidebarContent } from "./SidebarContent";

export function MobileNav() {
  return (
    <header className="flex shrink-0 items-center justify-between gap-3 border-b-2 border-ink-700 bg-ink-900 px-3 py-2 pt-[max(0.5rem,env(safe-area-inset-top))] md:hidden">
      <Logo />
      <MobileMenu>
        <SidebarContent showLogo={false} />
      </MobileMenu>
    </header>
  );
}
