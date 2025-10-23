"use client"

import { Header } from "@/components/header"
import { CartSummary } from "@/components/cart-summary"
import { useCart } from "@/lib/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">Seu Carrinho</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {items.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground mb-4">Seu carrinho está vazio</p>
                <Link href="/">
                  <Button>Continuar Comprando</Button>
                </Link>
              </Card>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <Card key={item.cupcakeId} className="p-4 flex gap-4">
                    <div className="relative w-24 h-24 bg-muted rounded">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        R$ {(Number(item.price) || 0).toFixed(2)} cada
                      </p>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.cupcakeId, item.quantity - 1)}
                          className="px-2 py-1 border border-border rounded hover:bg-muted"
                        >
                          −
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cupcakeId, item.quantity + 1)}
                          className="px-2 py-1 border border-border rounded hover:bg-muted"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-foreground mb-2">
                        R$ {(Number(item.price || 0) * item.quantity).toFixed(2)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.cupcakeId)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div>
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  )
}
