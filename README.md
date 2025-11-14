# SBU PathFinder

## What It Does

An AI-powered web app that creates personalized, semester-by-semester academic plans for Stony Brook University Computer Science students.

**The Problem:** CS students don't know which courses to take, what projects to build, or how to prepare for their dream job. With 50+ courses and countless career paths, planning is overwhelming.

**The Solution:** Tell the app your career goal (Backend Engineer, ML Engineer, etc.), your current academic standing, and your constraints. The AI generates a complete roadmap showing:

- **Which SBU courses to take each semester** (with prerequisites respected)
- **Which technical projects to build** (from build-your-own-x repository)
- **Which skills to learn** outside of class
- **Critical milestones** (when to apply for internships, career fairs, portfolio deadlines)

**Key Features:**
- Personalized to your goal, timeline, and available study time
- Based on real SBU course data and prerequisites
- Includes curated coding projects that complement your coursework
- Saves multiple roadmaps so you can explore different career paths
- Editable - remove courses, add notes, regenerate semesters

**Example:** A sophomore wants to become a Backend Engineer by Summer 2026. The app generates a plan: "Take CSE 216 and CSE 220 in Fall 2025, build a Shell project to apply systems concepts, learn Docker, and apply for internships in January 2026."

**Built for SBUHacks 2025** using React and NeuralSeek AI.

---

## Setup Instructions

### Setup SBU Advisor Frontend
1. **Clone the Repository:**
```bash
  git clone https://github.com/raghavSharma8269/SBU_PathFinder.git
```
   
2. **Navigate to the Project Directory:**
```bash
  cd SBU_PathFinder
```

3. **Create .env & add the following:**
```
REACT_APP_NEURALSEEK_API_KEY=API_KEY_HERE
REACT_APP_NEURALSEEK_URL=https://stagingapi.neuralseek.com/v1/instance_name
```

3. **Install Dependencies:**
```bash
  npm install
```

4. **Start the Development Server once server is setup:**
```bash
  npm start
```

### Setup SBU Advisor Backend
1. **Navigate to the server directory:**
```bash
  cd server
```

2. **Create .env & add the following:**
```
PORT=5001
MONGO_URI=MongoDB_Connection_String_Here
```

3. **Install Dependencies:**
```bash
  npm install
```

4. **Start the Server:**
```bash
  node server.js
```