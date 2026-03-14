const MissionControlNode = require('../models/MissionControlNode');

const missionControlCtrl = {
  // Save node positions (bulk update)
  saveNodePositions: async (req, res) => {
    try {
      const { positions } = req.body; // positions is an object: { nodeId: { x, y }, ... }

      if (!positions || typeof positions !== 'object') {
        return res.status(400).json({
          success: false,
          msg: 'Invalid positions data'
        });
      }

      // Bulk upsert all node positions
      const updates = Object.entries(positions).map(([nodeId, position]) => {
        return MissionControlNode.upsert({
          nodeId,
          positionX: position.x,
          positionY: position.y,
          userId: req.user?.id || null // Optional: for multi-user support
        });
      });

      await Promise.all(updates);

      res.json({
        success: true,
        msg: 'Node positions saved successfully'
      });
    } catch (err) {
      console.error('Error saving node positions:', err);
      res.status(500).json({
        success: false,
        msg: err.message
      });
    }
  },

  // Get all node positions
  getNodePositions: async (req, res) => {
    try {
      const nodes = await MissionControlNode.findAll({
        where: req.user?.id ? { userId: req.user.id } : {},
        attributes: ['nodeId', 'positionX', 'positionY']
      });

      // Convert to the format expected by the frontend
      const positions = {};
      nodes.forEach(node => {
        positions[node.nodeId] = {
          x: node.positionX,
          y: node.positionY
        };
      });

      res.json({
        success: true,
        data: positions
      });
    } catch (err) {
      console.error('Error fetching node positions:', err);
      res.status(500).json({
        success: false,
        msg: err.message
      });
    }
  },

  // Reset all node positions
  resetNodePositions: async (req, res) => {
    try {
      await MissionControlNode.destroy({
        where: req.user?.id ? { userId: req.user.id } : {}
      });

      res.json({
        success: true,
        msg: 'Node positions reset successfully'
      });
    } catch (err) {
      console.error('Error resetting node positions:', err);
      res.status(500).json({
        success: false,
        msg: err.message
      });
    }
  }
};

module.exports = missionControlCtrl;
