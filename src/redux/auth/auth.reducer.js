import { LOGIN_FAILED, LOGOUT, LOAD_USER, USER_LOADING } from './auth.types'

const initialState = {
  user: {},
  loading: false,
  error: false,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOADING:
      return { ...state, loading: true, error: false }
    case LOGIN_FAILED:
      return { ...state, error: payload, loading: false }
    case LOAD_USER:
      return {
        ...state,
        user: payload,
        error: false,
        loading: false,
      }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}
