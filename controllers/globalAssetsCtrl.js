const GlobalAsset = require('../models/GlobalAsset');
const General = require('../models/General');

const globalAssetsCtrl = {
  // Get all global assets
  getAllAssets: async (req, res) => {
    try {
      const assets = await GlobalAsset.findAll({
        where: { userId: req.user.id },
        order: [['createdAt', 'DESC']]
      });

      res.json({ success: true, data: assets });
    } catch (error) {
      console.error('Error fetching global assets:', error);
      res.status(500).json({ success: false, msg: error.message });
    }
  },

  // Get assets by type
  getAssetsByType: async (req, res) => {
    try {
      const { type } = req.params;

      const assets = await GlobalAsset.findAll({
        where: {
          userId: req.user.id,
          type
        },
        order: [['createdAt', 'DESC']]
      });

      res.json({ success: true, data: assets });
    } catch (error) {
      console.error('Error fetching assets by type:', error);
      res.status(500).json({ success: false, msg: error.message });
    }
  },

  // Get assets by country
  getAssetsByCountry: async (req, res) => {
    try {
      const { country } = req.params;

      const assets = await GlobalAsset.findAll({
        where: {
          userId: req.user.id,
          country
        },
        order: [['createdAt', 'DESC']]
      });

      res.json({ success: true, data: assets });
    } catch (error) {
      console.error('Error fetching assets by country:', error);
      res.status(500).json({ success: false, msg: error.message });
    }
  },

  // Get single asset by ID
  getAssetById: async (req, res) => {
    try {
      const { id } = req.params;

      const asset = await GlobalAsset.findOne({
        where: {
          id,
          userId: req.user.id
        }
      });

      if (!asset) {
        return res.status(404).json({ success: false, msg: 'Global asset not found' });
      }

      res.json({ success: true, data: asset });
    } catch (error) {
      console.error('Error fetching global asset:', error);
      res.status(500).json({ success: false, msg: error.message });
    }
  },

  // Create new global asset
  createAsset: async (req, res) => {
    try {
      const assetData = req.body;

      // Validate required fields
      if (!assetData.name || !assetData.type || !assetData.country ||
          !assetData.city || !assetData.latitude || !assetData.longitude) {
        return res.status(400).json({
          success: false,
          msg: 'Missing required fields: name, type, country, city, latitude, longitude'
        });
      }

      // Validate type
      const validTypes = ['supplier', 'manufacturer', 'equipment', 'investor', 'market', 'logistics', 'facility', 'other'];
      if (!validTypes.includes(assetData.type)) {
        return res.status(400).json({
          success: false,
          msg: `Invalid type. Must be one of: ${validTypes.join(', ')}`
        });
      }

      // Validate status
      const validStatuses = ['potential', 'contacted', 'negotiating', 'active', 'completed', 'inactive'];
      if (assetData.status && !validStatuses.includes(assetData.status)) {
        return res.status(400).json({
          success: false,
          msg: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
        });
      }

      // If generalId is provided, verify it exists
      if (assetData.generalId) {
        const general = await General.findByPk(assetData.generalId);
        if (!general) {
          return res.status(404).json({
            success: false,
            msg: 'General not found'
          });
        }
      }

      // Create asset
      const asset = await GlobalAsset.create({
        ...assetData,
        userId: req.user.id
      });

      res.status(201).json({
        success: true,
        msg: 'Global asset created successfully',
        data: asset
      });
    } catch (error) {
      console.error('Error creating global asset:', error);
      res.status(500).json({ success: false, msg: error.message });
    }
  },

  // Update global asset
  updateAsset: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Find asset
      const asset = await GlobalAsset.findOne({
        where: {
          id,
          userId: req.user.id
        }
      });

      if (!asset) {
        return res.status(404).json({ success: false, msg: 'Global asset not found' });
      }

      // Validate type if provided
      if (updateData.type) {
        const validTypes = ['supplier', 'manufacturer', 'equipment', 'investor', 'market', 'logistics', 'facility', 'other'];
        if (!validTypes.includes(updateData.type)) {
          return res.status(400).json({
            success: false,
            msg: `Invalid type. Must be one of: ${validTypes.join(', ')}`
          });
        }
      }

      // Validate status if provided
      if (updateData.status) {
        const validStatuses = ['potential', 'contacted', 'negotiating', 'active', 'completed', 'inactive'];
        if (!validStatuses.includes(updateData.status)) {
          return res.status(400).json({
            success: false,
            msg: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
          });
        }
      }

      // If generalId is provided, verify it exists
      if (updateData.generalId) {
        const general = await General.findByPk(updateData.generalId);
        if (!general) {
          return res.status(404).json({
            success: false,
            msg: 'General not found'
          });
        }
      }

      // Update asset
      await asset.update(updateData);

      res.json({
        success: true,
        msg: 'Global asset updated successfully',
        data: asset
      });
    } catch (error) {
      console.error('Error updating global asset:', error);
      res.status(500).json({ success: false, msg: error.message });
    }
  },

  // Delete global asset
  deleteAsset: async (req, res) => {
    try {
      const { id } = req.params;

      // Find asset
      const asset = await GlobalAsset.findOne({
        where: {
          id,
          userId: req.user.id
        }
      });

      if (!asset) {
        return res.status(404).json({ success: false, msg: 'Global asset not found' });
      }

      // Delete asset
      await asset.destroy();

      res.json({
        success: true,
        msg: 'Global asset deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting global asset:', error);
      res.status(500).json({ success: false, msg: error.message });
    }
  }
};

module.exports = globalAssetsCtrl;
