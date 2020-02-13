const express = require('express')
const Datastore = require('nedb')

const users = new Datastore({filename:'users.db', autoload:true})

const app = express()

app.use( express.json() )

// GET /users
app.get('/users', async(req,res) => {
    
    users.find({}, function(error, documents){
        let responseJSON = {"results": documents}
        res.json(responseJSON)
        // let responseBody = JSON.stringify(responseJSON)
        // res.set("Content-Type", "application/json")
        // res.send(responseBody)
    })

})
//GET /users/:id
app.get('/users/:id', async(req, res) => {
    users.findOne({_id: req.params.id}, function (err, doc) { //hämtar det id jag skriver in i postman och returnerar den usern
        res.json(doc)
    })
})
app.post('/users', async(req, res) => {
    let newUser = {
        name: {
            title: req.body.title,
            first: req.body.first, 
            last: req.body.last
        },
        email: req.body.email, 
        nat: req.body.nat, 
        _id: req.params._id
    }
    users.insert(newUser, function (err, newDoc) {
        res.json(newDoc)
    });
})
app.delete('/users/:id', async(req, res) => {
    users.remove({ _id: req.params.id }, {}, function (err, numRemoved) {
        res.json(numRemoved)
    });
  
})
app.listen(8080, console.log("Server started"))


