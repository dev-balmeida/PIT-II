const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const apiService = {
  // Cupcakes
  async getCupcakes() {
    const response = await fetch(`${API_BASE_URL}/cupcakes`)
    if (!response.ok) throw new Error("Failed to fetch cupcakes")
    return response.json()
  },

  // Users
  async registerUser(userData: any) {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
    if (!response.ok) throw new Error("Failed to register user")
    return response.json()
  },

  async loginUser(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/users/email/${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to login")
    const user = await response.json()

    // Validar senha (simples - em produção usar hash)
    if (user.password !== password) {
      throw new Error("Invalid password")
    }

    return user
  },

  // Orders
  async createOrder(orderData: any) {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    })
    if (!response.ok) throw new Error("Failed to create order")
    return response.json()
  },

  async getOrdersByUser(userId: number) {
    const response = await fetch(`${API_BASE_URL}/orders/user/${userId}`)
    if (!response.ok) throw new Error("Failed to fetch user orders")
    return response.json()
  },

  async getAllOrders() {
    const response = await fetch(`${API_BASE_URL}/orders`)
    if (!response.ok) throw new Error("Failed to fetch orders")
    return response.json()
  },
}
