"use client"
import React from 'react'
import { Truck, RefreshCw, Lock } from 'lucide-react'

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Enjoy free shipping on all orders with no minimum spend.'
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: 'Hassle-free returns within 30 days of purchase.'
  },
  {
    icon: Lock,
    title: 'Secure Payment',
    description: 'Your payments are encrypted and secure.'
  }
]

const WhyShop: React.FC = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Why Shop With Us
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-3">
          {features.map(({ icon: Icon, title, description }, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow"
            >
              <Icon size={48} className="text-primary mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyShop;
