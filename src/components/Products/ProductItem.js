import { Card, Button, Image, Icon } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import styled from 'styled-components'

import { addToCart } from '../../redux/cart/cart.actions'

export const ProductCard = styled(Card)`
  position: relative;

  & button {
    opacity: 0;
    position: absolute;
    right: 1rem;
    top: 1rem;
  }

  &:hover {
    & button {
      opacity: 1;
      transition: all 0.4s ease-in-out;
    }
  }
`

function ProductItem({ product: { mediaUrl, price, name, _id } }) {
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.cartReducer)

  return (
    <ProductCard fluid>
      <Link href={`/product?id=${_id}`}>
        <a>
          <Image src={mediaUrl} />
        </a>
      </Link>
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>{`€${price}`}</Card.Meta>
        <Button
          onClick={() => dispatch(addToCart(1, _id))}
          floated='right'
          circular
          color='orange'
        >
          {loading ? (
            <Icon name='refresh' loading />
          ) : (
            <Icon name='cart plus' />
          )}{' '}
          Add to Cart
        </Button>
      </Card.Content>
    </ProductCard>
  )
}

export default ProductItem
