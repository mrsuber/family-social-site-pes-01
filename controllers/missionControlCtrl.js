const MissionControlNode = require('../models/MissionControlNode');
const General = require('../models/General');
const Person = require('../models/Person');
const Department = require('../models/Department');
const PhysicalAsset = require('../models/PhysicalAsset');
const Project = require('../models/Project');
const IncomeStream = require('../models/IncomeStream');
const RecurringExpense = require('../models/RecurringExpense');
const Landmark = require('../models/Landmark');
const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');
const InventoryItem = require('../models/InventoryItem');
const Supplier = require('../models/Supplier');

const missionControlCtrl = {
  // Get all mission control dashboard data in one optimized query
  getDashboardData: async (req, res) => {
    try {
      console.log('Fetching mission control dashboard data...');
      const startTime = Date.now();

      // Fetch all data in parallel with optimized queries
      const [generals, people, departments, assets, projectCount, incomeStreams, expenses, landmarks] = await Promise.all([
        // Generals with only needed fields
        General.findAll({
          attributes: ['id', 'name', 'description', 'status', 'orderNumber', 'objectives', 'commanderId'],
          order: [['orderNumber', 'ASC']]
        }),

        // People with only needed fields
        Person.findAll({
          attributes: [
            'id', 'fullName', 'title', 'email', 'photoUrl',
            'relationshipType', 'performanceRating', 'generalId',
            'departmentId', 'status',
            'investmentAmount', 'investmentCurrency', 'investmentDate', 'equityPercentage'
          ],
          where: {
            status: 'active'
          },
          limit: 1000
        }),

        // Departments with only needed fields
        Department.findAll({
          attributes: [
            'id', 'name', 'description', 'status', 'generalId',
            'parentDepartmentId', 'orderNumber', 'objectives'
          ],
          where: {
            status: ['active', 'planning']
          },
          order: [
            ['parentDepartmentId', 'ASC NULLS FIRST'],
            ['orderNumber', 'ASC']
          ]
        }),

        // Assets with only needed fields (limit to first 100)
        PhysicalAsset.findAll({
          attributes: [
            'id', 'name', 'assetType', 'acquisitionStatus', 'generalId',
            'location', 'purchaseCost', 'currency', 'condition', 'notes'
          ],
          // Fetch both acquired and target assets
          limit: 100,
          order: [
            ['acquisitionStatus', 'DESC'], // Show 'acquired' before 'target'
            ['purchaseCost', 'DESC']
          ]
        }),

        // Projects count for stats
        Project.count({
          where: { status: 'active' }
        }),

        // Income Streams
        IncomeStream.findAll({
          attributes: [
            'id', 'name', 'description', 'incomeType', 'amount', 'currency',
            'frequency', 'status', 'clientName', 'generalId', 'departmentId',
            'personId', 'projectId', 'startDate', 'endDate'
          ],
          limit: 100,
          order: [['status', 'ASC'], ['amount', 'DESC']]
        }),

        // Recurring Expenses
        RecurringExpense.findAll({
          attributes: [
            'id', 'name', 'description', 'category', 'amount', 'currency',
            'frequency', 'status', 'provider', 'monthlyEquivalent', 'yearlyTotal',
            'generalId', 'assetId', 'isEssential', 'dueDay'
          ],
          limit: 100,
          order: [['isEssential', 'DESC'], ['monthlyEquivalent', 'DESC']]
        }),

        // Landmarks
        Landmark.findAll({
          attributes: [
            'id', 'title', 'description', 'generalId', 'personId', 'startDate', 'endDate',
            'amount', 'currency', 'paymentStatus', 'amountPaid', 'status',
            'priority', 'progress', 'category', 'assignedTo', 'tags',
            'photos', 'checklist', 'reminderDays'
          ],
          limit: 100,
          order: [['endDate', 'ASC']]
        })
      ]);

      // Fetch restaurant operational data
      const restaurants = await Restaurant.findAll({
        attributes: ['id', 'name', 'location', 'status', 'departmentId'],
        where: { status: ['active', 'planning'] }
      });

      // Fetch operational data for each restaurant
      const restaurantData = await Promise.all(restaurants.map(async (restaurant) => {
        const [menuItems, inventoryItems, suppliers] = await Promise.all([
          MenuItem.findAll({
            where: { restaurantId: restaurant.id },
            attributes: ['id', 'name', 'category', 'price', 'isAvailable', 'status']
          }),
          InventoryItem.findAll({
            where: { restaurantId: restaurant.id },
            attributes: ['id', 'name', 'category', 'currentStock', 'status', 'unit']
          }),
          Supplier.findAll({
            attributes: ['id', 'name', 'status', 'productsSupplied', 'rating']
          })
        ]);

        return {
          restaurant: restaurant.toJSON(),
          menuItems: menuItems.map(m => m.toJSON()),
          inventoryItems: inventoryItems.map(i => i.toJSON()),
          suppliers: suppliers.map(s => s.toJSON())
        };
      }));

      // Calculate stats
      const stats = {
        people: {
          total: people.length,
          active: people.filter(p => p.status === 'active').length
        },
        departments: {
          total: departments.length
        },
        projects: {
          activeProjects: projectCount
        },
        assets: {
          total: assets.length,
          acquired: assets.filter(a => a.acquisitionStatus === 'acquired').length,
          target: assets.filter(a => a.acquisitionStatus === 'target').length
        },
        resources: {
          totalAssets: assets.length,
          acquiredAssets: assets.filter(a => a.acquisitionStatus === 'acquired').length,
          targetAssets: assets.filter(a => a.acquisitionStatus === 'target').length,
          activeLoans: 0 // TODO: implement loans feature
        },
        financial: {
          totalIncome: incomeStreams.filter(i => i.status === 'active').length,
          totalExpenses: expenses.filter(e => e.status === 'active').length,
          monthlyRevenue: incomeStreams
            .filter(i => i.status === 'active')
            .reduce((sum, i) => {
              const amount = parseFloat(i.amount);
              if (i.frequency === 'monthly') return sum + amount;
              if (i.frequency === 'yearly') return sum + (amount / 12);
              return sum;
            }, 0),
          monthlyExpenses: expenses
            .filter(e => e.status === 'active')
            .reduce((sum, e) => sum + parseFloat(e.monthlyEquivalent || 0), 0)
        }
      };

      // Calculate profit
      stats.financial.monthlyProfit = stats.financial.monthlyRevenue - stats.financial.monthlyExpenses;

      const endTime = Date.now();
      console.log(`Mission control data fetched in ${endTime - startTime}ms`);

      // Return all data in one response
      res.json({
        success: true,
        data: {
          stats,
          generals,
          people,
          departments,
          assets,
          incomeStreams,
          expenses,
          landmarks,
          restaurants: restaurantData
        }
      });
    } catch (err) {
      console.error('Error fetching mission control dashboard data:', err);
      res.status(500).json({
        success: false,
        msg: err.message
      });
    }
  },

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
