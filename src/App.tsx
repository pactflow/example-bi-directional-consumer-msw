import { useState, useEffect, type ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import 'spectre.css/dist/spectre.min.css'
import 'spectre.css/dist/spectre-icons.min.css'
import 'spectre.css/dist/spectre-exp.min.css'
import Heading from "./Heading"
import Layout from "./Layout"
import API from "./api"
import type { Product } from './product'

interface ProductTableRowProps {
  product: Product
}

function ProductTableRow({ product }: ProductTableRowProps) {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.type}</td>
      <td>
        <Link
          className="btn btn-link"
          to={`/products/${product.id}`}
          state={{ product }}
        >
          See more!
        </Link>
      </td>
    </tr>
  )
}

interface ProductTableProps {
  products: Product[]
}

function ProductTable({ products }: ProductTableProps) {
  const rows = products.map((p) => (
    <ProductTableRow key={p.id} product={p} />
  ))

  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th />
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function App() {
  const [loading, setLoading] = useState(true)
  const [searchText, setSearchText] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([])

  useEffect(() => {
    API.getAllProducts()
      .then((r) => {
        setProducts(r)
        setLoading(false)
      })
      .catch((e) => {
        throw new Error(e.toString())
      })
  }, [])

  useEffect(() => {
    const findProducts = (search: string) => {
      const lowerSearch = search.toLowerCase()
      return products.filter(
        (p) =>
          p.id.toLowerCase().includes(lowerSearch) ||
          p.name.toLowerCase().includes(lowerSearch) ||
          p.type.toLowerCase().includes(lowerSearch)
      )
    }

    setVisibleProducts(searchText ? findProducts(searchText) : products)
  }, [searchText, products])

  const onSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  return (
    <Layout>
      <Heading text="Products" href="/" />
      <div className="form-group col-2">
        <label className="form-label" htmlFor="input-product-search">
          Search
        </label>
        <input
          id="input-product-search"
          className="form-input"
          type="text"
          value={searchText}
          onChange={onSearchTextChange}
        />
      </div>
      {loading ? (
        <div className="loading loading-lg centered" />
      ) : (
        <ProductTable products={visibleProducts} />
      )}
    </Layout>
  )
}

export default App
