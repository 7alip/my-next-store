import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import productReducer from './product/product.reducer'
import authReducer from './auth/auth.reducer'
import cartReducer from './cart/cart.reducer'

const rootReducer = combineReducers({
  productReducer,
  authReducer,
  cartReducer,
})

export function initializeStore(initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  )
}
