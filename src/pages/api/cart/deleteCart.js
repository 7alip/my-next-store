import jwt from 'jsonwebtoken'
import Cart from '../../../models/Cart'
import Product from '../../../models/Product'
import connectDb from '../../../utils/connectDb'

export default async function(req, res) {
  const { id } = req.query

  if (!('authorization' in req.headers)) {
    return res.status(401).send('No authorization token')
  }

  try {
    await connectDb('(Delete Cart)')

    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET,
    )

    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { products: { product: id } } },
      { new: true },
    ).populate({
      path: 'products.product',
      model: Product,
    })

    res.status(200).json(cart.products)
  } catch (error) {
    console.error(error)
    res.status(403).send('Please login')
  }
}
