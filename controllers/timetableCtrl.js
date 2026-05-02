const DailyTimetable = require('../models/DailyTimetable');
const Person = require('../models/Person');

// Weekday time blocks template
const weekdayTimeBlocks = [
  {
    id: 1,
    startTime: '22:00',
    endTime: '05:00',
    title: 'Sleep',
    duration: '7h',
    category: 'rest',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null
  },
  {
    id: 2,
    startTime: '05:00',
    endTime: '08:00',
    title: 'Deep Focus Software Work',
    duration: '3h',
    category: 'client-work',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null,
    description: 'Client projects (Abba contract) - PRIMARY INCOME SOURCE'
  },
  {
    id: 3,
    startTime: '08:00',
    endTime: '09:00',
    title: 'Break/Breakfast',
    duration: '1h',
    category: 'break',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null
  },
  {
    id: 4,
    startTime: '09:00',
    endTime: '09:30',
    title: 'SuberCraftex Daily Planning',
    duration: '30m',
    category: 'subercraftex',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null,
    description: 'Plan the day\'s SuberCraftex work, prioritize tasks'
  },
  {
    id: 5,
    startTime: '09:30',
    endTime: '10:30',
    title: 'Active SuberCraftex Work',
    duration: '1h',
    category: 'subercraftex',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null,
    description: 'Execute: product creation, filming, design, curriculum work'
  },
  {
    id: 6,
    startTime: '10:30',
    endTime: '11:30',
    title: 'Progress Review & Wrap-Up',
    duration: '1h',
    category: 'subercraftex',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null,
    description: 'Document progress, conclude tasks, prepare handoff'
  },
  {
    id: 7,
    startTime: '11:30',
    endTime: '12:00',
    title: 'Final Conclusion',
    duration: '30m',
    category: 'subercraftex',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null,
    description: 'Close out SuberCraftex work session'
  },
  {
    id: 8,
    startTime: '12:00',
    endTime: '13:00',
    title: 'Break/Lunch',
    duration: '1h',
    category: 'break',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null
  },
  {
    id: 9,
    startTime: '13:00',
    endTime: '15:00',
    title: 'Islam Study/Practice',
    duration: '2h',
    category: 'spiritual',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null,
    description: 'Quran, prayer, Islamic education, spiritual growth'
  },
  {
    id: 10,
    startTime: '15:00',
    endTime: '17:00',
    title: 'Sales, Marketing & Outreach',
    duration: '2h',
    category: 'business-development',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null,
    description: 'Client visits, marketing, posting online, engagement, sales calls'
  },
  {
    id: 11,
    startTime: '17:00',
    endTime: '22:00',
    title: 'Socializing & Family Time',
    duration: '5h',
    category: 'personal',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null,
    description: 'Fauzia, family, friends, personal relationships, relaxation'
  }
];

// Weekend time blocks template
const weekendTimeBlocks = [
  {
    id: 1,
    startTime: '22:00',
    endTime: '07:00',
    title: 'Sleep',
    duration: '9h',
    category: 'rest',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null,
    description: 'Extra sleep on weekends'
  },
  {
    id: 2,
    startTime: '07:00',
    endTime: '09:00',
    title: 'Morning Routine & Breakfast',
    duration: '2h',
    category: 'personal',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null
  },
  {
    id: 3,
    startTime: '09:00',
    endTime: '12:00',
    title: 'Video Editing Session 1',
    duration: '3h',
    category: 'content-creation',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null,
    description: 'Edit weekly video content'
  },
  {
    id: 4,
    startTime: '12:00',
    endTime: '13:00',
    title: 'Lunch Break',
    duration: '1h',
    category: 'break',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null
  },
  {
    id: 5,
    startTime: '13:00',
    endTime: '16:00',
    title: 'Video Editing Session 2',
    duration: '3h',
    category: 'content-creation',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null,
    description: 'Continue editing or start new video'
  },
  {
    id: 6,
    startTime: '16:00',
    endTime: '17:00',
    title: 'Social Media Posting',
    duration: '1h',
    category: 'content-creation',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null,
    description: 'Post weekly video, engage with audience'
  },
  {
    id: 7,
    startTime: '17:00',
    endTime: '22:00',
    title: 'Rewiring/Rest/Family Time',
    duration: '5h',
    category: 'personal',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null,
    description: 'Decompress, reflect, recharge for next week'
  }
];

const timetableCtrl = {
  // Get timetable for specific person and date
  getTimetable: async (req, res) => {
    try {
      const { personId, date } = req.params;

      const timetable = await DailyTimetable.findOne({
        where: {
          personId,
          date
        }
      });

      if (!timetable) {
        return res.status(404).json({ msg: 'Timetable not found for this date' });
      }

      res.json({ success: true, data: timetable });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Get week view
  getWeekTimetables: async (req, res) => {
    try {
      const { personId, startDate } = req.params;

      // Calculate week dates (7 days from startDate)
      const dates = [];
      const start = new Date(startDate);
      for (let i = 0; i < 7; i++) {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        dates.push(date.toISOString().split('T')[0]);
      }

      const timetables = await DailyTimetable.findAll({
        where: {
          personId,
          date: dates
        },
        order: [['date', 'ASC']]
      });

      res.json({ success: true, data: timetables });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Create new timetable
  createTimetable: async (req, res) => {
    try {
      const { personId, date, dayType } = req.body;

      // Check if timetable already exists
      const existing = await DailyTimetable.findOne({
        where: { personId, date }
      });

      if (existing) {
        return res.status(400).json({ msg: 'Timetable already exists for this date' });
      }

      // Determine day type if not provided
      let finalDayType = dayType;
      if (!finalDayType) {
        const dayOfWeek = new Date(date).getDay();
        finalDayType = (dayOfWeek === 0 || dayOfWeek === 6) ? 'weekend' : 'weekday';
      }

      // Select appropriate time blocks
      const timeBlocks = finalDayType === 'weekend' ? weekendTimeBlocks : weekdayTimeBlocks;

      const timetable = await DailyTimetable.create({
        personId,
        date,
        dayType: finalDayType,
        timeBlocks: JSON.parse(JSON.stringify(timeBlocks)), // Deep copy
        overallCompletion: 0,
        adherenceScore: 0,
        energyLevel: 3,
        isCompleted: false
      });

      res.json({ success: true, data: timetable });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Update timetable (daily log fields)
  updateTimetable: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      const timetable = await DailyTimetable.findByPk(id);

      if (!timetable) {
        return res.status(404).json({ msg: 'Timetable not found' });
      }

      // Update allowed fields
      const allowedFields = ['accomplishments', 'challenges', 'tomorrowPriority', 'notes', 'energyLevel', 'isCompleted'];
      allowedFields.forEach(field => {
        if (updates[field] !== undefined) {
          timetable[field] = updates[field];
        }
      });

      await timetable.save();

      res.json({ success: true, data: timetable });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Update specific time block
  updateTimeBlock: async (req, res) => {
    try {
      const { id, blockId } = req.params;
      const updates = req.body;

      const timetable = await DailyTimetable.findByPk(id);

      if (!timetable) {
        return res.status(404).json({ msg: 'Timetable not found' });
      }

      const timeBlocks = timetable.timeBlocks;
      const blockIndex = timeBlocks.findIndex(b => b.id === parseInt(blockId));

      if (blockIndex === -1) {
        return res.status(404).json({ msg: 'Time block not found' });
      }

      // Update the block
      timeBlocks[blockIndex] = {
        ...timeBlocks[blockIndex],
        ...updates
      };

      timetable.timeBlocks = timeBlocks;

      // Recalculate completion percentage
      const completed = timeBlocks.filter(b => b.completed).length;
      timetable.overallCompletion = Math.round((completed / timeBlocks.length) * 100);

      // Calculate adherence score (completed + in_progress blocks)
      const adhered = timeBlocks.filter(b => b.completed || b.status === 'in_progress').length;
      timetable.adherenceScore = Math.round((adhered / timeBlocks.length) * 100);

      await timetable.save();

      res.json({ success: true, data: timetable });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Delete timetable
  deleteTimetable: async (req, res) => {
    try {
      const { id } = req.params;

      const timetable = await DailyTimetable.findByPk(id);

      if (!timetable) {
        return res.status(404).json({ msg: 'Timetable not found' });
      }

      await timetable.destroy();

      res.json({ success: true, msg: 'Timetable deleted successfully' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = timetableCtrl;
