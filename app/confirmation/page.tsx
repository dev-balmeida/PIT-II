"use client"

import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-md mx-auto px-4 py-12">
        <Card className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Pedido realizado com sucesso!</h1>
          <p className="text-muted-foreground mb-6">
            Obrigado pela sua compra.
          </p>

          <Link href="/">
            <Button className="w-full">Voltar à loja</Button>
          </Link>
        </Card>
      </div>
    </div>
  )
}
