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
} = require('../controllers/profileController');

// Profile routes
router.get('/profiles', async (req, res) => {
  try {
    const profiles = await getAllProfiles(req, res);
    res.json(profiles);
  } catch (error) {
    console.error('Profiles error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/profiles/search', async (req, res) => {
  try {
    const results = await searchProfiles(req, res);
    res.json(results);
  } catch (error) {
    console.error('Search profiles error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/profiles/filter', async (req, res) => {
  try {
    const filteredProfiles = await filterProfiles(req, res);
    res.json(filteredProfiles);
  } catch (error) {
    console.error('Filter profiles error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/profiles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await getProfileById(req, res);
    res.json(profile);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/profiles', async (req, res) => {
  try {
    const newProfile = await createProfile(req, res);
    res.status(201).json(newProfile);
  } catch (error) {
    console.error('Create profile error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.put('/profiles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProfile = await updateProfile(req, res);
    res.json(updatedProfile);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.delete('/profiles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProfile(req, res);
    res.status(204).send();
  } catch (error) {
    console.error('Delete profile error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

