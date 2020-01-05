import Head from 'next/head'
import { Container, Segment } from 'semantic-ui-react'

import Header from './Header'
import HeadContent from './HeadContent'

function Layout({ children }) {
  return (
    <>
      <Head>
        <HeadContent />
        {/* Stylesheets */}
        <link rel='stylesheet' type='text/css' href='nprogress.css' />
        <link
          href='https://fonts.googleapis.com/css?family=Titillium+Web:400,400i,700&display=swap'
          rel='stylesheet'
        />
        <link
          rel='stylesheet'
          href='//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css'
        />
        <title>Next Shop</title>
      </Head>
      <Header />
      <Container
        style={{ paddingTop: '1rem', minHeight: 'calc(100vh - 123px)' }}
      >
        {children}
      </Container>
      <Segment textAlign='center' inverted color='black'>
        <p>React</p>
      </Segment>
    </>
  )
}

export default Layout
