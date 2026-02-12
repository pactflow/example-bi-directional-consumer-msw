import axios, { type AxiosInstance } from "axios";
import { Product } from "./product.ts";
import type { ProductData } from "./types/product.ts";

export class Api {
  private readonly client: AxiosInstance;

  constructor(baseUrl?: string) {
    this.client = axios.create({
      // biome-ignore lint/style/useNamingConvention: baseURL is axios's official property name
      baseURL: baseUrl || import.meta.env.PROVIDER_APP_BASE_URL || "",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  private generateAuthToken(): string {
    return `Bearer ${new Date().toISOString()}`;
  }

  getAllProducts(): Promise<Product[]> {
    return this.client
      .get<ProductData[]>("/products", {
        headers: { authorization: this.generateAuthToken() },
      })
      .then((r) => r.data.map((p) => new Product(p)));
  }

  getProduct(id: string): Promise<Product> {
    return this.client
      .get<ProductData>(`/product/${id}`, {
        headers: { authorization: this.generateAuthToken() },
      })
      .then((r) => new Product(r.data));
  }
}

export const api = new Api();
