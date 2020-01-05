import Axios from 'axios'
import Router from 'next/router'

import {
  PRODUCTS_LOADING,
  PRODUCTS_LOADED,
  NEXT_PRODUCTS_LOADED,
  NEXT_PRODUCTS_ERROR,
  NEXT_PRODUCTS_LOADING,
  DELETE_PRODUCT,
} from './product.types'

import baseUrl from '../../utils/baseUrl'

export const onLoading = () => dispatch => dispatch({ type: PRODUCTS_LOADING })

export const loadProducts = ({ products, totalProducts }) => dispatch => {
  dispatch({ type: PRODUCTS_LOADED, payload: { products, totalProducts } })
}

export const getMoreProducts = (skip, limit) => async dispatch => {
  try {
    dispatch({ type: NEXT_PRODUCTS_LOADING })
    const url = `${baseUrl}/api/products`
    const payload = { params: { skip, limit } }
    const response = await Axios.get(url, payload)
    const { products } = response.data

    dispatch({ type: NEXT_PRODUCTS_LOADED, payload: products })
  } catch (err) {
    console.error(err)
    dispatch({ type: NEXT_PRODUCTS_ERROR, payload: err })
  }
}

export const deleteProduct = _id => async dispatch => {
  const url = `${baseUrl}/api/product`
  const payload = { params: { _id } }
  await Axios.delete(url, payload)
  dispatch({ type: DELETE_PRODUCT, payload: _id })

  Router.push('/')
}
