import Head from 'next/head'
import { Container, Segment } from 'semantic-ui-react'
import Router from 'next/router'
import styled, { keyframes } from 'styled-components'

import Header from './Header'
import HeadContent from './HeadContent'

const rotate = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
`

const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999999;
`

const Loading = styled.div`
  margin: auto;
  border: 5px dotted #dadada;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: ${rotate} 2s linear infinite;
`

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

function Layout({ children }) {
  const [loading, setLoading] = React.useState(false)

  Router.onRouteChangeStart = () => setLoading(true)
  Router.onRouteChangeComplete = () => setLoading(false)
  Router.onRouteChangeError = () => setLoading(false)

  return (
    <>
      <Head>
        <HeadContent />
        {/* Stylesheets */}
        <link
          rel='stylesheet'
          href='//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css'
        />
        <title>Next Shop</title>
      </Head>
      <Wrapper>
        <Header />
        <Container style={{ flex: '1 1 auto' }}>{children}</Container>
        <Segment textAlign='center' inverted color='black'>
          <p>Next Shop</p>
        </Segment>
        {loading && (
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
        )}
      </Wrapper>
    </>
  )
}

export default Layout
