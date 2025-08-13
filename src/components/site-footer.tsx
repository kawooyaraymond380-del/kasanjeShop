import { Button } from './ui/button';
import { Leaf, Mail, MapPin, Phone } from 'lucide-react';

const FacebookIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const InstagramIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const TwitterIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.9 3 7.1 0 .8-.4 1.5-.8 2.3s-1.4 1.5-2.5 2.1c-1.1.6-2.3.9-3.5.9-1.2 0-2.4-.3-3.5-.9s-2.1-1.4-2.8-2.3c-.8-.9-1.2-2-1.2-3.1 0-2.6 1-5 2.4-6.8s3.4-3.3 5.7-3.3c.6 0 1.2.1 1.8.3.6.2 1.2.5 1.8.8s1.1.8 1.6 1.3c.5.5.9 1.1 1.2 1.8.3.7.5 1.4.5 2.1 0 .7-.1 1.4-.3 2-.2.6-.5 1.2-.8 1.8-.4.6-.8 1.1-1.3 1.6-.5.5-1.1.9-1.7 1.2s-1.3.5-2 .5c-.7 0-1.4-.1-2-.4s-1.2-.6-1.7-1c-.5-.4-1-.9-1.3-1.4s-.6-1-1-1.6c-.3-.6-.5-1.2-.6-1.8s-.3-1.3-.3-2c0-1.5.4-2.9 1.2-4.1.8-1.2 2-2.1 3.4-2.7.7-.3 1.5-.5 2.2-.5.8 0 1.6.2 2.3.5.7.3 1.4.8 2 1.4.6.6 1 1.3 1.4 2.1.3.8.5 1.6.5 2.5 0 2.2-1.2 4.6-3.5 7.1"/></svg>
);

export function SiteFooter() {
  return (
    <footer className="bg-[#2d3c2e] text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-7 w-7 text-secondary" />
              <span className="font-bold text-xl font-headline">Kasanje.shop</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your community marketplace for locally made products and services.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" asChild className="text-gray-300 hover:text-white"><a href="#"><FacebookIcon className="h-5 w-5"/></a></Button>
              <Button variant="ghost" size="icon" asChild className="text-gray-300 hover:text-white"><a href="#"><InstagramIcon className="h-5 w-5"/></a></Button>
              <Button variant="ghost" size="icon" asChild className="text-gray-300 hover:text-white"><a href="#"><TwitterIcon className="h-5 w-5"/></a></Button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Shop All</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Categories</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">For Sellers</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Seller Dashboard</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">How to Sell</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Seller FAQs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Seller Terms</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <MapPin className="mt-1 mr-3 h-5 w-5 shrink-0 text-secondary" />
                <span>Kasanje Community Center, Main Street, Kasanje</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 shrink-0 text-secondary" />
                <span>+254 712 345 678</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-5 w-5 shrink-0 text-secondary" />
                <span>info@kasanje.shop</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">© {new Date().getFullYear()} Kasanje.shop. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Shipping Info</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
