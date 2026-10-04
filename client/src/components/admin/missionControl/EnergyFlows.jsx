import React, { useState } from 'react';
import './EnergyFlows.css';

const EnergyFlows = () => {
  const [manual, setManual] = useState(false);
  const [adjusted, setAdjusted] = useState(false);
  const [time, setTime] = useState({
    camsol: 24,
    suberfood: 12,
    admin: 4
  });

  const income = 300000;
  const expenses = [
    { name: 'Rent', amount: 70000 },
    { name: 'Food', amount: 50000 },
    { name: 'Internet', amount: 30000 },
    { name: 'Hosting / Cloud', amount: 18600 },
    { name: 'Claude AI (×2)', amount: 24000 },
    { name: 'Utilities', amount: 20000 },
    { name: 'Other', amount: 26000 }
  ];

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const net = income - totalExpenses;
  const burnDay = Math.round(totalExpenses / 30);

  const totalHours = time.camsol + time.suberfood + time.admin;

  const timeRows = [
    {
      label: 'Camsol SDO',
      w: `${(time.camsol / 40) * 100}%`,
      color: '#3B82F6',
      pct: `${Math.round((time.camsol / 40) * 100)}%`,
      h: `${time.camsol}h`
    },
    {
      label: 'SuberFood Dev',
      w: `${(time.suberfood / 40) * 100}%`,
      color: '#EF4444',
      pct: `${Math.round((time.suberfood / 40) * 100)}%`,
      h: `${time.suberfood}h`
    },
    {
      label: 'Planning / Admin',
      w: `${(time.admin / 40) * 100}%`,
      color: '#6B7280',
      pct: `${Math.round((time.admin / 40) * 100)}%`,
      h: `${time.admin}h`
    }
  ];

  const expRows = expenses.map(e => ({
    name: e.name,
    w: `${(e.amount / income) * 100}%`,
    fmt: e.amount.toLocaleString('en-US') + ' XAF'
  }));

  const shortfall = 20 - time.suberfood;
  const timeWarn = shortfall > 0 ? {
    title: 'SuberFood at risk',
    body: adjusted
      ? `Adjusted to ${time.suberfood}h — still ${shortfall}h short of the 20h/week needed to finish by Oct 31.`
      : `Needs 20h/week to finish by Oct 31. Suggested: reduce SDO to 20h (50%), raise SuberFood to 16h (40%).`,
    color: '#FCA5A5',
    border: 'rgba(239, 68, 68, 0.4)',
    bg: 'rgba(239, 68, 68, 0.1)'
  } : {
    title: 'SuberFood on pace',
    body: `${time.suberfood}h/week covers the Oct 31 platform deadline.`,
    color: '#6EE7B7',
    border: 'rgba(16, 185, 129, 0.45)',
    bg: 'rgba(16, 185, 129, 0.08)'
  };

  const autoAdjust = () => {
    setTime({ camsol: 20, suberfood: 16, admin: 4 });
    setAdjusted(true);
  };

  const toggleManual = () => {
    setManual(!manual);
  };

  const pulseRed = (
    <span style={{
      display: 'inline-block',
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: '#EF4444',
      animation: 'ecc-pulse 1.6s infinite'
    }}></span>
  );

  return (
    <section className="energy-flows">
      <div className="energy-title">04 · ENERGY FLOWS</div>

      {/* Time Card */}
      <div className="energy-card">
        <div className="card-header">
          <span className="card-title-text">Time spent this week</span>
          <span className="card-subtitle">{totalHours}h / week</span>
        </div>

        {timeRows.map((t, i) => (
          <div key={i} className="time-row">
            <span className="time-label">{t.label}</span>
            <div className="time-bar-bg">
              <div className="time-bar-fill" style={{ width: t.w, background: t.color }}></div>
            </div>
            <span className="time-stats">{t.pct} · {t.h}</span>
          </div>
        ))}

        {manual && (
          <div className="manual-controls">
            <span>Camsol SDO</span>
            <input
              type="range"
              min="0"
              max="40"
              value={time.camsol}
              onChange={(e) => {
                setTime({ ...time, camsol: parseInt(e.target.value) });
                setAdjusted(true);
              }}
            />
            <span className="manual-value">{time.camsol}h</span>

            <span>SuberFood Dev</span>
            <input
              type="range"
              min="0"
              max="40"
              value={time.suberfood}
              onChange={(e) => {
                setTime({ ...time, suberfood: parseInt(e.target.value) });
                setAdjusted(true);
              }}
            />
            <span className="manual-value">{time.suberfood}h</span>
          </div>
        )}

        <div className="time-warning" style={{
          border: `1px solid ${timeWarn.border}`,
          background: timeWarn.bg
        }}>
          <div className="warning-title" style={{ color: timeWarn.color }}>
            {timeWarn.title}
          </div>
          <div className="warning-body">{timeWarn.body}</div>
        </div>

        <div className="card-actions">
          <button className="btn-primary" onClick={autoAdjust}>Auto-adjust</button>
          <button className="btn-secondary" onClick={toggleManual}>
            {manual ? 'Close override' : 'Manual override'}
          </button>
        </div>
      </div>

      {/* Cash Flow Card */}
      <div className="energy-card">
        <div className="card-header">
          <span className="card-title-text">Cash flow · October</span>
          <span className="card-subtitle">XAF</span>
        </div>

        <div className="section-label income-label">INCOME</div>
        <div className="cash-row">
          <span className="cash-name">Camsol SDO</span>
          <div className="cash-bar-full income-bar"></div>
          <span className="cash-amount">{income.toLocaleString('en-US')} XAF</span>
        </div>

        <div className="section-label expense-label">EXPENSES</div>
        {expRows.map((e, i) => (
          <div key={i} className="cash-row">
            <span className="cash-name">{e.name}</span>
            <div className="cash-bar-bg">
              <div className="expense-bar-fill" style={{ width: e.w }}></div>
            </div>
            <span className="cash-amount">{e.fmt}</span>
          </div>
        ))}

        <div className="cash-row net-row">
          <span className="cash-name-bold">Net</span>
          <div className="cash-bar-bg">
            <div className="net-bar-fill" style={{ width: `${Math.max(0, (net / income) * 100)}%` }}></div>
          </div>
          <span className="cash-amount-net">{net >= 0 ? '+' : ''}{net.toLocaleString('en-US')} XAF</span>
        </div>

        <div className="cash-meta">
          <span>Burn ≈ {burnDay.toLocaleString('en-US')} XAF/day</span>
          <span>Runway 2.5 months</span>
        </div>

        <div className="card-actions">
          <button className="btn-secondary">View full budget</button>
          <button className="btn-secondary">Add expense</button>
        </div>
      </div>

      {/* Team Status Card */}
      <div className="energy-card">
        <span className="card-title-text">Team status</span>

        <div className="team-card commander-card">
          <div className="team-header">
            <span className="team-name">High Commander (you)</span>
            <span className="team-status overloaded">
              {pulseRed} OVERLOADED
            </span>
          </div>
          <span className="team-role">CEO · CTO · CFO — Camsol 60%, SuberFood 30%</span>
          <span className="team-warning">Burnout risk</span>
        </div>

        <div className="team-card ali-card">
          <div className="team-header">
            <span className="team-name">Ali Barkat</span>
            <span className="team-status arriving">ARRIVING IN 7 DAYS</span>
          </div>
          <span className="team-role">SuberFood Operations Manager · starts Oct 10, 2026</span>
          <span className="team-role">First task: platform training · living with you in Buea</span>
        </div>

        <div className="team-card kd-card">
          <div className="team-header">
            <span className="team-name">KD</span>
            <span className="team-status waiting">WAITING</span>
          </div>
          <span className="team-role">Accountant / tax compliance · hire when SuberFood hits 200K/mo</span>
        </div>
      </div>
    </section>
  );
};

export default EnergyFlows;
