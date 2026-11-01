import { SidebarContent } from "./SidebarContent";

export function Sidebar() {
  return (
    <aside className="w-56 shrink-0 overflow-hidden border-r-2 border-ink-700 bg-ink-900 px-3 py-5 max-md:hidden lg:w-64 lg:px-4">
      <SidebarContent />
    </aside>
  );
}
