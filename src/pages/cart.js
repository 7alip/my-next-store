import { useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import CartItemList from '../components/Cart/CartItemList'
import CartSummary from '../components/Cart/CartSummary'

export default function Cart() {
  const { loading } = useSelector(state => state.cartReducer)
  return (
    <Segment loading={loading}>
      <CartItemList />
      <CartSummary />
    </Segment>
  )
}
