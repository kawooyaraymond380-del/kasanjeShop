
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Star } from 'lucide-react';
import { getCategoriesFromDB, getProducts, Testimonial, Category, NewsArticle, getNewsFromDB } from '@/lib/data';
import { ProductGrid } from '@/components/product-grid';
import { AiRecommendations } from '@/components/ai-recommendations';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { getTestimonialsFromDB } from '@/lib/data';

function HeroSection() {
  return (
    <section className="relative text-white py-16 md:py-28">
      <div className="absolute inset-0">
        <Image
          src="https://source.unsplash.com/featured/?market,africa"
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
          <Button size="lg" className="rounded-full text-lg px-8 py-6" asChild>
            <Link href="/products">Shop Now</Link>
          </Button>
          <Button size="lg" variant="secondary" className="rounded-full text-lg px-8 py-6" asChild>
            <Link href="/sell">Become a Seller</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

async function CategoriesSection() {
  const categories = await getCategoriesFromDB();
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
            <Link key={category.id || category.name} href={`/category/${encodeURIComponent(category.name)}`} className="group">
              <Card className="category-card h-full overflow-hidden transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                <div className="h-48 overflow-hidden relative">
                  <Image src={category.image} alt={category.name} fill className="object-cover" data-ai-hint={category.imageHint} />
                </div>
                <CardContent className="p-4 text-center flex flex-col items-center">
                  <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground flex-grow">{category.description}</p>
                  <Button variant="link" className="mt-3 text-primary">Browse Products</Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

async function FeaturedProductsSection() {
  const products = await getProducts({ featured: true, limit: 8 });
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
          <Button size="lg" variant="secondary" className="rounded-full" asChild>
            <Link href="/products">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function FeaturedProductsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <Skeleton className="h-8 w-64 mx-auto mb-4" />
        <Skeleton className="h-4 w-96 mx-auto" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <Skeleton className="h-64" />
            <CardContent className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-1/2 mb-3" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
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
          <Button size="lg" variant="secondary" className="rounded-full" asChild><Link href="/sell">Start Selling</Link></Button>
        </div>
      </div>
    </section>
  );
}

async function TestimonialsSection() {
  const testimonials = await getTestimonialsFromDB();
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
            <Card key={testimonial.id} className="bg-background p-6">
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

async function NewsSection() {
  const news = await getNewsFromDB();
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">News in Kasanje</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay up to date with the latest happenings in our community.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((article) => (
            <Card key={article.id} className="overflow-hidden flex flex-col">
                <div className="relative h-56">
                     <Image src={article.image} alt={article.title} fill className="object-cover" data-ai-hint={article.imageHint} />
                </div>
              <CardContent className="p-6 flex flex-col flex-grow">
                 <p className="text-sm text-muted-foreground mb-2">{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <h3 className="font-bold text-xl mb-3">{article.title}</h3>
                <p className="text-foreground/80 mb-4 flex-grow">{article.summary}</p>
                <Button asChild variant="secondary" className="mt-auto self-start">
                    <Link href={article.link}>Read More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}


function CategoriesSkeleton() {
  return (
    <section className="py-16 bg-card">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <Skeleton className="h-8 w-64 mx-auto mb-4" />
        <Skeleton className="h-4 w-96 mx-auto" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {[...Array(5)].map((_, i) => (
           <Card key={i} className="overflow-hidden">
             <Skeleton className="h-48" />
             <CardContent className="p-4 text-center">
               <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
               <Skeleton className="h-4 w-full mx-auto mb-3" />
               <Skeleton className="h-8 w-24 mx-auto" />
             </CardContent>
           </Card>
        ))}
      </div>
    </div>
  </section>
  )
}

function TestimonialsSkeleton() {
  return (
    <section className="py-16 bg-card">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <Skeleton className="h-8 w-64 mx-auto mb-4" />
        <Skeleton className="h-4 w-96 mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="bg-background p-6">
            <Skeleton className="h-5 w-24 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-4" />
            <div className="flex items-center">
              <Skeleton className="w-12 h-12 rounded-full mr-4" />
              <div>
                <Skeleton className="h-5 w-28 mb-1" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </section>
  )
}

function NewsSkeleton() {
    return (
      <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-64 mx-auto mb-4" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-56" />
              <CardContent className="p-6">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-3/4 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Skeleton className="h-10 w-28" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
    )
}


export default function Home() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<CategoriesSkeleton />}>
        <CategoriesSection />
      </Suspense>
      <Suspense fallback={<FeaturedProductsSkeleton />}>
        <FeaturedProductsSection />
      </Suspense>
      <CommunityBanner />
      <Suspense fallback={<TestimonialsSkeleton />}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<NewsSkeleton />}>
        <NewsSection />
      </Suspense>
    </>
  );
}
