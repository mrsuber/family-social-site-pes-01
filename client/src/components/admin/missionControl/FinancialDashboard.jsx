import React, { useState, useEffect } from 'react';
import './FinancialDashboard.css';
import {
  TrendingUp,
  TrendingDown,
  AttachMoney,
  AccountBalance,
  Add,
  Edit,
  Delete,
  FilterList
} from '@material-ui/icons';
import { getAPI, postAPI, putAPI, deleteAPI } from '../../../utils/fetchData';

const FinancialDashboard = ({ personId }) => {
  const [dashboard, setDashboard] = useState(null);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [currentSavings, setCurrentSavings] = useState(0);
  const [months, setMonths] = useState(3);

  const [incomeForm, setIncomeForm] = useState({
    sourceName: '',
    sourceType: 'side_job',
    amount: '',
    receivedDate: new Date().toISOString().split('T')[0],
    isVision: false,
    frequency: 'one_time',
    status: 'received',
    notes: ''
  });

  const [expenseForm, setExpenseForm] = useState({
    category: 'bills',
    description: '',
    amount: '',
    expenseDate: new Date().toISOString().split('T')[0],
    isInvestment: false,
    isRecurring: false,
    nextDueDate: '',
    notes: ''
  });

  useEffect(() => {
    if (personId) {
      fetchFinancialData();
    }
  }, [personId, months, currentSavings]);

  const fetchFinancialData = async () => {
    try {
      const [dashRes, incomeRes, expenseRes] = await Promise.all([
        getAPI(`life-ops/financial-dashboard/${personId}?months=${months}&currentSavings=${currentSavings}`),
        getAPI(`life-ops/income/${personId}?months=${months}`),
        getAPI(`life-ops/expenses/${personId}?months=${months}`)
      ]);

      if (dashRes.data.success) setDashboard(dashRes.data.dashboard);
      if (incomeRes.data.success) setIncomes(incomeRes.data.data);
      if (expenseRes.data.success) setExpenses(expenseRes.data.data);
    } catch (err) {
      console.error('Error fetching financial data:', err);
    }
  };

  const handleIncomeSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...incomeForm, personId };
      if (editingItem) {
        await putAPI(`life-ops/income/${editingItem.id}`, data);
      } else {
        await postAPI('life-ops/income', data);
      }
      fetchFinancialData();
      resetIncomeForm();
    } catch (err) {
      console.error('Error saving income:', err);
    }
  };

  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...expenseForm, personId };
      if (editingItem) {
        await putAPI(`life-ops/expenses/${editingItem.id}`, data);
      } else {
        await postAPI('life-ops/expenses', data);
      }
      fetchFinancialData();
      resetExpenseForm();
    } catch (err) {
      console.error('Error saving expense:', err);
    }
  };

  const deleteIncome = async (id) => {
    if (window.confirm('Delete this income stream?')) {
      try {
        await deleteAPI(`life-ops/income/${id}`);
        fetchFinancialData();
      } catch (err) {
        console.error('Error deleting income:', err);
      }
    }
  };

  const deleteExpense = async (id) => {
    if (window.confirm('Delete this expense?')) {
      try {
        await deleteAPI(`life-ops/expenses/${id}`);
        fetchFinancialData();
      } catch (err) {
        console.error('Error deleting expense:', err);
      }
    }
  };

  const editIncome = (income) => {
    setEditingItem(income);
    setIncomeForm({
      sourceName: income.sourceName,
      sourceType: income.sourceType,
      amount: income.amount,
      receivedDate: income.receivedDate,
      isVision: income.isVision,
      frequency: income.frequency,
      status: income.status,
      notes: income.notes || ''
    });
    setShowIncomeForm(true);
  };

  const editExpense = (expense) => {
    setEditingItem(expense);
    setExpenseForm({
      category: expense.category,
      description: expense.description,
      amount: expense.amount,
      expenseDate: expense.expenseDate,
      isInvestment: expense.isInvestment,
      isRecurring: expense.isRecurring,
      nextDueDate: expense.nextDueDate || '',
      notes: expense.notes || ''
    });
    setShowExpenseForm(true);
  };

  const resetIncomeForm = () => {
    setIncomeForm({
      sourceName: '',
      sourceType: 'side_job',
      amount: '',
      receivedDate: new Date().toISOString().split('T')[0],
      isVision: false,
      frequency: 'one_time',
      status: 'received',
      notes: ''
    });
    setEditingItem(null);
    setShowIncomeForm(false);
  };

  const resetExpenseForm = () => {
    setExpenseForm({
      category: 'bills',
      description: '',
      amount: '',
      expenseDate: new Date().toISOString().split('T')[0],
      isInvestment: false,
      isRecurring: false,
      nextDueDate: '',
      notes: ''
    });
    setEditingItem(null);
    setShowExpenseForm(false);
  };

  const getRunwayColor = () => {
    if (!dashboard || !dashboard.summary || dashboard.summary.runwayMonths === 'Infinite') return '#10b981';
    const runway = parseFloat(dashboard.summary.runwayMonths);
    if (runway > 6) return '#10b981';
    if (runway > 3) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="financial-dashboard">
      <div className="dashboard-header">
        <h2>Financial Command Center</h2>
        <div className="header-controls">
          <div className="savings-input">
            <label>Current Savings: FCFA</label>
            <input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              placeholder="0"
            />
          </div>
          <select value={months} onChange={(e) => setMonths(e.target.value)} className="months-select">
            <option value="1">Last Month</option>
            <option value="3">Last 3 Months</option>
            <option value="6">Last 6 Months</option>
            <option value="12">Last Year</option>
          </select>
        </div>
      </div>

      {dashboard && (
        <div className="dashboard-metrics">
          <div className="metric-card runway-card" style={{ borderLeftColor: getRunwayColor() }}>
            <div className="metric-icon">
              <AccountBalance />
            </div>
            <div className="metric-content">
              <h3>Financial Runway</h3>
              <div className="metric-value" style={{ color: getRunwayColor() }}>
                {dashboard.summary.runwayMonths === 'Infinite' || dashboard.summary.runwayMonths === null
                  ? '∞'
                  : `${dashboard.summary.runwayMonths} months`}
              </div>
              <p className="metric-subtitle">
                {dashboard.summary.runwayMonths === 'Infinite' || dashboard.summary.runwayMonths === null
                  ? 'Thriving! Income exceeds expenses'
                  : 'Until funds depleted at current burn rate'}
              </p>
            </div>
          </div>

          <div className="metric-card income-card">
            <div className="metric-icon">
              <TrendingUp />
            </div>
            <div className="metric-content">
              <h3>Avg Monthly Income</h3>
              <div className="metric-value">FCFA {dashboard.income?.avgMonthly?.toFixed(2) || '0.00'}</div>
              <p className="metric-subtitle">Over last {months} months</p>
            </div>
          </div>

          <div className="metric-card expense-card">
            <div className="metric-icon">
              <TrendingDown />
            </div>
            <div className="metric-content">
              <h3>Avg Monthly Expenses</h3>
              <div className="metric-value">FCFA {dashboard.expenses?.avgMonthly?.toFixed(2) || '0.00'}</div>
              <p className="metric-subtitle">Over last {months} months</p>
            </div>
          </div>

          <div className={`metric-card cashflow-card ${parseFloat(dashboard.summary?.netCashFlow || 0) >= 0 ? 'positive' : 'negative'}`}>
            <div className="metric-icon">
              <AttachMoney />
            </div>
            <div className="metric-content">
              <h3>Net Cash Flow</h3>
              <div className="metric-value">
                {parseFloat(dashboard.summary?.netCashFlow || 0) >= 0 ? '+' : ''}FCFA {dashboard.summary?.netCashFlow?.toFixed(2) || '0.00'}
              </div>
              <p className="metric-subtitle">
                {parseFloat(dashboard.summary?.netCashFlow || 0) >= 0 ? 'Positive momentum!' : 'Survival mode active'}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="financial-sections">
        <div className="section income-section">
          <div className="section-header">
            <h3>Income Streams</h3>
            <button onClick={() => setShowIncomeForm(true)} className="btn-add">
              <Add /> Add Income
            </button>
          </div>

          {showIncomeForm && (
            <div className="form-overlay" onClick={resetIncomeForm}>
              <form className="financial-form" onClick={(e) => e.stopPropagation()} onSubmit={handleIncomeSubmit}>
                <h4>{editingItem ? 'Edit Income' : 'New Income Stream'}</h4>

                <input
                  type="text"
                  placeholder="Source name (e.g., Side Job, Freelance Project)"
                  value={incomeForm.sourceName}
                  onChange={(e) => setIncomeForm({ ...incomeForm, sourceName: e.target.value })}
                  required
                />

                <div className="form-row">
                  <select
                    value={incomeForm.sourceType}
                    onChange={(e) => setIncomeForm({ ...incomeForm, sourceType: e.target.value })}
                  >
                    <option value="subercraftex">Subercraftex (Vision)</option>
                    <option value="side_job">Side Job (Survival)</option>
                    <option value="freelance">Freelance</option>
                    <option value="consulting">Consulting</option>
                    <option value="passive">Passive Income</option>
                    <option value="other">Other</option>
                  </select>

                  <input
                    type="number"
                    step="0.01"
                    placeholder="Amount"
                    value={incomeForm.amount}
                    onChange={(e) => setIncomeForm({ ...incomeForm, amount: e.target.value })}
                    required
                  />
                </div>

                <div className="form-row">
                  <input
                    type="date"
                    value={incomeForm.receivedDate}
                    onChange={(e) => setIncomeForm({ ...incomeForm, receivedDate: e.target.value })}
                    required
                  />

                  <select
                    value={incomeForm.frequency}
                    onChange={(e) => setIncomeForm({ ...incomeForm, frequency: e.target.value })}
                  >
                    <option value="one_time">One-time</option>
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={incomeForm.isVision}
                    onChange={(e) => setIncomeForm({ ...incomeForm, isVision: e.target.checked })}
                  />
                  This is vision work (Subercraftex)
                </label>

                <textarea
                  placeholder="Notes (optional)"
                  value={incomeForm.notes}
                  onChange={(e) => setIncomeForm({ ...incomeForm, notes: e.target.value })}
                  rows={3}
                />

                <div className="form-actions">
                  <button type="button" onClick={resetIncomeForm} className="btn-cancel">
                    Cancel
                  </button>
                  <button type="submit" className="btn-save">
                    {editingItem ? 'Update' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="items-list">
            {incomes.map(income => (
              <div key={income.id} className={`item-card ${income.isVision ? 'vision' : 'survival'}`}>
                <div className="item-main">
                  <div className="item-header">
                    <h4>{income.sourceName}</h4>
                    <span className={`badge ${income.isVision ? 'badge-vision' : 'badge-survival'}`}>
                      {income.isVision ? 'Vision' : 'Survival'}
                    </span>
                  </div>
                  <div className="item-amount">FCFA {parseFloat(income.amount).toFixed(2)}</div>
                  <div className="item-meta">
                    <span>{income.sourceType.replace('_', ' ')}</span>
                    <span>{new Date(income.receivedDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="item-actions">
                  <button onClick={() => editIncome(income)} className="btn-icon">
                    <Edit />
                  </button>
                  <button onClick={() => deleteIncome(income.id)} className="btn-icon btn-delete">
                    <Delete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section expense-section">
          <div className="section-header">
            <h3>Expenses</h3>
            <button onClick={() => setShowExpenseForm(true)} className="btn-add">
              <Add /> Add Expense
            </button>
          </div>

          {showExpenseForm && (
            <div className="form-overlay" onClick={resetExpenseForm}>
              <form className="financial-form" onClick={(e) => e.stopPropagation()} onSubmit={handleExpenseSubmit}>
                <h4>{editingItem ? 'Edit Expense' : 'New Expense'}</h4>

                <input
                  type="text"
                  placeholder="Description"
                  value={expenseForm.description}
                  onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
                  required
                />

                <div className="form-row">
                  <select
                    value={expenseForm.category}
                    onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                  >
                    <option value="bills">Bills</option>
                    <option value="food">Food</option>
                    <option value="medical">Medical</option>
                    <option value="learning">Learning</option>
                    <option value="business">Business</option>
                    <option value="networking">Networking</option>
                    <option value="transport">Transport</option>
                    <option value="housing">Housing</option>
                    <option value="other">Other</option>
                  </select>

                  <input
                    type="number"
                    step="0.01"
                    placeholder="Amount"
                    value={expenseForm.amount}
                    onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                    required
                  />
                </div>

                <input
                  type="date"
                  value={expenseForm.expenseDate}
                  onChange={(e) => setExpenseForm({ ...expenseForm, expenseDate: e.target.value })}
                  required
                />

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={expenseForm.isInvestment}
                    onChange={(e) => setExpenseForm({ ...expenseForm, isInvestment: e.target.checked })}
                  />
                  This is an investment in my future (learning, networking, etc.)
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={expenseForm.isRecurring}
                    onChange={(e) => setExpenseForm({ ...expenseForm, isRecurring: e.target.checked })}
                  />
                  Recurring expense
                </label>

                {expenseForm.isRecurring && (
                  <input
                    type="date"
                    placeholder="Next due date"
                    value={expenseForm.nextDueDate}
                    onChange={(e) => setExpenseForm({ ...expenseForm, nextDueDate: e.target.value })}
                  />
                )}

                <textarea
                  placeholder="Notes (optional)"
                  value={expenseForm.notes}
                  onChange={(e) => setExpenseForm({ ...expenseForm, notes: e.target.value })}
                  rows={3}
                />

                <div className="form-actions">
                  <button type="button" onClick={resetExpenseForm} className="btn-cancel">
                    Cancel
                  </button>
                  <button type="submit" className="btn-save">
                    {editingItem ? 'Update' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="items-list">
            {expenses.map(expense => (
              <div key={expense.id} className={`item-card ${expense.isInvestment ? 'investment' : 'expense'}`}>
                <div className="item-main">
                  <div className="item-header">
                    <h4>{expense.description}</h4>
                    <span className={`badge ${expense.isInvestment ? 'badge-investment' : 'badge-expense'}`}>
                      {expense.isInvestment ? 'Investment' : 'Expense'}
                    </span>
                  </div>
                  <div className="item-amount">-FCFA {parseFloat(expense.amount).toFixed(2)}</div>
                  <div className="item-meta">
                    <span>{expense.category}</span>
                    <span>{new Date(expense.expenseDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="item-actions">
                  <button onClick={() => editExpense(expense)} className="btn-icon">
                    <Edit />
                  </button>
                  <button onClick={() => deleteExpense(expense.id)} className="btn-icon btn-delete">
                    <Delete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialDashboard;
