"use client"

import { useCart } from "@/lib/hooks/use-cart"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CartSummary() {
  const { items, total, itemCount } = useCart()

  if (items.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-muted-foreground mb-4">Carrinho vazio</p>
        <Link href="/">
          <Button className="w-full">Continuar Comprando</Button>
        </Link>
      </Card>
    )
  }

  return (
    <Card className="p-6 sticky top-20">
      <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>

      <div className="space-y-2 mb-4 pb-4 border-b border-border">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Itens ({itemCount})</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Entrega</span>
          <span>R$ 10,00</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <span className="font-bold">Total</span>
        <span className="text-2xl font-bold text-primary">R$ {(total + 10).toFixed(2)}</span>
      </div>

      <Link href="/checkout">
        <Button className="w-full">Ir para Checkout</Button>
      </Link>
    </Card>
  )
}
