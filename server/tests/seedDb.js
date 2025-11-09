require('dotenv').config();
const mongoose = require('mongoose');
const Roadmap = require('../models/Roadmap');

const roadmaps = [
  {
    title: "Backend Master",
    roadmap: { message: "This will hold the full roadmap JSON for Backend Master." },
    formData: {
            targetRole: "Backend Systems Engineer",
            currentYear: "Junior",
            targetTimeline: "Spring 2027",
            completedCourses: "CSE 114, CSE 214",
            skills: "Python, C, Git",
            timeCommitment: "10-15 hrs/week",
            additionalContext: ""
        },
  },
  {
    title: "Frontend Pro",
    roadmap: { message: "This will hold the full roadmap JSON for Frontend Pro." },
    formData: {
        targetRole: "Frontend Engineer",
        currentYear: "Junior",
        targetTimeline: "Spring 2027",
        completedCourses: "CSE 114, CSE 214",
        skills: "Python, C, Git",
        timeCommitment: "10-15 hrs/week",
        additionalContext: ""
    },
  },
  {
    title: "AI/ML Journey",
    roadmap: { message: "This will hold the full roadmap JSON for AI/ML Journey." },
    formData: {
        targetRole: "ML Engineer",
        currentYear: "Junior",
        targetTimeline: "Spring 2027",
        completedCourses: "CSE 114, CSE 214",
        skills: "Python, C, Git",
        timeCommitment: "10-15 hrs/week",
        additionalContext: ""
    },
  },
  {
    title: "Game Dev Path",
    roadmap: { message: "This will hold the full roadmap JSON for Game Dev Path." },
    formData: {
        targetRole: "Game dev Engineer",
        currentYear: "Junior",
        targetTimeline: "Spring 2027",
        completedCourses: "CSE 114, CSE 214",
        skills: "Python, C, Git",
        timeCommitment: "10-15 hrs/week",
        additionalContext: ""
    },
  },
  {
    title: "Full Stack",
    roadmap: { message: "This will hold the full roadmap JSON for Full Stack." },
    formData: {
        targetRole: "full stack Engineer",
        currentYear: "Junior",
        targetTimeline: "Spring 2027",
        completedCourses: "CSE 114, CSE 214",
        skills: "Python, C, Git",
        timeCommitment: "10-15 hrs/week",
        additionalContext: ""
    },
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
