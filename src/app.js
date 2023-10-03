const express = require('express')
const siteController = require('./controllers/siteController')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const user = require('./routes/user')
const site = require('./routes/site')
const path = require('path')

const app = express()

//middleware
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

//config
dotenv.config()

//route
app.use('/api/user', user)
app.use(site)

//listening
const PORT = process.env.PORT || 3000
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}...`)
    })
})
