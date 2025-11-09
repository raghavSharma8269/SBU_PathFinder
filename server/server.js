require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const roadmapsRouter = require('./routes/roadmaps');

const app = express();
app.use(express.json()); // for parsing JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/roadmaps', roadmapsRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
