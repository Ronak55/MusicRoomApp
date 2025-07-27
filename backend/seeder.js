// seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./models/Course');
const courses = require('./data/courses');

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('🌱 MongoDB Connected. Seeding courses...');
    await Course.deleteMany(); // Clear existing data
    await Course.insertMany(courses); // Seed new data
    console.log('✅ Courses Seeded!');
    process.exit(); // Exit script
  })
  .catch((err) => {
    console.error('❌ Seeding Failed:', err);
    process.exit(1);
  });
