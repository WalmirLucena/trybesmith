export interface Order {
  id: number,
  userId: number
}

export interface OrderWithProduct {
  id: number,
  userId: number
  products: number[]
}