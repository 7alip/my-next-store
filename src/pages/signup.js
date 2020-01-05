import { useState, useEffect } from 'react'
import Axios from 'axios'
import Link from 'next/link'
import cookie from 'js-cookie'
import Router from 'next/router'
import { Message, Form, Segment, Button, Icon } from 'semantic-ui-react'

import catchErrors from '../utils/catchErrors'
import baseUrl from '../utils/baseUrl'

const INITIAL_USER = { name: '', email: '', password: '' }

function Signup() {
  const [user, setUser] = useState(INITIAL_USER)
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el))
    setDisabled(!isUser)
  }, [user])

  function handleChange(e) {
    const { name, value } = e.target
    setUser(prevUser => ({ ...prevUser, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setLoading(true)
      const url = `${baseUrl}/api/signup`
      const payload = { ...user }
      const response = await Axios.post(url, payload)
      cookie.set('token', response.data)
      Router.push('/')
    } catch (err) {
      catchErrors(err, setError)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Message
        attached
        icon='settings'
        header='Get Started'
        content='Create a new account'
      />

      <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
        <Message error header='Oops!' content={error} />
        <Segment>
          <Form.Input
            fluid
            value={user.name}
            icon='user'
            iconPosition='left'
            label='Name'
            placeholder='Name'
            name='name'
            type='text'
            onChange={handleChange}
          />
          <Form.Input
            fluid
            value={user.email}
            icon='envelope'
            iconPosition='left'
            label='Email'
            placeholder='Email'
            name='email'
            type='email'
            onChange={handleChange}
          />
          <Form.Input
            fluid
            value={user.password}
            icon='lock'
            iconPosition='left'
            label='Password'
            placeholder='Password'
            name='password'
            type='password'
            onChange={handleChange}
          />
          <Button
            icon='signup'
            type='submit'
            color='orange'
            content='Signup'
            disabled={disabled}
          />
        </Segment>
      </Form>
      <Segment basic>
        <Message attached='bottom' info>
          <Icon name='help' />
          New user?{' '}
          <Link href='/login'>
            <a>Login here</a>
          </Link>{' '}
          instead.
        </Message>
      </Segment>
    </>
  )
}

export default Signup
