import Axios from 'axios'
import { parseCookies, destroyCookie } from 'nookies'

import baseUrl from './baseUrl'
import { loadUser } from '../redux/auth/auth.actions'
import { loadProducts } from '../redux/product/product.actions'
import { loadCart } from '../redux/cart/cart.actions'
import { redirectUser } from './auth'

// eslint-disable-next-line consistent-return
export async function fetchAndStoreProducts(ctx) {
  const { productReducer } = ctx.reduxStore.getState()
  let { products, totalProducts } = productReducer

  if (products.length > 0) {
    return { products }
  }

  try {
    const url = `${baseUrl}/api/products`
    const response = await Axios.get(url)
    products = response.data.products
    totalProducts = response.data.totalProducts
    ctx.reduxStore.dispatch(loadProducts({ products, totalProducts }))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('error!!!', error)
  }
}

export async function getUserIfLoggedIn(ctx) {
  const { authReducer, cartReducer } = ctx.reduxStore.getState()
  let { user } = authReducer
  let { cartProducts } = cartReducer
  const { token } = parseCookies(ctx)

  const isProtectedRoute =
    ctx.pathname === '/account' || ctx.pathname === '/create'

  if (!token) {
    if (isProtectedRoute) {
      return redirectUser(ctx, '/login')
    }

    return {}
  }

  try {
    const payload = { headers: { Authorization: token } }

    const accountUrl = `${baseUrl}/api/account`
    const accountResponse = await Axios.get(accountUrl, payload)
    user = accountResponse.data
    ctx.reduxStore.dispatch(loadUser(user))

    const cartUrl = `${baseUrl}/api/cart`
    const cartResponse = await Axios.get(cartUrl, payload)
    cartProducts = cartResponse.data
    if (cartProducts) {
      ctx.reduxStore.dispatch(loadCart(cartProducts.products))
    }

    const isNotPermitted =
      !(user.role === 'root' || user.role === 'admin') &&
      ctx.pathname === '/create'
    if (isNotPermitted) redirectUser(ctx, '/')
  } catch (error) {
    console.error('Error getting current user', error)
    // 1) Throw out invalid token
    destroyCookie(ctx, 'token')
    // 2) Redirect to login
    redirectUser(ctx, '/login')
  }

  return user
}
