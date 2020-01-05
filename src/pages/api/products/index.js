import Product from '../../../models/Product'
import connectDb from '../../../utils/connectDb'

connectDb()

export default async (req, res) => {
  const { skip, limit } = req.query
  try {
    const totalProducts = await Product.collection.estimatedDocumentCount()
    const products = await Product.find()
      .skip(Number(skip) || 0)
      .limit(Number(limit) || process.env.PRODUCTS_PER_FETCH)

    res.status(200).json({ products, totalProducts })
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal server error', error)
  }
}
