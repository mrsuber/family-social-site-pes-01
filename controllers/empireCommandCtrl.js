const EmpireCommand = require('../models/EmpireCommand');

const empireCommandCtrl = {
  // Get Empire Command data for current user
  getEmpireCommand: async (req, res) => {
    try {
      let commandData = await EmpireCommand.findOne({ userId: req.user.id });

      // If no data exists, create default data
      if (!commandData) {
        const defaultData = {
          userId: req.user.id,
          vitalSigns: {
            cashNet: 238600,
            runway: 2.5,
            nextDeadline: {
              title: 'Ali arrives',
              days: calculateDaysUntil(2026, 9, 10),
              date: 'Oct 10'
            },
            criticalProject: {
              name: 'SuberFood',
              completion: 70,
              daysToLaunch: calculateDaysUntil(2026, 11, 1)
            },
            peopleStatus: {
              alertLevel: 'urgent',
              message: 'Training not ready'
            }
          },
          projects: {
            critical: ['suberfood', 'sdo'],
            active: ['pwc', 'craftex'],
            hold: ['ngo', 'bank', 'growth']
          },
          timeAllocation: {
            camsol: 24,
            suberfood: 12,
            admin: 4
          },
          income: 300000,
          expenses: [
            { name: 'Rent', amount: 70000 },
            { name: 'Food', amount: 50000 },
            { name: 'Internet', amount: 30000 },
            { name: 'Hosting / Cloud', amount: 18600 },
            { name: 'Claude AI (×2)', amount: 24000 },
            { name: 'Utilities', amount: 20000 },
            { name: 'Other', amount: 26000 }
          ],
          timeline: [
            { date: 'Oct 10', label: 'Ali arrives', month: 9, day: 10, color: '#EF4444', priority: 'critical' },
            { date: 'Oct 20', label: 'SDO report due', month: 9, day: 20, color: '#F59E0B', priority: 'high' },
            { date: 'Oct 31', label: 'SuberFood platform complete', month: 9, day: 31, color: '#EF4444', priority: 'critical' },
            { date: 'Nov 1–15', label: 'Ali surveys Buea customers', month: 10, day: 1, color: '#3B82F6', priority: 'medium' },
            { date: 'Nov 16–30', label: 'Farmer visits — Foumbot, Yaoundé', month: 10, day: 16, color: '#3B82F6', priority: 'medium' },
            { date: 'Dec 1', label: 'SuberFood launch', month: 11, day: 1, color: '#EF4444', priority: 'critical' }
          ],
          team: [
            {
              name: 'Ali Barkat',
              role: 'SuberFood Operations Manager',
              status: 'arriving',
              arrivalDate: new Date(2026, 9, 10),
              tasks: ['Complete platform training', 'Review customer survey plan', 'Identify target quarters in Buea'],
              notes: 'Living with you in Buea'
            },
            {
              name: 'KD',
              role: 'Accountant / tax compliance',
              status: 'waiting',
              notes: 'Hire when SuberFood hits 200K/mo'
            }
          ],
          settings: {
            viewMode: 'commander',
            showMorningBrief: true
          }
        };

        commandData = await EmpireCommand.create(defaultData);
      }

      res.json({
        msg: 'Empire Command data loaded',
        data: commandData
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Update Empire Command data
  updateEmpireCommand: async (req, res) => {
    try {
      const {
        vitalSigns,
        projects,
        timeAllocation,
        income,
        expenses,
        timeline,
        team,
        settings
      } = req.body;

      const update = {};
      if (vitalSigns) update.vitalSigns = vitalSigns;
      if (projects) update.projects = projects;
      if (timeAllocation) update.timeAllocation = timeAllocation;
      if (income !== undefined) update.income = income;
      if (expenses) update.expenses = expenses;
      if (timeline) update.timeline = timeline;
      if (team) update.team = team;
      if (settings) update.settings = settings;

      const commandData = await EmpireCommand.findOneAndUpdate(
        { userId: req.user.id },
        update,
        { new: true, upsert: true }
      );

      res.json({
        msg: 'Empire Command data updated',
        data: commandData
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Update time allocation
  updateTimeAllocation: async (req, res) => {
    try {
      const { camsol, suberfood, admin } = req.body;

      const commandData = await EmpireCommand.findOneAndUpdate(
        { userId: req.user.id },
        {
          $set: {
            'timeAllocation.camsol': camsol,
            'timeAllocation.suberfood': suberfood,
            'timeAllocation.admin': admin
          }
        },
        { new: true }
      );

      if (!commandData) {
        return res.status(404).json({ msg: 'Empire Command data not found' });
      }

      res.json({
        msg: 'Time allocation updated',
        data: commandData
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Add expense
  addExpense: async (req, res) => {
    try {
      const { name, amount } = req.body;

      if (!name || !amount) {
        return res.status(400).json({ msg: 'Name and amount are required' });
      }

      const commandData = await EmpireCommand.findOneAndUpdate(
        { userId: req.user.id },
        {
          $push: {
            expenses: { name, amount }
          }
        },
        { new: true }
      );

      if (!commandData) {
        return res.status(404).json({ msg: 'Empire Command data not found' });
      }

      res.json({
        msg: 'Expense added',
        data: commandData
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Update project priority (move between critical/active/hold)
  updateProjectPriority: async (req, res) => {
    try {
      const { projectId, fromLane, toLane } = req.body;

      if (!projectId || !fromLane || !toLane) {
        return res.status(400).json({ msg: 'projectId, fromLane, and toLane are required' });
      }

      const validLanes = ['critical', 'active', 'hold'];
      if (!validLanes.includes(fromLane) || !validLanes.includes(toLane)) {
        return res.status(400).json({ msg: 'Invalid lane name' });
      }

      const commandData = await EmpireCommand.findOne({ userId: req.user.id });

      if (!commandData) {
        return res.status(404).json({ msg: 'Empire Command data not found' });
      }

      // Remove from old lane
      commandData.projects[fromLane] = commandData.projects[fromLane].filter(
        id => id !== projectId
      );

      // Add to new lane
      if (!commandData.projects[toLane].includes(projectId)) {
        commandData.projects[toLane].push(projectId);
      }

      await commandData.save();

      res.json({
        msg: 'Project priority updated',
        data: commandData
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Update settings
  updateSettings: async (req, res) => {
    try {
      const { viewMode, showMorningBrief, lastMorningBrief } = req.body;

      const update = {};
      if (viewMode) update['settings.viewMode'] = viewMode;
      if (showMorningBrief !== undefined) update['settings.showMorningBrief'] = showMorningBrief;
      if (lastMorningBrief) update['settings.lastMorningBrief'] = lastMorningBrief;

      const commandData = await EmpireCommand.findOneAndUpdate(
        { userId: req.user.id },
        { $set: update },
        { new: true }
      );

      if (!commandData) {
        return res.status(404).json({ msg: 'Empire Command data not found' });
      }

      res.json({
        msg: 'Settings updated',
        data: commandData
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};

// Helper function to calculate days until a date
function calculateDaysUntil(year, month, day) {
  const target = new Date(year, month, day);
  const today = new Date();
  return Math.round((target - today) / (1000 * 60 * 60 * 24));
}

module.exports = empireCommandCtrl;
