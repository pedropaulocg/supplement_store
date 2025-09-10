"use client"
import React, { useContext } from 'react'
import Image from 'next/image'
import { StoreContext } from '@/store/StoreProvider'
import { products } from '@/data/products'
import type { Product } from '@/types'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import productImage from '../../../assets/productPlaceholder.jpg'

interface PageProps {
  params: {
    smug: string
  }
}

export default function ProductPage({ params }: { params: Promise<{ smug: string }>}) {
  const { smug } = React.use(params)
  const { cartStore } = useContext(StoreContext)
  const product = products.find((p: Product) => p.smug === smug)

  if (!product) {
    return <div className="p-8 text-center">Product not found.</div>
  }

  const addItem = () => cartStore.addItem(product)

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full h-96 relative">
          <Image
            src={productImage}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-start">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {product.name}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Rating: <span className="font-semibold">{product.rating} ☆</span>
          </p>
          <p className="text-primary font-bold text-2xl mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {product.description}
          </p>
          <Button
            variant="default"
            size="lg"
            className="w-full flex items-center justify-center space-x-2"
            onClick={addItem}
          >
            <ShoppingCart size={20} />
            <span>Add to Cart</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
