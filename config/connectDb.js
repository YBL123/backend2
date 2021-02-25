const mongoose = require('mongoose')

const connectDB = async () => {
  // Connect to MongoDB
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true
    })
    console.log(`********\n MongoDB connected ${connect.connection.host} \n********`) // shows the database cluster and host
  } catch (err) {
    console.log(err)
    process.exit(1) // process is a reserved word for node -> pass an integer that signals the operating system the exit code -> when the program will later end, Node.js will return that exit code
  }

}

module.exports = connectDB
