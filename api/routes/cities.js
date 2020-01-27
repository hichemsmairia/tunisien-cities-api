const express = require ('express') ;
const router = express.Router() ;
const mongoose = require ('mongoose') ;
const City = require ('../models/city.js')

// show all tunisien cities with their relative informations

router.get('/' , (req,res,next) => {
  City.find()
  .exec()
  .then(docs => {
        res.status(200).json(docs)
  })
  .catch(err => {
    console.log(err) ;
    res.status(500).json({
      error : err
    })
  })
}) ;
// add new city with relative informations

router.post('/',(req,res,next) => {
  const city = new City ({
    _id : new mongoose.Types.ObjectId() ,
    city : req.body.city ,
    admin : req.body.admin ,
    country : req.body.country ,
    population_proper : req.body.population_proper ,
    iso2 : req.body.iso2 ,
    capital : req.body.capital ,
    lat : req.body.lat ,
    lng : req.body.lng ,
    population : req.body.population

  }) ;

  city.save()
  .then(result => {
    console.log("from database",result);
    res.status(201).json({
      message : 'city created successfuly' ,
      createdCity : result
  })
  .catch(err => {
    console.log(err) ;
    res.status(500).json({error:err}) ;
  })

  })
})
//search tunisien city by name :
router.get('/:cityName' , (req,res,next) => {
  const id = req.params.cityName ;
  City.find().where({city:id})
  .exec()
  .then((data) => {
        if( data) {
          res.status(200).json(data)
          console.log(data)

    } else {
      res.status(404).json({message : "no valid city found"})
    }

  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error:err})
  })
})
// update c
router.patch('/:cityName' , (req,res,next) => {
  const id = req.params.cityName ;
  const updateOps = {} ;
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value ;
  }
    City.update({city: id} , {$set: updateOps})
    .exec()
    .then(res => {
      console.log(result) ;
      res.status(200).json(result)
    })
    .catch(err=> console.log(err))
  });



module.exports = router ;
