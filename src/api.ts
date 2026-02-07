import axios from 'axios'
import { Product } from './product'
import type { ProductData } from './types/product'

export class API {
  private url: string

  constructor(url?: string) {
    let apiUrl = url
    if (apiUrl === undefined || apiUrl === "") {
      apiUrl = import.meta.env.REACT_APP_API_BASE_URL
    }
    if (apiUrl?.endsWith("/")) {
      apiUrl = apiUrl.slice(0, apiUrl.length - 1)
    }
    this.url = apiUrl || ""
  }

  private withPath(path: string): string {
    if (!path.startsWith("/")) {
      path = "/" + path
    }
    return `${this.url}${path}`
  }

  private generateAuthToken(): string {
    return "Bearer " + new Date().toISOString()
  }

  async getAllProducts(): Promise<Product[]> {
    return axios.get<ProductData[]>(this.withPath("/products"), {
      headers: {
        "Authorization": this.generateAuthToken()
      }
    })
    .then(r => r.data.map(p => new Product(p)))
  }

  async getProduct(id: string): Promise<Product> {
    return axios.get<ProductData>(this.withPath("/product/" + id), {
      headers: {
        "Authorization": this.generateAuthToken()
      }
    })
    .then(r => new Product(r.data))
  }
}

export default new API(import.meta.env.REACT_APP_API_BASE_URL)
