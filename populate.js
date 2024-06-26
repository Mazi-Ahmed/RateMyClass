const mongoose = require('mongoose')
const Class = require('./models/class')
// const classes = require('./models/classes')
const ObjectId = mongoose.Types.ObjectId
require('dotenv').config()

const mongoURI = process.env.MONGOURI



const classes = [
    {
        _id: new ObjectId(),
        imageUrl: '/public/images/ibm.jpeg',
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
        imageUrl: "https://cdn.punchng.com/wp-content/uploads/2022/11/07144955/WhatsApp-Image-2022-11-07-at-13.57.23.jpeg",
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
        imageUrl: "https://bsmedia.business-standard.com/_media/bs/img/article/2023-06/06/full/1686046036-9475.jpeg?im=FeatureCrop,size=(826,465)",
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
        imageUrl: "https://www.pngitem.com/pimgs/m/20-207776_transparent-general-assembly-logo-hd-png-download.png",
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
        imageUrl: "https://lh5.googleusercontent.com/proxy/-lg4oGImlFnnult2k4sk6ogvspnxqhI-t6YSXTpcTBFQepchyZLiYTiiz-rcee73SEqJQYVLIFX4BQd5qQ",
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
    }, 
    {
        _id: new ObjectId(),
        imageUrl:"https://lh3.googleusercontent.com/p/AF1QipPx50_gxgMCwgOtiCcOVH2Txz-IP_v5-pKRfAAN=s680-w680-h510",
        name: 'Sitan Gym Muay Thai',
        quality: 4.8,
        difficulty: 4.9,
        offered: "Sitan Gym",
        url: "https://sitangymny.com/",
        reviews: [{
            quality: 4.8,
            difficulty: 4.9,
            review: "It's a great place to learn Muay Thai, spar with people, and be a part of a community. I went for several years, and had a great time learning fight skills and having fun with great people."
        }]
    }
];

const seedDB = async () => {
    try {
        console.log(process.env.MONGOURI)
        await mongoose.connect(mongoURI)
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

// const connectDB = async () => {
//     try {
//         await mongoose.connect("mongodb://127.0.0.1:27017/classes", { useNewUrlParser: true, useUnifiedTopology: true });
//         console.log('Connected to MongoDB');
//     } catch (err) {
//         console.error('Failed to connect to MongoDB', err);
//         process.exit(1);
//     }
// };

// const populateDB = async () => {
//     try {
//         await Class.deleteMany({});

//         for (const classData of classes) {
//             const newClass = new Class({
//                 name: classData.name,
//                 quality: classData.quality,
//                 difficulty: classData.difficulty,
//                 offered: classData.offered,
//                 url: classData.url,
//                 reviews: classData.reviews  
//             });
//             await newClass.save();
//         }
//         console.log('Database populated');
//     } catch (err) {
//         console.error('Error', err);
//     } finally {
//         mongoose.connection.close();
//     }
// };

// const run = async () => {
//     await connectDB();
//     await populateDB();
// };

// run();
