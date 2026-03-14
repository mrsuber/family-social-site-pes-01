const { Op } = require('sequelize');
const PhysicalAsset = require('../models/PhysicalAsset');
const Person = require('../models/Person');
const General = require('../models/General');
const ErrorResponse = require('../utils/errorResponse');

const assetCtrl = {
  // Get all assets with filters
  getAllAssets: async (req, res) => {
    try {
      const {
        assetType,
        status,
        generalId,
        assignedTo,
        search,
        limit = 100,
        offset = 0
      } = req.query;

      const where = {};

      if (assetType) where.assetType = assetType;
      if (status) where.status = status;
      if (generalId) where.generalId = generalId;
      if (assignedTo) where.assignedTo = assignedTo;

      if (search) {
        where[Op.or] = [
          { name: { [Op.iLike]: `%${search}%` } },
          { serialNumber: { [Op.iLike]: `%${search}%` } }
        ];
      }

      const assets = await PhysicalAsset.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['createdAt', 'DESC']]
      });

      res.status(200).json({
        success: true,
        count: assets.count,
        data: assets.rows
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Get single asset
  getAsset: async (req, res) => {
    try {
      const asset = await PhysicalAsset.findByPk(req.params.id);

      if (!asset) {
        return res.status(404).json({ msg: 'Asset not found' });
      }

      // Get assigned person if exists
      let assignedPerson = null;
      if (asset.assignedTo) {
        assignedPerson = await Person.findByPk(asset.assignedTo, {
          attributes: ['id', 'fullName', 'title', 'photoUrl']
        });
      }

      res.status(200).json({
        success: true,
        data: {
          ...asset.toJSON(),
          assignedPerson
        }
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Create asset
  createAsset: async (req, res) => {
    try {
      const asset = await PhysicalAsset.create(req.body);

      res.status(201).json({
        success: true,
        msg: 'Asset created successfully',
        data: asset
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Update asset
  updateAsset: async (req, res) => {
    try {
      const asset = await PhysicalAsset.findByPk(req.params.id);

      if (!asset) {
        return res.status(404).json({ msg: 'Asset not found' });
      }

      await asset.update(req.body);

      res.status(200).json({
        success: true,
        msg: 'Asset updated successfully',
        data: asset
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Delete asset
  deleteAsset: async (req, res) => {
    try {
      const asset = await PhysicalAsset.findByPk(req.params.id);

      if (!asset) {
        return res.status(404).json({ msg: 'Asset not found' });
      }

      await asset.destroy();

      res.status(200).json({
        success: true,
        msg: 'Asset deleted successfully'
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Assign asset to person
  assignAsset: async (req, res) => {
    try {
      const { personId } = req.body;
      const asset = await PhysicalAsset.findByPk(req.params.id);

      if (!asset) {
        return res.status(404).json({ msg: 'Asset not found' });
      }

      // Verify person exists
      const person = await Person.findByPk(personId);
      if (!person) {
        return res.status(404).json({ msg: 'Person not found' });
      }

      await asset.update({ assignedTo: personId });

      res.status(200).json({
        success: true,
        msg: 'Asset assigned successfully',
        data: asset
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Unassign asset
  unassignAsset: async (req, res) => {
    try {
      const asset = await PhysicalAsset.findByPk(req.params.id);

      if (!asset) {
        return res.status(404).json({ msg: 'Asset not found' });
      }

      await asset.update({ assignedTo: null });

      res.status(200).json({
        success: true,
        msg: 'Asset unassigned successfully',
        data: asset
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Get assets needing maintenance
  getMaintenanceNeeded: async (req, res) => {
    try {
      const assets = await PhysicalAsset.findAll({
        where: {
          nextMaintenanceDate: {
            [Op.lte]: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Next 30 days
          }
        },
        order: [['nextMaintenanceDate', 'ASC']]
      });

      res.status(200).json({
        success: true,
        count: assets.length,
        data: assets
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = assetCtrl;
