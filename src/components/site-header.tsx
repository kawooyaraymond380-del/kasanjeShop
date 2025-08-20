
"use client";

import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  Leaf,
  Search,
  ShoppingBasket,
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
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
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useRouter } from 'next/navigation';

const mainNavLinks = [
  { title: 'Home', href: '/' },
  { title: 'Categories', href: '#' },
  { title: 'Sell', href: '/sell' },
  { title: 'About', href: '#' },
];

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/');
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('');
  }

  return (
    <header className="bg-card shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-7 w-7 text-primary" />
              <span className="font-bold text-xl font-headline">Kasanje.shop</span>
            </Link>
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

            {loading ? (
              <div className="h-10 w-20 animate-pulse bg-muted rounded-md" />
            ) : user ? (
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                     <Avatar className="h-8 w-8">
                       <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                       <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                     </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user.displayName || 'My Account'}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
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
                 <SheetHeader className="flex flex-row justify-between items-center mb-8 text-left">
                    <SheetTitle className="flex items-center gap-2">
                      <Leaf className="h-7 w-7 text-primary" />
                      <span className="font-bold text-xl font-headline">Kasanje.shop</span>
                    </SheetTitle>
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                      <X className="h-6 w-6" />
                    </Button>
                  </SheetHeader>
                  <nav className="mb-8">
                    <ul className="flex flex-col gap-4 text-lg">
                      {mainNavLinks.map((link) => (
                         <li key={link.title}><Link href={link.href} className="block py-2 hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>{link.title}</Link></li>
                      ))}
                    </ul>
                  </nav>
                  <div className="mt-auto">
                    {user ? (
                       <div className="flex flex-col gap-2">
                          <Button asChild onClick={() => setIsMobileMenuOpen(false)}><Link href="/dashboard">Dashboard</Link></Button>
                          <Button variant="outline" onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }}>Logout</Button>
                       </div>
                    ) : (
                      <div className="flex gap-4 mb-4">
                        <Button className="flex-1" asChild onClick={() => setIsMobileMenuOpen(false)}><Link href="/signin">Sign In</Link></Button>
                        <Button variant="outline" className="flex-1" asChild onClick={() => setIsMobileMenuOpen(false)}><Link href="/signup">Sign Up</Link></Button>
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
