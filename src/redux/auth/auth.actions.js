import cookie from 'js-cookie'
import Router from 'next/router'
import { LOGOUT, LOAD_USER } from './auth.types'

export const logout = () => dispatch => {
  cookie.remove('token')
  window.localStorage.setItem('logout', Date.now())
  dispatch({ type: LOGOUT })
  Router.push('/login')
}

export const loadUser = user => dispatch => {
  dispatch({ type: LOAD_USER, payload: user })
}
