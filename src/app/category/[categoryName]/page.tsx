
import { ProductGrid } from '@/components/product-grid';
import { getProducts } from '@/lib/data';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: {
    categoryName: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categoryName = decodeURIComponent(params.categoryName);
  const products = await getProducts({ category: categoryName });

  if (!products) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Category: <span className="text-primary">{categoryName}</span>
      </h1>
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-4">No products found</h2>
          <p className="text-muted-foreground">
            There are currently no products available in this category.
          </p>
        </div>
      )}
    </div>
  );
}
