"use client"

import { useState } from "react"

interface TradePanelProps {
  amountOptions: string[];
}

export default function TradePanel({ amountOptions }: TradePanelProps) {
  const [amount, setAmount] = useState<string>("")
  const [quantity, setQuantity] = useState<string>("")

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "")
    if (!value || parseInt(value) <= 100000000) {
      setAmount(value)
    }
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "")
    setQuantity(value)
  }

  const handleAmountOptionClick = (selectedAmount: string) => {
    const numericAmount = parseInt(selectedAmount.replace(/[^0-9]/g, ""))
    const currentAmount = parseInt(amount) || 0
    const newAmount = currentAmount + numericAmount
    if (newAmount <= 100000000) {
      setAmount(newAmount.toString())
    }
  }

  return (
    <>
      <div className="flex gap-2">
        <button className="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-green-500 text-white hover:bg-green-600">
          구매
        </button>
        <button className="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-red-500 text-white hover:bg-red-600">
          판매
        </button>
      </div>

      <div className="mt-2 border rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">금액</span>
            <input
              type="text"
              value={amount ? parseInt(amount).toLocaleString() : ""}
              onChange={handleAmountChange}
              className="w-55 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-black border-gray-300 text-right"
              placeholder="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-1">
          {amountOptions.map((amount, index) => (
            <button
              key={index}
              onClick={() => handleAmountOptionClick(amount)}
              className="py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200 text-center truncate whitespace-nowrap overflow-hidden text-[0.8rem]"
            >
              {amount}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}