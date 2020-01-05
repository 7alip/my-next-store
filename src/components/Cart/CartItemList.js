import { Segment, Icon, Header, Button, Item, Message } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'

import { removeCart } from '../../redux/cart/cart.actions'

function CartItemList() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { cartProducts, success } = useSelector(state => state.cartReducer)
  const { user } = useSelector(state => state.authReducer)

  function mapCartProductsToItems(_cartProducts) {
    return _cartProducts.map(p => {
      return {
        childKey: p.product._id,
        header: (
          <Item.Header
            as='a'
            onClick={() => router.push(`/product?id=${p.product._id}`)}
          >
            {p.product.name}
          </Item.Header>
        ),
        image: p.product.mediaUrl,
        meta: `${p.quantity} x $${p.product.price}`,
        fluid: 'true',
        extra: (
          <Button
            basic
            icon='remove'
            floated='right'
            onClick={() => dispatch(removeCart(p.product._id))}
          />
        ),
      }
    })
  }

  if (success) {
    return (
      <Message
        success
        header='Success!'
        content='Your order and payment has been accepted'
      />
    )
  }

  if (!cartProducts.length) {
    return (
      <Segment secondary color='teal' inverted textAlign='center' placeholder>
        <Header icon>
          <Icon name='shopping basket' />
          No product in your cart. Add some!
        </Header>
        <div>
          {user ? (
            <Button color='orange' onClick={() => router.push('/')}>
              View Products
            </Button>
          ) : (
            <Button color='blue' onClick={() => router.push('/login')}>
              Login to Add Products
            </Button>
          )}
        </div>
      </Segment>
    )
  }

  return <Item.Group divided items={mapCartProductsToItems(cartProducts)} />
}

export default CartItemList
