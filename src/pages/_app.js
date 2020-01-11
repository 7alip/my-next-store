import App from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import Router from 'next/router'
import { ThemeProvider } from 'styled-components'

import withReduxStore from '../lib/with-redux-store'
import Layout from '../components/_App/Layout'
import { fetchUserAndCart, fetchProducts } from '../utils/fetchData'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    await fetchUserAndCart(ctx)
    await fetchProducts(ctx)

    return { pageProps }
  }

  componentDidMount() {
    window.addEventListener('storage', this.syncLogout)

    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles)
  }

  syncLogout = e => {
    if (e.key === 'logout') {
      Router.push('/login')
      // eslint-disable-next-line no-console
      console.log('Logged out from localstorage')
    }
  }

  render() {
    const { Component, pageProps, store } = this.props

    return (
      <Provider store={store}>
        <ThemeProvider theme={{}}>
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Provider>
    )
  }
}

export default withReduxStore(MyApp)
