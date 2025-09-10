"use client"
import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { StoreContext } from '@/store/StoreProvider'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import type { Order, OrderStatus } from '@/types'

interface PageProps {
  params: {
    orderId: string
  }
}

const OrderDetailPage: React.FC<PageProps> = observer(({ params }) => {
  const { orderStore } = useContext(StoreContext)
  const order = orderStore.allOrders.find((o: Order) => o.id === params.orderId)

  // Dialog for changing status
  const ChangeStatusDialog: React.FC<{ id: string; current: OrderStatus }> = ({ id, current }) => {
    const [value, setValue] = useState<OrderStatus>(current)
    return (
      <Dialog>
        <DialogTrigger asChild>
          <button className="px-2 py-1 bg-blue-500 text-white rounded text-sm">Change Status</button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
          </DialogHeader>
          <Select value={value} onValueChange={val => setValue(val as OrderStatus)}>
            <SelectTrigger size="sm" className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <DialogFooter>
            <div className="flex w-full gap-2">
              <DialogClose asChild>
                <button className="flex-1 px-4 py-2 bg-gray-200 rounded">Cancel</button>
              </DialogClose>
              <DialogClose asChild>
                <button
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={() => orderStore.updateOrder(id, { status: value })}
                >
                  Save
                </button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  if (!order) {
    return <div className="py-12 px-4 text-center">Order not found.</div>
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Order Details</h1>

        <section className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
          <p><span className="font-medium">Name:</span> {order.customer.name}</p>
          <p><span className="font-medium">Email:</span> {order.customer.email}</p>
          <p><span className="font-medium">Phone:</span> {order.customer.phone}</p>
        </section>

        <section className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <p>{order.customer.address}</p>
          <p>{order.customer.city}, {order.customer.state} {order.customer.zip}</p>
        </section>

        <section className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map(item => (
                <TableRow key={item.product.id}>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.product.price.toFixed(2)}</TableCell>
                  <TableCell>${(item.quantity * item.product.price).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-end font-bold text-lg">
            <span>Total: ${order.total.toFixed(2)}</span>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Order Status</h2>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="capitalize">{order.status}</Badge>
            <ChangeStatusDialog id={order.id} current={order.status} />
          </div>
        </section>
      </div>
    </div>
  )
})

export default OrderDetailPage
