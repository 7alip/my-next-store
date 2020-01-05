import {
  LOAD_CART,
  REMOVE_CART,
  CART_LOADED,
  CART_LOADING,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAILURE,
} from './cart.types'

const initialState = {
  cartProducts: [],
  loading: false,
  error: false,
  success: false,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CART_LOADING:
      return { ...state, loading: true }
    case CART_LOADED:
      return { ...state, loading: false }
    case CHECKOUT_SUCCESS:
      return { ...state, success: true, cartProducts: [] }
    case CHECKOUT_FAILURE:
      return { ...state, success: false }
    case LOAD_CART:
    case REMOVE_CART:
      return { ...state, cartProducts: payload, error: false, loading: false }
    default:
      return state
  }
}
