"use client"
import React, { useContext, useRef } from "react";
import Image from "next/image";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import productImage from '../assets/productPlaceholder.jpg'
import { StoreContext } from "@/store/StoreProvider";

const bestSelling = products
  .slice()
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 10);

const BestSellingCarousel: React.FC = () => {
  const { cartStore } = useContext(StoreContext)
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollAmount = 300;
  const scrollPrev = () => scrollRef.current?.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  const scrollNext = () => scrollRef.current?.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  return (
    <div className="relative">
      <button
        onClick={scrollPrev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow cursor-pointer z-10"
      >
        <ChevronLeft size={20} />
      </button>
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-hidden snap-x snap-mandatory scrollbar-hide py-2"
      >
        {bestSelling.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-64 sm:w-72 md:w-80 bg-white dark:bg-gray-800 rounded-lg shadow p-4 snap-center"
          >
            <div className="w-full h-40 relative">
              <Image
                src={productImage}
                alt={product.name}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
            <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              {product.name}
            </h3>
            <p className="mt-1 text-primary font-bold">
              ${product.price.toFixed(2)}
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {product.rating} ☆
            </p>
            <Button variant="default" size="sm" className="mt-3 w-full flex items-center justify-center space-x-2 cursor-pointer" onClick={() => cartStore.addItem(product)}>
              <ShoppingCart size={16} />
              <span>Add to Cart</span>
            </Button>
          </div>
        ))}
      </div>
      <button
        onClick={scrollNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow cursor-pointer z-10"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default BestSellingCarousel;
