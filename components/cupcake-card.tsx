"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/lib/hooks/use-cart"
import { Cupcake } from "@/app/models/cupcake"

interface CupcakeCardProps {
  cupcake: Cupcake
}

export function CupcakeCard({ cupcake }: CupcakeCardProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: `${cupcake.id}-${Date.now()}`,
      cupcakeId: cupcake.id,
      quantity,
      price: cupcake.price,
      name: cupcake.name,
      image: cupcake.imageUrl,
    })
    setQuantity(1)
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-muted">
        <Image src={cupcake.imageUrl || "/placeholder.svg"} alt={cupcake.name} fill className="object-cover" />
        {!cupcake.imageUrl && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold">Indisponível</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-foreground mb-1">{cupcake.name}</h3>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-primary">R$ {cupcake.price.toFixed(2)}</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-2 py-1 border border-border rounded hover:bg-muted"
            disabled={!cupcake.imageUrl}
          >
            −
          </button>
          <span className="flex-1 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-2 py-1 border border-border rounded hover:bg-muted"
            disabled={!cupcake.imageUrl}
          >
            +
          </button>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={!cupcake.imageUrl}
          className="w-full flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Adicionar ao Carrinho
        </Button>
      </div>
    </Card>
  )
}
