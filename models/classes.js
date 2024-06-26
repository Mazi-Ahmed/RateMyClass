const mongoose = require('mongoose');
const Class = require('./models/class');
const ObjectId = mongoose.Types.ObjectId;


const mongoURI = "mongodb://127.0.0.1:27017/classes";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

const classes = [
    {
        _id: new ObjectId(),
        name: 'IBM Full Stack Software Developer',
        quality: 4.6,
        difficulty: 2.0,
        offered: "IBM",
        url: "https://www.coursera.org/professional-certificates/ibm-full-stack-cloud-developer",
        reviews: [{
            quality: 5,
            difficulty: 3,
            review: "I graduated recently, and I am currently looking and applying to jobs on the software field. I don't have any work experience in my field and I needed IBM Full Stack Software Developer Professional Certificate to pump my resume up. It helped me learn and understand how things are being done in the field today with the hands-on project."
        }]
    },
    {
        _id: new ObjectId(),
        name: 'Meta Front-End Developer',
        quality: 4.7,
        difficulty: 2.0,
        offered: "Meta",
        url: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
        reviews: [{
            quality: 4.5,
            difficulty: 2,
            review: "The experience from taking certificates from Coursera was good. The Meta Front-End Developer Professional Certificate helped me tie together a lot of concepts I had been learning about and worked with in the past. It has given me confidence to start my own projects and apply for full-stack positions."
        }]
    },
    {
        _id: new ObjectId(),
        name: 'Microsoft Business Analyst Professional',
        quality: 4.6,
        difficulty: 2.0,
        offered: "Microsoft",
        url: "https://www.coursera.org/professional-certificates/microsoft-business-analyst",
        reviews: [{
            quality: 5,
            difficulty: 3,
            review: 'This is the real deal. This class helped me advance in my career as an analyst.'
        }]
    },
    {
        _id: new ObjectId(),
        name: 'Software Engineering Bootcamp',
        quality: 5.0,
        difficulty: 4.0,
        offered: "General Assembly",
        url: "https://generalassemb.ly/students/courses/software-engineering-bootcamp/new-york-city",
        reviews: [{
            quality: 5,
            difficulty: 4,
            review: "Amazing and Inspirational"
        }]
    },
    {
        _id: new ObjectId(),
        name: 'Swimming Lessons',
        quality: 5.0,
        difficulty: 3.0,
        offered: "SwimEasyNY",
        url: "https://swimeasyny.com",
        reviews: [{
            quality: 5,
            difficulty: 3,
            review: "Swim Easy is a great place for anyone to learn how to swim. Having grown up with a fear of water, I was never able to learn, yet after just a few short months of attending classes, I have been able to get over my fear and am getting better every time. Krysztof, Devon and Matteo are all awesome and make it fun. I highly recommend this swim school to anyone."
        }]
    }
];

const seedDB = async () => {
    try {
        await Class.deleteMany({});
        await Class.insertMany(classes);
        console.log("Database seeded!");
    } catch (err) {
        console.error("Error seeding database:", err);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();
