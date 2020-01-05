import React from 'react'
import cookie from 'js-cookie'
import Axios from 'axios'
import {
  Header,
  Icon,
  Table,
  TableHeaderCell,
  Checkbox,
} from 'semantic-ui-react'

import baseUrl from '../../utils/baseUrl'
import formatDate from '../../utils/formatDate'

function AccountPermissions() {
  const [users, setUsers] = React.useState([])

  React.useEffect(() => {
    async function getUsers() {
      const url = `${baseUrl}/api/users`
      const token = cookie.get('token')
      const payload = { headers: { Authorization: token } }
      const response = await Axios.get(url, payload)
      setUsers(response.data)
    }

    getUsers()
  }, [])

  return (
    <div style={{ margin: '2em 0' }}>
      <Header as='h2'>
        <Icon name='settings' />
        User Permissions
      </Header>
      <Table compact celled definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Joined</TableHeaderCell>
            <TableHeaderCell>Updated</TableHeaderCell>
            <TableHeaderCell>Role</TableHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map(user => (
            <UserPermission key={user._id} user={user} />
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

function UserPermission({ user }) {
  const [admin, setAdmin] = React.useState(user.role === 'admin')

  const isFirstRun = React.useRef(true)

  async function updatePermission() {
    const url = `${baseUrl}/api/account`
    const payload = { _id: user._id, role: admin ? 'admin' : 'user' }
    const token = cookie.get('token')
    const headers = { headers: { Authorization: token } }
    await Axios.put(url, payload, headers)
  }

  React.useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }
    updatePermission()
  }, [admin])

  function handleChangePermission() {
    setAdmin(prevAdmin => !prevAdmin)
  }

  return (
    <Table.Row>
      <Table.Cell collapsing>
        <Checkbox checked={admin} onChange={handleChangePermission} toggle />
      </Table.Cell>
      <TableHeaderCell>{user.name}</TableHeaderCell>
      <TableHeaderCell>{user.email}</TableHeaderCell>
      <TableHeaderCell>{formatDate(user.createdAt)}</TableHeaderCell>
      <TableHeaderCell>{formatDate(user.updatedAt)}</TableHeaderCell>
      <TableHeaderCell>{admin ? 'admin' : 'user'}</TableHeaderCell>
    </Table.Row>
  )
}

export default AccountPermissions
