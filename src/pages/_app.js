import App from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import Router from 'next/router'
import { ThemeProvider } from 'styled-components'
import MorphTransition from 'nextjs-morph-page'

import withReduxStore from '../lib/with-redux-store'
import Layout from '../components/_App/Layout'

class MyApp extends App {
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
            <MorphTransition timeout={500} classNames='morph'>
              <Component {...pageProps} />
            </MorphTransition>
            <style jsx global>{`
              body {
                background-color: #efefef;
              }
              .morph.enter {
                opacity: 0;
              }
              .morph.enter.active {
                opacity: 1;
                transition: opacity 300ms;
              }
              .morph.exit {
                opacity: 1;
              }
              .morph.exit.active {
                opacity: 0;
                transition: opacity 300ms;
              }
            `}</style>
          </Layout>
        </ThemeProvider>
      </Provider>
    )
  }
}

export default withReduxStore(MyApp)
