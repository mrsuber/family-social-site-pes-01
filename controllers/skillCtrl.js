const { Op } = require('sequelize');
const Skill = require('../models/Skill');
const PersonSkill = require('../models/PersonSkill');
const Person = require('../models/Person');
const ErrorResponse = require('../utils/errorResponse');

const skillCtrl = {
  // Get all skills
  getAllSkills: async (req, res) => {
    try {
      const { category, search } = req.query;
      const where = {};

      if (category) where.category = category;

      if (search) {
        where.name = { [Op.iLike]: `%${search}%` };
      }

      const skills = await Skill.findAll({
        where,
        order: [['name', 'ASC']]
      });

      res.status(200).json({
        success: true,
        count: skills.length,
        data: skills
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Get single skill with people who have it
  getSkill: async (req, res) => {
    try {
      const skill = await Skill.findByPk(req.params.id);

      if (!skill) {
        return res.status(404).json({ msg: 'Skill not found' });
      }

      // Get people with this skill
      const personSkills = await PersonSkill.findAll({
        where: { skillId: req.params.id },
        order: [['proficiencyLevel', 'DESC']]
      });

      res.status(200).json({
        success: true,
        data: {
          ...skill.toJSON(),
          peopleCount: personSkills.length,
          personSkills
        }
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Create skill
  createSkill: async (req, res) => {
    try {
      const { name, category, description } = req.body;

      const skill = await Skill.create({
        name,
        category,
        description
      });

      res.status(201).json({
        success: true,
        msg: 'Skill created successfully',
        data: skill
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Update skill
  updateSkill: async (req, res) => {
    try {
      const skill = await Skill.findByPk(req.params.id);

      if (!skill) {
        return res.status(404).json({ msg: 'Skill not found' });
      }

      await skill.update(req.body);

      res.status(200).json({
        success: true,
        msg: 'Skill updated successfully',
        data: skill
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Delete skill
  deleteSkill: async (req, res) => {
    try {
      const skill = await Skill.findByPk(req.params.id);

      if (!skill) {
        return res.status(404).json({ msg: 'Skill not found' });
      }

      await skill.destroy();

      res.status(200).json({
        success: true,
        msg: 'Skill deleted successfully'
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Get skills by category
  getSkillsByCategory: async (req, res) => {
    try {
      const { category } = req.params;

      const skills = await Skill.findAll({
        where: { category },
        order: [['name', 'ASC']]
      });

      res.status(200).json({
        success: true,
        count: skills.length,
        data: skills
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = skillCtrl;
