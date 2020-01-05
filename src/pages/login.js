import Link from 'next/link'
import cookie from 'js-cookie'
import { useState, useEffect } from 'react'

import { Message, Form, Segment, Button, Icon } from 'semantic-ui-react'

import Axios from 'axios'
import Router from 'next/router'
import baseUrl from '../utils/baseUrl'

const INITIAL_USER = { email: '', password: '' }

export default function Login() {
  const [user, setUser] = useState(INITIAL_USER)
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el))
    setDisabled(!isUser)
  }, [user])

  function handleChange(e) {
    const { name, value } = e.target
    setUser(prevForm => ({ ...prevForm, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setLoading(true)
      const url = `${baseUrl}/api/login`
      const payload = { email: user.email, password: user.password }
      const response = await Axios.post(url, payload)
      const token = response.data
      cookie.set('token', token)
      Router.push('/')
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
        <Message error header='Oops!' content={<p>{error.message}</p>} />
        <Segment>
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
            autoComplete='on'
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
            autoComplete='on'
          />
          <Button
            icon='sign in'
            type='submit'
            color='orange'
            content='Login'
            disabled={disabled}
          />
        </Segment>
      </Form>
      <Segment basic>
        <Message attached='bottom' info>
          <Icon name='help' />
          New user?{' '}
          <Link href='/login'>
            <a>Sign up here</a>
          </Link>{' '}
          instead.
        </Message>
      </Segment>
    </div>
  )
}
