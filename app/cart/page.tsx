"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const ShoppingCart = () => {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([
    {
      id: 1,
      name: "FANTECH HG28 PORTAL 7.1 OVER-EAR GAMING HEADSET",
      price: 50,
      quantity: 1,
      image: "/mouse.jpg"
    },
    {
      id: 2,
      name: "FANTECH HG28 PORTAL 7.1 OVER-EAR GAMING HEADSET",
      price: 50,
      quantity: 1,
      image: "/mouse.jpg"
    },
    {
      id: 3,
      name: "FANTECH HG28 PORTAL 7.1 OVER-EAR GAMING HEADSET",
      price: 50,
      quantity: 1,
      image: "/mouse.jpg"
    },
    {
      id: 4,
      name: "FANTECH HG28 PORTAL 7.1 OVER-EAR GAMING HEADSET",
      price: 50,
      quantity: 1,
      image: "/mouse.jpg"
    }
  ]);

  const updateQuantity = (id: number, increment: boolean) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: increment ? item.quantity + 1 : Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
      <Card className="bg-white rounded-t-3xl shadow-lg">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-6">MY CART</h1>
          
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center p-4 bg-white rounded-lg border">
                <div className="flex-shrink-0 w-24">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-auto"
                  />
                </div>
                
                <div className="flex-grow mx-4">
                  <h3 className="text-sm font-medium">{item.name}</h3>
                  
                  <div className="flex items-center mt-2 space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, false)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    
                    <span className="w-8 text-center">{item.quantity}</span>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, true)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className="text-green-500 font-semibold">
                    {item.price}$
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>items: {totalItems}</span>
              <span className="font-medium">Total: <span className="text-green-500">{totalPrice}$</span></span>
            </div>
            
            <Button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white">
              Check out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShoppingCart;