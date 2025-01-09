
"use client";
import { FC, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Share2, Star, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '../../components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';


interface ProductProps {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  soldCount: number;
  description: {
    weight: string;
    features: string[];
  };
  colors: Array<{
    name: string;
    value: string;
  }>;
  image: string;
}

export const ProductView: FC<ProductProps> = ({
  name,
  price,
  originalPrice,
  discount,
  rating,
  soldCount,
  description,
  colors,
  image
}) => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="relative p-0">
        <Link href="/">
          <Button 
            variant="ghost" 
            size="icon"
            className="absolute left-2 top-2 z-10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        
        <div className="relative w-full h-72">
          <Image
            src="/mouse.jpg"
            alt={name}
            fill
            className="rounded-t-lg object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Product Title and Share */}
        <div className="flex justify-between items-start">
          <h1 className="text-xl font-semibold leading-tight flex-1 pr-4">{name}</h1>
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
            <span className="text-2xl font-bold text-green-600">${price}</span>
            <span className="text-sm text-gray-500 line-through">${originalPrice}</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              -{discount}%
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{rating}</span>
            <Separator orientation="vertical" className="h-4" />
            <span className="text-gray-500">{soldCount} sold</span>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-3">
          <h2 className="font-semibold">Description</h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-600" />
              {description.weight}
            </li>
            {description.features.map((feature, index) => (
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
            {colors.map((color) => (
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

export default function ProductPage() {
  const productData: ProductProps = {
    id: '1',
    name: 'FANTECH HG28 PORTAL 7.1 OVER-EAR GAMING HEADSET',
    price: 50,
    originalPrice: 100,
    discount: 50,
    rating: 4.9,
    soldCount: 119,
    description: {
      weight: '247.5g Lightweight',
      features: [
        'Leatherette Ear Padded Cushions',
        'Easy Volume Control',
        'Running RGB Circular Lighting Effect'
      ]
    },
    colors: [
      { name: 'Stealth Black', value: '#000000' },
      { name: 'Arctic White', value: '#FFFFFF' },
      { name: 'Rose Gold', value: '#B76E79' },
      { name: 'Space Gray', value: '#4A4A4A' }
    ],
    image: '/mouse.jpg'
  };

  return <ProductView {...productData} />;
}