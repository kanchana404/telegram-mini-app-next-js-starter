"use client"
import React from 'react';

import { ArrowLeft, Package, ChevronRight } from "lucide-react";
import Link from 'next/link';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

const EditProfile = () => {
    const [profile, setProfile] = React.useState({
        name: 'Supun',
        username: '@Szteambots',
        telephone: '+1234567890',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Profile updated:', profile);
    };

    const navigateToOrders = () => {
        // Implement navigation to orders page
        console.log('Navigating to orders page');
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            <Card className="bg-white rounded-t-3xl shadow-lg">
                <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-center mb-6">
                        <Link href="/">
                            <Button variant="ghost" size="icon" className="mr-2">
                                <ArrowLeft className="h-6 w-6" />
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold text-orange-400">Edit Profile</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Profile Section */}
                        <div className="space-y-4">
                            <h2 className="text-xl text-orange-400">Profile</h2>

                            {/* Profile Image */}
                            <div className="flex justify-center mb-6">
                                <div className="w-24 h-24 bg-gray-200 rounded-full" />
                            </div>

                            {/* Orders Button */}
                            <Link href="/user/oders">
                                <Button
                                    variant="ghost"
                                    onClick={navigateToOrders}
                                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg mb-4"
                                >
                                    <div className="flex items-center space-x-3">
                                        <Package className="h-5 w-5 text-orange-400" />
                                        <span className="font-medium">My Orders</span>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400" />
                                </Button>
                            </Link>

                            {/* Profile Fields */}
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-600">Name:</label>
                                    <Input
                                        name="name"
                                        value={profile.name}
                                        onChange={handleChange}
                                        className="bg-gray-100 border-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-600">Telegram Username:</label>
                                    <Input
                                        name="username"
                                        value={profile.username}
                                        onChange={handleChange}
                                        className="bg-gray-100 border-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-600">Telephone:</label>
                                    <Input
                                        name="telephone"
                                        value={profile.telephone}
                                        onChange={handleChange}
                                        className="bg-gray-100 border-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Password Change Section */}
                        <div className="space-y-4">
                            <h2 className="text-xl text-orange-400">Change Password</h2>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-600">New Password:</label>
                                    <Input
                                        type="password"
                                        name="newPassword"
                                        value={profile.newPassword}
                                        onChange={handleChange}
                                        className="bg-gray-100 border-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-600">Confirm Password:</label>
                                    <Input
                                        type="password"
                                        name="confirmPassword"
                                        value={profile.confirmPassword}
                                        onChange={handleChange}
                                        className="bg-gray-100 border-none"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-orange-400 hover:bg-orange-500 text-white"
                            >
                                Change
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditProfile;