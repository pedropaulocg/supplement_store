"use client"
import React, { useState, useContext } from 'react'
import { StoreContext } from '@/store/StoreProvider'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function CheckoutPage() {
  const { cartStore, orderStore } = useContext(StoreContext)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', state: '', zip: ''
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [orderId, setOrderId] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { [key: string]: string } = {}
    Object.entries(form).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = 'This field is required'
    })
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email address'
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors({})
    const customer = { ...form }
    const items = cartStore.items
    const total = cartStore.total
    const newOrder = orderStore.createOrder(customer, items, total)
    cartStore.clearCart()
    setOrderId(newOrder.id)
  }

  if (orderId) {
    return (
      <div className="py-12 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
        <p>Your order ID is <span className="font-semibold">{orderId}</span>.</p>
      </div>
    )
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        {/* Order Summary */}
        <div className="mb-6 bg-gray-50 dark:bg-gray-800 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
          {cartStore.items.map(item => (
            <div key={item.product.id} className="flex justify-between mb-1">
              <span>{item.product.name} × {item.quantity}</span>
              <span>${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold mt-2">
            <span>Total</span>
            <span>${cartStore.total.toFixed(2)}</span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={form.name} onChange={handleChange} required />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input id="address" name="address" value={form.address} onChange={handleChange} required />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" value={form.city} onChange={handleChange} required />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="state">State</Label>
              <Input id="state" name="state" value={form.state} onChange={handleChange} required />
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
            </div>
            <div className="w-32">
              <Label htmlFor="zip">ZIP</Label>
              <Input id="zip" name="zip" value={form.zip} onChange={handleChange} required />
              {errors.zip && <p className="text-red-500 text-sm mt-1">{errors.zip}</p>}
            </div>
          </div>
          <Button type="submit" variant="default" size="lg" className="w-full">Place Order</Button>
        </form>
      </div>
    </div>
  )
}
