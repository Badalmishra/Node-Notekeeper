const express = require('express')
const bodyParser = require('body-parser');
const app = express()
var methodOverride = require('method-override');
var expressLayouts = require('express-ejs-layouts');
const Subjects = require('./models/Subjects');
const Categories = require('./models/Categories');
const Notes = require('./models/Notes')
//Server Configuration
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(expressLayouts)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride('_method'));
const port = 3000
//Routes for Subjects
    app.delete('/subjects/delete',(req, res)=>{
        const id = req.body.id;
        Subjects.remove({ _id: id},(err)=>{
            err?
            res.end("Something went wrong")
            :
            res.redirect('/subjects')
        })
    })
    app.get('/subjects', (req, res) => {
    Subjects.find({},(err,data)=>{
            res.render('index',{subjects:data})
    })
    })
    app.post('/subjects/addSub',(req,res)=>{
        const newSubject = req.body.subject;
        const subject = new Subjects({ name: newSubject , categories:[]})
        subject.save().then(() => console.log('meow'))
        res.redirect('/subjects');
    })
//Routes for Categories
    app.get('/categories/:id',(req,res)=>{
        const id = req.params.id;
        let subject;
         Subjects.findById(id).exec((err,data)=>{
            subject = data;
            Categories.find({subject:id},(err,data)=>{
                if (err) {res.end(err)}
                else{
                    res.render('categories',{categories:data,subject:subject})
                }
            })
         })
    })
    app.delete('/categories/delete',(req, res)=>{
        const id = req.body.id;
        const sub_id = req.body.subject_id
        Categories.remove({ _id: id},(err)=>{
            err?
            res.end("Something went wrong")
            :
            res.redirect('/categories/'+sub_id)
        })
    })
    app.post('/categories/addCat',(req,res)=>{
        const id = req.body.id
        const newCat = req.body.category;
        const category = new Categories({ name: newCat , subject:id})
        category.save().then(() => console.log('meow'))
        res.redirect('/categories/'+id);
    })

    //Routes for Notes
    app.delete('/notes/delete',(req, res)=>{
        const id = req.body.id;
        const category_id = req.body.category_id
        Notes.remove({ _id: id},(err)=>{
            err?
            res.end("Something went wrong")
            :
            res.redirect('/categories/'+category_id)
        })
    })
    app.get('/notes/:id/',(req,res)=>{
        const id = req.params.id;
        let category;
         Categories.findById(id).exec((err,data)=>{
            category = data;
            const sub_id = category.subject
            Notes.find({category:id},(err,data)=>{
                if (err) {res.end(err)}
                else{
                    res.render('notes',{Notes:data,category:category,sub_id:sub_id})
                }
            })
         })
    })
    app.get('/notes/addNotesPage/:id',(req,res)=>{
        res.render('addNotes',{category:req.params.id})
    })
    app.post('/notes',(req,res)=>{
        const cat_id = req.body.id
        const noteName = req.body.name;
        const noteBody = req.body.body;
        const newNote = new Notes({ name: noteName , body:noteBody, category:cat_id})
        newNote.save().then(() => console.log('meow'))
        res.redirect('/notes/'+cat_id);
    })
    app.get('/notes/:id/:cat_id',(req,res)=>{
        const id = req.params.id;
        const cat_id = req.params.cat_id;
        let category;
         Categories.findById(cat_id).exec((err,data)=>{
            category = data;
            Notes.findById(id).exec((err,data)=>{
                res.render('singleNote',{note:data,category:category})
            })
         })
    })
app.listen(port, () => console.log(`NoteKeeper app listening on port ${port}!`))