import connectDb from '../../../utils/connectDb'
import getProduct from './getProduct'
import addProduct from './addProduct'
import deleteProduct from './deleteProduct'

connectDb()

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getProduct(req, res)
      break
    case 'POST':
      await addProduct(req, res)
      break
    case 'DELETE':
      await deleteProduct(req, res)
      break

    default:
      res.status(405).send(`Method ${req.method} not allowed`)
      break
  }
}
