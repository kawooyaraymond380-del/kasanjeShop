"use client";

import { useState } from 'react';
import { ProductCard } from './product-card';
import { ProductDetailDialog } from './product-detail-dialog';
import type { Product } from '@/lib/data';

export function ProductGrid({ products }: { products: Product[] }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedProduct(null);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={setSelectedProduct}
          />
        ))}
      </div>

      <ProductDetailDialog
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onOpenChange={handleOpenChange}
      />
    </>
  );
}
