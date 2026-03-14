const { Op } = require('sequelize');
const CommanderCalendar = require('../models/CommanderCalendar');
const Person = require('../models/Person');

const calendarCtrl = {
  // Get all calendar events for a person
  getCalendarEvents: async (req, res) => {
    try {
      const {
        personId,
        startDate,
        endDate,
        eventType,
        status,
        limit = 100,
        offset = 0
      } = req.query;

      const where = {};
      if (personId) where.personId = personId;
      if (eventType) where.eventType = eventType;
      if (status) where.status = status;

      // Date range filter
      if (startDate || endDate) {
        where.startDate = {};
        if (startDate) where.startDate[Op.gte] = new Date(startDate);
        if (endDate) where.startDate[Op.lte] = new Date(endDate);
      }

      const events = await CommanderCalendar.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['startDate', 'ASC']]
      });

      res.status(200).json({
        success: true,
        count: events.count,
        data: events.rows
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Get events for a specific person
  getPersonEvents: async (req, res) => {
    try {
      const { personId } = req.params;
      const { startDate, endDate } = req.query;

      const where = { personId };

      // Date range filter
      if (startDate || endDate) {
        where.startDate = {};
        if (startDate) where.startDate[Op.gte] = new Date(startDate);
        if (endDate) where.startDate[Op.lte] = new Date(endDate);
      }

      const events = await CommanderCalendar.findAll({
        where,
        order: [['startDate', 'ASC']]
      });

      res.status(200).json({
        success: true,
        count: events.length,
        data: events
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Get single event
  getCalendarEvent: async (req, res) => {
    try {
      const event = await CommanderCalendar.findByPk(req.params.id);

      if (!event) {
        return res.status(404).json({ msg: 'Calendar event not found' });
      }

      res.status(200).json({
        success: true,
        data: event
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Create calendar event
  createCalendarEvent: async (req, res) => {
    try {
      const event = await CommanderCalendar.create(req.body);

      res.status(201).json({
        success: true,
        msg: 'Calendar event created successfully',
        data: event
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Update calendar event
  updateCalendarEvent: async (req, res) => {
    try {
      const event = await CommanderCalendar.findByPk(req.params.id);

      if (!event) {
        return res.status(404).json({ msg: 'Calendar event not found' });
      }

      await event.update(req.body);

      res.status(200).json({
        success: true,
        msg: 'Calendar event updated successfully',
        data: event
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Delete calendar event
  deleteCalendarEvent: async (req, res) => {
    try {
      const event = await CommanderCalendar.findByPk(req.params.id);

      if (!event) {
        return res.status(404).json({ msg: 'Calendar event not found' });
      }

      await event.destroy();

      res.status(200).json({
        success: true,
        msg: 'Calendar event deleted successfully'
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Update event status (complete task, etc.)
  updateEventStatus: async (req, res) => {
    try {
      const { status } = req.body;
      const event = await CommanderCalendar.findByPk(req.params.id);

      if (!event) {
        return res.status(404).json({ msg: 'Calendar event not found' });
      }

      await event.update({ status });

      res.status(200).json({
        success: true,
        msg: 'Event status updated successfully',
        data: event
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = calendarCtrl;
