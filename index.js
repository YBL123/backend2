const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

//PATH TO ENV
dotenv.config({ path: './config/config.env' })

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(error))

//ROUTES
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const reviewRouter = require('./routes/reviewRoutes')

const app = express()

// BodyParser Middleware
app.use(express.json())

// USER ROUTES
app.use('/api', authRouter, userRouter, reviewRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running at port: ${PORT}`))

