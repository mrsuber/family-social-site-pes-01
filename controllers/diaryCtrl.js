const { Op } = require('sequelize');
const CommanderDiary = require('../models/CommanderDiary');
const Person = require('../models/Person');

const diaryCtrl = {
  // Get all diary entries for a person
  getDiaryEntries: async (req, res) => {
    try {
      const {
        personId,
        startDate,
        endDate,
        mood,
        limit = 100,
        offset = 0
      } = req.query;

      const where = {};
      if (personId) where.personId = personId;
      if (mood) where.mood = mood;

      // Date range filter
      if (startDate || endDate) {
        where.entryDate = {};
        if (startDate) where.entryDate[Op.gte] = startDate;
        if (endDate) where.entryDate[Op.lte] = endDate;
      }

      const entries = await CommanderDiary.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['entryDate', 'DESC']]
      });

      res.status(200).json({
        success: true,
        count: entries.count,
        data: entries.rows
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Get entries for a specific person
  getPersonEntries: async (req, res) => {
    try {
      const { personId } = req.params;
      const { startDate, endDate, limit = 30 } = req.query;

      const where = { personId };

      // Date range filter
      if (startDate || endDate) {
        where.entryDate = {};
        if (startDate) where.entryDate[Op.gte] = startDate;
        if (endDate) where.entryDate[Op.lte] = endDate;
      }

      const entries = await CommanderDiary.findAll({
        where,
        limit: parseInt(limit),
        order: [['entryDate', 'DESC']]
      });

      res.status(200).json({
        success: true,
        count: entries.length,
        data: entries
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Get single diary entry
  getDiaryEntry: async (req, res) => {
    try {
      const entry = await CommanderDiary.findByPk(req.params.id);

      if (!entry) {
        return res.status(404).json({ msg: 'Diary entry not found' });
      }

      res.status(200).json({
        success: true,
        data: entry
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Create diary entry
  createDiaryEntry: async (req, res) => {
    try {
      const entry = await CommanderDiary.create(req.body);

      res.status(201).json({
        success: true,
        msg: 'Diary entry created successfully',
        data: entry
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Update diary entry
  updateDiaryEntry: async (req, res) => {
    try {
      const entry = await CommanderDiary.findByPk(req.params.id);

      if (!entry) {
        return res.status(404).json({ msg: 'Diary entry not found' });
      }

      await entry.update(req.body);

      res.status(200).json({
        success: true,
        msg: 'Diary entry updated successfully',
        data: entry
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Delete diary entry
  deleteDiaryEntry: async (req, res) => {
    try {
      const entry = await CommanderDiary.findByPk(req.params.id);

      if (!entry) {
        return res.status(404).json({ msg: 'Diary entry not found' });
      }

      await entry.destroy();

      res.status(200).json({
        success: true,
        msg: 'Diary entry deleted successfully'
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Get entry for specific date (for today's entry, etc.)
  getEntryByDate: async (req, res) => {
    try {
      const { personId, date } = req.params;

      const entry = await CommanderDiary.findOne({
        where: {
          personId,
          entryDate: date
        }
      });

      if (!entry) {
        return res.status(404).json({
          success: false,
          msg: 'No entry found for this date'
        });
      }

      res.status(200).json({
        success: true,
        data: entry
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = diaryCtrl;
