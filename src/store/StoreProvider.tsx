"use client"
import React from 'react'
import { cartStore } from '@/store/cart.store'
import { orderStore } from '@/store/order.store'

export const StoreContext = React.createContext({ cartStore, orderStore })

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <StoreContext.Provider value={{ cartStore, orderStore }}>
      {children}
    </StoreContext.Provider>
  )
}
