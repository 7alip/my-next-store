import jwt from 'jsonwebtoken'
import User from '../../../models/User'
import connectDb from '../../../utils/connectDb'

export default async (req, res) => {
  try {
    await connectDb('(Get Users)')

    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET,
    )
    const users = await User.find({ _id: { $ne: userId } }).sort({
      name: 'asc',
    })

    res.status(200).json(users)
  } catch (error) {
    console.error(error)
    res.status(403).send('Please login')
  }
}
