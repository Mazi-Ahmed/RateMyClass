const express = require ('express')
const router = express.Router()
const { Types } = require('mongoose')
const Class = require("../models/class")

const isValidObjectId = (req, res, next) => {
    if (!Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Invalid ObjectId');
    }
    next();
}
// ROUTES

// INDEX
router.get("/", async (req, res) => {
    const allClasses = await Class.find();
    res.render('index.ejs', { allClasses });
});

// NEW 
router.get("/:id/reviews/new", (req, res) => {
    const classId = req.params.id;
    res.render("new.ejs", { classId });
});

// DELETE   
router.post('/:classId/reviews/:reviewId/delete', async (req, res) => {
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
router.post('/:classId/reviews/:reviewId', async (req, res) => {
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
router.post("/:id/reviews", async (req, res) => {
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
router.get('/:classId/reviews/:reviewId/edit', async (req, res) => {
    const { classId, reviewId } = req.params;
    const classData = await Class.findById(classId);
    const review = classData.reviews.id(reviewId);

    res.render("edit.ejs", {
        classId, reviewId, review,
    });
});

// SHOW
router.get('/:id', isValidObjectId, async (req, res) => {
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


module.exports = router