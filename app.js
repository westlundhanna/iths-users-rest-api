const express = require('express')
const Datastore = require('nedb-promise')

const users = new Datastore({filename:'users.db', autoload:true})

const app = express()

app.use( express.json() )

app.get('/users', async(req,res) => {
    
    const result = await users.find({})
        //let responseJSON = {"results": documents}
        res.json({"result": result})
        // let responseBody = JSON.stringify(responseJSON)
        // res.set("Content-Type", "application/json")
        // res.send(responseBody)

})
app.get('/users/:id', async(req, res) => {
    const result = await users.findOne({_id: req.params.id}) //hämtar det id jag skriver in i postman och returnerar den usern
        res.json(result)
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
    const result = await users.insert(newUser) 
        res.json({"result": result})
})
app.delete('/users/:id', async(req, res) => {
    const numRemoved = await users.remove({ _id: req.params.id })        
        res.json(numRemoved)
})
app.patch('/users/:id', async(req, res) => {
    const update = await users.update({_id: req.params.id}, { $set: { "name.title": 'Mrs' }})
        res.json(update)
})
app.listen(8080, console.log("Server started"))


