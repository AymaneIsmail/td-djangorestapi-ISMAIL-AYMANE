import {
  RiHome5Line,
  RiLineChartLine,
  RiCalendarEventLine,
} from "@remixicon/react";
import type { NavigationItem } from "@/components/layouts/types";
import { NavigationMobile } from "@/components/layouts/navigation-mobile";
import { NavigationSidebar } from "@/components/layouts/navigation-sidebar";
import { Link, Outlet } from "react-router-dom";
import { Input } from "./ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useAuth } from "@/context/auth/auth-provider";

const navigationItems: NavigationItem[] = [
  {
    icon: RiHome5Line,
    label: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: MagnifyingGlassIcon,
    label: "Researchers",
    link: "/researchers",
  },
  {
    icon: RiCalendarEventLine,
    label: "Publications",
    link: "/publications",
  },
  {
    icon: RiLineChartLine,
    label: "Analytics",
    link: "/analytics",
  },
];

export function DashboardLayout() {

  const { token, signOut } = useAuth();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <NavigationSidebar items={navigationItems} />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <NavigationMobile items={navigationItems} />
          <div className="relative ml-auto flex-1 md:grow-0">
            {token ? (
              <Button onClick={() => signOut()}>Logout</Button>
            ) : (
              <Button>
                <Link to="/login">Login</Link>
              </Button>
            )}
            {/* <Input
              type="search"
              placeholder="Rechercher..."
              className="w-full rounded-lg bg-background md:w-[200px] lg:w-[320px]"
            /> */}
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}