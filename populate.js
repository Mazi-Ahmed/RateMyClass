const mongoose = require('mongoose');
const Class = require('./models/class');
const classes = require('./models/classes');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/classes", { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
};

const populateDB = async () => {
    try {
        await Class.deleteMany({});

        for (const classData of classes) {
            const newClass = new Class({
                name: classData.name,
                quality: classData.quality,
                difficulty: classData.difficulty,
                offered: classData.offered,
                url: classData.url,
                reviews: classData.reviews  
            });
            await newClass.save();
        }
        console.log('Database populated');
    } catch (err) {
        console.error('Error', err);
    } finally {
        mongoose.connection.close();
    }
};

const run = async () => {
    await connectDB();
    await populateDB();
};

run();
