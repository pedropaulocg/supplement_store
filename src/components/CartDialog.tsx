"use client"
import React, { useContext } from 'react'
import Link from 'next/link'
import { StoreContext } from '@/store/StoreProvider'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { observer } from 'mobx-react-lite'


const CartDialog = observer(() => {
  const { cartStore } = useContext(StoreContext)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="relative p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800">
          <ShoppingCart size={20} />
          {cartStore.itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartStore.itemCount}
            </span>
          )}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Your Cart</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 max-h-60 overflow-y-auto">
          {cartStore.items.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            cartStore.items.map(item => (
              <div key={item.product.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <p className="font-medium text-gray-900 dark:text-gray-100">{item.product.name}</p>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => cartStore.updateQuantity(item.product.id, item.quantity - 1)}
                      className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() => cartStore.updateQuantity(item.product.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => cartStore.removeItem(item.product.id)}
                    className="px-2 py-1 text-red-500"
                  >
                    Remove
                  </button>
                </div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  ${(item.quantity * item.product.price).toFixed(2)}
                </p>
              </div>
            ))
          )}
        </div>
        <div className="mt-6 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${cartStore.total.toFixed(2)}</span>
        </div>
        <DialogFooter>
          <div className="flex flex-col space-y-2 w-full">
            <button
              onClick={() => cartStore.clearCart()}
              className="text-red-500 px-4 py-2 border border-red-500 cursor-pointer w-full rounded-md hover:bg-red-500 hover:text-white transition-all duration-300"
            >
              Clear Cart
            </button>
            <DialogClose asChild>
              <Button asChild variant="default" className="w-full">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
})

export default CartDialog
