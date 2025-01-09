import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from 'next/link';

interface Order {
    id: string;
    date: string;
    amount: number;
    status: 'pending' | 'completed';
}

const OrderCard = ({ order }: { order: Order }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-orange-200';
            case 'completed':
                return 'bg-green-200';
            default:
                return 'bg-red-200';
        }
    };

    return (
        <div className={`${getStatusColor(order.status)} rounded-2xl p-4 mb-3`}>
            <div className="flex justify-between items-center">
                <div className="space-y-1">
                    <h3 className="font-medium">Oder-#{order.id}</h3>
                    <p className="text-sm text-gray-600">{order.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="font-bold">{order.amount}$</span>
                    <div className={`flex items-center rounded-full px-3 py-1 text-sm ${order.status === 'pending' ? 'bg-orange-300' : 'bg-green-300'
                        }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        <ArrowRight className="h-4 w-4 ml-1" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const OrdersPage = () => {
    const recentOrders: Order[] = [
        {
            id: '989528',
            date: '03 Jan 2025',
            amount: 200,
            status: 'pending'
        },
        {
            id: '998428',
            date: '02 Jan 2025',
            amount: 190,
            status: 'completed'
        },
        {
            id: '9896497',
            date: '07 Jan 2025',
            amount: 780,
            status: 'pending'
        }
    ];

    const orderHistory: Order[] = [
        {
            id: '998428',
            date: '02 Jan 2025',
            amount: 190,
            status: 'completed'
        },
        {
            id: '998428',
            date: '02 Jan 2025',
            amount: 190,
            status: 'completed'
        },
        {
            id: '998428',
            date: '02 Jan 2025',
            amount: 190,
            status: 'completed'
        }
    ];

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            <Card className="bg-white rounded-t-3xl shadow-lg">
                <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-center mb-6">
                        <Link href="/user">
                            <Button variant="ghost" size="icon" className="mr-2">
                                <ArrowLeft className="h-6 w-6" />
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold text-orange-400">My Orders</h1>
                    </div>

                    {/* Recent Orders */}
                    <div className="mb-8">
                        <h2 className="text-xl text-orange-400 mb-4">Recent Orders</h2>
                        <div className="space-y-2">
                            {recentOrders.map((order) => (
                                <OrderCard key={`recent-${order.id}`} order={order} />
                            ))}
                        </div>
                    </div>

                    {/* Order History */}
                    <div>
                        <h2 className="text-xl text-orange-400 mb-4">Order History</h2>
                        <div className="space-y-2">
                            {orderHistory.map((order, index) => (
                                <OrderCard key={`history-${order.id}-${index}`} order={order} />
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default OrdersPage;