import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import isEmail from 'validator/lib/isEmail'
import isLength from 'validator/lib/isLength'

import connectDb from '../../../utils/connectDb'
import User from '../../../models/User'

export default async (req, res) => {
  const { email, password } = req.body

  try {
    await connectDb('(Login)')

    // 1 Validate name, email, password
    if (!isLength(password, { min: 6 })) {
      return res.status(422).send('Password must be at least 6 characters long')
    }

    if (!isEmail(email)) {
      return res.status(422).send('Email must be valid')
    }

    // 1) Check to see if a user exist with the provided email
    const user = await User.findOne({ email }).select('+password')

    // 2 --if not, return error
    if (!user) {
      return res.status(404).send(`No user exist with email ${email}`)
    }

    // 3 Check to see if user's password matches the one in db
    const passwordMatch = await bcrypt.compare(password, user.password)
    // 4 --if so, generate a token
    if (passwordMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      })
      // 5 Send that token to the clint
      return res.status(200).json(token)
    }

    return res.status(401).send('Password do not match')
  } catch (error) {
    console.error(error)
    res.status(500).send('Error logging in user')
  }
}
