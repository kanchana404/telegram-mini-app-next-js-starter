'use client';

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from 'next/link';

const SellerProfile = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-3">
      {/* Header */}
      <div className="bg-white rounded-lg p-4 mb-3 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Link href="/admin">
              <button className="hover:bg-gray-100 p-1.5 rounded-full transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </button>
            </Link>
            <h1 className="text-xl font-bold text-green-500">Hello Alex!</h1>
          </div>
          <div className="h-12 w-12 bg-gray-100 rounded-full border-2 border-green-500"></div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-1">Today Earnings:</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">$219.25</span>
            <span className="text-sm text-green-500">+19.9%</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Link href="/admin/setup-shop" className="flex-1">
            <Button className="w-full bg-orange-400 hover:bg-orange-500">
              Setup Shop
            </Button>
          </Link>
          <Link href="/admin/profile/edit-profile" className="flex-1">
            <Button className="w-full bg-green-500 hover:bg-green-600">
              Edit Profile
            </Button>
          </Link>
        </div>
      </div>

      {/* Analytics Section */}
      <Card className="mb-3">
        <CardContent className="p-4">
          <h2 className="text-xl font-bold text-green-500 mb-2">Analytics</h2>
          <p className="text-sm text-gray-500 mb-4">2025 January 1 - December 31</p>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gradient-to-b from-green-400 to-green-500 p-4 rounded-lg text-white">
              <p className="text-sm mb-2">Total Earnings</p>
              <p className="text-2xl font-bold">$5120</p>
            </div>
            
            <div className="bg-gradient-to-b from-orange-400 to-orange-500 p-4 rounded-lg text-white">
              <p className="text-sm mb-2">Total Orders</p>
              <p className="text-2xl font-bold">183</p>
            </div>
            
            <div className="bg-gradient-to-b from-red-400 to-red-500 p-4 rounded-lg text-white">
              <p className="text-sm mb-2">Average Response Time</p>
              <p className="text-2xl font-bold">1H</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold text-green-500 mb-4">Recent Orders</h2>
          
          <div className="space-y-3">
            <Link href="/admin/orders/119" className="block">
              <Button 
                variant="ghost" 
                className="w-full bg-green-100 hover:bg-green-200 flex items-center justify-between p-4 h-auto"
              >
                <div>
                  <p className="font-semibold text-left">New Order</p>
                  <p className="text-sm text-gray-500">User-119</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Pending</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </Button>
            </Link>

            <Link href="/admin/orders/118" className="block">
              <Button 
                variant="ghost" 
                className="w-full bg-green-100 hover:bg-green-200 flex items-center justify-between p-4 h-auto"
              >
                <div>
                  <p className="font-semibold text-left">New Order</p>
                  <p className="text-sm text-gray-500">User-118</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Pending</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerProfile;