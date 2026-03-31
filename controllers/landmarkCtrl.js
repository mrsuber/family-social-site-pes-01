const Landmark = require('../models/Landmark');
const General = require('../models/General');
const Person = require('../models/Person');

const landmarkCtrl = {
  // Get all landmarks
  getAllLandmarks: async (req, res) => {
    try {
      const landmarks = await Landmark.findAll({
        order: [['endDate', 'ASC']]
      });

      res.json({ success: true, landmarks });
    } catch (error) {
      console.error('Error fetching landmarks:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Get landmarks by general ID
  getLandmarksByGeneral: async (req, res) => {
    try {
      const { generalId } = req.params;

      const landmarks = await Landmark.findAll({
        where: { generalId },
        order: [['endDate', 'ASC']]
      });

      res.json({ success: true, landmarks });
    } catch (error) {
      console.error('Error fetching landmarks by general:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Get single landmark by ID
  getLandmarkById: async (req, res) => {
    try {
      const { id } = req.params;

      const landmark = await Landmark.findByPk(id);

      if (!landmark) {
        return res.status(404).json({ success: false, message: 'Landmark not found' });
      }

      res.json({ success: true, landmark });
    } catch (error) {
      console.error('Error fetching landmark:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Create new landmark
  createLandmark: async (req, res) => {
    try {
      const landmarkData = req.body;

      // Validate required fields
      if (!landmarkData.title || !landmarkData.generalId || !landmarkData.startDate || !landmarkData.endDate) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: title, generalId, startDate, endDate'
        });
      }

      // Verify general exists
      const general = await General.findByPk(landmarkData.generalId);
      if (!general) {
        return res.status(404).json({
          success: false,
          message: 'General not found'
        });
      }

      // Add creation log entry
      const updatesLog = [{
        timestamp: new Date(),
        user: req.user?.id || 'system',
        action: 'created',
        details: 'Landmark created'
      }];

      const landmark = await Landmark.create({
        ...landmarkData,
        updatesLog
      });

      res.status(201).json({ success: true, landmark });
    } catch (error) {
      console.error('Error creating landmark:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Update landmark
  updateLandmark: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      const landmark = await Landmark.findByPk(id);

      if (!landmark) {
        return res.status(404).json({ success: false, message: 'Landmark not found' });
      }

      // Remove completed_by if it's invalid (to avoid foreign key constraint violations)
      if (updates.completedBy && typeof updates.completedBy === 'string') {
        // Verify the user exists in people table
        const Person = require('../models/Person');
        const person = await Person.findByPk(updates.completedBy);
        if (!person) {
          // Invalid user ID, remove it
          delete updates.completedBy;
        }
      }

      // Add update to log
      const updatesLog = landmark.updatesLog || [];
      updatesLog.push({
        timestamp: new Date(),
        user: req.user?.id || 'system',
        action: 'updated',
        details: `Updated fields: ${Object.keys(updates).join(', ')}`
      });

      // If status changed to 'done', record completion
      if (updates.status === 'done' && landmark.status !== 'done') {
        updates.completedAt = new Date();
        // Only set completedBy if we have a valid user ID that exists in people table
        // For now, set to null to avoid foreign key constraint violations
        updates.completedBy = null;
        updates.progress = 100;
      }

      await landmark.update({
        ...updates,
        updatesLog
      });

      res.json({ success: true, landmark });
    } catch (error) {
      console.error('Error updating landmark:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Update landmark progress
  updateProgress: async (req, res) => {
    try {
      const { id } = req.params;
      const { progress } = req.body;

      if (progress < 0 || progress > 100) {
        return res.status(400).json({
          success: false,
          message: 'Progress must be between 0 and 100'
        });
      }

      const landmark = await Landmark.findByPk(id);

      if (!landmark) {
        return res.status(404).json({ success: false, message: 'Landmark not found' });
      }

      // Add update to log
      const updatesLog = landmark.updatesLog || [];
      updatesLog.push({
        timestamp: new Date(),
        user: req.user?.id || 'system',
        action: 'progress_updated',
        details: `Progress updated from ${landmark.progress}% to ${progress}%`
      });

      // Auto-update status based on progress
      let status = landmark.status;
      if (progress === 0 && status !== 'pending') {
        status = 'pending';
      } else if (progress > 0 && progress < 100 && status === 'pending') {
        status = 'processing';
      } else if (progress === 100) {
        status = 'done';
      }

      await landmark.update({
        progress,
        status,
        updatesLog,
        ...(progress === 100 && {
          completedAt: new Date(),
          completedBy: req.user?.id || null
        })
      });

      res.json({ success: true, landmark });
    } catch (error) {
      console.error('Error updating progress:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Update payment status
  updatePaymentStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { paymentStatus, amountPaid } = req.body;

      const landmark = await Landmark.findByPk(id);

      if (!landmark) {
        return res.status(404).json({ success: false, message: 'Landmark not found' });
      }

      // Add update to log
      const updatesLog = landmark.updatesLog || [];
      updatesLog.push({
        timestamp: new Date(),
        user: req.user?.id || 'system',
        action: 'payment_updated',
        details: `Payment status: ${paymentStatus}, Amount paid: ${amountPaid || 0}`
      });

      await landmark.update({
        paymentStatus,
        amountPaid: amountPaid || landmark.amountPaid,
        updatesLog
      });

      res.json({ success: true, landmark });
    } catch (error) {
      console.error('Error updating payment status:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Add photo to landmark
  addPhoto: async (req, res) => {
    try {
      const { id } = req.params;
      const { photoUrl, caption } = req.body;

      const landmark = await Landmark.findByPk(id);

      if (!landmark) {
        return res.status(404).json({ success: false, message: 'Landmark not found' });
      }

      const photos = landmark.photos || [];
      photos.push({
        url: photoUrl,
        caption: caption || '',
        uploadedAt: new Date(),
        uploadedBy: req.user?.id || 'system'
      });

      // Add update to log
      const updatesLog = landmark.updatesLog || [];
      updatesLog.push({
        timestamp: new Date(),
        user: req.user?.id || 'system',
        action: 'photo_added',
        details: `Photo added${caption ? `: ${caption}` : ''}`
      });

      await landmark.update({
        photos,
        updatesLog
      });

      res.json({ success: true, landmark });
    } catch (error) {
      console.error('Error adding photo:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Update checklist
  updateChecklist: async (req, res) => {
    try {
      const { id } = req.params;
      const { checklist } = req.body;

      const landmark = await Landmark.findByPk(id);

      if (!landmark) {
        return res.status(404).json({ success: false, message: 'Landmark not found' });
      }

      // Calculate completion percentage
      const totalTasks = checklist.length;
      const completedTasks = checklist.filter(task => task.completed).length;
      const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

      // Add update to log
      const updatesLog = landmark.updatesLog || [];
      updatesLog.push({
        timestamp: new Date(),
        user: req.user?.id || 'system',
        action: 'checklist_updated',
        details: `${completedTasks}/${totalTasks} tasks completed`
      });

      await landmark.update({
        checklist,
        progress,
        updatesLog
      });

      res.json({ success: true, landmark });
    } catch (error) {
      console.error('Error updating checklist:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Delete landmark
  deleteLandmark: async (req, res) => {
    try {
      const { id } = req.params;

      const landmark = await Landmark.findByPk(id);

      if (!landmark) {
        return res.status(404).json({ success: false, message: 'Landmark not found' });
      }

      await landmark.destroy();

      res.json({ success: true, message: 'Landmark deleted successfully' });
    } catch (error) {
      console.error('Error deleting landmark:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

module.exports = landmarkCtrl;
