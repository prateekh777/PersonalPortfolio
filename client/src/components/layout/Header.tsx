import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function Header() {
  const [location] = useLocation();
  const isActive = (path: string) => location === path;

  const navItems = [
    { path: "/expertise", label: "Expertise" },
    { path: "/case-studies", label: "Case Studies" },
    { path: "/projects", label: "Projects" },
    { path: "/ai-works", label: "AI Works" },
    { path: "/interests", label: "Interests" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-xl items-center justify-between px-2 sm:px-4">
        <Link href="/" className="flex items-center">
          <span className="font-bold text-sm sm:text-base">Portfolio</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.path}>
                <NavigationMenuLink
                  asChild
                  className={`group inline-flex h-9 w-max items-center justify-center rounded-md bg-background/50 px-3 py-1 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer ${
                    isActive(item.path) ? "bg-accent" : ""
                  }`}
                >
                  <Link href={item.path}>{item.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <div className="flex md:hidden">
          <Drawer>
            <DrawerTrigger asChild>  
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <Menu className="h-5 w-5" />
              </Button>  
            </DrawerTrigger>  
            <DrawerContent className="max-h-[80vh]">
              <div className="flex flex-col space-y-3 p-4">
                {navItems.map((item) => (
                  <DrawerClose asChild key={item.path}>
                    <Link
                      href={item.path}
                      className={`rounded-md px-4 py-2 text-sm font-medium ${
                        isActive(item.path)
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </DrawerClose>
                ))}
                <DrawerClose asChild>
                  <Link href="/contact">
                    <Button className="w-full" variant="outline">
                      Contact
                    </Button>
                  </Link>
                </DrawerClose>
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        {/* Desktop Contact Button */}
        <div className="hidden md:block">
          <Link href="/contact">
            <Button variant="outline" size="sm">Contact</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
