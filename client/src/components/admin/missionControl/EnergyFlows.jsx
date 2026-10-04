import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAPI, postAPI } from '../../../utils/fetchData';
import './EnergyFlows.css';

const EnergyFlows = () => {
  const { auth } = useSelector(state => state);

  // Time allocation state
  const [timeAllocation, setTimeAllocation] = useState({
    camsolSDO: 24,
    suberFoodDev: 12,
    planningAdmin: 4
  });

  const [manualMode, setManualMode] = useState(false);
  const [adjusted, setAdjusted] = useState(false);

  // Cash flow state
  const [income, setIncome] = useState(300000);
  const [expenses, setExpenses] = useState([
    { name: 'Rent', amount: 70000 },
    { name: 'Food', amount: 50000 },
    { name: 'Internet', amount: 30000 },
    { name: 'Hosting / Cloud', amount: 18600 },
    { name: 'Claude AI (×2)', amount: 24000 },
    { name: 'Utilities', amount: 20000 },
    { name: 'Other', amount: 26000 }
  ]);

  // Team members state
  const [teamMembers, setTeamMembers] = useState([
    {
      name: 'High Commander (you)',
      role: 'CEO · CTO · CFO',
      allocation: 'Camsol 60%, SuberFood 30%',
      status: 'OVERLOADED',
      statusColor: '#EF4444',
      borderColor: 'rgba(239, 68, 68, 0.45)',
      bgColor: '#0F172A',
      warning: 'Burnout risk'
    },
    {
      name: 'Ali Barkat',
      role: 'SuberFood Operations Manager · starts Oct 10, 2026',
      allocation: 'First task: platform training · living with you in Buea',
      status: 'ARRIVING IN 7 DAYS',
      statusColor: '#A78BFA',
      borderColor: 'rgba(139, 92, 246, 0.5)',
      bgColor: '#0F172A'
    },
    {
      name: 'KD',
      role: 'Accountant / tax compliance · hire when SuberFood hits 200K/mo',
      allocation: '',
      status: 'WAITING',
      statusColor: '#9CA3AF',
      borderColor: '#475569',
      bgColor: '#0F172A',
      dashed: true
    }
  ]);

  const totalHours = timeAllocation.camsolSDO + timeAllocation.suberFoodDev + timeAllocation.planningAdmin;
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const netCashFlow = income - totalExpenses;
  const burnRate = Math.round(totalExpenses / 30);
  const runway = (netCashFlow / burnRate / 30).toFixed(1);

  // Time allocation calculations
  const timeRows = [
    {
      label: 'Camsol SDO',
      hours: timeAllocation.camsolSDO,
      color: '#3B82F6',
      percentage: Math.round((timeAllocation.camsolSDO / 40) * 100),
      width: `${(timeAllocation.camsolSDO / 40) * 100}%`
    },
    {
      label: 'SuberFood Dev',
      hours: timeAllocation.suberFoodDev,
      color: '#EF4444',
      percentage: Math.round((timeAllocation.suberFoodDev / 40) * 100),
      width: `${(timeAllocation.suberFoodDev / 40) * 100}%`
    },
    {
      label: 'Planning / Admin',
      hours: timeAllocation.planningAdmin,
      color: '#6B7280',
      percentage: Math.round((timeAllocation.planningAdmin / 40) * 100),
      width: `${(timeAllocation.planningAdmin / 40) * 100}%`
    }
  ];

  const suberFoodShortfall = 20 - timeAllocation.suberFoodDev;
  const timeWarning = suberFoodShortfall > 0
    ? {
        title: 'SuberFood at risk',
        body: adjusted
          ? `Adjusted to ${timeAllocation.suberFoodDev}h — still ${suberFoodShortfall}h short of the 20h/week needed to finish by Oct 31.`
          : `Needs 20h/week to finish by Oct 31. Suggested: reduce SDO to 20h (50%), raise SuberFood to 16h (40%).`,
        color: '#FCA5A5',
        border: 'rgba(239, 68, 68, 0.45)',
        bg: 'rgba(239, 68, 68, 0.08)'
      }
    : {
        title: 'SuberFood on pace',
        body: `${timeAllocation.suberFoodDev}h/week covers the Oct 31 platform deadline.`,
        color: '#6EE7B7',
        border: 'rgba(16, 185, 129, 0.45)',
        bg: 'rgba(16, 185, 129, 0.08)'
      };

  const handleAutoAdjust = () => {
    setTimeAllocation({
      camsolSDO: 20,
      suberFoodDev: 16,
      planningAdmin: 4
    });
    setAdjusted(true);
  };

  const handleManualOverride = () => {
    setManualMode(!manualMode);
  };

  const handleTimeChange = (field, value) => {
    const newValue = Math.max(0, Math.min(40, parseInt(value) || 0));
    setTimeAllocation(prev => ({
      ...prev,
      [field]: newValue
    }));
    setAdjusted(true);
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString('en-US') + ' XAF';
  };

  return (
    <section className="energy-flows">
      <div className="energy-flows-header">
        <div className="energy-flows-title">04 · ENERGY FLOWS</div>
      </div>

      {/* Time Spent This Week */}
      <div className="energy-card">
        <div className="energy-card-header">
          <span className="card-title">Time spent this week</span>
          <span className="card-subtitle">{totalHours}h / week</span>
        </div>

        <div className="time-rows">
          {timeRows.map((row, index) => (
            <div key={index} className="time-row">
              <span className="time-label">{row.label}</span>
              <div className="time-bar-container">
                <div
                  className="time-bar-fill"
                  style={{ width: row.width, backgroundColor: row.color }}
                ></div>
              </div>
              <span className="time-stats">{row.percentage}% · {row.hours}h</span>
            </div>
          ))}
        </div>

        {manualMode && (
          <div className="manual-controls">
            <div className="manual-slider">
              <span>Camsol SDO</span>
              <input
                type="range"
                min="0"
                max="40"
                value={timeAllocation.camsolSDO}
                onChange={(e) => handleTimeChange('camsolSDO', e.target.value)}
              />
              <span>{timeAllocation.camsolSDO}h</span>
            </div>
            <div className="manual-slider">
              <span>SuberFood Dev</span>
              <input
                type="range"
                min="0"
                max="40"
                value={timeAllocation.suberFoodDev}
                onChange={(e) => handleTimeChange('suberFoodDev', e.target.value)}
              />
              <span>{timeAllocation.suberFoodDev}h</span>
            </div>
          </div>
        )}

        <div
          className="time-warning"
          style={{
            border: `1px solid ${timeWarning.border}`,
            background: timeWarning.bg
          }}
        >
          <div className="warning-title" style={{ color: timeWarning.color }}>
            {timeWarning.title}
          </div>
          <div className="warning-body">{timeWarning.body}</div>
        </div>

        <div className="energy-card-actions">
          <button className="btn-primary" onClick={handleAutoAdjust}>
            Auto-adjust
          </button>
          <button className="btn-secondary" onClick={handleManualOverride}>
            {manualMode ? 'Close override' : 'Manual override'}
          </button>
        </div>
      </div>

      {/* Cash Flow */}
      <div className="energy-card">
        <div className="energy-card-header">
          <span className="card-title">Cash flow · October</span>
          <span className="card-subtitle">XAF</span>
        </div>

        <div className="cash-section-label">INCOME</div>
        <div className="cash-row">
          <span className="cash-label">Camsol SDO</span>
          <div className="cash-bar-container">
            <div className="cash-bar-fill income-bar"></div>
          </div>
          <span className="cash-amount">{formatCurrency(income)}</span>
        </div>

        <div className="cash-section-label expenses-label">EXPENSES</div>
        {expenses.map((expense, index) => (
          <div key={index} className="cash-row">
            <span className="cash-label">{expense.name}</span>
            <div className="cash-bar-container">
              <div
                className="cash-bar-fill expense-bar"
                style={{ width: `${(expense.amount / income) * 100}%` }}
              ></div>
            </div>
            <span className="cash-amount">{formatCurrency(expense.amount)}</span>
          </div>
        ))}

        <div className="cash-row net-row">
          <span className="cash-label">Net</span>
          <div className="cash-bar-container">
            <div
              className="cash-bar-fill net-bar"
              style={{ width: `${Math.max(0, (netCashFlow / income) * 100)}%` }}
            ></div>
          </div>
          <span className="cash-amount net-amount">
            {netCashFlow >= 0 ? '+' : ''}{formatCurrency(netCashFlow)}
          </span>
        </div>

        <div className="cash-meta">
          <span>Burn ≈ {formatCurrency(burnRate)}/day</span>
          <span>Runway {runway} months</span>
        </div>

        <div className="energy-card-actions">
          <button className="btn-secondary">View full budget</button>
          <button className="btn-secondary">Add expense</button>
        </div>
      </div>

      {/* Team Status */}
      <div className="energy-card">
        <div className="card-title">Team status</div>

        <div className="team-members">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="team-member-card"
              style={{
                background: member.bgColor,
                border: member.dashed ? `1px dashed ${member.borderColor}` : `1px solid ${member.borderColor}`
              }}
            >
              <div className="team-member-header">
                <span className="team-member-name">{member.name}</span>
                <span
                  className="team-member-status"
                  style={{ color: member.statusColor }}
                >
                  {member.status}
                </span>
              </div>
              <div className="team-member-role">{member.role}</div>
              {member.allocation && (
                <div className="team-member-allocation">{member.allocation}</div>
              )}
              {member.warning && (
                <div className="team-member-warning">{member.warning}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnergyFlows;
