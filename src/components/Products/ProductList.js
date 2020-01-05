import { useState, useEffect } from 'react'
import { Card, Button, Segment } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { Facebook } from 'react-content-loader'

import { getMoreProducts } from '../../redux/product/product.actions'
import ProductItem from './ProductItem'

function ProductList() {
  const { products, totalProducts, nextLoading } = useSelector(
    state => state.productReducer,
  )
  const shouldFetch = products.length < totalProducts
  const dispatch = useDispatch()
  const [canLoad, setCanLoad] = useState(shouldFetch)

  useEffect(() => {
    setCanLoad(products.length < totalProducts)
  }, [products])

  return (
    <div style={{ marginBottom: '5rem' }}>
      <Card.Group stackable centered itemsPerRow='3'>
        {products.length &&
          products.map(product => (
            <ProductItem key={product._id} product={product} />
          ))}
        {nextLoading && (
          <Card key={Math.random()}>
            <Facebook />
          </Card>
        )}
      </Card.Group>

      {canLoad && (
        <Segment basic textAlign='center'>
          <Button
            primary
            basic
            onClick={() =>
              dispatch(
                getMoreProducts(
                  products.length,
                  process.env.PRODUCTS_PER_FETCH,
                ),
              )
            }
          >
            Load More
          </Button>
        </Segment>
      )}
    </div>
  )
}

export default ProductList
