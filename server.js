// DEPENDENCIES
const express = require('express');
const app = express();
const port = 3000;
// const methodOverride = require('method-override')

// DATABASE
const classes = require("./models/classes")

// MIDDLEWARE
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use(methodOverride('_method'))

// ROUTES

    // INDEX
app.get("/classes/", (req,res)=>{
    res.render("index.ejs", {
        allClasses: classes,
    })
})

    // NEW 
app.get("/classes/:id/reviews/new", (req,res)=>{
    const classId = req.params.id
    res.render("new.ejs",  {classId})
})

    //

    // SHOW
app.get('/classes/:id', (req,res)=> {
    res.render("show.ejs", {
        classData: classes[req.params.id]
    })
})

// PORT
app.listen(port, ()=> {
    console.log(`Listening on `, port)
})