import axios from "axios";
import { Product } from "./product.ts";
import type { ProductData } from "./types/product.ts";

export class Api {
  private readonly url: string;

  constructor(url?: string) {
    let apiUrl = url;
    if (apiUrl === undefined || apiUrl === "") {
      apiUrl = import.meta.env.VITE_API_BASE_URL;
    }
    if (apiUrl?.endsWith("/")) {
      apiUrl = apiUrl.slice(0, apiUrl.length - 1);
    }
    this.url = apiUrl || "";
  }

  private withPath(path: string): string {
    let normalizedPath = path;
    if (!normalizedPath.startsWith("/")) {
      normalizedPath = `/${normalizedPath}`;
    }
    return `${this.url}${normalizedPath}`;
  }

  private generateAuthToken(): string {
    return `Bearer ${new Date().toISOString()}`;
  }

  getAllProducts(): Promise<Product[]> {
    return axios
      .get<ProductData[]>(this.withPath("/products"), {
        headers: {
          authorization: this.generateAuthToken(),
        },
      })
      .then((r) => r.data.map((p) => new Product(p)));
  }

  getProduct(id: string): Promise<Product> {
    return axios
      .get<ProductData>(this.withPath(`/product/${id}`), {
        headers: {
          authorization: this.generateAuthToken(),
        },
      })
      .then((r) => new Product(r.data));
  }
}

export const api = new Api(import.meta.env.VITE_API_BASE_URL);
