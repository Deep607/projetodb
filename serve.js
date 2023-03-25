//73
//importar o express
const express = require('express')
const app= express()
const uri = "mongodb+srv://dbUser:dbUser@cluster0.pybsfte.mongodb.net/?retryWrites=true&w=majority";
const {MongoClient }=require('mongodb-legacy')
const ObjectId = require('mongodb-legacy').ObjectId

//conectando no mongdb
const client = new MongoClient(uri);
const db = client.db("teste-db");
const collection = db.collection('crud');

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:true}))


//comunicação do servidor com o navegador
app.listen(3000,function(){
    console.log("servidor esta rodando na porta 3000 pivete")
    })
//renderizar o arquivo index
app.get('/', (req,res) =>{
    res.render('index.ejs')
})

app.post("/show", (req, res) => {
    collection.insertOne(req.body, (err, result)=> {
     if(err) return console.log(err)
     console.log("SALVOU COM SUCESSO NO NOSSO BANCO DE DADOS")
     res.redirect("/show")
     collection.find().toArray((err, results) =>{
         console.log(results)
     })
    })
 })
 //renderizar e retornar o conteúdo do nosso banco
app.get('/', (req, res) => {
    let cursor = db.collection('crud').find()
})

//renderizar e retornar o conteúdo do nosso banco
app.get('/show', (req, res) => {
    collection.find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', {crud: results})
    })
})
app.route('/edit/:id')
.get((req, res) => {
    var id = req.params.id

    db.collection('crud').find(ObjectId(id)).toArray((err, result) => {
        if(err) return res.send(err)
        res.render('edit.ejs', {crud: result})
    })
})
.post((req, res) => {
    var id = req.params.id
    var name = req.body.name
    var surname = req.body.surname

    db.collection('crud').updateOne({_id: ObjectId(id)}, {
        $set: {
            name: name,
            surname: surname
        }
    }, (err, result) => {
        if(err) return res.send(err)
        res.redirect('/show')
        console.log('Banco de dados atualizado')


    })
})
