import { parseCookies } from 'nookies'
import Axios from 'axios'
import { useSelector } from 'react-redux'

import AccountHeader from '../components/Account/AccountHeader'
import AccountOrders from '../components/Account/AccountOrders'
import AccountPermissions from '../components/Account/AccountPermissions'
import baseUrl from '../utils/baseUrl'

function Account({ orders }) {
  const { user } = useSelector(state => state.authReducer)

  return (
    <>
      <AccountHeader {...user} />
      <AccountOrders orders={orders} />
      {user.role === 'root' && <AccountPermissions currentUserId={user._id} />}
    </>
  )
}

Account.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx)
  if (!token) {
    return { orders: [] }
  }

  const payload = { headers: { Authorization: token } }
  const url = `${baseUrl}/api/orders`
  const response = await Axios.get(url, payload)
  const { orders } = response.data
  return { orders }
}

export default Account
