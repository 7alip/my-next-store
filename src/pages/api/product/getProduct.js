import Product from '../../../models/Product'
import connectDb from '../../../utils/connectDb'

connectDb()

export default async function(req, res) {
  try {
    const { _id } = req.query
    const product = await Product.findOne({ _id })

    res.status(200).json(product)
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal server error in getting product')
  }
}
