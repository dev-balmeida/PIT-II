"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { CupcakeCard } from "@/components/cupcake-card"
import { Cupcake } from "./models/cupcake"
import { apiService } from "./services/api"

export default function Home() {
  const [cupcakes, setCupcakes] = useState<Cupcake[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCupcakes = async () => {
      try {
        const data = await apiService.getCupcakes()
        setCupcakes(data)
      } catch (err) {
        setError("Erro ao carregar cupcakes")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCupcakes()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Bem-vindos a minha loja de Cupcakes!</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Deliciosos cupcakes feitos com ingredientes premium. Perfeitos para celebrações e momentos especiais.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">Nossa Coleção</h2>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Carregando cupcakes...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-destructive">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cupcakes.map((cupcake) => (
                <CupcakeCard key={cupcake.id} cupcake={cupcake} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 Cupcakes. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
