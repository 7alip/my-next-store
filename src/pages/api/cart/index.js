import getCart from './getCart'
import updateCart from './updateCart'
import deleteCart from './deleteCart'

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getCart(req, res)
      break
    case 'PUT':
      await updateCart(req, res)
      break
    case 'DELETE':
      await deleteCart(req, res)
      break
    default:
      res.status(405).send(`Method ${req.method} not allowed`)
      break
  }
}
