import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAPI, postAPI, putAPI, deleteAPI } from '../../../utils/fetchData';
import './EmpireCommandCenter.css';

const EmpireCommandCenter = () => {
  const { auth } = useSelector(state => state);
  const [viewMode, setViewMode] = useState('commander'); // 'commander' or 'ali'
  const [commandData, setCommandData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [showModal, setShowModal] = useState(null); // 'morning', 'tasks', 'details', 'expense', 'eod'
  const [selectedProject, setSelectedProject] = useState(null);

  // Vital signs expansion
  const [expandedVital, setExpandedVital] = useState(null);

  // FAB state
  const [fabOpen, setFabOpen] = useState(false);

  // Toast notification
  const [toast, setToast] = useState(null);

  // Date calculations
  const TODAY = new Date();
  const calculateDaysUntil = (year, month, day) => {
    const target = new Date(year, month, day);
    return Math.round((target - TODAY) / (1000 * 60 * 60 * 24));
  };

  const daysToAli = calculateDaysUntil(2026, 9, 10);
  const daysToLaunch = calculateDaysUntil(2026, 11, 1);

  // Load data from backend
  useEffect(() => {
    loadCommandData();
  }, []);

  const loadCommandData = async () => {
    try {
      setLoading(true);
      const res = await getAPI('empire-command', auth.token);
      setCommandData(res.data.data);
    } catch (err) {
      console.error('Error loading empire command data:', err);
      // Initialize with default data if backend not ready
      setCommandData(getDefaultData());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultData = () => ({
    vitalSigns: {
      cashNet: 238600,
      runway: 2.5,
      nextDeadline: { title: 'Ali arrives', days: daysToAli, date: 'Oct 10' },
      criticalProject: { name: 'SuberFood', completion: 70, daysToLaunch },
      peopleStatus: { alertLevel: 'urgent', message: 'Training not ready' }
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
    expenses: [
      ['Rent', 70000],
      ['Food', 50000],
      ['Internet', 30000],
      ['Hosting / Cloud', 18600],
      ['Claude AI (×2)', 24000],
      ['Utilities', 20000],
      ['Other', 26000]
    ],
    income: 300000
  });

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2600);
  };

  // Auto-adjust time allocation
  const handleAutoAdjust = async () => {
    try {
      await putAPI('empire-command/time-allocation/auto-adjust', null, auth.token);
      await loadCommandData();
      showToast('Time rebalanced: SDO 20h · SuberFood 16h');
    } catch (err) {
      showToast('Error adjusting time: ' + err.response?.data?.msg || err.message);
    }
  };

  // Update time allocation
  const handleUpdateTimeAllocation = async (camsol, suberfood, admin) => {
    try {
      await putAPI('empire-command/time-allocation', { camsol, suberfood, admin }, auth.token);
      await loadCommandData();
      showToast('Time allocation updated');
      setShowModal(null);
    } catch (err) {
      showToast('Error updating time: ' + err.response?.data?.msg || err.message);
    }
  };

  // Add expense
  const handleAddExpense = async (name, amount) => {
    try {
      await postAPI('empire-command/expense', { name, amount }, auth.token);
      await loadCommandData();
      showToast('Expense added');
      setShowModal(null);
    } catch (err) {
      showToast('Error adding expense: ' + err.response?.data?.msg || err.message);
    }
  };

  // Update expense
  const handleUpdateExpense = async (index, name, amount) => {
    try {
      await putAPI('empire-command/expense', { index, name, amount }, auth.token);
      await loadCommandData();
      showToast('Expense updated');
    } catch (err) {
      showToast('Error updating expense: ' + err.response?.data?.msg || err.message);
    }
  };

  // Delete expense
  const handleDeleteExpense = async (index) => {
    try {
      await deleteAPI('empire-command/expense', auth.token, { index });
      await loadCommandData();
      showToast('Expense deleted');
    } catch (err) {
      showToast('Error deleting expense: ' + err.response?.data?.msg || err.message);
    }
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString('en-US') + ' XAF';
  };

  const PulseIndicator = ({ color }) => (
    <span className="pulse-indicator" style={{ '--pulse-color': color }}></span>
  );

  if (loading) {
    return <div className="loading-empire">Loading Empire Command Center...</div>;
  }

  const data = commandData || getDefaultData();
  const netShort = data.vitalSigns.cashNet >= 0
    ? '+' + Math.round(data.vitalSigns.cashNet / 100) / 10 + 'K'
    : Math.round(data.vitalSigns.cashNet / 100) / 10 + 'K';

  return (
    <div className="empire-command-center">
      {/* Header */}
      <header className="ecc-header">
        <div className="header-info">
          <div className="header-subtitle">MOHAMAD SIYSINYUY · HIGH COMMANDER · BUEA, CM</div>
          <div className="header-title">EMPIRE COMMAND CENTER</div>
        </div>
        <div className="header-actions">
          <span className="header-date">{TODAY.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <button onClick={() => setShowModal('morning')}>Morning brief</button>
          {viewMode === 'commander' ? (
            <button onClick={() => setViewMode('ali')}>Ali's view</button>
          ) : (
            <button onClick={() => setViewMode('commander')}>Commander view</button>
          )}
        </div>
      </header>

      {/* Zone 1: Vital Signs */}
      <section className="zone-vital-signs">
        <div className="vital-cards">
          {/* Cash Card */}
          <button
            className="vital-card vital-cash"
            onClick={() => setExpandedVital(expandedVital === 'cash' ? null : 'cash')}
          >
            <span className="vital-label">CASH · NET THIS MONTH</span>
            <span className="vital-value">{netShort} XAF</span>
            <span className="vital-meta">{data.vitalSigns.runway} mo runway</span>
            <span className="vital-status positive">● POSITIVE</span>
          </button>

          {/* Deadline Card */}
          <button
            className="vital-card vital-deadline"
            onClick={() => setExpandedVital(expandedVital === 'deadline' ? null : 'deadline')}
          >
            <span className="vital-label">NEXT DEADLINE</span>
            <span className="vital-value">{data.vitalSigns.nextDeadline.days} DAYS</span>
            <span className="vital-meta">{data.vitalSigns.nextDeadline.title} {data.vitalSigns.nextDeadline.date}</span>
            <span className="vital-status urgent">
              <PulseIndicator color="#EF4444" /> URGENT
            </span>
          </button>

          {/* Critical Project Card */}
          <button
            className="vital-card vital-critical"
            onClick={() => setExpandedVital(expandedVital === 'critical' ? null : 'critical')}
          >
            <span className="vital-label">CRITICAL PROJECT</span>
            <span className="vital-value">{data.vitalSigns.criticalProject.name}</span>
            <span className="vital-meta">Platform {data.vitalSigns.criticalProject.completion}% · launch in {data.vitalSigns.criticalProject.daysToLaunch} days</span>
            <span className="vital-status at-risk">
              <PulseIndicator color="#F59E0B" /> AT RISK
            </span>
          </button>

          {/* People Card */}
          <button
            className="vital-card vital-people"
            onClick={() => setExpandedVital(expandedVital === 'people' ? null : 'people')}
          >
            <span className="vital-label">PEOPLE</span>
            <span className="vital-value">Ali arrives</span>
            <span className="vital-meta">in {daysToAli} days · training not ready</span>
            <span className="vital-status urgent">
              <PulseIndicator color="#EF4444" /> URGENT
            </span>
          </button>
        </div>

        {/* Expanded Vital Details */}
        {expandedVital === 'cash' && (
          <div className="vital-expansion">
            <div className="cash-breakdown">
              <div className="breakdown-header">CASH BREAKDOWN · OCTOBER</div>
              <div className="breakdown-row">
                <span>IN · Camsol SDO</span>
                <span className="positive">{formatCurrency(data.income)}</span>
              </div>
              <div className="breakdown-row">
                <span>OUT</span>
                <span className="negative">{formatCurrency(data.expenses.reduce((a, [, v]) => a + v, 0))}</span>
              </div>
              {data.expenses.slice(0, 3).map(([name, amount]) => (
                <div key={name} className="breakdown-row sub">
                  <span>{name}</span>
                  <span>{formatCurrency(amount)}</span>
                </div>
              ))}
              <div className="breakdown-row sub">
                <span>Other</span>
                <span>{formatCurrency(data.expenses.slice(3).reduce((a, [, v]) => a + v, 0))}</span>
              </div>
              <div className="breakdown-row total">
                <span>NET</span>
                <span className="positive">{formatCurrency(data.vitalSigns.cashNet)}</span>
              </div>
            </div>
            <div className="warning-box">
              <div className="warning-title">If SuberFood doesn't launch by December</div>
              You run out of money by January. Camsol is the only income and the client won't pay more.
            </div>
          </div>
        )}
      </section>

      {/* Zones 3 & 4: Constellation and Energy Flows */}
      <div className="zones-34">
        {/* Zone 3: Project Constellation */}
        <section className="zone-constellation">
          <div className="zone-header">
            <span className="zone-label">03 · PROJECT CONSTELLATION</span>
            <span className="zone-hint">3D · drag to rotate · add nodes as the empire grows</span>
          </div>
          <div className="constellation-frame">
            <iframe
              src="/Constellation-3D.html"
              title="3D project constellation"
              className="constellation-iframe"
            />
          </div>
        </section>

      </div>

      {/* Zone 5: Geographic Operations */}
      <section className="zone-geography">
        <div className="zone-label">05 · GEOGRAPHIC OPERATIONS</div>
        <div className="geography-grid">
          <div className="map-frame">
            <iframe
              src="/Cameroon-Map.html"
              title="Cameroon operations map"
              className="map-iframe"
            />
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <div className="fab-container">
        {fabOpen && (
          <div className="fab-menu">
            <button onClick={() => { setShowModal('eod'); setFabOpen(false); }}>Log work done today</button>
            <button onClick={() => { setShowModal('tasks'); setFabOpen(false); }}>Update project status</button>
            <button onClick={() => { setShowModal('expense'); setFabOpen(false); }}>Manage expenses</button>
            <button onClick={() => { setShowModal('time-edit'); setFabOpen(false); }}>Edit time allocation</button>
            <button onClick={() => window.open('https://profundra.com', '_blank')}>Create task in ProFundra</button>
          </div>
        )}
        <button className="fab-button" onClick={() => setFabOpen(!fabOpen)}>
          {fabOpen ? '×' : '+'}
        </button>
      </div>

      {/* Toast Notifications */}
      {toast && <div className="toast">{toast}</div>}

      {/* Time Allocation Edit Modal */}
      {showModal === 'time-edit' && (
        <TimeEditModal
          data={data}
          onSave={handleUpdateTimeAllocation}
          onClose={() => setShowModal(null)}
        />
      )}

      {/* Expense Management Modal */}
      {showModal === 'expense' && (
        <ExpenseModal
          data={data}
          onAdd={handleAddExpense}
          onUpdate={handleUpdateExpense}
          onDelete={handleDeleteExpense}
          onClose={() => setShowModal(null)}
        />
      )}

      {/* Other modals would go here */}
      {showModal && !['time-edit', 'expense'].includes(showModal) && (
        <div className="modal-overlay" onClick={() => setShowModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{showModal} Modal</h2>
            <button onClick={() => setShowModal(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Components
const ProjectCard = ({ title, meta, completion, missing, status, hours, type, onWork }) => (
  <div className={`project-card ${type}`}>
    <div className="card-title">{title}</div>
    {meta && meta.map((m, i) => (
      <div key={i} className="card-meta">{m}</div>
    ))}
    {completion && (
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${completion}%` }}></div>
        <span>{completion}%</span>
      </div>
    )}
    {missing && (
      <div className="card-missing">
        <span>Missing</span>
        {missing.map((item, i) => <div key={i}>— {item}</div>)}
      </div>
    )}
    {status && <div className="card-status">✓ {status}</div>}
    {hours && <div className="card-hours">TIME THIS WEEK · {hours}</div>}
    {onWork && (
      <div className="card-actions">
        <button className="btn-work" onClick={onWork}>Work now</button>
        <button className="btn-details">Details</button>
      </div>
    )}
  </div>
);

const TimeBar = ({ label, hours, color }) => {
  const percentage = (hours / 40) * 100;
  return (
    <div className="time-bar-row">
      <span className="time-label">{label}</span>
      <div className="time-bar">
        <div className="time-fill" style={{ width: `${percentage}%`, backgroundColor: color }}></div>
      </div>
      <span className="time-hours">{Math.round(percentage)}% · {hours}h</span>
    </div>
  );
};

// Time Allocation Edit Modal
const TimeEditModal = ({ data, onSave, onClose }) => {
  const [camsol, setCamsol] = useState(data.timeAllocation?.camsol || 0);
  const [suberfood, setSuberfood] = useState(data.timeAllocation?.suberfood || 0);
  const [admin, setAdmin] = useState(data.timeAllocation?.admin || 0);

  const total = camsol + suberfood + admin;

  const handleSave = () => {
    if (total > 40) {
      alert('Total hours cannot exceed 40 hours per week');
      return;
    }
    onSave(camsol, suberfood, admin);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Time Allocation</h2>
          <button onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>Camsol SDO</label>
            <input
              type="number"
              value={camsol}
              onChange={(e) => setCamsol(Number(e.target.value))}
              min="0"
              max="40"
            />
          </div>
          <div className="form-group">
            <label>SuberFood Dev</label>
            <input
              type="number"
              value={suberfood}
              onChange={(e) => setSuberfood(Number(e.target.value))}
              min="0"
              max="40"
            />
          </div>
          <div className="form-group">
            <label>Planning / Admin</label>
            <input
              type="number"
              value={admin}
              onChange={(e) => setAdmin(Number(e.target.value))}
              min="0"
              max="40"
            />
          </div>
          <div className="form-group">
            <strong>Total: {total}h / 40h</strong>
            {total > 40 && <span style={{ color: '#EF4444', marginLeft: '10px' }}>Exceeds 40 hours!</span>}
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

// Expense Management Modal
const ExpenseModal = ({ data, onAdd, onUpdate, onDelete, onClose }) => {
  const [expenses, setExpenses] = useState(data.expenses || []);
  const [newExpenseName, setNewExpenseName] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');

  const handleAdd = () => {
    if (!newExpenseName || !newExpenseAmount) {
      alert('Please fill in both name and amount');
      return;
    }
    onAdd(newExpenseName, Number(newExpenseAmount));
    setNewExpenseName('');
    setNewExpenseAmount('');
  };

  const handleUpdate = (index) => {
    const expense = expenses[index];
    onUpdate(index, expense.name, expense.amount);
  };

  const handleDelete = (index) => {
    if (window.confirm(`Delete "${expenses[index].name}"?`)) {
      onDelete(index);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Manage Expenses</h2>
          <button onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>Add New Expense</label>
            <div className="form-row">
              <input
                type="text"
                placeholder="Expense name"
                value={newExpenseName}
                onChange={(e) => setNewExpenseName(e.target.value)}
              />
              <input
                type="number"
                placeholder="Amount (XAF)"
                value={newExpenseAmount}
                onChange={(e) => setNewExpenseAmount(e.target.value)}
              />
            </div>
            <button className="btn-primary" onClick={handleAdd} style={{ marginTop: '10px' }}>
              Add Expense
            </button>
          </div>
          <div className="form-group">
            <label>Current Expenses</label>
            {expenses.map((expense, index) => (
              <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                <span style={{ flex: 1 }}>{expense.name}</span>
                <span style={{ width: '120px' }}>{expense.amount.toLocaleString()} XAF</span>
                <button className="btn-secondary" onClick={() => handleDelete(index)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default EmpireCommandCenter;
