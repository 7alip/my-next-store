import React from 'react'

import ProductList from '../components/Products/ProductList'
import ImageCarousel from '../components/Carousel/ImageCarousel'
import { getUserIfLoggedIn, fetchAndStoreProducts } from '../utils/fetchData'

function Home() {
  return (
    <>
      <ImageCarousel />
      <ProductList />
    </>
  )
}

Home.getInitialProps = async ctx => {
  const user = await getUserIfLoggedIn(ctx)
  const products = await fetchAndStoreProducts(ctx)

  return { user, products }
}

export default Home
