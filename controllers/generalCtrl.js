const { Op } = require('sequelize');
const General = require('../models/General');
const Person = require('../models/Person');
const Project = require('../models/Project');
const ErrorResponse = require('../utils/errorResponse');

const generalCtrl = {
  // Get all generals
  getAllGenerals: async (req, res) => {
    try {
      const generals = await General.findAll({
        order: [['orderNumber', 'ASC']]
      });

      res.status(200).json({
        success: true,
        count: generals.length,
        data: generals
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Get single general with detailed stats
  getGeneral: async (req, res) => {
    try {
      const general = await General.findByPk(req.params.id);

      if (!general) {
        return res.status(404).json({ msg: 'General not found' });
      }

      // Get people count for this general
      const peopleCount = await Person.count({
        where: { generalId: req.params.id }
      });

      // Get projects count
      const projectsCount = await Project.count({
        where: { generalId: req.params.id }
      });

      res.status(200).json({
        success: true,
        data: {
          ...general.toJSON(),
          stats: {
            peopleCount,
            projectsCount
          }
        }
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Create new general
  createGeneral: async (req, res) => {
    try {
      const { name, description, commanderId, objectives, status, orderNumber } = req.body;

      const general = await General.create({
        name,
        description,
        commanderId,
        objectives,
        status,
        orderNumber
      });

      res.status(201).json({
        success: true,
        msg: 'General created successfully',
        data: general
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Update general
  updateGeneral: async (req, res) => {
    try {
      const general = await General.findByPk(req.params.id);

      if (!general) {
        return res.status(404).json({ msg: 'General not found' });
      }

      await general.update(req.body);

      res.status(200).json({
        success: true,
        msg: 'General updated successfully',
        data: general
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Delete general
  deleteGeneral: async (req, res) => {
    try {
      const general = await General.findByPk(req.params.id);

      if (!general) {
        return res.status(404).json({ msg: 'General not found' });
      }

      await general.destroy();

      res.status(200).json({
        success: true,
        msg: 'General deleted successfully'
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Assign commander to general
  assignCommander: async (req, res) => {
    try {
      const { commanderId } = req.body;
      const general = await General.findByPk(req.params.id);

      if (!general) {
        return res.status(404).json({ msg: 'General not found' });
      }

      // Verify person exists
      const commander = await Person.findByPk(commanderId);
      if (!commander) {
        return res.status(404).json({ msg: 'Commander not found' });
      }

      await general.update({ commanderId });

      res.status(200).json({
        success: true,
        msg: 'Commander assigned successfully',
        data: general
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = generalCtrl;
