import mongoose from 'mongoose'

const connection = {}

async function connectDb(reason = '') {
  try {
    if (connection.isConnected) {
      return console.log('Using existing connection', reason)
    }

    const db = await mongoose.connect(process.env.MONGO_SRV, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('DB Connected', reason)

    connection.isConnected = db.connections[0].readyState
  } catch (error) {
    console.error(error)
  }
}

export default connectDb
