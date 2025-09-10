import { makeAutoObservable } from 'mobx'
import type { CartItem, Product } from '@/types'

class CartStore {
  items: CartItem[] = []

  constructor() {
    makeAutoObservable(this)
  }

  get total(): number {
    return this.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  }

  get itemCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0)
  }

  addItem(product: Product, quantity: number = 1) {
    const existing = this.items.find(item => item.product.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      this.items.push({ product, quantity })
    }
  }

  removeItem(productId: string) {
    this.items = this.items.filter(item => item.product.id !== productId)
  }

  updateQuantity(productId: string, quantity: number) {
    const item = this.items.find(i => i.product.id === productId)
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId)
      } else {
        item.quantity = quantity
      }
    }
  }

  clearCart() {
    this.items = []
  }
}

export const cartStore = new CartStore()
