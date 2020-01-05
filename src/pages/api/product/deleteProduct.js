import Product from '../../../models/Product'
import Cart from '../../../models/Cart'

import connectDb from '../../../utils/connectDb'

connectDb()

export default async function(req, res) {
  const { _id } = req.query
  try {
    // 1) Delete product by id
    await Product.findOneAndDelete({ _id })
    // 2) Remove product from all carts, referenced as 'product'
    await Cart.updateMany(
      { 'products.product': _id },
      { $pull: { products: { product: _id } } },
    )
    res.status(204).json({})
  } catch (error) {
    console.error(error)
    res.status(500).send('Error deleting product')
  }
}
