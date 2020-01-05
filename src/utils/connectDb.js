import mongoose from 'mongoose'

const connection = {}

async function connectDb() {
  try {
    if (connection.isConnected) {
      console.log('Using existing connection')
      return
    }

    const db = await mongoose.connect(process.env.MONGO_SRV, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('DB Connected')

    connection.isConnected = db.connections[0].readyState
  } catch (error) {
    console.error(error)
  }
}

export default connectDb
