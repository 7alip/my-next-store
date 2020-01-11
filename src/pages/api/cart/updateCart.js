import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import Cart from '../../../models/Cart'
import Product from '../../../models/Product'
import connectDb from '../../../utils/connectDb'

const { ObjectId } = mongoose.Types

export default async function(req, res) {
  const { quantity, productId } = req.body

  if (!('authorization' in req.headers)) {
    return res.status(401).send('No authorization token')
  }

  try {
    await connectDb('(Update Cart)')

    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET,
    )
    // Get user cart based on userId
    let cart = await Cart.findOne({ user: userId })
    // Check if product already exist in cart
    const productExists = cart.products.some(doc =>
      ObjectId(productId).equals(doc.product),
    )
    // If so, increment quantity
    if (productExists) {
      cart = await Cart.findOneAndUpdate(
        { _id: cart._id, 'products.product': productId },
        { $inc: { 'products.$.quantity': quantity } },
        { new: true },
      ).populate({
        path: 'products.product',
        model: Product,
      })
    } else {
      // If not new product
      const newProduct = { quantity, product: productId }
      cart = await Cart.findOneAndUpdate(
        { _id: cart._id },
        { $addToSet: { products: newProduct } },
        { new: true },
      ).populate({
        path: 'products.product',
        model: Product,
      })
    }

    res.status(200).json(cart.products)
  } catch (error) {
    console.error(error)
    res.status(403).send('Please login')
  }
}
