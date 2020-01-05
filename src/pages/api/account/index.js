import getAccount from './getAccount'
import updateAccount from './updateAccount'

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getAccount(req, res)
      break
    case 'PUT':
      await updateAccount(req, res)
      break
    default:
      res.status(405).send(`Method ${req.method} not allowed`)
      break
  }
}
