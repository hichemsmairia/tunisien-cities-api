const express = require ('express') ;
const app = express() ;
const morgan = require ('morgan') ;
const mongoose = require('mongoose') ;
const citiesRoutes = require ('./api/routes/cities.js')
const bodyParser = require ('body-parser')
app.use(morgan('dev')) ;
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
mongoose.connect(
  'mongodb+srv://hichemsmairia:'+
   process.env.MONGO_PW+'@tunisian-cities-api-teqtx.mongodb.net/test?retryWrites=true&w=majority',
 {useMongoClient:true}
)
//main route
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*')
  res.header('Access-Control-Allow-Headers','Origin, X-Requested-With,Content-Type, Accept, Authorization')
  if(req.methode==='OPTIONS') {
    res.header('Access-Control-Allow-Methods' ,'PUT , POST , PATCH ,DELETE , GET')
    return res.status(200).json({})

  }
  next() ;
}) ;
app.use('/cities',citiesRoutes) ;

app.use((req,res,next) => {
  const error = new Error('Not Found') ;
  error.status =404 ;
  next(error) ;
})
app.use((error,req,res,next) => {
  res.status(error.status || 500) ;
  res.json({
    error : {
      message : error.message
    }
  })
}) ;

module.exports = app ;
