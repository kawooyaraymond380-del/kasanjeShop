
"use client";

import Image from 'next/image';
import { Star, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import type { Product } from '@/lib/data';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { Badge } from './ui/badge';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} is now in your cart.`,
    });
  };
  
  const ratingValue = typeof product.rating === 'number' ? product.rating : 0;

  return (
    <Card className="product-card cursor-pointer overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl group" onClick={() => onSelect(product)}>
      <div className="relative h-64 overflow-hidden">
        <Image src={product.image} alt={product.name} fill className="object-cover" data-ai-hint={product.imageHint} />
        <div className="absolute top-2 right-2">
            <Button size="icon" variant="secondary" className='rounded-full bg-white/80 hover:bg-white text-foreground'>
                <Heart className="h-5 w-5 text-gray-600" />
            </Button>
        </div>
         <Badge className="absolute top-2 left-2">{product.category}</Badge>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <span className="font-bold text-primary">UGX {product.price.toLocaleString()}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-2 h-10">{product.description}</p>
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-500">
             {[...Array(5)].map((_, i) => {
                if (ratingValue >= i + 1) {
                    return <Star key={i} className="w-4 h-4 fill-current" />;
                } else if (ratingValue > i) {
                    return <Star key={i} className="w-4 h-4" style={{clipPath: `inset(0 ${(1-(ratingValue - i))*100}% 0 0)`}} />;
                } else {
                    return <Star key={i} className="w-4 h-4" />;
                }
             })}
          </div>
          <span className="text-xs text-gray-500 ml-2">({product.reviews} reviews)</span>
        </div>
        <Button className="w-full font-medium" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
