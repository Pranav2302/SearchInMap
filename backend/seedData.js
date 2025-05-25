const mongoose = require('mongoose');
const Profile = require('./models/Profile');
require('dotenv').config(); // Load environment variables

// Sample data
const sampleProfiles = [
  {
    name: "Pavan Kha",
    email: "Pavan@example.com",
    phone: "1234567898",
    description: "Software developer with 5 years of experience in web development.",
    location: {
      street: "123 Main St",
      city: "New York",
      country: "USA"
    },
    interests: ["Programming", "Photography", "Travel"]
  },
  {
    name: "Sumit de",
    email: "sumitde@example.com",
    phone: "1234567898",
    description: "UX Designer passionate about creating user-friendly interfaces.",
    location: {
      street: "456 Oak Ave",
      city: "San Francisco",
      country: "USA"
    },
    interests: ["Design", "Art", "Music"]
  },
  {
    name: "avdhoot sawant",
    email: "sawantavdhoot@example.com",
    phone: "1234567898",
    description: "Marketing specialist with expertise in digital campaigns.",
    location: {
      street: "789 Pine Rd",
      city: "Chicago",
      country: "USA"
    },
    interests: ["Marketing", "Sports", "Reading"]
  },
  {
    name: "pranav kamble",
    email: "pranavkamble@example.com",
    phone: "12345678988",
    description: "Data scientist working on machine learning projects.",
    location: {
      street: "10 Downing St",
      city: "London",
      country: "UK"
    },
    interests: ["Data Science", "Machine Learning", "Hiking"]
  },
  {
    name: "dobbyman",
    email: "meaw@example.com",
    phone: "1234567898",
    description: "Full-stack developer specializing in React and Node.js.",
    location: {
      street: "88 Beijing Rd",
      city: "Shanghai",
      country: "China"
    },
    interests: ["Technology", "Gaming", "Cooking"]
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB Atlas - removed deprecated options
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://pranavkamble0203:Pranav2302@cluster0.tlyzglu.mongodb.net/profile-mapping');

    console.log('Connected to MongoDB');

    // Clear existing data
    await Profile.deleteMany({});
    console.log('Cleared existing profiles');

    // Insert sample data
    const insertedProfiles = await Profile.insertMany(sampleProfiles);
    console.log(`Inserted ${insertedProfiles.length} sample profiles`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();