'use client';

import React from 'react';

import { ArrowLeft } from "lucide-react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '../../../../components/ui/card';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';

const EditShopProfile = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 p-3">
      {/* Header */}
      <div className="bg-white rounded-lg p-4 mb-3 flex items-center gap-2">
        <Link href="/admin/profile">
          <button className="hover:bg-gray-100 p-1.5 rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
        </Link>
        <h1 className="text-xl font-bold text-green-500">Edit Shop Profile</h1>
      </div>

      {/* Profile Form */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col items-center mb-6">
            <p className="text-green-500 font-medium mb-4">Profile</p>
            <div className="w-24 h-24 bg-gray-200 rounded-full mb-2"></div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Shop Name:</label>
              <Input 
                type="text"
                placeholder="Shop Name"
                defaultValue="Alex Store"
                className="w-full bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Email:</label>
              <Input 
                type="email"
                placeholder="Email"
                defaultValue="alexshop@gmail.com"
                className="w-full bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Telephone:</label>
              <Input 
                type="tel"
                placeholder="Telephone"
                defaultValue="+12345678910"
                className="w-full bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Category:</label>
              <Input 
                type="text"
                placeholder="Category"
                defaultValue="Electronics"
                className="w-full bg-gray-100"
              />
            </div>

            <Button 
              className="w-full bg-green-500 hover:bg-green-600 text-white py-6"
              onClick={() => router.push('/profile')}
            >
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditShopProfile;