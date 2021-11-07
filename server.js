require('dotenv').config({path:"./config.env"})
const express = require('express')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')
const path = require('path')
const cookieParser = require('cookie-parser')


//connectDB
connectDB();

const app = express();

app.use(express.json())
app.use(cookieParser())

//Error unhandler(should be last piece of middleware)
app.use(errorHandler)

//file upload
const cors = require('cors')
const bodyParser=require('body-parser')
app.use(cors())
app.use(bodyParser.json())
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
// end file upload
app.use('/api',require('./routes/auth'))
app.use('/api',require('./routes/private'))

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,'/client/build')))
  app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','build','index.html'))

  })
}else{
  app.get('/', (req,res)=>{
    res.send('Api running');
  })
}


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, ()=>console.log(`Server running on port http://localhost:${PORT}`))


process.on('unhandleRejection', (err,promise) =>{
  console.log(`Logged Error:${err}`)
  server.close(()=>process.exit(1))
})
