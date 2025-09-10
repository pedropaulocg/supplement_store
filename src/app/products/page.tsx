"use client"
import React, { useState, useContext } from 'react'
import Image from 'next/image'
import { products } from '@/data/products'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { StoreContext } from '@/store/StoreProvider'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Product } from '@/types'
import Link from 'next/link'
import productImage from '../../assets/productPlaceholder.jpg'

export default function ProductsPage() {
  const { cartStore } = useContext(StoreContext)
  const [searchTerm, setSearchTerm] = useState('')
  const prices = products.map(p => p.price)
  const minPriceAll = Math.min(...prices)
  const maxPriceAll = Math.max(...prices)
  const [minPrice, setMinPrice] = useState(minPriceAll)
  const [maxPrice, setMaxPrice] = useState(maxPriceAll)
  const [bestSellersOnly, setBestSellersOnly] = useState(false)
  const [sortKey, setSortKey] = useState<'price-asc'|'price-desc'|'alpha'|'rating'>('price-asc')
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))]
  const [selected, setSelected] = useState('All')
  let filtered = selected === 'All' ? products : products.filter(p => p.category === selected)
  // Apply search filter
  filtered = filtered.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  )
  // Apply price range filter
  filtered = filtered.filter(p => p.price >= minPrice && p.price <= maxPrice)
  // Sort by rating if best sellers only
  if (bestSellersOnly) {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating)
  }

    filtered = [...filtered].sort((a, b) => {
    switch (sortKey) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'alpha':
        return a.name.localeCompare(b.name)
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })
  
  const addProductToCart = (product: Product) => {
    cartStore.addItem(product)
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Our Products</h1>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-10 mb-8">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/4 mb-2 sm:mb-0"
          />
          <div className="flex space-x-2 mb-2 sm:mb-0 items-center">
            <span className="text-gray-700 dark:text-gray-300">${minPrice}</span>
            <Slider
              className="w-64"
              min={minPriceAll}
              max={maxPriceAll}
              value={[minPrice, maxPrice]}
              onValueChange={(value) => {
                setMinPrice(value[0])
                setMaxPrice(value[1])
              }}
            />
            <span className="text-gray-700 dark:text-gray-300">${maxPrice}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={bestSellersOnly}
              onCheckedChange={value => setBestSellersOnly(!!value)}
            />
            <span className="text-gray-700 dark:text-gray-300">Best Sellers</span>
          </div>
          <Select onValueChange={value => setSortKey(value as 'price-asc'|'price-desc'|'alpha'|'rating')}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="alpha">Alphabetical</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <Badge
              key={cat}
              variant={selected === cat ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setSelected(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map(product => (
            <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col">
              <Link href={`/products/${product.smug}`}>
                <div className="relative w-full h-48">
                  <Image src={productImage} alt={product.name} fill className="object-cover rounded-md" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100 flex-1">
                  {product.name}
                </h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-primary font-bold">${product.price.toFixed(2)}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{product.rating} ☆</span>
                </div>
              </Link>
              <Button
                variant="default"
                size="sm"
                className="mt-4 w-full flex items-center justify-center space-x-2 cursor-pointer"
                onClick={() => addProductToCart(product)}
              >
                <ShoppingCart size={16} />
                <span>Add to Cart</span>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
