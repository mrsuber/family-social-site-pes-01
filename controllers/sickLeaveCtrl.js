const { Op } = require('sequelize');
const SickLeave = require('../models/SickLeave');
const Person = require('../models/Person');
const ErrorResponse = require('../utils/errorResponse');

const sickLeaveCtrl = {
  // Get all sick leaves
  getAllSickLeaves: async (req, res) => {
    try {
      const {
        status,
        personId,
        limit = 100,
        offset = 0
      } = req.query;

      const where = {};
      if (status) where.status = status;
      if (personId) where.personId = personId;

      const sickLeaves = await SickLeave.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['startDate', 'DESC']]
      });

      res.status(200).json({
        success: true,
        count: sickLeaves.count,
        data: sickLeaves.rows
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Get single sick leave
  getSickLeave: async (req, res) => {
    try {
      const sickLeave = await SickLeave.findByPk(req.params.id);

      if (!sickLeave) {
        return res.status(404).json({ msg: 'Sick leave not found' });
      }

      // Get person details
      const person = await Person.findByPk(sickLeave.personId, {
        attributes: ['id', 'fullName', 'title', 'photoUrl', 'email']
      });

      res.status(200).json({
        success: true,
        data: {
          ...sickLeave.toJSON(),
          person
        }
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Create sick leave
  createSickLeave: async (req, res) => {
    try {
      const sickLeave = await SickLeave.create(req.body);

      res.status(201).json({
        success: true,
        msg: 'Sick leave created successfully',
        data: sickLeave
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Update sick leave
  updateSickLeave: async (req, res) => {
    try {
      const sickLeave = await SickLeave.findByPk(req.params.id);

      if (!sickLeave) {
        return res.status(404).json({ msg: 'Sick leave not found' });
      }

      await sickLeave.update(req.body);

      res.status(200).json({
        success: true,
        msg: 'Sick leave updated successfully',
        data: sickLeave
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Delete sick leave
  deleteSickLeave: async (req, res) => {
    try {
      const sickLeave = await SickLeave.findByPk(req.params.id);

      if (!sickLeave) {
        return res.status(404).json({ msg: 'Sick leave not found' });
      }

      await sickLeave.destroy();

      res.status(200).json({
        success: true,
        msg: 'Sick leave deleted successfully'
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Get active sick leaves
  getActiveSickLeaves: async (req, res) => {
    try {
      const sickLeaves = await SickLeave.findAll({
        where: {
          status: 'active'
        },
        order: [['startDate', 'DESC']]
      });

      res.status(200).json({
        success: true,
        count: sickLeaves.length,
        data: sickLeaves
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Get sick leave count
  getSickLeaveCount: async (req, res) => {
    try {
      const count = await SickLeave.count({
        where: {
          status: 'active'
        }
      });

      res.status(200).json({
        success: true,
        data: { count }
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = sickLeaveCtrl;
