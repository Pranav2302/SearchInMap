const express = require('express');
const router = express.Router();
const {
  getAllProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile,
  searchProfiles,
  filterProfiles
} = require('./controllers/profileController'); // Fixed path

// Profile routes - Fixed double response handling
router.get('/profiles', getAllProfiles);

router.get('/profiles/search', searchProfiles);

router.get('/profiles/filter', filterProfiles);

router.get('/profiles/:id', getProfileById);

router.post('/profiles', createProfile);

router.put('/profiles/:id', updateProfile);

router.delete('/profiles/:id', deleteProfile);

module.exports = router;