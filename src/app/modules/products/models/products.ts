export interface ProductBody {
  title: string,
  price: number,
  description: string,
  image: string,
  category: string,
}

export interface Product {
  category?: string,
  description?: string,
  id?: number,
  image?: string,
  price?: number,
  rating?: { rate?: any, count?: number }
  title?: string,
}
