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

      {/* Zone 2: Focus Heat Map */}
      <section className="zone-focus-heat">
        <div className="zone-header">
          <span className="zone-label">02 · FOCUS HEAT MAP</span>
          <span className="zone-hint">Drag cards between lanes to change priority</span>
        </div>

        <div className="heat-lane critical-lane">
          <div className="lane-header">
            <PulseIndicator color="#EF4444" /> CRITICAL — needs your attention right now
          </div>
          <div className="project-cards">
            <ProjectCard
              title="SuberFood Platform"
              meta={[`${daysToAli} days until Ali arrives`, `Due Oct 31 · ${calculateDaysUntil(2026, 9, 31)} days`]}
              completion={70}
              missing={['Pre-orders', 'Wallet system', 'PayWithCamsol']}
              hours="12h"
              type="critical"
              onWork={() => setShowModal('tasks')}
            />
            <ProjectCard
              title="Camsol SDO Report"
              meta={[`Due Oct 20 · ${calculateDaysUntil(2026, 9, 20)} days`]}
              completion={60}
              status="On track"
              hours="24h"
              type="critical"
              onWork={() => setShowModal('tasks')}
            />
          </div>
        </div>

        <div className="heat-lane active-lane">
          <div className="lane-header">
            <span className="status-dot active"></span> ACTIVE — in progress, stable
          </div>
          <div className="project-cards">
            <ProjectCard
              title="PayWithCamsol"
              meta={['Icons integrating', 'Monitor only']}
              status="Stable"
              type="active"
            />
            <ProjectCard
              title="SuberCraftex"
              meta={['106 products · low revenue', 'Needs marketing — after SuberFood']}
              type="active"
            />
          </div>
        </div>

        <div className="heat-lane hold-lane">
          <div className="lane-header">
            <span className="status-dot hold"></span> ON HOLD — resume later
          </div>
          <div className="hold-items">
            <div className="hold-item">ProFundra NGO Partnerships <span>→ Q1 2027</span></div>
            <div className="hold-item">PayWithCamsol Bank Integration <span>→ Q1 2027</span></div>
            <div className="hold-item">SuberCraftex Aggressive Growth <span>→ Dec 2026</span></div>
          </div>
        </div>
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

        {/* Zone 4: Energy Flows */}
        <section className="zone-energy">
          <div className="zone-label">04 · ENERGY FLOWS</div>

          <div className="energy-card">
            <div className="card-header">
              <span>Time spent this week</span>
              <span className="time-total">{data.timeAllocation.camsol + data.timeAllocation.suberfood + data.timeAllocation.admin}h / week</span>
            </div>
            <TimeBar label="Camsol SDO" hours={data.timeAllocation.camsol} color="#3B82F6" />
            <TimeBar label="SuberFood Dev" hours={data.timeAllocation.suberfood} color="#EF4444" />
            <TimeBar label="Planning / Admin" hours={data.timeAllocation.admin} color="#6B7280" />

            <div className="warning-box time-warning">
              <div className="warning-title">SuberFood at risk</div>
              <div>Needs 20h/week to finish by Oct 31. Suggested: reduce SDO to 20h (50%), raise SuberFood to 16h (40%).</div>
            </div>

            <div className="action-buttons">
              <button className="btn-primary" onClick={() => showToast('Time rebalanced: SDO 20h · SuberFood 16h')}>Auto-adjust</button>
              <button>Manual override</button>
            </div>
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
          <div className="cloud-services">
            <div className="service-label">CLOUD / REMOTE</div>
            <a href="https://profundra.com" target="_blank" rel="noopener noreferrer" className="service-item">
              <span className="service-name">ProFundra</span>
              <span className="service-url">profundra.com</span>
            </a>
            <div className="service-item">
              <span className="service-name">PayWithCamsol</span>
              <span className="service-desc">Payment gateway · MTN MoMo, Orange Money</span>
            </div>
            <div className="service-item">
              <span className="service-name">SuberCraftex platform</span>
              <span className="service-desc">subercraftex.com · 106 products</span>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <div className="fab-container">
        {fabOpen && (
          <div className="fab-menu">
            <button onClick={() => { setShowModal('eod'); setFabOpen(false); }}>Log work done today</button>
            <button onClick={() => { setShowModal('tasks'); setFabOpen(false); }}>Update project status</button>
            <button onClick={() => { setShowModal('expense'); setFabOpen(false); }}>Add expense</button>
            <button onClick={() => window.open('https://profundra.com', '_blank')}>Create task in ProFundra</button>
          </div>
        )}
        <button className="fab-button" onClick={() => setFabOpen(!fabOpen)}>
          {fabOpen ? '×' : '+'}
        </button>
      </div>

      {/* Toast Notifications */}
      {toast && <div className="toast">{toast}</div>}

      {/* Modals would go here - simplified for now */}
      {showModal && (
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

export default EmpireCommandCenter;
