const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt');
const port = 9292;
const app = express()
app.use(express.json({limit: '100mb', extended: true}))
app.use(express.urlencoded({limit: '100mb', extended: true}))
app.use(cors())

require('dotenv').config()
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

app.listen(port, _ => {
    console.log(`server started on port ${port}`)
});