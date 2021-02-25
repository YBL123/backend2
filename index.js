const express = require('express')
const connectDB = require('./config/connectDb')
const dotenv = require('dotenv')



//PATH TO ENV
dotenv.config({ path: './config/config.env' })

// Connect to MongoDB
connectDB()

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

