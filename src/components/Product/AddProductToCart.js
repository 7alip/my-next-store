import { Input } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import Axios from 'axios'
import cookie from 'js-cookie'
import { useDispatch } from 'react-redux'

import baseUrl from '../../utils/baseUrl'
import catchErrors from '../../utils/catchErrors'
import { loadCart } from '../../redux/cart/cart.actions'

function AddProductToCart({ user, productId }) {
  const [quantity, setQuantity] = React.useState(1)
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const router = useRouter()

  const dispatch = useDispatch()

  React.useEffect(() => {
    let timeout
    if (success) {
      timeout = setTimeout(() => setSuccess(false), 3000)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [success])

  async function handleAddProductToCart() {
    try {
      setLoading(true)
      const url = `${baseUrl}/api/cart`
      const payload = { quantity, productId }
      const token = cookie.get('token')
      const headers = { headers: { Authorization: token } }
      const response = await Axios.put(url, payload, headers)
      dispatch(loadCart(response.data))
      setSuccess(true)
    } catch (error) {
      catchErrors(error, window.alert)

      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Input
      type='number'
      min='1'
      value={quantity}
      onChange={e => setQuantity(Number(e.target.value))}
      placeholder='Quantity'
      action={
        // eslint-disable-next-line no-nested-ternary
        user && success
          ? {
              color: 'blue',
              content: 'Item Added',
              icon: 'plus cart',
              disabled: true,
            }
          : user
          ? {
              color: 'orange',
              content: 'Add to Cart',
              icon: 'plus cart',
              loading,
              disabled: loading,
              onClick: handleAddProductToCart,
            }
          : {
              color: 'blue',
              content: 'Signup to Purchase',
              icon: 'signup',
              onClick: () => router.push('/signup'),
            }
      }
    />
  )
}

export default AddProductToCart
