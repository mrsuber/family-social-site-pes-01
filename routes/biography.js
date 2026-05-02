const express = require('express');
const router = express.Router();
const BiographySection = require('../models/BiographySection');
const { Op } = require('sequelize');

// GET /api/biography/:personId
// Fetch all biography sections for a person
router.get('/:personId', async (req, res) => {
  try {
    const { personId } = req.params;

    // Fetch all sections for this person, ordered by section number
    const sections = await BiographySection.findAll({
      where: { personId },
      order: [['sectionNumber', 'ASC']]
    });

    if (!sections || sections.length === 0) {
      return res.status(404).json({ message: 'No biography found for this person' });
    }

    res.json({ sections });
  } catch (error) {
    console.error('Error fetching biography:', error);
    res.status(500).json({ error: 'Failed to fetch biography' });
  }
});

// POST /api/biography/:personId
// Create a new biography section
router.post('/:personId', async (req, res) => {
  try {
    const { personId } = req.params;
    const {
      sectionNumber,
      sectionTitle,
      content,
      startDate,
      endDate,
      keyNumbers,
      tags,
      isPrivate,
      rawDiaryExcerpt
    } = req.body;

    const section = await BiographySection.create({
      personId,
      sectionNumber,
      sectionTitle,
      content,
      startDate,
      endDate,
      keyNumbers,
      tags,
      isPrivate,
      rawDiaryExcerpt
    });

    res.status(201).json({ section });
  } catch (error) {
    console.error('Error creating biography section:', error);
    res.status(500).json({ error: 'Failed to create biography section' });
  }
});

// PUT /api/biography/section/:sectionId
// Update a biography section
router.put('/section/:sectionId', async (req, res) => {
  try {
    const { sectionId } = req.params;
    const {
      sectionTitle,
      content,
      startDate,
      endDate,
      keyNumbers,
      tags,
      isPrivate,
      rawDiaryExcerpt
    } = req.body;

    const section = await BiographySection.findByPk(sectionId);

    if (!section) {
      return res.status(404).json({ error: 'Biography section not found' });
    }

    await section.update({
      sectionTitle,
      content,
      startDate,
      endDate,
      keyNumbers,
      tags,
      isPrivate,
      rawDiaryExcerpt
    });

    res.json({ section });
  } catch (error) {
    console.error('Error updating biography section:', error);
    res.status(500).json({ error: 'Failed to update biography section' });
  }
});

// DELETE /api/biography/section/:sectionId
// Delete a biography section
router.delete('/section/:sectionId', async (req, res) => {
  try {
    const { sectionId } = req.params;

    const section = await BiographySection.findByPk(sectionId);

    if (!section) {
      return res.status(404).json({ error: 'Biography section not found' });
    }

    await section.destroy();

    res.json({ message: 'Biography section deleted successfully' });
  } catch (error) {
    console.error('Error deleting biography section:', error);
    res.status(500).json({ error: 'Failed to delete biography section' });
  }
});

module.exports = router;
