'use client';

import React, { useState, useEffect } from 'react';
import { retrieveLaunchParams } from "@tma.js/sdk";
import {
  Search,
  Home,
  ShoppingCart,
  User,
  X,
  Monitor,
  Smartphone,
  Laptop,
  Watch
} from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { ScrollArea, ScrollBar } from '../components/ui/scroll-area';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

interface Product {
  id: string;
  title: string;
  price: number;
  badge: string;
  badgeColor: string;
  image: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
}

interface TelegramUser {
  id: number;
  firstName: string;
  username?: string;
  languageCode?: string;
  photoUrl?: string;
}

const Page = () => {
  // Telegram Init
  const { initData: data } = retrieveLaunchParams();
  const user: TelegramUser | undefined = data?.user;

  // Shop State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categoryIcons: { [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> } = {
    Monitors: Monitor,
    Phones: Smartphone,
    Laptops: Laptop,
    Watches: Watch,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories')
        ]);

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const productsData: Product[] = await productsRes.json();
        const categoriesData: Category[] = await categoriesRes.json();

        setProducts(productsData);
        setCategories(categoriesData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === 'ALL' || product.category === selectedCategory)
  );

  if (!user) {
    return <div className="w-full max-w-[480px] mx-auto bg-gray-100 min-h-screen flex items-center justify-center">
      Please open this app in Telegram
    </div>;
  }

  if (loading) {
    return <div className="w-full max-w-[480px] mx-auto bg-gray-100 min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="w-full max-w-[480px] mx-auto bg-gray-100 min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="flex justify-between items-center p-4">
          {isSearchOpen ? (
            <div className="flex-1 flex gap-2">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
                autoFocus
              />
              <Button variant="ghost" size="icon" onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery('');
              }}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <h1 className="text-red-600 text-2xl font-bold">Tshop</h1>
                <span className="text-sm text-gray-500">@{user.username}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                <Search className="w-5 h-5 text-red-600" />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Rest of the content will only show if search is not open */}
      {!isSearchOpen && (
        <>
          {/* Banner */}
          <div className="bg-white shadow-sm mb-4">
            <Image
              src="/banner.jpg"
              alt="Banner"
              width={480}
              height={200}
            />
          </div>

          {/* Category Filter */}
          <ScrollArea className="w-full whitespace-nowrap pb-4">
            <div className="flex justify-center items-center gap-4 px-4 py-2">
              <div className="flex flex-col items-center justify-center gap-2">
                <Button
                  variant={selectedCategory === 'ALL' ? "destructive" : "outline"}
                  className={`w-16 h-16 rounded-full flex items-center justify-center ${selectedCategory === 'ALL' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-white hover:bg-red-50 border shadow-sm'}`}
                  onClick={() => setSelectedCategory('ALL')}
                >
                  ALL
                </Button>
                <span className="text-xs text-gray-600">All Items</span>
              </div>
              {categories.map((category) => {
                const Icon = categoryIcons[category.name] || Monitor;
                return (
                  <div key={category.id} className="flex flex-col items-center justify-center gap-2">
                    <Button
                      variant={selectedCategory === category.name ? "destructive" : "outline"}
                      className={`w-16 h-16 rounded-full flex items-center justify-center ${selectedCategory === category.name ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-white hover:bg-red-50 border shadow-sm'}`}
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      <Icon className="w-6 h-6 text-red-600" />
                    </Button>
                    <span className="text-xs text-gray-600">{category.name}</span>
                  </div>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4 px-4">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <Card className="border-0 shadow-md bg-white cursor-pointer">
              <CardContent className="p-4">
                <div className="relative">
                  <Badge className={`absolute top-2 left-2 ${product.badgeColor} text-white`}>
                    {product.badge}
                  </Badge>
                  <Image
                    src={product.image}
                    alt={product.title}
                    className="w-full aspect-square object-contain bg-white rounded-lg"
                    width={150}
                    height={150}
                  />
                </div>
                <h3 className="text-sm mt-2 line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-green-500 font-bold mt-1">{product.price}$</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Curved Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0">
        <div className="max-w-[480px] mx-auto relative">
          {/* Curved shape */}
          <svg
            className="absolute bottom-0 left-0 right-0 w-full"
            height="80"
            viewBox="0 0 480 80"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 L480,0 L480,80 L0,80 L0,0 Z M240,20 C320,20 380,0 480,0 L480,80 L0,80 L0,0 C100,0 160,20 240,20 Z"
              fill="white"
            />
          </svg>

          {/* Navigation buttons */}
          <div className="relative z-10 flex justify-around py-4 px-8 bg-white shadow-lg">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="text-red-600">
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-red-600">
                <Home className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/user">
              <Button variant="ghost" size="icon" className="text-red-600">
                <User className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;