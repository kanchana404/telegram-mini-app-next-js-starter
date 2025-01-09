'use client';

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowLeft, Users, Store, AlertCircle, User } from "lucide-react";
import Link from 'next/link';

const AdminDashboard = () => {
  const chartData = [
    { month: 'Jan', income: 1500 },
    { month: 'Feb', income: 800 },
    { month: 'Mar', income: 1200 },
    { month: 'Apr', income: 850 },
    { month: 'May', income: 2000 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-3">
      {/* Header - Smaller padding and font size for mobile */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <button className="hover:bg-gray-200 p-1.5 rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold text-red-600 ml-2">Admin Dashboard</h1>
        </div>
        <Link href="/admin/profile">
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <User className="h-5 w-5" />
            <span className="text-sm">Profile</span>
          </Button>
        </Link>
      </div>

      {/* Stats Cards - Single column layout for mobile */}
      <div className="grid grid-cols-1 gap-3 mb-4">
        <Card className="bg-orange-400 text-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium mb-0.5">User Management</p>
                <div className="flex items-baseline">
                  <p className="text-3xl font-bold">657</p>
                  <span className="ml-2 text-xs opacity-75">users</span>
                </div>
              </div>
              <Users className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-500 text-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium mb-0.5">Sellers Management</p>
                <div className="flex items-baseline">
                  <p className="text-3xl font-bold">121</p>
                  <span className="ml-2 text-xs opacity-75">sellers</span>
                </div>
              </div>
              <Store className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-600 text-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium mb-0.5">Resolving Disputes</p>
                <div className="flex items-baseline">
                  <p className="text-3xl font-bold">10</p>
                  <span className="ml-2 text-xs opacity-75">active</span>
                </div>
              </div>
              <AlertCircle className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Overview - Optimized for mobile */}
      <Card className="w-full shadow-sm">
        <CardContent className="p-4">
          <h2 className="text-lg font-bold text-red-600 mb-3">Platform Overview</h2>
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-green-600 text-sm font-medium mb-3">Platform Income</p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#6B7280"
                    tick={{ fontSize: 10 }}
                    tickMargin={5}
                  />
                  <YAxis 
                    stroke="#6B7280"
                    tick={{ fontSize: 10 }}
                    tickFormatter={(value) => `${value}$`}
                    width={40}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}$`, 'Income']}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '6px',
                      padding: '6px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar 
                    dataKey="income" 
                    fill="#22C55E"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;