import User from '../../../models/User'
import connectDb from '../../../utils/connectDb'

connectDb()

// eslint-disable-next-line consistent-return
export default async function(req, res) {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('No authorization token')
  }

  try {
    const { _id, role } = req.body
    await User.findOneAndUpdate({ _id }, { role })
    res.status(203).send('user updated')
  } catch (error) {
    res.status(403).send('Invalid token')
  }
}
