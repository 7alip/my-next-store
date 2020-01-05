import Axios from 'axios'
import cookie from 'js-cookie'
import catchErrors from '../../utils/catchErrors'

import {
  LOAD_CART,
  CART_LOADING,
  CART_LOADED,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAILURE,
  CART_ERROR,
} from './cart.types'
import baseUrl from '../../utils/baseUrl'

export const loadCart = products => dispatch => {
  dispatch({ type: LOAD_CART, payload: products })
}

export const addToCart = (quantity, productId) => async dispatch => {
  try {
    dispatch({ type: CART_LOADING })
    const url = `${baseUrl}/api/cart`
    const payload = { quantity, productId }
    const token = cookie.get('token')
    const headers = { headers: { Authorization: token } }
    const response = await Axios.put(url, payload, headers)
    dispatch({ type: LOAD_CART, payload: response.data })
  } catch (error) {
    dispatch({ type: CART_ERROR })
    catchErrors(error, window.alert)
  } finally {
    dispatch({ type: CART_LOADED })
  }
}

export const getCart = () => async dispatch => {
  const token = cookie.get('token')
  const payload = { headers: { Authorization: token } }
  const cartUrl = `${baseUrl}/api/cart`
  const response = await Axios.get(cartUrl, payload)
  dispatch({ type: LOAD_CART, payload: response.data })
}

export const removeCart = id => async dispatch => {
  const url = `${baseUrl}/api/cart`
  const token = cookie.get('token')
  const payload = {
    params: { id },
    headers: { Authorization: token },
  }

  const response = await Axios.delete(url, payload)
  dispatch({ type: LOAD_CART, payload: response.data })
}

export const checkout = paymentData => async dispatch => {
  try {
    dispatch({ type: CART_LOADING })
    const url = `${baseUrl}/api/checkout`
    const token = cookie.get('token')
    const payload = { paymentData }
    const headers = { headers: { Authorization: token } }
    await Axios.post(url, payload, headers)
    dispatch({ type: CHECKOUT_SUCCESS })
  } catch (error) {
    dispatch({ type: CHECKOUT_FAILURE })
    catchErrors(error, window.alert)
  } finally {
    dispatch({ type: CART_LOADED })
  }
}
