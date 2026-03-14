const { Op } = require('sequelize');
const CompanyLoan = require('../models/CompanyLoan');
const Person = require('../models/Person');
const ErrorResponse = require('../utils/errorResponse');

const loanCtrl = {
  // Get all loans
  getAllLoans: async (req, res) => {
    try {
      const {
        status,
        personId,
        limit = 100,
        offset = 0
      } = req.query;

      const where = {};
      if (status) where.status = status;
      if (personId) where.personId = personId;

      const loans = await CompanyLoan.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['issuedDate', 'DESC']]
      });

      res.status(200).json({
        success: true,
        count: loans.count,
        data: loans.rows
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Get single loan
  getLoan: async (req, res) => {
    try {
      const loan = await CompanyLoan.findByPk(req.params.id);

      if (!loan) {
        return res.status(404).json({ msg: 'Loan not found' });
      }

      // Get person details
      const person = await Person.findByPk(loan.personId, {
        attributes: ['id', 'fullName', 'title', 'photoUrl', 'email']
      });

      res.status(200).json({
        success: true,
        data: {
          ...loan.toJSON(),
          person
        }
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Create loan
  createLoan: async (req, res) => {
    try {
      const loan = await CompanyLoan.create(req.body);

      res.status(201).json({
        success: true,
        msg: 'Loan created successfully',
        data: loan
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Update loan
  updateLoan: async (req, res) => {
    try {
      const loan = await CompanyLoan.findByPk(req.params.id);

      if (!loan) {
        return res.status(404).json({ msg: 'Loan not found' });
      }

      await loan.update(req.body);

      res.status(200).json({
        success: true,
        msg: 'Loan updated successfully',
        data: loan
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Delete loan
  deleteLoan: async (req, res) => {
    try {
      const loan = await CompanyLoan.findByPk(req.params.id);

      if (!loan) {
        return res.status(404).json({ msg: 'Loan not found' });
      }

      await loan.destroy();

      res.status(200).json({
        success: true,
        msg: 'Loan deleted successfully'
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Record payment
  recordPayment: async (req, res) => {
    try {
      const { amount } = req.body;
      const loan = await CompanyLoan.findByPk(req.params.id);

      if (!loan) {
        return res.status(404).json({ msg: 'Loan not found' });
      }

      const newAmountPaid = parseFloat(loan.amountPaid) + parseFloat(amount);
      const updates = { amountPaid: newAmountPaid };

      // Check if fully paid
      if (newAmountPaid >= parseFloat(loan.amount)) {
        updates.status = 'paid';
      }

      await loan.update(updates);

      res.status(200).json({
        success: true,
        msg: 'Payment recorded successfully',
        data: loan
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Get active loans summary
  getActiveLoansSummary: async (req, res) => {
    try {
      const { sequelize } = require('../config/db');

      const summary = await CompanyLoan.findAll({
        where: { status: 'active' },
        attributes: [
          'currency',
          [sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount'],
          [sequelize.fn('SUM', sequelize.col('amount_paid')), 'totalPaid'],
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        group: ['currency']
      });

      res.status(200).json({
        success: true,
        data: summary
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = loanCtrl;
