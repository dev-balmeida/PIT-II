// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Header } from "@/components/header"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { useCart } from "@/lib/hooks/use-cart"
// import { useAuth } from "@/lib/hooks/use-auth"
// import Link from "next/link"
// import { apiService } from "../services/api"

// export default function CheckoutPage() {
//   const router = useRouter()
//   const { items, total, clearCart } = useCart()
//   const { user, isAuthenticated } = useAuth()
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [paymentMethod, setPaymentMethod] = useState("credit_card")

//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Header />
//         <div className="max-w-md mx-auto px-4 py-12">
//           <Card className="p-8 text-center">
//             <p className="text-muted-foreground mb-4">Você precisa estar logado para fazer checkout</p>
//             <Link href="/login">
//               <Button>Ir para Login</Button>
//             </Link>
//           </Card>
//         </div>
//       </div>
//     )
//   }

//   if (items.length === 0) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Header />
//         <div className="max-w-md mx-auto px-4 py-12">
//           <Card className="p-8 text-center">
//             <p className="text-muted-foreground mb-4">Seu carrinho está vazio</p>
//             <Link href="/">
//               <Button>Continuar Comprando</Button>
//             </Link>
//           </Card>
//         </div>
//       </div>
//     )
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setError(null)

//     try {
//       const orderData = {
//         paymentMethod: paymentMethod,
//         total: total + 10,
//         user: user,
//         items: items.map((item) => ({
//           cupcake: {
//             id: item.cupcakeId,
//             name: item.name,
//             price: item.price,
//             imageUrl: item.image,
//           },
//           quantity: item.quantity,
//         })),
//       }

//       console.log("[v0] Enviando pedido:", orderData)
//       const response = await apiService.createOrder(orderData)
//       console.log("[v0] Resposta do pedido:", response)

//       clearCart()
//       router.push(`/confirmation/${response.id}`)
//     } catch (err) {
//       setError("Erro ao processar pedido. Tente novamente.")
//       console.error("[v0] Erro:", err)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <h1 className="text-3xl font-bold text-foreground mb-8">Finalizar Compra</h1>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Checkout Form */}
//           <div className="lg:col-span-2">
//             {error && <div className="bg-destructive/10 text-destructive p-4 rounded mb-6">{error}</div>}

//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Delivery Info */}
//               <Card className="p-6">
//                 <h2 className="text-xl font-semibold text-foreground mb-4">Informações de Entrega</h2>
//                 <div className="space-y-4">
//                   <div>
//                     <p className="text-sm font-medium text-foreground">Endereço de Entrega</p>
//                     <p className="text-sm text-muted-foreground mt-1">
//                       {user?.street}, {user?.number} {user?.complement && `- ${user.complement}`}
//                     </p>
//                     <p className="text-sm text-muted-foreground">CEP: {user?.cep}</p>
//                   </div>
//                 </div>
//               </Card>

//               {/* Payment Info */}
//               <Card className="p-6">
//                 <h2 className="text-xl font-semibold text-foreground mb-4">Método de Pagamento</h2>
//                 <div className="space-y-3">
//                   <label className="flex items-center">
//                     <input
//                       type="radio"
//                       name="payment"
//                       value="credit_card"
//                       checked={paymentMethod === "credit_card"}
//                       onChange={(e) => setPaymentMethod(e.target.value)}
//                       className="mr-3"
//                     />
//                     <span className="text-sm font-medium">Cartão de Crédito</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input
//                       type="radio"
//                       name="payment"
//                       value="debit_card"
//                       checked={paymentMethod === "debit_card"}
//                       onChange={(e) => setPaymentMethod(e.target.value)}
//                       className="mr-3"
//                     />
//                     <span className="text-sm font-medium">Cartão de Débito</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input
//                       type="radio"
//                       name="payment"
//                       value="money"
//                       checked={paymentMethod === "money"}
//                       onChange={(e) => setPaymentMethod(e.target.value)}
//                       className="mr-3"
//                     />
//                     <span className="text-sm font-medium">Dinheiro</span>
//                   </label>
//                 </div>
//               </Card>

//               <Button type="submit" disabled={isLoading} className="w-full py-3 text-lg">
//                 {isLoading ? "Processando..." : "Confirmar Pedido"}
//               </Button>
//             </form>
//           </div>

//           {/* Order Summary */}
//           <div>
//             <Card className="p-6 sticky top-20">
//               <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>

//               <div className="space-y-3 mb-4 pb-4 border-b border-border">
//                 {items.map((item) => (
//                   <div key={item.id} className="flex justify-between text-sm">
//                     <span className="text-muted-foreground">
//                       {item.name} x{item.quantity}
//                     </span>
//                     <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
//                   </div>
//                 ))}
//               </div>

//               <div className="space-y-2 mb-4 pb-4 border-b border-border">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-muted-foreground">Subtotal</span>
//                   <span>R$ {total.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-muted-foreground">Entrega</span>
//                   <span>R$ 10,00</span>
//                 </div>
//               </div>

//               <div className="flex justify-between items-center">
//                 <span className="font-bold">Total</span>
//                 <span className="text-2xl font-bold text-primary">R$ {(total + 10).toFixed(2)}</span>
//               </div>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/lib/hooks/use-cart"
import { useAuth } from "@/lib/hooks/use-auth"
import Link from "next/link"
import { apiService } from "../services/api"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const { user, isAuthenticated } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] = useState("credit_card")

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-md mx-auto px-4 py-12">
          <Card className="p-8 text-center">
            <p className="text-muted-foreground mb-4">Você precisa estar logado para fazer checkout</p>
            <Link href="/login">
              <Button>Ir para Login</Button>
            </Link>
          </Card>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-md mx-auto px-4 py-12">
          <Card className="p-8 text-center">
            <p className="text-muted-foreground mb-4">Seu carrinho está vazio</p>
            <Link href="/">
              <Button>Continuar Comprando</Button>
            </Link>
          </Card>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const orderData = {
        paymentMethod,
        total: total + 10, // incluindo taxa de entrega
        user,
        items: items.map((item) => ({
          cupcake: {
            id: item.cupcakeId,
            name: item.name,
            price: item.price,
            imageUrl: item.image,
          },
          quantity: item.quantity,
        })),
      }

      await apiService.createOrder(orderData)

      router.push("/confirmation") // redireciona para a página de confirmação
      clearCart()
    } catch (err) {
      setError("Erro ao processar pedido. Tente novamente.")
      console.error("Erro no checkout:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">Finalizar Compra</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {error && <div className="bg-destructive/10 text-destructive p-4 rounded mb-6">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Delivery Info */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Informações de Entrega</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Endereço de Entrega</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {user?.street}, {user?.number} {user?.complement && `- ${user.complement}`}
                    </p>
                    <p className="text-sm text-muted-foreground">CEP: {user?.cep}</p>
                  </div>
                </div>
              </Card>

              {/* Payment Info */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Método de Pagamento</h2>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="credit_card"
                      checked={paymentMethod === "credit_card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span className="text-sm font-medium">Cartão de Crédito</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="debit_card"
                      checked={paymentMethod === "debit_card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span className="text-sm font-medium">Cartão de Débito</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="money"
                      checked={paymentMethod === "money"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span className="text-sm font-medium">Dinheiro</span>
                  </label>
                </div>
              </Card>

              <Button type="submit" disabled={isLoading} className="w-full py-3 text-lg">
                {isLoading ? "Processando..." : "Confirmar Pedido"}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>

              <div className="space-y-3 mb-4 pb-4 border-b border-border">
                {items.map((item) => (
                  <div key={item.cupcakeId} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} x{item.quantity}
                    </span>
                    <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-4 pb-4 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Entrega</span>
                  <span>R$ 10,00</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-bold">Total</span>
                <span className="text-2xl font-bold text-primary">R$ {(total + 10).toFixed(2)}</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
