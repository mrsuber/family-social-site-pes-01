const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('people', 'investment_amount', {
      type: Sequelize.DECIMAL(15, 2),
      allowNull: true,
      comment: 'Amount invested by this person (for investor relationship type)'
    });

    await queryInterface.addColumn('people', 'investment_currency', {
      type: Sequelize.STRING,
      defaultValue: 'XAF',
      comment: 'Currency of the investment'
    });

    await queryInterface.addColumn('people', 'investment_date', {
      type: Sequelize.DATE,
      allowNull: true,
      comment: 'Date when the investment was made'
    });

    await queryInterface.addColumn('people', 'equity_percentage', {
      type: Sequelize.DECIMAL(5, 2),
      allowNull: true,
      comment: 'Percentage of equity owned (0-100)'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('people', 'investment_amount');
    await queryInterface.removeColumn('people', 'investment_currency');
    await queryInterface.removeColumn('people', 'investment_date');
    await queryInterface.removeColumn('people', 'equity_percentage');
  }
};
