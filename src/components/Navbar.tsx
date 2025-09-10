"use client"
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import {
  Menu as MenuIcon,
  X as XIcon,
  Search as SearchIcon,
  User as UserIcon,
  ShoppingCart as ShoppingCartIcon,
  ShoppingBag,
} from 'lucide-react'
import { products } from '@/data/products'
import { observer } from 'mobx-react-lite'
import { cartStore } from '@/store/cart.store'
import CartDialog from '@/components/CartDialog'

export const Navbar = observer(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const searchRef = useRef<HTMLDivElement>(null)
  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <nav className="bg-white dark:bg-gray-900 shadow relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} />
            <Link href="/" className="text-xl font-bold text-primary">
              Supplement Store
            </Link>
          </div>
          <div className="hidden md:flex md:space-x-6">
            <Link href="/" className="text-gray-700 dark:text-gray-200 hover:text-primary">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 dark:text-gray-200 hover:text-primary">
              Shop
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative" ref={searchRef}>
              <button
                className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800"
                onClick={() => setSearchOpen(prev => !prev)}
              >
                <SearchIcon size={20} />
              </button>
              {searchOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-md p-2 z-50">
                  <input
                    type="text"
                    className="w-full px-2 py-1 mb-2 rounded border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-gray-100"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                  <ul className="max-h-48 overflow-auto">
                    {products
                      .filter(p =>
                        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.description.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .slice(0, 5)
                      .map(p => (
                        <li key={p.id}>
                          <Link
                            href={`/products/${p.smug}`}
                            className="block px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => setSearchOpen(false)}
                          >
                            {p.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
            <Link href="/login">
              <button className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800">
                <UserIcon />
              </button>
            </Link>
            <CartDialog />
            <button
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(true)}
            >
              <MenuIcon size={24} />
            </button>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 z-50 w-64 h-full bg-white dark:bg-gray-900 shadow-lg p-4">
            <div className="flex justify-between items-center mb-6">
              <Link href="/" className="text-xl font-bold text-primary">
                ShopSmart
              </Link>
              <button
                className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                <XIcon size={24} />
              </button>
            </div>
            <nav className="space-y-4">
              <Link href="/" className="block text-gray-700 dark:text-gray-200 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/shop" className="block text-gray-700 dark:text-gray-200 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                Shop
              </Link>
              <Link href="/categories" className="block text-gray-700 dark:text-gray-200 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                Categories
              </Link>
              <Link href="/deals" className="block text-gray-700 dark:text-gray-200 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                Deals
              </Link>
              <Link href="/contact" className="block text-gray-700 dark:text-gray-200 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}
    </nav>
  )
})
