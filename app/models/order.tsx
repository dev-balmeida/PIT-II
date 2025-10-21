export interface OrderItem {
  id?: number
  cupcake: {
    id: number
    name: string
    price: number
    imageUrl: string
  }
  quantity: number
  order?: any
}

export interface Order {
  id?: number
  paymentMethod: string
  total: number
  user: {
    id: number
    name: string
    email: string
    password: string
    cep: string
    street: string
    number: string
    complement?: string
  }
  items: OrderItem[]
}
