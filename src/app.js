const express = require('express')
const siteController = require('./controllers/site')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const userRoute = require('./routes/userRoute')

const app = express()

//middleware
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json())

//config
dotenv.config()

//route
app.use('/api/user', userRoute)
app.get('/home', siteController.home)

//listening
const PORT = process.env.PORT || 3000
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}...`)
    })
})
