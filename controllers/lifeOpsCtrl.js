const { Op } = require('sequelize');
const IncomeStream = require('../models/IncomeStream');
const Expense = require('../models/Expense');
const DailyLog = require('../models/DailyLog');
const WeeklyPlan = require('../models/WeeklyPlan');
const TimeBlock = require('../models/TimeBlock');
const LearningInvestment = require('../models/LearningInvestment');

const lifeOpsCtrl = {
  // ==================== INCOME STREAMS ====================

  // Get income streams for a person
  getIncomeStreams: async (req, res) => {
    try {
      const { personId } = req.params;
      const { months = 3 } = req.query;

      // Calculate date range
      const endDate = new Date();
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - parseInt(months));

      const incomeStreams = await IncomeStream.findAll({
        where: {
          personId,
          createdAt: {
            [Op.between]: [startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]]
          }
        },
        order: [['createdAt', 'DESC']]
      });

      res.status(200).json({
        success: true,
        count: incomeStreams.length,
        data: incomeStreams
      });
    } catch (err) {
      console.error('Error fetching income:', err);
      res.status(500).json({
        success: false,
        msg: err.message
      });
    }
  },

  // Create income stream
  createIncomeStream: async (req, res) => {
    try {
      const income = await IncomeStream.create(req.body);

      res.status(201).json({
        success: true,
        msg: 'Income stream created successfully',
        data: income
      });
    } catch (err) {
      console.error('Error creating income:', err);
      res.status(500).json({
        success: false,
        msg: err.message
      });
    }
  },

  // Update income stream
  updateIncomeStream: async (req, res) => {
    try {
      const { id } = req.params;
      const income = await IncomeStream.findByPk(id);

      if (!income) {
        return res.status(404).json({
          success: false,
          msg: 'Income stream not found'
        });
      }

      await income.update(req.body);

      res.status(200).json({
        success: true,
        msg: 'Income stream updated successfully',
        data: income
      });
    } catch (err) {
      console.error('Error updating income:', err);
      res.status(500).json({
        success: false,
        msg: err.message
      });
    }
  },

  // Delete income stream
  deleteIncomeStream: async (req, res) => {
    try {
      const { id } = req.params;
      const income = await IncomeStream.findByPk(id);

      if (!income) {
        return res.status(404).json({
          success: false,
          msg: 'Income stream not found'
        });
      }

      await income.destroy();

      res.status(200).json({
        success: true,
        msg: 'Income stream deleted successfully'
      });
    } catch (err) {
      console.error('Error deleting income:', err);
      res.status(500).json({
        success: false,
        msg: err.message
      });
    }
  },

  // ==================== EXPENSES ====================

  // Get expenses for a person
  getExpenses: async (req, res) => {
    try {
      const { personId } = req.params;
      const { months = 3 } = req.query;

      // Calculate date range
      const endDate = new Date();
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - parseInt(months));

      const expenses = await Expense.findAll({
        where: {
          personId,
          expenseDate: {
            [Op.between]: [startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]]
          }
        },
        order: [['expenseDate', 'DESC']]
      });

      res.status(200).json({
        success: true,
        count: expenses.length,
        data: expenses
      });
    } catch (err) {
      console.error('Error fetching expenses:', err);
      res.status(500).json({
        success: false,
        msg: err.message
      });
    }
  },

  // Create expense
  createExpense: async (req, res) => {
    try {
      const expense = await Expense.create(req.body);

      res.status(201).json({
        success: true,
        msg: 'Expense created successfully',
        data: expense
      });
    } catch (err) {
      console.error('Error creating expense:', err);
      res.status(500).json({
        success: false,
        msg: err.message
      });
    }
  },

  // Update expense
  updateExpense: async (req, res) => {
    try {
      const { id } = req.params;
      const expense = await Expense.findByPk(id);

      if (!expense) {
        return res.status(404).json({
          success: false,
          msg: 'Expense not found'
        });
      }

      await expense.update(req.body);

      res.status(200).json({
        success: true,
        msg: 'Expense updated successfully',
        data: expense
      });
    } catch (err) {
      console.error('Error updating expense:', err);
      res.status(500).json({
        success: false,
        msg: err.message
      });
    }
  },

  // Delete expense
  deleteExpense: async (req, res) => {
    try {
      const { id } = req.params;
      const expense = await Expense.findByPk(id);

      if (!expense) {
        return res.status(404).json({
          success: false,
          msg: 'Expense not found'
        });
      }

      await expense.destroy();

      res.status(200).json({
        success: true,
        msg: 'Expense deleted successfully'
      });
    } catch (err) {
      console.error('Error deleting expense:', err);
      res.status(500).json({
        success: false,
        msg: err.message
      });
    }
  },

  // ==================== DAILY LOGS ====================

  // Get daily logs for a person
  getDailyLogs: async (req, res) => {
    try {
      const { personId } = req.params;
      const { days = 30 } = req.query;

      // Calculate date range
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - parseInt(days));

      const dailyLogs = await DailyLog.findAll({
        where: {
          personId,
          date: {
            [Op.between]: [startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]]
          }
        },
        order: [['date', 'DESC']]
      });

      res.status(200).json({
        success: true,
        count: dailyLogs.length,
        data: dailyLogs
      });
    } catch (err) {
      console.error('Error fetching daily logs:', err);
      res.status(500).json({
        success: false,
        msg: err.message
      });
    }
  },

  // Upsert daily log (create or update based on date)
  upsertDailyLog: async (req, res) => {
    try {
      const { personId, date } = req.body;

      // Check if log exists for this person and date
      const existingLog = await DailyLog.findOne({
        where: { personId, date }
      });

      let dailyLog;
      if (existingLog) {
        // Update existing log
        await existingLog.update(req.body);
        dailyLog = existingLog;
      } else {
        // Create new log
        dailyLog = await DailyLog.create(req.body);
      }

      res.status(200).json({
        success: true,
        msg: existingLog ? 'Daily log updated successfully' : 'Daily log created successfully',
        data: dailyLog
      });
    } catch (err) {
      console.error('Error upserting daily log:', err);
      res.status(500).json({
        success: false,
        msg: err.message
      });
    }
  },

  // Delete daily log
  deleteDailyLog: async (req, res) => {
    try {
      const { id } = req.params;
      const dailyLog = await DailyLog.findByPk(id);

      if (!dailyLog) {
        return res.status(404).json({
          success: false,
          msg: 'Daily log not found'
        });
      }

      await dailyLog.destroy();

      res.status(200).json({
        success: true,
        msg: 'Daily log deleted successfully'
      });
    } catch (err) {
      console.error('Error deleting daily log:', err);
      res.status(500).json({
        success: false,
        msg: err.message
      });
    }
  },

  // ==================== WEEKLY PLANS ====================

  // Get weekly plans for a person
  getWeeklyPlans: async (req, res) => {
    try {
      const { personId } = req.params;
      const { weeks = 4 } = req.query;

      // Calculate date range
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - (parseInt(weeks) * 7));

      const weeklyPlans = await WeeklyPlan.findAll({
        where: {
          personId,
          weekStartDate: {
            [Op.between]: [startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]]
          }
        },
        order: [['weekStartDate', 'DESC']]
      });

      res.status(200).json({
        success: true,
        count: weeklyPlans.length,
        data: weeklyPlans
      });
    } catch (err) {
      console.error('Error fetching weekly plans:', err);
      res.status(500).json({
        success: false,
        msg: err.message
      });
    }
  },

  // Create weekly plan
  createWeeklyPlan: async (req, res) => {
    try {
      const weeklyPlan = await WeeklyPlan.create(req.body);

      res.status(201).json({
        success: true,
        msg: 'Weekly plan created successfully',
        data: weeklyPlan
      });
    } catch (err) {
      console.error('Error creating weekly plan:', err);
      res.status(500).json({
        success: false,
        msg: err.message
      });
    }
  },

  // Update weekly plan
  updateWeeklyPlan: async (req, res) => {
    try {
      const { id } = req.params;
      const weeklyPlan = await WeeklyPlan.findByPk(id);

      if (!weeklyPlan) {
        return res.status(404).json({
          success: false,
          msg: 'Weekly plan not found'
        });
      }

      await weeklyPlan.update(req.body);

      res.status(200).json({
        success: true,
        msg: 'Weekly plan updated successfully',
        data: weeklyPlan
      });
    } catch (err) {
      console.error('Error updating weekly plan:', err);
      res.status(500).json({
        success: false,
        msg: err.message
      });
    }
  },

  // Delete weekly plan
  deleteWeeklyPlan: async (req, res) => {
    try {
      const { id } = req.params;
      const weeklyPlan = await WeeklyPlan.findByPk(id);

      if (!weeklyPlan) {
        return res.status(404).json({
          success: false,
          msg: 'Weekly plan not found'
        });
      }

      await weeklyPlan.destroy();

      res.status(200).json({
        success: true,
        msg: 'Weekly plan deleted successfully'
      });
    } catch (err) {
      console.error('Error deleting weekly plan:', err);
      res.status(500).json({
        success: false,
        msg: err.message
      });
    }
  },

  // ==================== TIME BLOCKS ====================

  // Get time blocks for a person
  getTimeBlocks: async (req, res) => {
    try {
      const { personId } = req.params;
      const { days = 7 } = req.query;

      // Calculate date range
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - parseInt(days));

      const timeBlocks = await TimeBlock.findAll({
        where: {
          personId,
          startTime: {
            [Op.between]: [startDate.toISOString(), endDate.toISOString()]
          }
        },
        order: [['startTime', 'ASC']]
      });

      res.status(200).json({
        success: true,
        count: timeBlocks.length,
        data: timeBlocks
      });
    } catch (err) {
      console.error('Error fetching time blocks:', err);
      res.status(500).json({
        success: false,
        msg: err.message
      });
    }
  },

  // Create time block
  createTimeBlock: async (req, res) => {
    try {
      const timeBlock = await TimeBlock.create(req.body);

      res.status(201).json({
        success: true,
        msg: 'Time block created successfully',
        data: timeBlock
      });
    } catch (err) {
      console.error('Error creating time block:', err);
      res.status(500).json({
        success: false,
        msg: err.message
      });
    }
  },

  // Update time block
  updateTimeBlock: async (req, res) => {
    try {
      const { id } = req.params;
      const timeBlock = await TimeBlock.findByPk(id);

      if (!timeBlock) {
        return res.status(404).json({
          success: false,
          msg: 'Time block not found'
        });
      }

      await timeBlock.update(req.body);

      res.status(200).json({
        success: true,
        msg: 'Time block updated successfully',
        data: timeBlock
      });
    } catch (err) {
      console.error('Error updating time block:', err);
      res.status(500).json({
        success: false,
        msg: err.message
      });
    }
  },

  // Delete time block
  deleteTimeBlock: async (req, res) => {
    try {
      const { id } = req.params;
      const timeBlock = await TimeBlock.findByPk(id);

      if (!timeBlock) {
        return res.status(404).json({
          success: false,
          msg: 'Time block not found'
        });
      }

      await timeBlock.destroy();

      res.status(200).json({
        success: true,
        msg: 'Time block deleted successfully'
      });
    } catch (err) {
      console.error('Error deleting time block:', err);
      res.status(500).json({
        success: false,
        msg: err.message
      });
    }
  },

  // ==================== LEARNING INVESTMENTS ====================

  // Get learning investments for a person
  getLearningInvestments: async (req, res) => {
    try {
      const { personId } = req.params;

      const learningInvestments = await LearningInvestment.findAll({
        where: { personId },
        order: [['createdAt', 'DESC']]
      });

      res.status(200).json({
        success: true,
        count: learningInvestments.length,
        data: learningInvestments
      });
    } catch (err) {
      console.error('Error fetching learning investments:', err);
      res.status(500).json({
        success: false,
        msg: err.message
      });
    }
  },

  // Create learning investment
  createLearningInvestment: async (req, res) => {
    try {
      const learningInvestment = await LearningInvestment.create(req.body);

      res.status(201).json({
        success: true,
        msg: 'Learning investment created successfully',
        data: learningInvestment
      });
    } catch (err) {
      console.error('Error creating learning investment:', err);
      res.status(500).json({
        success: false,
        msg: err.message
      });
    }
  },

  // Update learning investment
  updateLearningInvestment: async (req, res) => {
    try {
      const { id } = req.params;
      const learningInvestment = await LearningInvestment.findByPk(id);

      if (!learningInvestment) {
        return res.status(404).json({
          success: false,
          msg: 'Learning investment not found'
        });
      }

      await learningInvestment.update(req.body);

      res.status(200).json({
        success: true,
        msg: 'Learning investment updated successfully',
        data: learningInvestment
      });
    } catch (err) {
      console.error('Error updating learning investment:', err);
      res.status(500).json({
        success: false,
        msg: err.message
      });
    }
  },

  // Delete learning investment
  deleteLearningInvestment: async (req, res) => {
    try {
      const { id } = req.params;
      const learningInvestment = await LearningInvestment.findByPk(id);

      if (!learningInvestment) {
        return res.status(404).json({
          success: false,
          msg: 'Learning investment not found'
        });
      }

      await learningInvestment.destroy();

      res.status(200).json({
        success: true,
        msg: 'Learning investment deleted successfully'
      });
    } catch (err) {
      console.error('Error deleting learning investment:', err);
      res.status(500).json({
        success: false,
        msg: err.message
      });
    }
  },

  // ==================== FINANCIAL DASHBOARD ====================

  // Get financial dashboard data
  getFinancialDashboard: async (req, res) => {
    try {
      const { personId } = req.params;
      const { months = 3, currentSavings = 0 } = req.query;

      // Calculate date range
      const endDate = new Date();
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - parseInt(months));

      // Get income and expenses for the period
      const [incomeStreams, expenses] = await Promise.all([
        IncomeStream.findAll({
          where: {
            personId,
            createdAt: {
              [Op.between]: [startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]]
            }
          },
          order: [['createdAt', 'ASC']]
        }),
        Expense.findAll({
          where: {
            personId,
            expenseDate: {
              [Op.between]: [startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]]
            }
          },
          order: [['expenseDate', 'ASC']]
        })
      ]);

      // Calculate totals
      const totalIncome = incomeStreams.reduce((sum, income) => sum + parseFloat(income.amount), 0);
      const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
      const netCashFlow = totalIncome - totalExpenses;

      // Calculate vision vs survival income
      const visionIncome = incomeStreams
        .filter(i => i.isVision)
        .reduce((sum, i) => sum + parseFloat(i.amount), 0);
      const survivalIncome = totalIncome - visionIncome;

      // Calculate investment vs pure expenses
      const investmentExpenses = expenses
        .filter(e => e.isInvestment)
        .reduce((sum, e) => sum + parseFloat(e.amount), 0);
      const pureExpenses = totalExpenses - investmentExpenses;

      // Group expenses by category
      const expensesByCategory = expenses.reduce((acc, expense) => {
        const category = expense.category;
        if (!acc[category]) {
          acc[category] = 0;
        }
        acc[category] += parseFloat(expense.amount);
        return acc;
      }, {});

      // Calculate monthly averages
      const monthsCount = parseInt(months);
      const avgMonthlyIncome = totalIncome / monthsCount;
      const avgMonthlyExpenses = totalExpenses / monthsCount;

      // Calculate runway (months until savings depleted at current burn rate)
      const savings = parseFloat(currentSavings);
      const monthlyBurnRate = avgMonthlyExpenses - avgMonthlyIncome;
      const runwayMonths = monthlyBurnRate > 0 ? savings / monthlyBurnRate : Infinity;

      // Build dashboard data
      const dashboard = {
        summary: {
          totalIncome,
          totalExpenses,
          netCashFlow,
          currentSavings: savings,
          runwayMonths: runwayMonths === Infinity ? null : Math.floor(runwayMonths)
        },
        income: {
          total: totalIncome,
          vision: visionIncome,
          survival: survivalIncome,
          avgMonthly: avgMonthlyIncome,
          streams: incomeStreams.length
        },
        expenses: {
          total: totalExpenses,
          investment: investmentExpenses,
          pure: pureExpenses,
          avgMonthly: avgMonthlyExpenses,
          byCategory: expensesByCategory
        },
        trends: {
          // Monthly breakdown
          monthly: generateMonthlyBreakdown(incomeStreams, expenses, monthsCount)
        }
      };

      res.status(200).json({
        success: true,
        dashboard
      });
    } catch (err) {
      console.error('Error fetching financial dashboard:', err);
      res.status(500).json({
        success: false,
        msg: err.message
      });
    }
  }
};

// Helper function to generate monthly breakdown
function generateMonthlyBreakdown(incomeStreams, expenses, months) {
  const breakdown = [];
  const endDate = new Date();

  for (let i = months - 1; i >= 0; i--) {
    const monthDate = new Date();
    monthDate.setMonth(endDate.getMonth() - i);
    const monthStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
    const monthEnd = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);

    const monthIncomes = incomeStreams.filter(income => {
      const date = new Date(income.createdAt);
      return date >= monthStart && date <= monthEnd;
    });

    const monthExpenses = expenses.filter(expense => {
      const date = new Date(expense.expenseDate);
      return date >= monthStart && date <= monthEnd;
    });

    const monthIncome = monthIncomes.reduce((sum, i) => sum + parseFloat(i.amount), 0);
    const monthExpense = monthExpenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);

    breakdown.push({
      month: monthDate.toISOString().slice(0, 7), // YYYY-MM format
      income: monthIncome,
      expenses: monthExpense,
      netCashFlow: monthIncome - monthExpense
    });
  }

  return breakdown;
}

module.exports = lifeOpsCtrl;
