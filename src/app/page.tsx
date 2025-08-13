import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Star } from 'lucide-react';
import { getCategories, getFeaturedProducts, getTestimonials, Product } from '@/lib/data';
import { ProductGrid } from '@/components/product-grid';
import { AiRecommendations } from '@/components/ai-recommendations';

function HeroSection() {
  return (
    <section className="relative text-white py-16 md:py-28">
      <div className="absolute inset-0">
        <Image
          src="https://placehold.co/1280x853.png"
          alt="Local market"
          data-ai-hint="local market"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
          Discover Unique Products from Your Community
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Supporting local sellers and artisans in Kasanje and beyond
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="rounded-full text-lg px-8 py-6">Shop Now</Button>
          <Button size="lg" variant="secondary" className="rounded-full text-lg px-8 py-6">Become a Seller</Button>
        </div>
      </div>
    </section>
  );
}

function CategoriesSection() {
  const categories = getCategories();
  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Browse Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of locally made products and services
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Card key={category.name} className="category-card overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="h-48 overflow-hidden relative">
                <Image src={category.image} alt={category.name} fill className="object-cover" data-ai-hint={category.imageHint} />
              </div>
              <CardContent className="p-4 text-center">
                <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
                <Button variant="link" className="mt-3 text-primary">Browse Products</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProductsSection({ products }: { products: Product[] }) {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the best items from our local community
          </p>
        </div>
        <ProductGrid products={products} />
        <div className="text-center mt-12">
          <AiRecommendations />
        </div>
        <div className="text-center mt-12">
          <Button size="lg" variant="secondary" className="rounded-full">
            View All Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function CommunityBanner() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Local Marketplace</h2>
          <p className="max-w-md">
            Become a vendor and share your products with the Kasanje community. Start selling today!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 rounded-full">Learn More</Button>
          <Button size="lg" variant="secondary" className="rounded-full">Start Selling</Button>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = getTestimonials();
  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Community Says</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from our customers and vendors about their experiences
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="bg-background p-6">
              <div className="flex text-yellow-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'fill-current' : ''}`} />
                ))}
              </div>
              <p className="italic text-foreground/80 mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 relative">
                  <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" data-ai-hint={testimonial.imageHint} />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProductsSection products={featuredProducts} />
      <CommunityBanner />
      <TestimonialsSection />
    </>
  );
}
