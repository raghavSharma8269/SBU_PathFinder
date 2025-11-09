require('dotenv').config();
const mongoose = require('mongoose');
const Roadmap = require('../models/Roadmap');

const roadmaps = [
  {
    title: "Backend Master",
    roadmap: { message: "This will hold the full roadmap JSON for Backend Master." }
  },
  {
    title: "Frontend Pro",
    roadmap: { message: "This will hold the full roadmap JSON for Frontend Pro." }
  },
  {
    title: "AI/ML Journey",
    roadmap: { message: "This will hold the full roadmap JSON for AI/ML Journey." }
  },
  {
    title: "Game Dev Path",
    roadmap: { message: "This will hold the full roadmap JSON for Game Dev Path." }
  },
  {
    title: "Full Stack",
    roadmap: { message: "This will hold the full roadmap JSON for Full Stack." }
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected.');

    // Clear existing collection (optional)
    await Roadmap.deleteMany({});
    console.log('Existing roadmaps cleared.');

    // Insert dummy roadmaps
    await Roadmap.insertMany(roadmaps);
    console.log('Dummy roadmaps inserted successfully.');

    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

seedDatabase();
