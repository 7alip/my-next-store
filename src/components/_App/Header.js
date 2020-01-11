import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Menu,
  Image,
  Dropdown,
  Button,
  Icon,
  Message,
} from 'semantic-ui-react'
import styled from 'styled-components'

import { removeCart } from '../../redux/cart/cart.actions'
import { logout } from '../../redux/auth/auth.actions'

export default function Header() {
  const { cartProducts } = useSelector(state => state.cartReducer)
  const { user } = useSelector(state => state.authReducer)
  const totalProducts = cartProducts.reduce((acc, p) => acc + p.quantity, 0)

  const router = useRouter()

  const isRoot = user && user.role === 'root'
  const isAdmin = user && user.role === 'admin'
  const isRootOrAdmin = isRoot || isAdmin

  const dispatch = useDispatch()

  const isActive = route => route === router.pathname

  const HeaderMenu = styled(Menu.Menu)`
    @media only screen and (max-width: 768px) {
      flex-direction: column;
    }
  `

  const AuthorizedLinks = (
    <>
      <Link href='/cart'>
        <Menu.Item icon='cart' content='Cart' active={isActive('/cart')} />
      </Link>
      {isRootOrAdmin && (
        <Link href='/create'>
          <Menu.Item
            icon='add square'
            content='Create'
            active={isActive('/create')}
          />
        </Link>
      )}
      <Link href='/account'>
        <Menu.Item
          icon='user'
          content='Account'
          active={isActive('/account')}
        />
      </Link>
      <Menu.Item
        icon='sign out'
        content='Logout'
        onClick={() => dispatch(logout())}
      />
      <Menu.Item>
        <Dropdown
          style={{ width: '100%' }}
          icon='shopping cart'
          text={`${totalProducts} (${cartProducts.length})`}
          labeled
          floating
          pointing='top right'
        >
          <Dropdown.Menu>
            {cartProducts.length > 0 ? (
              <>
                {cartProducts.map(p => (
                  <Dropdown.Item
                    key={p.product._id}
                    text={`(${p.quantity}) ${p.product.name}`}
                    image={{ avatar: true, src: p.product.mediaUrl }}
                    description={
                      <Icon
                        name='remove'
                        color='red'
                        onClick={() => dispatch(removeCart(p.product._id))}
                      />
                    }
                  />
                ))}
                <Dropdown.Divider />
                <div style={{ padding: '2px 5px' }}>
                  <Link href='/cart'>
                    <Button
                      primary
                      inverted
                      fluid
                      icon='shopping cart'
                      content='Go to cart'
                    />
                  </Link>
                </div>
              </>
            ) : (
              <Message
                color='teal'
                content='There is no product in your  cart'
              />
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </>
  )

  const PublicLinks = (
    <>
      <Link href='/login'>
        <Menu.Item icon='sign in' content='Login' active={isActive('/login')} />
      </Link>{' '}
      <Link href='/signup'>
        <Menu.Item
          icon='signup'
          content='Signup'
          active={isActive('/signup')}
        />
      </Link>
    </>
  )

  return (
    <Menu
      borderless
      stackable
      style={{ position: 'sticky', top: '0', zIndex: '1000' }}
    >
      <Container>
        <Link href='/'>
          <Menu.Item active={isActive('/')}>
            <Image height='20' style={{ marginRight: '1em' }} src='logo.svg' />{' '}
            Next Shop
          </Menu.Item>
        </Link>
        <HeaderMenu position='right'>
          {user._id ? AuthorizedLinks : PublicLinks}
        </HeaderMenu>
      </Container>
    </Menu>
  )
}
