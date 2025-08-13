export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  imageHint: string;
  description: string;
  rating: number;
  reviews: number;
  details: string[];
  category: string;
  thumbnails: { url: string, hint: string }[];
}

export interface Category {
  name: string;
  description: string;
  image: string;
  imageHint: string;
}

export interface Testimonial {
  name: string;
  title: string;
  quote: string;
  image: string;
  imageHint: string;
  rating: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Handcrafted Clay Pot",
    price: 1200,
    image: "https://placehold.co/600x600.png",
    imageHint: "clay pot",
    description: "Traditional hand-painted pottery",
    rating: 4,
    reviews: 24,
    category: "Handmade Crafts",
    details: [
      "Handmade in Kasanje",
      "Materials: Natural clay with non-toxic glaze",
      "Dimensions: Approximately 20cm height, 15cm diameter",
      "Care instructions: Hand wash recommended",
    ],
    thumbnails: [
        { url: 'https://placehold.co/200x200.png', hint: 'pottery detail' },
        { url: 'https://placehold.co/200x200.png', hint: 'pottery angle' },
        { url: 'https://placehold.co/200x200.png', hint: 'person pottery' },
        { url: 'https://placehold.co/200x200.png', hint: 'pottery making' }
    ]
  },
  {
    id: 2,
    name: "Organic Apple Basket",
    price: 450,
    image: "https://placehold.co/600x600.png",
    imageHint: "apple basket",
    description: "Fresh local farm apples (1kg)",
    rating: 4.5,
    reviews: 32,
    category: "Fresh Produce",
    details: [
        "Locally sourced from Kasanje farms",
        "Certified organic",
        "Weight: 1kg per basket",
        "Best consumed within a week",
    ],
    thumbnails: [
        { url: 'https://placehold.co/200x200.png', hint: 'red apples' },
        { url: 'https://placehold.co/200x200.png', hint: 'apple tree' },
        { url: 'https://placehold.co/200x200.png', hint: 'farmer apples' },
        { url: 'https://placehold.co/200x200.png', hint: 'basket apples' }
    ]
  },
  {
    id: 3,
    name: "Beaded Necklace",
    price: 850,
    image: "https://placehold.co/600x600.png",
    imageHint: "beaded necklace",
    description: "Handmade traditional jewelry",
    rating: 5,
    reviews: 18,
    category: "Clothing & Accessories",
    details: [
        "Handcrafted by local artisans",
        "Materials: Glass beads, durable string",
        "Length: 45cm",
        "Features a unique, traditional pattern",
    ],
    thumbnails: [
        { url: 'https://placehold.co/200x200.png', hint: 'colorful beads' },
        { url: 'https://placehold.co/200x200.png', hint: 'woman necklace' },
        { url: 'https://placehold.co/200x200.png', hint: 'necklace clasp' },
        { url: 'https://placehold.co/200x200.png', hint: 'artisan making jewelry' }
    ]
  },
  {
    id: 4,
    name: "African Print Bag",
    price: 1500,
    image: "https://placehold.co/600x600.png",
    imageHint: "print bag",
    description: "Stylish handmade tote bag",
    rating: 4,
    reviews: 12,
    category: "Clothing & Accessories",
    details: [
        "Made with authentic African print fabric",
        "Spacious interior with a small pocket",
        "Durable leather straps",
        "Ideal for daily use or as a statement piece",
    ],
    thumbnails: [
        { url: 'https://placehold.co/200x200.png', hint: 'fabric pattern' },
        { url: 'https://placehold.co/200x200.png', hint: 'bag interior' },
        { url: 'https://placehold.co/200x200.png', hint: 'model with bag' },
        { url: 'https://placehold.co/200x200.png', hint: 'bag detail' }
    ]
  },
];

const categories: Category[] = [
  {
    name: "Handmade Crafts",
    description: "Unique artisan creations",
    image: "https://placehold.co/400x400.png",
    imageHint: "handmade crafts",
  },
  {
    name: "Fresh Produce",
    description: "Farm-fresh fruits and vegetables",
    image: "https://placehold.co/400x400.png",
    imageHint: "fresh vegetables",
  },
  {
    name: "Art & Prints",
    description: "Local artwork and designs",
    image: "https://placehold.co/400x400.png",
    imageHint: "art prints",
  },
  {
    name: "Clothing & Accessories",
    description: "Handcrafted wearable items",
    image: "https://placehold.co/400x400.png",
    imageHint: "clothing accessories",
  },
  {
    name: "Workshops & Services",
    description: "Local skills and services",
    image: "https://placehold.co/400x400.png",
    imageHint: "people workshop",
  },
];

const testimonials: Testimonial[] = [
  {
    name: "Sarah Njeri",
    title: "Customer",
    quote: "Kasanje.shop has connected me with amazing local artisans. I love supporting my community while finding unique products that I can't get anywhere else.",
    image: "https://placehold.co/100x100.png",
    imageHint: "woman smiling",
    rating: 5,
  },
  {
    name: "Mary Wambui",
    title: "Vendor - Handcrafts",
    quote: "As a seller, this marketplace has helped me reach customers I never could before. The platform is easy to use and the community support is incredible.",
    image: "https://placehold.co/100x100.png",
    imageHint: "woman portrait",
    rating: 5,
  },
  {
    name: "John Kamau",
    title: "Vendor - Fresh Produce",
    quote: "I've been able to grow my small farm business thanks to Kasanje.shop. Now I can sell my fresh produce directly to customers who appreciate quality local food.",
    image: "https://placehold.co/100x100.png",
    imageHint: "man smiling",
    rating: 4.5,
  },
];

export const getFeaturedProducts = (): Product[] => {
  return products;
}

export const getProductById = (id: number): Product | undefined => {
  return products.find(p => p.id === id);
}

export const getCategories = (): Category[] => {
  return categories;
}

export const getTestimonials = (): Testimonial[] => {
  return testimonials;
}
