"use client";

import Image from 'next/image';
import { useCart } from '@/hooks/use-cart';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetTrigger } from './ui/sheet';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { Trash2, ShoppingBasket } from 'lucide-react';

export function CartDrawer({ children }: { children: React.ReactNode }) {
  const { cartItems, cartCount, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>Your Cart ({cartCount})</SheetTitle>
        </SheetHeader>
        <Separator />
        {cartCount > 0 ? (
          <>
            <ScrollArea className="flex-1">
              <div className="flex flex-col gap-4 p-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        data-ai-hint={item.imageHint}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        KSH {item.price.toLocaleString()}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="h-8 w-16"
                        />
                         <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <Separator />
            <SheetFooter className="p-6">
                <div className='w-full space-y-4'>
                    <div className="flex justify-between text-lg">
                        <span className="font-medium">Total:</span>
                        <span className="font-bold">KSH {totalPrice.toLocaleString()}</span>
                    </div>
                    <Button size="lg" className="w-full">Proceed to Checkout</Button>
                    <Button variant="outline" className="w-full" onClick={clearCart}>Clear Cart</Button>
                </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <ShoppingBasket className="h-16 w-16 text-muted-foreground/50" />
            <h3 className="font-semibold">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground">Add some products to get started!</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
