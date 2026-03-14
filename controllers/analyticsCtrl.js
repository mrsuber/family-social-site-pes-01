const { Op } = require('sequelize');
const { sequelize } = require('../config/db');
const General = require('../models/General');
const Person = require('../models/Person');
const PhysicalAsset = require('../models/PhysicalAsset');
const CompanyLoan = require('../models/CompanyLoan');
const SickLeave = require('../models/SickLeave');
const Project = require('../models/Project');
const ProjectAssignment = require('../models/ProjectAssignment');
const ErrorResponse = require('../utils/errorResponse');

const analyticsCtrl = {
  // Get main dashboard stats
  getDashboardStats: async (req, res) => {
    try {
      // Get counts for each category
      const [
        totalPeople,
        activePeople,
        girlfriendCandidates,
        businessContacts,
        currentCandidates,
        totalAssets,
        activeLoans,
        activeSickLeaves,
        activeProjects
      ] = await Promise.all([
        Person.count(),
        Person.count({ where: { status: 'active' } }),
        Person.count({ where: { relationshipType: 'girlfriend_candidate' } }),
        Person.count({ where: { relationshipType: 'business_contact' } }),
        Person.count({ where: { relationshipType: 'current_candidate' } }),
        PhysicalAsset.count(),
        CompanyLoan.count({ where: { status: 'active' } }),
        SickLeave.count({ where: { status: 'active' } }),
        Project.count({ where: { status: 'active' } })
      ]);

      // Get people by general
      const peopleByGeneral = await Person.findAll({
        where: { generalId: { [Op.not]: null } },
        attributes: [
          'generalId',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        group: ['generalId']
      });

      // Get hardware count
      const hardwareCount = await PhysicalAsset.count({
        where: {
          assetType: { [Op.in]: ['computer', 'laptop', 'tablet', 'phone'] }
        }
      });

      res.status(200).json({
        success: true,
        data: {
          people: {
            total: totalPeople,
            active: activePeople,
            girlfriendCandidates,
            businessContacts,
            currentCandidates,
            byGeneral: peopleByGeneral
          },
          resources: {
            totalAssets,
            hardwareCount,
            activeLoans,
            activeSickLeaves
          },
          projects: {
            activeProjects
          }
        }
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Get general overview stats
  getGeneralOverview: async (req, res) => {
    try {
      const { generalId } = req.params;

      const [peopleCount, projectCount, assetsCount] = await Promise.all([
        Person.count({ where: { generalId } }),
        Project.count({ where: { generalId } }),
        PhysicalAsset.count({ where: { generalId } })
      ]);

      // Get projects by status
      const projectsByStatus = await Project.findAll({
        where: { generalId },
        attributes: [
          'status',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        group: ['status']
      });

      res.status(200).json({
        success: true,
        data: {
          peopleCount,
          projectCount,
          assetsCount,
          projectsByStatus
        }
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Get resource allocation stats
  getResourceAllocation: async (req, res) => {
    try {
      // People by relationship type
      const peopleByType = await Person.findAll({
        attributes: [
          'relationshipType',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        group: ['relationshipType']
      });

      // Assets by type and status
      const assetsByType = await PhysicalAsset.findAll({
        attributes: [
          'assetType',
          'status',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        group: ['assetType', 'status']
      });

      // Assigned vs unassigned assets
      const assignedAssets = await PhysicalAsset.count({
        where: { assignedTo: { [Op.not]: null } }
      });

      const unassignedAssets = await PhysicalAsset.count({
        where: { assignedTo: null }
      });

      res.status(200).json({
        success: true,
        data: {
          peopleByType,
          assetsByType,
          assetAssignment: {
            assigned: assignedAssets,
            unassigned: unassignedAssets
          }
        }
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Get financial overview
  getFinancialOverview: async (req, res) => {
    try {
      // Loans summary by currency
      const loansSummary = await CompanyLoan.findAll({
        where: { status: { [Op.in]: ['pending', 'active'] } },
        attributes: [
          'currency',
          [sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount'],
          [sequelize.fn('SUM', sequelize.col('amount_paid')), 'totalPaid'],
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        group: ['currency']
      });

      // Assets value by currency
      const assetsValue = await PhysicalAsset.findAll({
        where: { purchaseCost: { [Op.not]: null } },
        attributes: [
          'currency',
          [sequelize.fn('SUM', sequelize.col('purchase_cost')), 'totalValue'],
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        group: ['currency']
      });

      res.status(200).json({
        success: true,
        data: {
          loans: loansSummary,
          assetsValue
        }
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Get people performance overview
  getPeoplePerformance: async (req, res) => {
    try {
      // Top performers
      const topPerformers = await Person.findAll({
        where: {
          performanceRating: { [Op.gte]: 80 },
          status: 'active'
        },
        order: [['performanceRating', 'DESC']],
        limit: 10,
        attributes: ['id', 'fullName', 'title', 'performanceRating', 'generalId']
      });

      // Average performance by general
      const performanceByGeneral = await Person.findAll({
        where: { generalId: { [Op.not]: null } },
        attributes: [
          'generalId',
          [sequelize.fn('AVG', sequelize.col('performance_rating')), 'avgRating'],
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        group: ['generalId']
      });

      res.status(200).json({
        success: true,
        data: {
          topPerformers,
          performanceByGeneral
        }
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Get alerts and warnings
  getAlerts: async (req, res) => {
    try {
      const alerts = [];

      // Assets needing maintenance
      const maintenanceNeeded = await PhysicalAsset.count({
        where: {
          nextMaintenanceDate: {
            [Op.lte]: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          }
        }
      });

      if (maintenanceNeeded > 0) {
        alerts.push({
          type: 'maintenance',
          severity: 'warning',
          message: `${maintenanceNeeded} asset(s) need maintenance in the next 30 days`
        });
      }

      // Overdue loans
      const overdueLoans = await CompanyLoan.count({
        where: {
          dueDate: { [Op.lt]: new Date() },
          status: { [Op.in]: ['pending', 'active'] }
        }
      });

      if (overdueLoans > 0) {
        alerts.push({
          type: 'loan',
          severity: 'critical',
          message: `${overdueLoans} loan(s) are overdue`
        });
      }

      // Active sick leaves
      const sickLeavesCount = await SickLeave.count({
        where: { status: 'active' }
      });

      if (sickLeavesCount > 0) {
        alerts.push({
          type: 'sick_leave',
          severity: 'info',
          message: `${sickLeavesCount} person(s) currently on sick leave`
        });
      }

      res.status(200).json({
        success: true,
        count: alerts.length,
        data: alerts
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = analyticsCtrl;
