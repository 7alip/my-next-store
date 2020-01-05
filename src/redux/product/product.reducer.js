import {
  PRODUCTS_LOADING,
  PRODUCTS_LOADED,
  PRODUCTS_ERROR,
  NEXT_PRODUCTS_LOADED,
  NEXT_PRODUCTS_LOADING,
  NEXT_PRODUCTS_ERROR,
  DELETE_PRODUCT,
} from './product.types'

const initialState = {
  products: [],
  totalProducts: 0,
  loading: false,
  nextLoading: false,
  error: {},
  nextError: {},
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case PRODUCTS_LOADED:
      return {
        ...state,
        products: payload.products,
        totalProducts: payload.totalProducts,
        loading: false,
      }
    case NEXT_PRODUCTS_LOADED:
      return {
        ...state,
        products: [...state.products, ...payload],
        nextLoading: false,
      }
    case PRODUCTS_LOADING:
      return { ...state, loading: true }
    case NEXT_PRODUCTS_LOADING:
      return { ...state, nextLoading: true }
    case NEXT_PRODUCTS_ERROR:
      return { ...state, nextError: payload }
    case PRODUCTS_ERROR:
      return { ...state, error: payload, loading: false }
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(p => p._id !== payload),
      }
    default:
      return state
  }
}
