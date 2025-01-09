// app/admin/setup-shop/page.tsx
"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Upload, Plus, Minus } from "lucide-react";
import Link from 'next/link';
import { UploadButton } from '@/utils/uploadthing';
import axios from 'axios';

const ManageProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories');
        setCategories(response.data.map((cat: any) => cat.name));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      try {
        const response = await axios.post('/api/categories', { name: newCategory.trim() });
        setCategories(prev => [...prev, response.data.name]);
        setCategory(response.data.name);
        setNewCategory("");
        setIsDialogOpen(false);
      } catch (error) {
        console.error("Error adding category:", error);
        alert("Failed to add category");
      }
    }
  };

  const handleSaveProduct = async () => {
    if (!title || !category || images.length === 0 || price < 0 || qty < 0 || !description) {
      alert("Please fill in all fields correctly.");
      return;
    }

    try {
      const response = await axios.post('/api/products', {
        title,
        category,
        images,
        price,
        qty,
        description
      });
      alert("Product saved successfully!");
      // Reset form
      setTitle("");
      setCategory("");
      setImages([]);
      setPrice(0);
      setQty(0);
      setDescription("");
    } catch (error: any) {
      console.error("Error saving product:", error);
      alert(`Failed to save product: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3">
      {/* Header */}
      <div className="bg-white rounded-lg p-4 mb-3 flex items-center gap-2">
        <Link href="/admin/profile">
          <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-full">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Go back</span>
          </Button>
        </Link>
        <h1 className="text-xl font-bold text-green-500">Manage Product</h1>
      </div>

      {/* Product Form */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-6">
            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block text-green-500 font-medium mb-2">Title:</label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add Title..."
                className="w-full bg-gray-200 border-0 placeholder:text-gray-400"
              />
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-green-500 font-medium mb-2">Category:</label>
              <div className="flex gap-2">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full bg-gray-200 border-0">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="shrink-0">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Category</DialogTitle>
                    </DialogHeader>
                    <div className="flex gap-2">
                      <Input
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Enter category name"
                      />
                      <Button onClick={handleAddCategory}>Add</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-green-500 font-medium mb-2">Images/Videos:</label>
              <div className="bg-gray-200 rounded-lg p-8">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res && res.length > 0) {
                      // Add the new image URL to the images array
                      setImages(prev => [...prev, res[0].url]);
                      alert("Upload Completed");
                    }
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                />
                {/* Display uploaded images */}
                {images.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative">
                        <img src={img} alt={`Upload ${idx + 1}`} className="w-full h-24 object-cover rounded" />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setImages(prev => prev.filter((_, i) => i !== idx))}
                          className="absolute top-1 right-1 bg-white rounded-full p-1"
                        >
                          <Minus className="h-4 w-4" />
                          <span className="sr-only">Remove image</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Price Input */}
            <div>
              <label htmlFor="price" className="block text-green-500 font-medium mb-2">Price ($):</label>
              <div className="flex items-center gap-2 bg-gray-200 rounded-lg p-2 w-28">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setPrice(prev => Math.max(0, prev - 1))}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease price</span>
                </Button>
                <input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-16 bg-transparent border-0 text-center focus:outline-none"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setPrice(prev => prev + 1)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase price</span>
                </Button>
              </div>
            </div>

            {/* Quantity Input */}
            <div>
              <label htmlFor="qty" className="block text-green-500 font-medium mb-2">Quantity:</label>
              <div className="flex items-center gap-2 bg-gray-200 rounded-lg p-2 w-28">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQty(prev => Math.max(0, prev - 1))}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <input
                  id="qty"
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-16 bg-transparent border-0 text-center focus:outline-none"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQty(prev => prev + 1)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
            </div>

            {/* Description Input */}
            <div>
              <label htmlFor="description" className="block text-green-500 font-medium mb-2">Description:</label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add Description..."
                className="w-full bg-gray-200 border-0 min-h-[200px] placeholder:text-gray-400"
              />
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSaveProduct}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-6"
            >
              Save Product
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageProduct;