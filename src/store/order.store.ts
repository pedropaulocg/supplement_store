import { makeAutoObservable } from 'mobx'
import type { Order, OrderStatus, CartItem, Customer } from '@/types'
import { orders as dummyOrders } from '@/data/orders'

class OrderStore {
  // Preload store with dummy orders
  orders: Order[] = [...dummyOrders]

  constructor() {
    makeAutoObservable(this)
  }

  // Create a new order; auto-generate id and timestamps
  createOrder(customer: Customer, items: CartItem[], total: number) {
    const newOrder: Order = {
      id: crypto.randomUUID(),
      customer,
      items,
      total,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.orders.push(newOrder)
    return newOrder
  }

  // Update an existing order by id
  updateOrder(id: string, fields: Partial<Omit<Order, 'id' | 'createdAt'>>) {
    const order = this.orders.find(o => o.id === id)
    if (order) {
      Object.assign(order, fields)
      order.updatedAt = new Date()
    }
  }

  // Get orders
  get allOrders(): Order[] {
    return this.orders
  }

  // Clear all orders (if needed)
  clearOrders() {
    this.orders = []
  }
}

export const orderStore = new OrderStore()
