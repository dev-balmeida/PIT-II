"use client"

import Link from "next/link"
import { ShoppingCart, User, LogOut } from "lucide-react"
import { useCart } from "@/lib/hooks/use-cart"
import { useAuth } from "@/lib/hooks/use-auth"
import { Button } from "@/components/ui/button"

export function Header() {
  const { itemCount } = useCart()
  const { user, logout, isAuthenticated } = useAuth()

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">🧁</span>
            </div>
            <span className="font-bold text-xl text-foreground">Cupcakes</span>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">{user.name}</span>
                <Button variant="ghost" size="sm" onClick={logout} className="flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  Sair
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Entrar
                </Button>
              </Link>
            )}

            <Link href="/cart" className="relative">
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <ShoppingCart className="w-4 h-4" />
                Carrinho
              </Button>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
