/* eslint-disable react/jsx-boolean-value */
import { useDispatch, useSelector } from 'react-redux'
import { Divider, Segment, Button } from 'semantic-ui-react'
import StripeCheckout from 'react-stripe-checkout'

import calculateCartTotal from '../../utils/calculateCartTotal'
import { checkout } from '../../redux/cart/cart.actions'

function CartSummary() {
  const [cartAmount, setCartAmount] = React.useState(0)
  const [stripeAmout, setStripeAmount] = React.useState(0)
  const [isCartEmpty, setCartEmpty] = React.useState(false)

  const dispatch = useDispatch()
  const { cartProducts, success } = useSelector(state => state.cartReducer)

  React.useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(cartProducts)
    setCartAmount(cartTotal)
    setStripeAmount(stripeTotal)
    setCartEmpty(cartProducts.length === 0)
  }, [cartProducts])

  return (
    <>
      <Divider />
      <Segment clearing size='large'>
        <strong>Sub Total:</strong> ${cartAmount}
        <StripeCheckout
          stripeKey='pk_test_2jfB2xAIfxMPIwjF5P9M75xK'
          name='7alip'
          amount={stripeAmout}
          image={
            cartProducts.length > 0 ? cartProducts[0].product.mediaUrl : ''
          }
          currency='USD'
          shippingAddress={true}
          billingAddress={true}
          zipCode={true}
          token={paymentData => dispatch(checkout(paymentData))}
          triggerEvent='onClick'
        >
          <Button
            icon='cart'
            color='teal'
            floated='right'
            content='Checkout'
            disabled={isCartEmpty || success}
          />
        </StripeCheckout>
      </Segment>
    </>
  )
}

export default CartSummary
