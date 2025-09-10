"use client"
import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { StoreContext } from '@/store/StoreProvider'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import type { OrderStatus } from '@/types'
import { Receipt, ReceiptText, RefreshCcw } from 'lucide-react'

const OrdersPage: React.FC = observer(() => {
  const { orderStore } = useContext(StoreContext)

  // Component for updating status via a dialog
  const ChangeStatusDialog: React.FC<{ id: string; current: OrderStatus }> = ({ id, current }) => {
    const [value, setValue] = useState<OrderStatus>(current)
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" size="sm"><RefreshCcw /></Button>
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
            <div className="flex w-full space-x-2">
              <DialogClose asChild>
                <Button variant="outline" size="sm" className="flex-1">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1"
                  onClick={() => orderStore.updateOrder(id, { status: value })}
                >
                  Save
                </Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Orders</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>ZIP</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderStore.allOrders.map(order => (
              <TableRow key={order.id}>
                <TableCell>{order.customer.name}</TableCell>
                <TableCell>{order.customer.zip}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell className="space-x-2">
                  <Link href={`/orders/${order.id}`}> 
                    <Button variant="outline" size="sm"><ReceiptText /></Button>
                  </Link>
                  <ChangeStatusDialog id={order.id} current={order.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
})

export default OrdersPage
