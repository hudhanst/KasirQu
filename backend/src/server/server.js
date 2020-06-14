const express = require('express')
const mongoose = require('mongoose')

const app = express()

// Bodyparser middleware
app.use(express.json())

// Db config
const db = require('./config/keys').mongoURI

// connect to Monggo
mongoose.connect(db, {
    useNewUrlParser: true, //////  it uses to parse MongoDB connection strings
    useFindAndModify: false , ////// you can use findOneAndDelete, findOneAndUpdate & etc
    useCreateIndex: true, //////  making Mongoose use createIndex() instead. ???
    useUnifiedTopology: true, ////// introduced a significant refactor of how it handles monitoring all the servers in a replica set or sharded cluster
})
    .then(() => console.log('database connected'))
    .catch(err => { console.log(err) })

const port = 5000

app.listen(port, () => console.log(`server start on port ${port}`))

// use route
app.use('/api/auth', require('./Routers/Apis/Auth'))
app.use('/api/users', require('./Routers/Apis/User'))