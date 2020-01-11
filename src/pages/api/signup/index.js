import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import isEmail from 'validator/lib/isEmail'
import isLength from 'validator/lib/isLength'

import connectDb from '../../../utils/connectDb'
import User from '../../../models/User'
import Cart from '../../../models/Cart'

export default async (req, res) => {
  const { name, email, password } = req.body
  try {
    await connectDb('(Register)')

    // 1 Validate name, email, password
    if (!isLength(name, { min: 3, max: 10 })) {
      return res.status(422).send('Name must be 3-10 characters long')
    }

    if (!isLength(password, { min: 6 })) {
      return res.status(422).send('Password must be at least 6 characters long')
    }

    if (!isEmail(email)) {
      return res.status(422).send('Email must be valid')
    }
    // 1) Check to see if the user already exists in the db
    const user = await User.findOne({ email })

    if (user) {
      return res.status(422).send(`User already exist with email ${email}`)
    }
    // 2) --if not, hash their password
    let hash
    if (password) {
      hash = await bcrypt.hash(password, 10)
    }
    // 3) create user
    const newUser = await new User({ name, email, password: hash }).save()

    // 4) Create cart for new user
    await new Cart({ user: newUser._id }).save()

    // 4) create token for the new user
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })
    return res.status(201).json(token)
    // 5) send back token
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .send('Error signing user up. Please try again later!')
  }
}
