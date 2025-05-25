const Profile = require('../models/Profile');

// Get all profiles
exports.getAllProfiles = async (req, res, next) => {
  try {
    const { search, city, country } = req.query;
    let query = {};
   
    // Apply search if provided
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
   
    // Apply filters if provided
    if (city) {
      query['location.city'] = city;
    }
   
    if (country) {
      query['location.country'] = country;
    }
   
    const profiles = await Profile.find(query);
    res.json(profiles);
  } catch (error) {
    console.error('Get all profiles error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get profile by ID
exports.getProfileById = async (req, res, next) => {
  try {
    const profile = await Profile.findById(req.params.id);
   
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
   
    res.json(profile);
  } catch (error) {
    console.error('Get profile by ID error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Create new profile
exports.createProfile = async (req, res, next) => {
  try {
    const newProfile = new Profile(req.body);
    const savedProfile = await newProfile.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    console.error('Create profile error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update profile
exports.updateProfile = async (req, res, next) => {
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
   
    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
   
    res.json(updatedProfile);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Delete profile
exports.deleteProfile = async (req, res, next) => {
  try {
    const deletedProfile = await Profile.findByIdAndDelete(req.params.id);
   
    if (!deletedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
   
    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error('Delete profile error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Search profiles
exports.searchProfiles = async (req, res, next) => {
  try {
    const { query } = req.query;
   
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }
   
    const profiles = await Profile.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { 'location.city': { $regex: query, $options: 'i' } },
        { 'location.country': { $regex: query, $options: 'i' } }
      ]
    });
   
    res.json(profiles);
  } catch (error) {
    console.error('Search profiles error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Filter profiles
exports.filterProfiles = async (req, res, next) => {
  try {
    const filters = req.query;
    let query = {};
   
    // Dynamically build query based on provided filters
    Object.entries(filters).forEach(([key, value]) => {
      if (key.startsWith('location.')) {
        query[key] = { $regex: value, $options: 'i' };
      } else if (key === 'interests') {
        query[key] = { $in: [value] };
      } else {
        query[key] = { $regex: value, $options: 'i' };
      }
    });
   
    const profiles = await Profile.find(query);
    res.json(profiles);
  } catch (error) {
    console.error('Filter profiles error:', error);
    res.status(500).json({ error: error.message });
  }
};