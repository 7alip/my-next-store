import React from 'react'
import ProductList from '../components/Products/ProductList'
import ImageCarousel from '../components/Carousel/ImageCarousel'

function Home() {
  return (
    <div style={{ position: 'relative' }}>
      <ImageCarousel />
      <ProductList />
    </div>
  )
}

export default Home
