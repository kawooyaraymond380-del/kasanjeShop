
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Leaf,
  Search,
  ShoppingBasket,
  Menu,
  X,
  User,
} from 'lucide-react';
import { CartDrawer } from './cart-drawer';
import { useCart } from '@/hooks/use-cart';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const mainNavLinks = [
  { title: 'Home', href: '/' },
  { title: 'Categories', href: '#' },
  { title: 'Sell', href: '#' },
  { title: 'About', href: '#' },
];

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const isAuthenticated = false; // Replace with actual auth check
  
  return (
    <header className="bg-card shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <a href="/" className="flex items-center gap-2">
              <Leaf className="h-7 w-7 text-primary" />
              <span className="font-bold text-xl font-headline">Kasanje.shop</span>
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <ul className="flex gap-6">
              {mainNavLinks.map((link) => (
                <li key={link.title}>
                  <Button variant="link" asChild className="text-foreground/80 hover:text-primary p-0">
                    <Link href={link.href}>{link.title}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative hidden sm:block">
              <Input
                type="text"
                placeholder="Search products..."
                className="py-2 px-4 pr-10 rounded-full w-40 md:w-64 h-9 bg-background"
              />
              <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            
            <CartDrawer>
                <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
                    <ShoppingBasket className="h-6 w-6" />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {cartCount}
                        </span>
                    )}
                </Button>
            </CartDrawer>

            {isAuthenticated ? (
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild>
                <Link href="/signin">Sign In</Link>
              </Button>
            )}


            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-4/5 max-w-xs p-5 flex flex-col bg-card">
                 <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-2">
                      <Leaf className="h-7 w-7 text-primary" />
                      <span className="font-bold text-xl font-headline">Kasanje.shop</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                      <X className="h-6 w-6" />
                    </Button>
                  </div>
                  <nav className="mb-8">
                    <ul className="flex flex-col gap-4 text-lg">
                      {mainNavLinks.map((link) => (
                         <li key={link.title}><Link href={link.href} className="block py-2 hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>{link.title}</Link></li>
                      ))}
                    </ul>
                  </nav>
                  <div className="mt-auto">
                    {isAuthenticated ? (
                       <div className="flex flex-col gap-2">
                          <Button asChild><Link href="/dashboard">Dashboard</Link></Button>
                          <Button variant="outline">Logout</Button>
                       </div>
                    ) : (
                      <div className="flex gap-4 mb-4">
                        <Button className="flex-1" asChild><Link href="/signin">Sign In</Link></Button>
                        <Button variant="outline" className="flex-1" asChild><Link href="/signup">Sign Up</Link></Button>
                      </div>
                    )}
                  </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
