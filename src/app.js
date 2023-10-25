const express = require('express')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const product = require('./routes/product')
const site = require('./routes/site')
const path = require('path')

//config + setup
const app = express()
dotenv.config()

//middleware
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

//route
app.use('/api', product)
app.use(site)

//listening
const PORT = process.env.PORT || 3000
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}...`)
    })
})
