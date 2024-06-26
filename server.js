// DEPENDENCIES
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const { Types } = require('mongoose')

const Class = require('./models/class');

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/classes")
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
};

connectDB();

// MIDDLEWARE
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const isValidObjectId = (req, res, next) => {
    if (!Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Invalid ObjectId');
    }
    next();
}
// ROUTES

// INDEX
app.get("/classes/", async (req, res) => {
    const allClasses = await Class.find();
    res.render('index.ejs', { allClasses });
});

// NEW 
app.get("/classes/:id/reviews/new", (req, res) => {
    const classId = req.params.id;
    res.render("new.ejs", { classId });
});

// DELETE   
app.post('/classes/:classId/reviews/:reviewId/delete', async (req, res) => {
    const { classId, reviewId } = req.params
    try {
        const classData = await Class.findById(classId);

        if (!classData) {
            return res.status(404).send('Class not found');
        }

        const index = classData.reviews.findIndex(review => review._id.equals(reviewId));

        if (index === -1) {
            return res.status(404).send('Review not found');
        }

        classData.reviews.splice(index, 1);

        await classData.save();

        res.redirect(`/classes/${classId}`);
    } catch (err) {
        console.error(err)
    }
})

// UPDATE
app.post('/classes/:classId/reviews/:reviewId', async (req, res) => {
    const { classId, reviewId } = req.params;
    const classData = await Class.findById(classId);
    const review = classData.reviews.id(reviewId);
    review.quality = req.body.quality;
    review.difficulty = req.body.difficulty;
    review.review = req.body.review;

    await classData.save();
    res.redirect(`/classes/${classId}`);
});

// CREATE
app.post("/classes/:id/reviews", async (req, res) => {
    const classId = req.params.id;
    const newReview = {
        quality: req.body.quality,
        difficulty: req.body.difficulty,
        review: req.body.review
    };

    try {
        const classData = await Class.findById(classId);

        if (!classData) {
            return res.status(404).send('Class not found');
        }

        classData.reviews.push(newReview);
        await classData.save();

        res.redirect(`/classes/${classId}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// EDIT
app.get('/classes/:classId/reviews/:reviewId/edit', async (req, res) => {
    const { classId, reviewId } = req.params;
    const classData = await Class.findById(classId);
    const review = classData.reviews.id(reviewId);

    res.render("edit.ejs", {
        classId, reviewId, review,
    });
});

// SHOW
app.get('/classes/:id', isValidObjectId, async (req, res) => {
    const classId = req.params.id;

    try {
        const classData = await Class.findById(classId);

        if (!classData) {
            return res.status(404).send('Class not found');
        }

        res.render("show.ejs", {
            classData,
            classId
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// PORT
app.listen(port, () => {
    console.log(`Listening on `, port);
});
