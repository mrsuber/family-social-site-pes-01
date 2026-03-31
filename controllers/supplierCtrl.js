const Supplier = require('../models/Supplier');

const supplierCtrl = {
  // Get all suppliers
  getSuppliers: async (req, res) => {
    try {
      const suppliers = await Supplier.findAll({
        order: [['name', 'ASC']]
      });

      res.json({
        success: true,
        data: suppliers
      });
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get active suppliers
  getActiveSuppliers: async (req, res) => {
    try {
      const suppliers = await Supplier.findAll({
        where: { status: 'active' },
        order: [['name', 'ASC']]
      });

      res.json({
        success: true,
        data: suppliers
      });
    } catch (error) {
      console.error('Error fetching active suppliers:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get single supplier by ID
  getSupplier: async (req, res) => {
    try {
      const { id } = req.params;
      const supplier = await Supplier.findByPk(id);

      if (!supplier) {
        return res.status(404).json({
          success: false,
          message: 'Supplier not found'
        });
      }

      res.json({
        success: true,
        data: supplier
      });
    } catch (error) {
      console.error('Error fetching supplier:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Create new supplier
  createSupplier: async (req, res) => {
    try {
      const supplierData = req.body;

      // Validate required fields
      if (!supplierData.name) {
        return res.status(400).json({
          success: false,
          message: 'Supplier name is required'
        });
      }

      const supplier = await Supplier.create(supplierData);

      res.status(201).json({
        success: true,
        data: supplier,
        message: 'Supplier created successfully'
      });
    } catch (error) {
      console.error('Error creating supplier:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Update supplier
  updateSupplier: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      const supplier = await Supplier.findByPk(id);

      if (!supplier) {
        return res.status(404).json({
          success: false,
          message: 'Supplier not found'
        });
      }

      await supplier.update(updates);

      res.json({
        success: true,
        data: supplier,
        message: 'Supplier updated successfully'
      });
    } catch (error) {
      console.error('Error updating supplier:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Delete supplier
  deleteSupplier: async (req, res) => {
    try {
      const { id } = req.params;

      const supplier = await Supplier.findByPk(id);

      if (!supplier) {
        return res.status(404).json({
          success: false,
          message: 'Supplier not found'
        });
      }

      await supplier.destroy();

      res.json({
        success: true,
        message: 'Supplier deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting supplier:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = supplierCtrl;
