import { NavLink } from "react-router-dom";
import { Tooltip } from "@/components/ui/tooltip";
import { RiSettings3Line } from "@remixicon/react";
import { ApplicationLink } from "./application-link";
import type { NavigationItem } from "./types";
import { cn } from "@/utils/css";

interface NavigationSidebarProps {
  items: NavigationItem[];
}

function DesktopNavigationLink({ item }: { item: NavigationItem }) {
  return (
    <Tooltip content={item.label} showArrow={false} side="right">
      <NavLink
        to={item.link}
        className={({ isActive }) => {
          return cn(
            "flex h-9 w-9 items-center justify-center rounded-lg md:h-8 md:w-8 transition-colors",
            isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
          );
        }}
      >
        <item.icon className="h-5 w-5" />
        <span className="sr-only">{item.label}</span>
      </NavLink>
    </Tooltip>
  );
}

export function NavigationSidebar({ items }: NavigationSidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 py-4">
        <ApplicationLink />
        {items.map((item) => (
          <DesktopNavigationLink key={item.label} item={item} />
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
        <DesktopNavigationLink item={{ icon: RiSettings3Line, label: "Paramètres", link: "#" }} />
      </nav>
    </aside>
  );
}