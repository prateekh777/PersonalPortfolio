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
    <header className="fixed top-0 z-50 w-full bg-background/50 backdrop-blur-md">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-8">
        <Link href="/">
          <a className="flex items-center space-x-2">
            <span className="text-lg font-medium tracking-wide">Portfolio</span>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="space-x-1">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.path}>
                <Link href={item.path}>
                  <NavigationMenuLink
                    className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-5 py-2 text-sm font-medium transition-colors hover:bg-accent/10 hover:text-accent-foreground focus:bg-accent/10 focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                      isActive(item.path) ? "bg-accent/10 text-accent-foreground" : ""
                    }`}
                  >
                    {item.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <div className="flex md:hidden">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-accent/10">
                <Menu className="h-5 w-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="flex flex-col space-y-3 p-6">
                {navItems.map((item) => (
                  <Link key={item.path} href={item.path}>
                    <a
                      className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                        isActive(item.path)
                          ? "bg-accent/10 text-accent-foreground"
                          : "hover:bg-accent/10 hover:text-accent-foreground"
                      }`}
                    >
                      {item.label}
                    </a>
                  </Link>
                ))}
                <DrawerClose asChild>
                  <Link href="/contact">
                    <Button className="w-full mt-2" variant="outline">Contact</Button>
                  </Link>
                </DrawerClose>
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        {/* Desktop Contact Button */}
        <div className="hidden md:block">
          <Link href="/contact">
            <Button 
              variant="outline" 
              className="px-5 hover:bg-accent/10 border-accent/20"
            >
              Contact
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}