import { Card, Button, Image } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
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

  return (
    <ProductCard fluid>
      <Link href={`/product?id=${_id}`}>
        <a>
          <Image src={mediaUrl} />
        </a>
      </Link>
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>{`${price}`}</Card.Meta>
        <Button
          onClick={() => dispatch(addToCart(1, _id))}
          icon='plus'
          floated='right'
          content='Add to cart'
          circular
          color='orange'
        />
      </Card.Content>
    </ProductCard>
  )
}

export default ProductItem
