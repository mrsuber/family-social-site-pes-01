const { Op } = require('sequelize');
const Person = require('../models/Person');
const General = require('../models/General');
const Skill = require('../models/Skill');
const PersonSkill = require('../models/PersonSkill');
const Experience = require('../models/Experience');
const Education = require('../models/Education');
const Language = require('../models/Language');
const PhysicalAsset = require('../models/PhysicalAsset');
const CompanyLoan = require('../models/CompanyLoan');
const SickLeave = require('../models/SickLeave');
const ProjectAssignment = require('../models/ProjectAssignment');
const ErrorResponse = require('../utils/errorResponse');

const personCtrl = {
  // Get all people with filters
  getAllPeople: async (req, res) => {
    try {
      const {
        relationshipType,
        generalId,
        status,
        search,
        limit = 100,
        offset = 0
      } = req.query;

      const where = {};

      if (relationshipType) {
        where.relationshipType = relationshipType;
      }

      if (generalId) {
        where.generalId = generalId;
      }

      if (status) {
        where.status = status;
      }

      if (search) {
        where[Op.or] = [
          { fullName: { [Op.iLike]: `%${search}%` } },
          { title: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } }
        ];
      }

      const people = await Person.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['createdAt', 'DESC']]
      });

      res.status(200).json({
        success: true,
        count: people.count,
        data: people.rows
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Get single person with complete profile
  getPerson: async (req, res) => {
    try {
      const person = await Person.findByPk(req.params.id);

      if (!person) {
        return res.status(404).json({ msg: 'Person not found' });
      }

      // Get all related data
      const [skills, experiences, education, languages, assets, loans, sickLeaves, projects] = await Promise.all([
        PersonSkill.findAll({
          where: { personId: req.params.id },
          include: [{ model: Skill, as: 'skill' }]
        }),
        Experience.findAll({
          where: { personId: req.params.id },
          order: [['startDate', 'DESC']]
        }),
        Education.findAll({
          where: { personId: req.params.id },
          order: [['yearObtained', 'DESC']]
        }),
        Language.findAll({
          where: { personId: req.params.id }
        }),
        PhysicalAsset.findAll({
          where: { assignedTo: req.params.id }
        }),
        CompanyLoan.findAll({
          where: { personId: req.params.id }
        }),
        SickLeave.findAll({
          where: { personId: req.params.id },
          order: [['startDate', 'DESC']]
        }),
        ProjectAssignment.findAll({
          where: { personId: req.params.id, isActive: true }
        })
      ]);

      res.status(200).json({
        success: true,
        data: {
          ...person.toJSON(),
          skills,
          experiences,
          education,
          languages,
          assets,
          loans,
          sickLeaves,
          projects
        }
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Create new person
  createPerson: async (req, res) => {
    try {
      const person = await Person.create(req.body);

      res.status(201).json({
        success: true,
        msg: 'Person created successfully',
        data: person
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Update person
  updatePerson: async (req, res) => {
    try {
      const person = await Person.findByPk(req.params.id);

      if (!person) {
        return res.status(404).json({ msg: 'Person not found' });
      }

      await person.update(req.body);

      res.status(200).json({
        success: true,
        msg: 'Person updated successfully',
        data: person
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Delete person
  deletePerson: async (req, res) => {
    try {
      const person = await Person.findByPk(req.params.id);

      if (!person) {
        return res.status(404).json({ msg: 'Person not found' });
      }

      await person.destroy();

      res.status(200).json({
        success: true,
        msg: 'Person deleted successfully'
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Add skill to person
  addSkill: async (req, res) => {
    try {
      const { skillId, proficiencyLevel, yearsOfExperience, certifications } = req.body;

      const personSkill = await PersonSkill.create({
        personId: req.params.id,
        skillId,
        proficiencyLevel,
        yearsOfExperience,
        certifications
      });

      res.status(201).json({
        success: true,
        msg: 'Skill added successfully',
        data: personSkill
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Update person's skill proficiency
  updateSkill: async (req, res) => {
    try {
      const { skillId, proficiencyLevel, yearsOfExperience } = req.body;

      const personSkill = await PersonSkill.findOne({
        where: {
          personId: req.params.id,
          skillId
        }
      });

      if (!personSkill) {
        return res.status(404).json({ msg: 'Skill not found for this person' });
      }

      await personSkill.update({ proficiencyLevel, yearsOfExperience });

      res.status(200).json({
        success: true,
        msg: 'Skill updated successfully',
        data: personSkill
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Add experience
  addExperience: async (req, res) => {
    try {
      const experience = await Experience.create({
        ...req.body,
        personId: req.params.id
      });

      res.status(201).json({
        success: true,
        msg: 'Experience added successfully',
        data: experience
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Add education
  addEducation: async (req, res) => {
    try {
      const education = await Education.create({
        ...req.body,
        personId: req.params.id
      });

      res.status(201).json({
        success: true,
        msg: 'Education added successfully',
        data: education
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Add language
  addLanguage: async (req, res) => {
    try {
      const language = await Language.create({
        ...req.body,
        personId: req.params.id
      });

      res.status(201).json({
        success: true,
        msg: 'Language added successfully',
        data: language
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Get people by relationship type
  getPeopleByRelationship: async (req, res) => {
    try {
      const { relationshipType } = req.params;

      const people = await Person.findAll({
        where: { relationshipType },
        order: [['fullName', 'ASC']]
      });

      res.status(200).json({
        success: true,
        count: people.length,
        data: people
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Get people by general
  getPeopleByGeneral: async (req, res) => {
    try {
      const { generalId } = req.params;

      const people = await Person.findAll({
        where: { generalId },
        order: [['fullName', 'ASC']]
      });

      res.status(200).json({
        success: true,
        count: people.length,
        data: people
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = personCtrl;
