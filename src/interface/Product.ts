export interface IProduct {
  name: string,
  amount: string,
  orderId: number
}

export interface Product extends IProduct {
  id: number,
} 
