"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface PaymentMethod {
  id: string;
  name: string;
  via: string;
}

const CheckoutPage = () => {
  const [selectedMethod, setSelectedMethod] = React.useState<string>("USDT");
  
  const paymentMethods: PaymentMethod[] = [
    { id: "USDT", name: "USDT", via: "@Send" },
    { id: "TON", name: "TON", via: "@Send" },
    { id: "SOL", name: "SOL", via: "@Send" },
    { id: "BTC", name: "BTC", via: "@Send" },
    { id: "BNB", name: "BNB", via: "@Send" },
    { id: "TRX", name: "TRX", via: "@Send" },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
      <Card className="bg-white rounded-t-3xl shadow-lg">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-6">Check Out</h1>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-lg text-gray-600 mb-4">Payment Method</h2>
              
              <RadioGroup
                value={selectedMethod}
                onValueChange={setSelectedMethod}
                className="space-y-3"
              >
                {paymentMethods.map((method) => (
                  <Label
                    key={method.id}
                    className={`flex items-center justify-between p-4 rounded-full cursor-pointer transition-colors ${
                      selectedMethod === method.id 
                        ? 'bg-green-100 border-green-200' 
                        : 'bg-green-50 hover:bg-green-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value={method.id} />
                      <span className="font-medium">{method.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      via {method.via}
                    </span>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium">Total:</span>
                <span className="text-2xl text-green-500 font-bold">200$</span>
              </div>
              
              <Button 
                className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-6"
              >
                Pay Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutPage;