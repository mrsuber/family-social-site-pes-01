const { Op } = require('sequelize');
const Department = require('../models/Department');
const Person = require('../models/Person');
const Project = require('../models/Project');

const departmentCtrl = {
  // Get all departments
  getAllDepartments: async (req, res) => {
    try {
      const {
        projectId,
        generalId,
        status,
        limit = 100,
        offset = 0
      } = req.query;

      const where = {};
      if (projectId) where.projectId = projectId;
      if (generalId) where.generalId = generalId;
      if (status) where.status = status;

      const departments = await Department.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['orderNumber', 'ASC'], ['createdAt', 'ASC']]
      });

      res.status(200).json({
        success: true,
        count: departments.count,
        data: departments.rows
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Get single department with people
  getDepartment: async (req, res) => {
    try {
      const department = await Department.findByPk(req.params.id);

      if (!department) {
        return res.status(404).json({ msg: 'Department not found' });
      }

      // Get people in this department
      const people = await Person.findAll({
        where: { departmentId: req.params.id }
      });

      res.status(200).json({
        success: true,
        data: {
          ...department.toJSON(),
          peopleCount: people.length,
          people
        }
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Create department
  createDepartment: async (req, res) => {
    try {
      const department = await Department.create(req.body);

      res.status(201).json({
        success: true,
        msg: 'Department created successfully',
        data: department
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Update department
  updateDepartment: async (req, res) => {
    try {
      const department = await Department.findByPk(req.params.id);

      if (!department) {
        return res.status(404).json({ msg: 'Department not found' });
      }

      await department.update(req.body);

      res.status(200).json({
        success: true,
        msg: 'Department updated successfully',
        data: department
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Delete department
  deleteDepartment: async (req, res) => {
    try {
      const department = await Department.findByPk(req.params.id);

      if (!department) {
        return res.status(404).json({ msg: 'Department not found' });
      }

      // Check if any people are assigned to this department
      const peopleCount = await Person.count({
        where: { departmentId: req.params.id }
      });

      if (peopleCount > 0) {
        return res.status(400).json({
          msg: `Cannot delete department. ${peopleCount} people are still assigned to it.`
        });
      }

      await department.destroy();

      res.status(200).json({
        success: true,
        msg: 'Department deleted successfully'
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Get departments by project
  getDepartmentsByProject: async (req, res) => {
    try {
      const { projectId } = req.params;

      const departments = await Department.findAll({
        where: { projectId },
        order: [['orderNumber', 'ASC'], ['createdAt', 'ASC']]
      });

      // Get people count for each department
      const departmentsWithPeople = await Promise.all(
        departments.map(async (dept) => {
          const peopleCount = await Person.count({
            where: { departmentId: dept.id }
          });
          return {
            ...dept.toJSON(),
            peopleCount
          };
        })
      );

      res.status(200).json({
        success: true,
        count: departments.length,
        data: departmentsWithPeople
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = departmentCtrl;
