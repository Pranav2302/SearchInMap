const mongoose = require('mongoose');
const Profile = require('./models/Profile');
require('dotenv').config(); // Load environment variables

// Sample data
const sampleProfiles = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1-555-0123",
    description: "Software developer with 5 years of experience in web development.",
    location: {
      street: "123 Main St",
      city: "New York",
      country: "USA"
    },
    interests: ["Programming", "Photography", "Travel"]
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1-555-0124",
    description: "UX Designer passionate about creating user-friendly interfaces.",
    location: {
      street: "456 Oak Ave",
      city: "San Francisco",
      country: "USA"
    },
    interests: ["Design", "Art", "Music"]
  },
  {
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+1-555-0125",
    description: "Marketing specialist with expertise in digital campaigns.",
    location: {
      street: "789 Pine Rd",
      city: "Chicago",
      country: "USA"
    },
    interests: ["Marketing", "Sports", "Reading"]
  },
  {
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "+44-20-7946-0958",
    description: "Data scientist working on machine learning projects.",
    location: {
      street: "10 Downing St",
      city: "London",
      country: "UK"
    },
    interests: ["Data Science", "Machine Learning", "Hiking"]
  },
  {
    name: "Alex Chen",
    email: "alex.chen@example.com",
    phone: "+86-138-0013-8000",
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
    // Connect to MongoDB Atlas
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://pranavkamble0203:Pranav2302@cluster0.tlyzglu.mongodb.net/profile-mapping', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

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