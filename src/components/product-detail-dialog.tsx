
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/data';
import { Star, Minus, Plus, Truck, Shield } from 'lucide-react';

interface ProductDetailDialogProps {
  product: Product | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function ProductDetailDialog({ product, isOpen, onOpenChange }: ProductDetailDialogProps) {
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (product) {
      setMainImage(product.image);
      setQuantity(1);
    }
  }, [product]);


  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: 'Added to cart',
      description: `${quantity} x ${product.name} added to your cart.`,
    });
    onOpenChange(false);
  };
  
  const ratingValue = typeof product.rating === 'number' ? product.rating : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          <div>
            <div className="bg-muted rounded-lg mb-4 h-80 flex items-center justify-center overflow-hidden relative">
              {mainImage && <Image src={mainImage} alt={product.name} fill className="object-contain" data-ai-hint={product.imageHint} />}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.thumbnails.map((thumb, index) => (
                <div key={index} className="bg-muted rounded-lg h-20 cursor-pointer hover:opacity-80 transition-opacity relative" onClick={() => setMainImage(thumb.url)}>
                  <Image src={thumb.url} alt={`Thumbnail ${index + 1}`} fill className="object-cover rounded-lg" data-ai-hint={thumb.hint} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold mb-2">{product.name}</DialogTitle>
            </DialogHeader>
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-500 mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < ratingValue ? 'fill-current' : ''}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.reviews} reviews</span>
            </div>
            <p className="text-2xl font-bold text-primary mb-4">UGX {product.price.toLocaleString()}</p>
            <p className="text-foreground/80 mb-6">{product.description}</p>
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Details:</h3>
              <ul className="list-disc list-inside space-y-1 text-foreground/80">
                {product.details.map((detail, i) => <li key={i}>{detail}</li>)}
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Select Quantity:</h3>
              <div className="flex items-center border rounded-md w-32">
                <Button variant="ghost" size="icon" onClick={() => setQuantity(q => Math.max(1, q - 1))} className="h-auto">
                  <Minus className="h-4 w-4" />
                </Button>
                <input type="number" min="1" value={quantity} readOnly className="w-full py-2 text-center focus:outline-none bg-transparent" />
                <Button variant="ghost" size="icon" onClick={() => setQuantity(q => q + 1)} className="h-auto">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button size="lg" className="w-full font-medium mb-4" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <div className="flex items-center text-muted-foreground text-sm">
              <div className="mr-4 flex items-center">
                <Truck className="mr-2 h-4 w-4" />
                <span>Free delivery in Kasanje</span>
              </div>
              <div className="flex items-center">
                <Shield className="mr-2 h-4 w-4" />
                <span>Authentic handmade product</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
