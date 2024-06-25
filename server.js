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

    // DELETE   
app.post('/classes/:classId/reviews/:reviewId/delete', (req, res) => {
    const classId = req.params.classId
    const reviewId = req.params.reviewId
    const classData = classes[classId]

    classData.reviews.splice(reviewId, 1)
    res.redirect(`/classes/${classId}`)
})

    // UPDATE
app.post('/classes/:classId/reviews/:reviewId', (req,res)=> {
    const classId = req.params.classId
    const reviewId = req.params.reviewId
    const classData = classes[classId]

    classData.reviews[reviewId] = {
        quality: req.body.quality,
        difficulty: req.body.difficulty,
        review: req.body.review
    }
    res.redirect(`/classes/${classId}`)
})

    // CREATE
app.post("/classes/:id/reviews", (req, res) => {
    const classId = req.params.id;
    const newReview = {
        quality: req.body.quality,
        difficulty: req.body.difficulty,
        review: req.body.review
    }
    if (!classes[classId]) {
        return res.status(404).send('Class not found');
    }
    if (!classes[classId].reviews) {
        classes[classId].reviews = []
    }
    classes[classId].reviews.push(newReview);
    res.redirect(`/classes/${classId}`)
});

    // EDIT
app.get('/classes/:classId/reviews/:reviewId/edit', (req, res) => {
    const classId = req.params.classId;
    const reviewId = req.params.reviewId;
    const classData = classes[classId];
    
    res.render("edit.ejs", { 
        classId, 
        reviewId, 
        review: classData.reviews[reviewId] 
    })
})

    // SHOW
app.get('/classes/:id', (req,res)=> {
    const classId = req.params.id;
    const classData = classes[classId]
    res.render("show.ejs", {
        classData, classId
})
})

// PORT
app.listen(port, ()=> {
    console.log(`Listening on `, port)
})