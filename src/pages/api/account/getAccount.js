import jwt from 'jsonwebtoken'
import User from '../../../models/User'
import connectDb from '../../../utils/connectDb'

export default async function(req, res) {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('No authorization token')
  }

  try {
    await connectDb('(Get User)')

    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET,
    )

    const user = await User.findOne({ _id: userId })

    if (user) {
      return res.status(200).json(user)
    }

    res.status(404).send('User not found')
  } catch (error) {
    res.status(403).send('Invalid token')
  }
}
