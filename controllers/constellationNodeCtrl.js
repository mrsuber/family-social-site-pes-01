const ConstellationNode = require('../models/ConstellationNode');

const constellationNodeCtrl = {
  // Get all constellation nodes
  getNodes: async (req, res) => {
    try {
      const nodes = await ConstellationNode.findAll({
        where: { userId: req.user.id },
        order: [['createdAt', 'ASC']]
      });

      res.json({
        msg: 'Constellation nodes retrieved successfully',
        data: nodes
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Create a new constellation node
  createNode: async (req, res) => {
    try {
      const { name, type, sub, c, r, p, connectTo, connectToName, flowType, note } = req.body;

      if (!name || !p || !connectTo) {
        return res.status(400).json({ msg: 'Please provide name, position, and connectTo' });
      }

      const newNode = await ConstellationNode.create({
        name,
        type: type || 'Company',
        sub: sub || type,
        c: c || 'green',
        r: r || (type === 'Person' ? 0.3 : 0.45),
        p,
        connectTo,
        connectToName,
        flowType: flowType || 'money',
        note,
        userId: req.user.id
      });

      res.json({
        msg: 'Constellation node created successfully',
        data: newNode
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Update a constellation node
  updateNode: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, type, sub, c, r, p, connectTo, connectToName, flowType, note } = req.body;

      const node = await ConstellationNode.findOne({
        where: { id, userId: req.user.id }
      });

      if (!node) {
        return res.status(404).json({ msg: 'Constellation node not found' });
      }

      await node.update({
        name: name || node.name,
        type: type || node.type,
        sub: sub !== undefined ? sub : node.sub,
        c: c || node.c,
        r: r || node.r,
        p: p || node.p,
        connectTo: connectTo || node.connectTo,
        connectToName: connectToName !== undefined ? connectToName : node.connectToName,
        flowType: flowType || node.flowType,
        note: note !== undefined ? note : node.note
      });

      res.json({
        msg: 'Constellation node updated successfully',
        data: node
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Delete a constellation node
  deleteNode: async (req, res) => {
    try {
      const { id } = req.params;

      const node = await ConstellationNode.findOne({
        where: { id, userId: req.user.id }
      });

      if (!node) {
        return res.status(404).json({ msg: 'Constellation node not found' });
      }

      await node.destroy();

      res.json({ msg: 'Constellation node deleted successfully' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = constellationNodeCtrl;
