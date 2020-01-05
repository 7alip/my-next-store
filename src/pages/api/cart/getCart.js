import jwt from 'jsonwebtoken'
import Cart from '../../../models/Cart'
import Product from '../../../models/Product'
import connectDb from '../../../utils/connectDb'

connectDb()

// eslint-disable-next-line consistent-return
export default async function(req, res) {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('No authorization token')
  }

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET,
    )

    const cart = await Cart.findOne({ user: userId }).populate({
      path: 'products.product',
      model: Product,
    })

    res.status(200).json(cart)
  } catch (error) {
    console.error(error)
    res.status(403).send('Please login')
  }
}
