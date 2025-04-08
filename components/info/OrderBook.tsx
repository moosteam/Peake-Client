"use client"

import { useState, useEffect } from "react"

interface OrderItem {
  price: number
  amount: number
  time: string
}

interface OrderBookProps {
  currentPrice?: number
}

export default function OrderBook({ currentPrice = 115408000 }: OrderBookProps) {
  const [sellOrders, setSellOrders] = useState<OrderItem[]>([])
  const [buyOrders, setBuyOrders] = useState<OrderItem[]>([])
  
  useEffect(() => {
    // Generate mock order data
    const generateOrders = () => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      
      // Generate sell orders (higher than current price)
      const sells: OrderItem[] = []
      let sellPrice = currentPrice + 20000
      for (let i = 0; i < 6; i++) {
        sells.push({
          price: sellPrice + i * 30000,
          amount: parseFloat((Math.random() * 0.1).toFixed(8)),
          time: `${hours}:${minutes}:${String(now.getSeconds() - i).padStart(2, '0')}`
        })
      }
      
      // Generate buy orders (lower than current price)
      const buys: OrderItem[] = []
      let buyPrice = currentPrice - 20000
      for (let i = 0; i < 6; i++) {
        buys.push({
          price: buyPrice - i * 30000,
          amount: parseFloat((Math.random() * 0.1).toFixed(8)),
          time: `${hours}:${minutes}:${String(now.getSeconds() - i).padStart(2, '0')}`
        })
      }
      
      setSellOrders(sells)
      setBuyOrders(buys)
    }
    
    generateOrders()
    const interval = setInterval(generateOrders, 3000)
    
    return () => clearInterval(interval)
  }, [currentPrice])
  
  // Calculate max amount for progress bar scaling
  const maxAmount = Math.max(
    ...sellOrders.map(o => o.amount),
    ...buyOrders.map(o => o.amount)
  ) || 0.1
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden text-sm">
      <div className="p-2 bg-gray-50 text-center text-black font-medium border-b border-gray-200">
        호가
      </div>
      
      <div>
        {/* Sell orders (red) */}
        {sellOrders
          .sort((a, b) => b.price - a.price)
          .map((order, index) => (
            <div key={`sell-${index}`} className="grid grid-cols-2 border-t border-gray-100 relative">
              <div className="py-1 px-2 text-right text-red-500 font-medium relative z-10">
                {order.price.toLocaleString()}
              </div>
              <div className="py-1 px-2 text-right text-black relative z-10">
                {order.amount.toFixed(8)}
              </div>
              <div 
                className="absolute right-0 top-0 h-full bg-red-100 transition-all duration-300 ease-out" 
                style={{ width: `${(order.amount / maxAmount) * 100}%`, maxWidth: '100%' }}
              ></div>
            </div>
          ))}
        
        {/* Current price (blue) */}
        <div className="bg-blue-50 p-2 text-center border-y border-gray-100">
          <div className="text-blue-600 font-bold text-[1.2rem]">
            {currentPrice.toLocaleString()} <span className="font-normal text-[0.7rem]">KRW</span>
          </div>
        </div>
        
        {/* Buy orders (green) */}
        {buyOrders
          .sort((a, b) => b.price - a.price)
          .map((order, index) => (
            <div key={`buy-${index}`} className="grid grid-cols-2 border-t border-gray-100 relative">
              <div className="py-1 px-2 text-right text-green-500 font-medium relative z-10">
                {order.price.toLocaleString()}
              </div>
              <div className="py-1 px-2 text-right text-black relative z-10">
                {order.amount.toFixed(8)}
              </div>
              <div 
                className="absolute right-0 top-0 h-full bg-green-100 transition-all duration-300 ease-out" 
                style={{ width: `${(order.amount / maxAmount) * 100}%`, maxWidth: '100%' }}
              ></div>
            </div>
          ))}
      </div>
    </div>
  )
}