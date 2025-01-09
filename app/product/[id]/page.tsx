'use client';

import React, { FC, useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Share2, 
  Star, 
  ShoppingCart 
} from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader } from '../../../components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../../components/ui/tooltip';
import { Badge } from '../../../components/ui/badge';
import { Separator } from '../../../components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../../../components/ui/sheet';



// Hardcoded product type mappings
const PRODUCT_TYPE_DETAILS = {
  'casing': {
    fullName: 'Computer Casing',
    features: [
      'Sturdy Build Quality',
      'Optimal Airflow Design',
      'Cable Management Support'
    ],
    weight: '2.5kg Standard Weight',
    colors: [
      { name: 'Stealth Black', value: '#000000' },
      { name: 'Arctic White', value: '#FFFFFF' },
      { name: 'Metallic Silver', value: '#C0C0C0' },
      { name: 'Gunmetal Gray', value: '#4A4A4A' }
    ],
    originalPriceMultiplier: 2,
    discountPercentage: 20
  },
  // Add more product types as needed
  'default': {
    fullName: 'Generic Product',
    features: [
      'High Quality Material',
      'Durable Construction',
      'Versatile Usage'
    ],
    weight: '500g Standard Weight',
    colors: [
      { name: 'Classic Black', value: '#000000' },
      { name: 'Pure White', value: '#FFFFFF' }
    ],
    originalPriceMultiplier: 1.5,
    discountPercentage: 10
  }
};

interface ProductDetail {
  _id: string;
  title: string;
  price: number;
  qty: number;
  description: string;
  images: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
}

const ProductDetailPage: FC = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<{name: string, value: string}>({ name: '', value: '' });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Failed to fetch product');
        }
        const data: ProductDetail = await res.json();
        setProduct(data);
        
        // Set default color
        const productDetails = PRODUCT_TYPE_DETAILS[data.title.toLowerCase()] || PRODUCT_TYPE_DETAILS['default'];
        setSelectedColor(productDetails.colors[0]);
        
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <div className="w-full max-w-md mx-auto bg-gray-100 min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="w-full max-w-md mx-auto bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => router.back()} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full max-w-md mx-auto bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-500">Product not found.</p>
        <Button onClick={() => router.back()} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  // Get product-specific details or use default
  const productDetails = PRODUCT_TYPE_DETAILS[product.title.toLowerCase()] || PRODUCT_TYPE_DETAILS['default'];
  
  // Calculate derived pricing
  const originalPrice = product.price * productDetails.originalPriceMultiplier;
  const discountPercentage = productDetails.discountPercentage;

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="relative p-0">
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute left-2 top-2 z-10"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <div className="relative w-full h-72">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="rounded-t-lg object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Product Title and Share */}
        <div className="flex justify-between items-start">
          <h1 className="text-xl font-semibold leading-tight flex-1 pr-4">
            {productDetails.fullName || product.title}
          </h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share product</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Price and Rating Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-green-600">${product.price}</span>
            <span className="text-sm text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              -{discountPercentage}%
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">4.8</span>
            <Separator orientation="vertical" className="h-4" />
            <span className="text-gray-500">119 sold</span>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-3">
          <h2 className="font-semibold">Description</h2>
          <p className="text-gray-600">{product.description}</p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-600" />
              {productDetails.weight}
            </li>
            {productDetails.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gray-600" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Color Selection */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">Color</h2>
            <span className="text-sm text-gray-500">{selectedColor.name}</span>
          </div>
          <div className="flex gap-3">
            {productDetails.colors.map((color) => (
              <TooltipProvider key={color.value}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-10 h-10 rounded-full p-0 transition-all duration-200 ${
                        selectedColor.value === color.value 
                          ? 'ring-2 ring-offset-2 ring-blue-600' 
                          : 'hover:ring-2 hover:ring-offset-2 hover:ring-blue-400'
                      }`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setSelectedColor(color)}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{color.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                className="flex-1"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Shopping Cart</SheetTitle>
                <SheetDescription>
                  Review your items before checkout
                </SheetDescription>
              </SheetHeader>
              {/* Cart content would go here */}
            </SheetContent>
          </Sheet>
          
          <Button 
            className="flex-1 bg-red-500 hover:bg-red-600"
          >
            Buy Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductDetailPage;