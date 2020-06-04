const express = require('express')
// const mongoose = require('mongoose')

const app = express()

// const items = require('./routers/api/items')

// Bodyparser middleware
app.use(express.json())

// Db config
// const db = require('./config/keys').mongoURI

// connect to Monggo
// mongoose.connect(db)
    // .then(() => console.log('database connected'))
    // .catch(err => { console.log(err) })

const port = 5000

app.listen(port, () => console.log(`server start on port ${port}`))

// use route
// app.use('/api/items', items)