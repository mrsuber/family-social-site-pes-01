const { Op } = require('sequelize');
const Project = require('../models/Project');
const ProjectAssignment = require('../models/ProjectAssignment');
const Person = require('../models/Person');
const General = require('../models/General');
const ErrorResponse = require('../utils/errorResponse');

const projectCtrl = {
  // Get all projects
  getAllProjects: async (req, res) => {
    try {
      const {
        generalId,
        status,
        priority,
        limit = 100,
        offset = 0
      } = req.query;

      const where = {};
      if (generalId) where.generalId = generalId;
      if (status) where.status = status;
      if (priority) where.priority = priority;

      const projects = await Project.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['createdAt', 'DESC']]
      });

      res.status(200).json({
        success: true,
        count: projects.count,
        data: projects.rows
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Get single project with team
  getProject: async (req, res) => {
    try {
      const project = await Project.findByPk(req.params.id);

      if (!project) {
        return res.status(404).json({ msg: 'Project not found' });
      }

      // Get team assignments
      const assignments = await ProjectAssignment.findAll({
        where: { projectId: req.params.id, isActive: true }
      });

      res.status(200).json({
        success: true,
        data: {
          ...project.toJSON(),
          teamSize: assignments.length,
          assignments
        }
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Create project
  createProject: async (req, res) => {
    try {
      const project = await Project.create(req.body);

      res.status(201).json({
        success: true,
        msg: 'Project created successfully',
        data: project
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Update project
  updateProject: async (req, res) => {
    try {
      const project = await Project.findByPk(req.params.id);

      if (!project) {
        return res.status(404).json({ msg: 'Project not found' });
      }

      await project.update(req.body);

      res.status(200).json({
        success: true,
        msg: 'Project updated successfully',
        data: project
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Delete project
  deleteProject: async (req, res) => {
    try {
      const project = await Project.findByPk(req.params.id);

      if (!project) {
        return res.status(404).json({ msg: 'Project not found' });
      }

      await project.destroy();

      res.status(200).json({
        success: true,
        msg: 'Project deleted successfully'
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Assign person to project
  assignPerson: async (req, res) => {
    try {
      const { personId, role, hoursAllocated } = req.body;
      const projectId = req.params.id;

      // Check if project exists
      const project = await Project.findByPk(projectId);
      if (!project) {
        return res.status(404).json({ msg: 'Project not found' });
      }

      // Check if person exists
      const person = await Person.findByPk(personId);
      if (!person) {
        return res.status(404).json({ msg: 'Person not found' });
      }

      const assignment = await ProjectAssignment.create({
        projectId,
        personId,
        role,
        hoursAllocated,
        isActive: true
      });

      res.status(201).json({
        success: true,
        msg: 'Person assigned to project successfully',
        data: assignment
      });
    } catch (err) {
      // Handle unique constraint violation
      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ msg: 'Person is already assigned to this project' });
      }
      res.status(500).json({ msg: err.message });
    }
  },

  // Remove person from project
  removePerson: async (req, res) => {
    try {
      const { personId } = req.params;
      const projectId = req.params.id;

      const assignment = await ProjectAssignment.findOne({
        where: { projectId, personId }
      });

      if (!assignment) {
        return res.status(404).json({ msg: 'Assignment not found' });
      }

      await assignment.update({ isActive: false });

      res.status(200).json({
        success: true,
        msg: 'Person removed from project successfully'
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Get projects by general
  getProjectsByGeneral: async (req, res) => {
    try {
      const { generalId } = req.params;

      const projects = await Project.findAll({
        where: { generalId },
        order: [['createdAt', 'DESC']]
      });

      res.status(200).json({
        success: true,
        count: projects.length,
        data: projects
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = projectCtrl;
