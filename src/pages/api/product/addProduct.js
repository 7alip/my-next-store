import Product from '../../../models/Product'
import connectDb from '../../../utils/connectDb'

connectDb()

// eslint-disable-next-line consistent-return
export default async function(req, res) {
  try {
    const { name, price, description, mediaUrl } = req.body

    if (!name || !price || !description || !mediaUrl) {
      return res.status(422).send('Product missing one or more fields')
    }

    const product = await new Product({
      name,
      price,
      description,
      mediaUrl,
    }).save()

    res.status(201).json(product)
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal server error in creating product')
  }
}
