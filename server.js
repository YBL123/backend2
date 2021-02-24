const express = require('express')
const mongoose = require('mongoose')
const { MONGO_URI } = require('./config')

// ROUTES
const usersRoutes = require('./routes/api/users')

const app = express()

// BodyParser Middleware
app.use(express.json())

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(error))


// USER ROUTES
app.use('/api/users', usersRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running at port: ${PORT}`))

