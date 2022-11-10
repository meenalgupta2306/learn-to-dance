const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const Dance = require('./routes/api/dance')
const Auth = require('./routes/api/auth');

const app = express()

app.use(bodyParser.json())


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('database connected')
}).catch((error) => {
    console.log(error)
})

app.use('/api/dancedetails', Dance)
app.use('/api', Auth)

//HANDLE PRODUCTION 
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(__dirname+'/public/'));
    app.get(/.*/, (req,res)=> res.sendFile(__dirname+'/public/index.html'));
}

app.get('/', (req, res) => {
    req.setEncoding('hi')
})

app.listen(process.env.PORT, () => {
    console.log('app listening')
})