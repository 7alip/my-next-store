import React from 'react'
import Axios from 'axios'

import ProductAttributes from '../components/Product/ProductAttributes'
import ProductSummary from '../components/Product/ProductSummary'

import baseUrl from '../utils/baseUrl'

function Products({ product }) {
  return (
    <>
      <ProductSummary {...product} />
      <ProductAttributes {...product} />
    </>
  )
}

// eslint-disable-next-line consistent-return
Products.getInitialProps = async ({ query: { id: _id } }) => {
  try {
    const url = `${baseUrl}/api/product`
    const payload = { params: { _id } }
    const response = await Axios.get(url, payload)
    const product = await response.data
    return { product }
  } catch (error) {
    console.error(error)
  }
}

export default Products
