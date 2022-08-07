console.log('hello');
require('dotenv').config()
const Person = require('./personModel')

const express = require('express')
const mongoose = require('mongoose');

const port = 5000 
const app = express()
const urlDb = process.env.MONGO_URI


//function add one person
const addOnePerson=()=>{
const person = new Person({name:'lamjed', age:29,favoriteFoods:["1","2","3"]})
person.save((err,data)=>{ 
    if (err){
        console.log(err)
    }
    else console.log(data)
})

}
//function add many person

const addManyPerson =()=>{
    const persons = 
    [
        {name :"slah",age:31,favoriteFoods:["burritos","8","9","10"]},
    {name :"kais",age:26,favoriteFoods:["1","burritos","9","10"]},
    {name :"josef",age:58,favoriteFoods:["1","8","9","burritos"]}
]
Person.create(persons).then((data) => {
    console.log(data);
}).catch((err)=>{console.log(err)})

}
//function get all person bay name
 
const getByName = (name) =>{
    Person.find({name:name}).then((data)=>{
        console.log(data)
    })

}
//function get one person bay favoriteFoods
const getByFavoritFoods =(food)=>{
    Person.findOne({favoriteFoods:food}).then((data)=>{
        console.log(data)
    })
}
//function get one person bay Id
const getbyId = (personId)=>{
    Person.findById({_id : personId}).then((data)=>{
        
    })
}
// fnction update the favoritFoods OF one person
const updateFavoritFoodsById=(personId,food)=>{
    Person.findById({_id:personId}).then((data)=>
    {
      const person = data  
     
      person.favoriteFoods.push(food)

    person.save().then((data)=>{
        console.log('ok',data)
        
    }).catch((err)=>{console.log(err)})
    })

}
//function update age by name and set age equal to 20
const updateAgeByName =(name)=>{
    Person.findOneAndUpdate({name:name},{$set:{age:20}},{new:true}).then((data)=>{
        console.log(data)

    })

}
//function delet person by id 
const deleteById = (personId )=>{
  Person.findByIdAndRemove(personId)
  .then(console.log)
  .catch((err)=>{
    console.log(err)
  })

}
//***remove(deletOne)  and findbyidandremove => .exec() instead .then().catch()   */



// function delete all documents by name

const deleteAllDocumentByName=()=>{
    Person.remove({name:'Mery'}).then(console.log)
    .catch((err)=>{
      console.log(err)
    })
  
}
// function Chain : .find(), .sort(), .limit(), .select(),
const ChainSearchQuery=(food)=>{
    Person.find({favoriteFoods:food})
    .sort({name:1}).limit(2).select({age:false}).exec((err,data)=>console.log(data))
}


mongoose.connect(urlDb).then(()=>{console.log('connect au db')

addOnePerson()
addManyPerson()
getByName('enter a name')
getByFavoritFoods('enter a food')
getbyId ("62eff372a53026407c29d3c4")
updateFavoritFoodsById('62eff372a53026407c29d3c4','burritos')
updateAgeByName('enter a name')
deleteById("62eff372a53026407c29d3c4" )
deleteAllDocumentByName()
ChainSearchQuery('enter a food')



}).catch((err)=>{console.log(err)})



app.listen(port,()=>{
    console.log('server connect')
 })