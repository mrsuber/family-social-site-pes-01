import React, { useState, useEffect } from 'react';
import './DailyOperations.css';
import { getAPI, postAPI, deleteAPI } from '../../../utils/fetchData';
import {
  Add,
  Delete,
  CalendarToday,
  TrendingUp,
  AccessTime,
  AttachMoney,
  EmojiEvents,
  Warning as WarningIcon,
  CheckCircle,
  RadioButtonUnchecked
} from '@material-ui/icons';

const DailyOperations = ({ personId }) => {
  const [view, setView] = useState('daily'); // 'daily' or 'weekly'
  const [dailyLogs, setDailyLogs] = useState([]);
  const [weeklyPlans, setWeeklyPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Daily log form
  const [showDailyForm, setShowDailyForm] = useState(false);
  const [dailyForm, setDailyForm] = useState({
    date: new Date().toISOString().split('T')[0],
    totalIncome: '',
    totalExpenses: '',
    hoursSubercraftex: '',
    hoursSurvival: '',
    mood: 'neutral',
    wins: '',
    challenges: '',
    notes: ''
  });

  // Weekly plan form
  const [showWeeklyForm, setShowWeeklyForm] = useState(false);
  const [weeklyForm, setWeeklyForm] = useState({
    weekStartDate: '',
    weekEndDate: '',
    mustDoSurvival: '',
    shouldDoGrowth: '',
    wantDoVision: '',
    weekGoal: ''
  });

  useEffect(() => {
    fetchData();
  }, [personId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [logsRes, plansRes] = await Promise.all([
        getAPI(`life-ops/daily-logs/${personId}`),
        getAPI(`life-ops/weekly-plans/${personId}`)
      ]);
      // Ensure we always set arrays, even if the response is an error
      setDailyLogs(logsRes.data && logsRes.data.success && Array.isArray(logsRes.data.data) ? logsRes.data.data : []);
      setWeeklyPlans(plansRes.data && plansRes.data.success && Array.isArray(plansRes.data.data) ? plansRes.data.data : []);
    } catch (err) {
      console.error('Error fetching data:', err);
      setDailyLogs([]);
      setWeeklyPlans([]);
    } finally {
      setLoading(false);
    }
  };

  // Daily Log CRUD
  const handleCreateDailyLog = async () => {
    try {
      const payload = {
        ...dailyForm,
        personId,
        wins: dailyForm.wins.split('\n').filter(Boolean),
        challenges: dailyForm.challenges.split('\n').filter(Boolean)
      };
      await postAPI('life-ops/daily-logs', payload);
      setShowDailyForm(false);
      resetDailyForm();
      fetchData();
    } catch (err) {
      alert('Failed to create daily log: ' + (err.response?.data?.msg || err.message));
    }
  };

  const handleDeleteDailyLog = async (id) => {
    if (!window.confirm('Delete this daily log?')) return;
    try {
      await deleteAPI(`life-ops/daily-logs/${id}`);
      fetchData();
    } catch (err) {
      alert('Failed to delete: ' + (err.response?.data?.msg || err.message));
    }
  };

  // Weekly Plan CRUD
  const handleCreateWeeklyPlan = async () => {
    try {
      const payload = {
        ...weeklyForm,
        personId,
        mustDoSurvival: weeklyForm.mustDoSurvival.split('\n').filter(Boolean).map(task => ({ task, completed: false })),
        shouldDoGrowth: weeklyForm.shouldDoGrowth.split('\n').filter(Boolean).map(task => ({ task, completed: false })),
        wantDoVision: weeklyForm.wantDoVision.split('\n').filter(Boolean).map(task => ({ task, completed: false }))
      };
      await postAPI('life-ops/weekly-plans', payload);
      setShowWeeklyForm(false);
      resetWeeklyForm();
      fetchData();
    } catch (err) {
      alert('Failed to create weekly plan: ' + (err.response?.data?.msg || err.message));
    }
  };

  const handleDeleteWeeklyPlan = async (id) => {
    if (!window.confirm('Delete this weekly plan?')) return;
    try {
      await deleteAPI(`life-ops/weekly-plans/${id}`);
      fetchData();
    } catch (err) {
      alert('Failed to delete: ' + (err.response?.data?.msg || err.message));
    }
  };

  // Form helpers
  const resetDailyForm = () => {
    setDailyForm({
      date: new Date().toISOString().split('T')[0],
      totalIncome: '',
      totalExpenses: '',
      hoursSubercraftex: '',
      hoursSurvival: '',
      mood: 'neutral',
      wins: '',
      challenges: '',
      notes: ''
    });
  };

  const resetWeeklyForm = () => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay()); // Start of week (Sunday)
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6); // End of week (Saturday)

    setWeeklyForm({
      weekStartDate: weekStart.toISOString().split('T')[0],
      weekEndDate: weekEnd.toISOString().split('T')[0],
      mustDoSurvival: '',
      shouldDoGrowth: '',
      wantDoVision: '',
      weekGoal: ''
    });
  };

  const getMoodColor = (mood) => {
    switch (mood) {
      case 'excellent': return '#10b981';
      case 'good': return '#3b82f6';
      case 'neutral': return '#6b7280';
      case 'stressed': return '#f59e0b';
      case 'difficult': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getMoodEmoji = (mood) => {
    switch (mood) {
      case 'excellent': return '🌟';
      case 'good': return '😊';
      case 'neutral': return '😐';
      case 'stressed': return '😰';
      case 'difficult': return '😞';
      default: return '😐';
    }
  };

  if (loading) {
    return <div className="daily-operations"><p>Loading operations data...</p></div>;
  }

  return (
    <div className="daily-operations">
      {/* Header */}
      <div className="operations-header">
        <div>
          <h2>Daily Operations</h2>
          <p className="header-subtitle">Track your daily progress and weekly goals</p>
        </div>
        <div className="header-controls">
          <div className="view-toggle">
            <button
              className={`toggle-btn ${view === 'daily' ? 'active' : ''}`}
              onClick={() => setView('daily')}
            >
              Daily Logs
            </button>
            <button
              className={`toggle-btn ${view === 'weekly' ? 'active' : ''}`}
              onClick={() => setView('weekly')}
            >
              Weekly Plans
            </button>
          </div>
          <button
            className="btn-add"
            onClick={() => view === 'daily' ? setShowDailyForm(true) : setShowWeeklyForm(true)}
          >
            <Add /> {view === 'daily' ? 'Log Today' : 'New Plan'}
          </button>
        </div>
      </div>

      {/* Daily Logs View */}
      {view === 'daily' && (
        <div className="logs-container">
          {dailyLogs.length === 0 ? (
            <div className="empty-state">
              <CalendarToday style={{ fontSize: 64, opacity: 0.2 }} />
              <p>No daily logs yet</p>
              <button className="btn-add" onClick={() => setShowDailyForm(true)}>
                <Add /> Log Your First Day
              </button>
            </div>
          ) : (
            <div className="logs-grid">
              {dailyLogs.map(log => (
                <div key={log.id} className="log-card">
                  <div className="log-header">
                    <div className="log-date">
                      <CalendarToday />
                      <span>{new Date(log.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <button className="btn-delete-icon" onClick={() => handleDeleteDailyLog(log.id)}>
                      <Delete />
                    </button>
                  </div>

                  <div className="log-mood" style={{ borderLeftColor: getMoodColor(log.mood) }}>
                    <span className="mood-emoji">{getMoodEmoji(log.mood)}</span>
                    <span className="mood-label" style={{ color: getMoodColor(log.mood) }}>
                      {log.mood.charAt(0).toUpperCase() + log.mood.slice(1)}
                    </span>
                  </div>

                  <div className="log-metrics">
                    <div className="metric">
                      <AttachMoney style={{ color: '#10b981' }} />
                      <div>
                        <span className="metric-label">Income</span>
                        <span className="metric-value">${parseFloat(log.totalIncome || 0).toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="metric">
                      <AttachMoney style={{ color: '#ef4444' }} />
                      <div>
                        <span className="metric-label">Expenses</span>
                        <span className="metric-value">${parseFloat(log.totalExpenses || 0).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="log-metrics">
                    <div className="metric">
                      <AccessTime style={{ color: '#8b5cf6' }} />
                      <div>
                        <span className="metric-label">Subercraftex</span>
                        <span className="metric-value">{log.hoursSubercraftex || 0}h</span>
                      </div>
                    </div>
                    <div className="metric">
                      <AccessTime style={{ color: '#f59e0b' }} />
                      <div>
                        <span className="metric-label">Survival Work</span>
                        <span className="metric-value">{log.hoursSurvival || 0}h</span>
                      </div>
                    </div>
                  </div>

                  {log.wins && log.wins.length > 0 && (
                    <div className="log-section wins">
                      <h4><EmojiEvents /> Wins</h4>
                      <ul>
                        {log.wins.map((win, idx) => (
                          <li key={idx}>{win}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {log.challenges && log.challenges.length > 0 && (
                    <div className="log-section challenges">
                      <h4><WarningIcon /> Challenges</h4>
                      <ul>
                        {log.challenges.map((challenge, idx) => (
                          <li key={idx}>{challenge}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {log.notes && (
                    <div className="log-notes">
                      <strong>Notes:</strong>
                      <p>{log.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Weekly Plans View */}
      {view === 'weekly' && (
        <div className="plans-container">
          {weeklyPlans.length === 0 ? (
            <div className="empty-state">
              <TrendingUp style={{ fontSize: 64, opacity: 0.2 }} />
              <p>No weekly plans yet</p>
              <button className="btn-add" onClick={() => setShowWeeklyForm(true)}>
                <Add /> Create Your First Plan
              </button>
            </div>
          ) : (
            <div className="plans-grid">
              {weeklyPlans.map(plan => (
                <div key={plan.id} className="plan-card">
                  <div className="plan-header">
                    <div className="plan-dates">
                      <CalendarToday />
                      <span>
                        {new Date(plan.weekStartDate).toLocaleDateString()} - {new Date(plan.weekEndDate).toLocaleDateString()}
                      </span>
                    </div>
                    <button className="btn-delete-icon" onClick={() => handleDeleteWeeklyPlan(plan.id)}>
                      <Delete />
                    </button>
                  </div>

                  {plan.weekGoal && (
                    <div className="week-goal">
                      <strong>Week Goal:</strong> {plan.weekGoal}
                    </div>
                  )}

                  <div className="plan-sections">
                    {/* Must Do - Survival */}
                    <div className="plan-section survival">
                      <h4>🔴 Must Do (Survival)</h4>
                      <ul className="task-list">
                        {plan.mustDoSurvival && plan.mustDoSurvival.length > 0 ? (
                          plan.mustDoSurvival.map((item, idx) => (
                            <li key={idx} className={item.completed ? 'completed' : ''}>
                              {item.completed ? <CheckCircle /> : <RadioButtonUnchecked />}
                              <span>{item.task}</span>
                            </li>
                          ))
                        ) : (
                          <li className="empty-task">No tasks</li>
                        )}
                      </ul>
                    </div>

                    {/* Should Do - Growth */}
                    <div className="plan-section growth">
                      <h4>🟡 Should Do (Growth)</h4>
                      <ul className="task-list">
                        {plan.shouldDoGrowth && plan.shouldDoGrowth.length > 0 ? (
                          plan.shouldDoGrowth.map((item, idx) => (
                            <li key={idx} className={item.completed ? 'completed' : ''}>
                              {item.completed ? <CheckCircle /> : <RadioButtonUnchecked />}
                              <span>{item.task}</span>
                            </li>
                          ))
                        ) : (
                          <li className="empty-task">No tasks</li>
                        )}
                      </ul>
                    </div>

                    {/* Want Do - Vision */}
                    <div className="plan-section vision">
                      <h4>🟢 Want Do (Vision)</h4>
                      <ul className="task-list">
                        {plan.wantDoVision && plan.wantDoVision.length > 0 ? (
                          plan.wantDoVision.map((item, idx) => (
                            <li key={idx} className={item.completed ? 'completed' : ''}>
                              {item.completed ? <CheckCircle /> : <RadioButtonUnchecked />}
                              <span>{item.task}</span>
                            </li>
                          ))
                        ) : (
                          <li className="empty-task">No tasks</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Daily Log Form */}
      {showDailyForm && (
        <div className="form-overlay" onClick={() => { setShowDailyForm(false); resetDailyForm(); }}>
          <div className="operations-form" onClick={(e) => e.stopPropagation()}>
            <h4>Log Daily Operations</h4>

            <div>
              <label>Date *</label>
              <input
                type="date"
                value={dailyForm.date}
                onChange={(e) => setDailyForm({ ...dailyForm, date: e.target.value })}
              />
            </div>

            <div className="form-row">
              <div>
                <label>Total Income</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={dailyForm.totalIncome}
                  onChange={(e) => setDailyForm({ ...dailyForm, totalIncome: e.target.value })}
                />
              </div>
              <div>
                <label>Total Expenses</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={dailyForm.totalExpenses}
                  onChange={(e) => setDailyForm({ ...dailyForm, totalExpenses: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row">
              <div>
                <label>Hours on Subercraftex</label>
                <input
                  type="number"
                  step="0.5"
                  placeholder="0"
                  value={dailyForm.hoursSubercraftex}
                  onChange={(e) => setDailyForm({ ...dailyForm, hoursSubercraftex: e.target.value })}
                />
              </div>
              <div>
                <label>Hours on Survival Work</label>
                <input
                  type="number"
                  step="0.5"
                  placeholder="0"
                  value={dailyForm.hoursSurvival}
                  onChange={(e) => setDailyForm({ ...dailyForm, hoursSurvival: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label>Mood</label>
              <select
                value={dailyForm.mood}
                onChange={(e) => setDailyForm({ ...dailyForm, mood: e.target.value })}
              >
                <option value="excellent">🌟 Excellent</option>
                <option value="good">😊 Good</option>
                <option value="neutral">😐 Neutral</option>
                <option value="stressed">😰 Stressed</option>
                <option value="difficult">😞 Difficult</option>
              </select>
            </div>

            <div>
              <label>Wins (one per line)</label>
              <textarea
                placeholder="What went well today?"
                value={dailyForm.wins}
                onChange={(e) => setDailyForm({ ...dailyForm, wins: e.target.value })}
                rows={3}
              />
            </div>

            <div>
              <label>Challenges (one per line)</label>
              <textarea
                placeholder="What was difficult?"
                value={dailyForm.challenges}
                onChange={(e) => setDailyForm({ ...dailyForm, challenges: e.target.value })}
                rows={3}
              />
            </div>

            <div>
              <label>Notes</label>
              <textarea
                placeholder="Additional notes..."
                value={dailyForm.notes}
                onChange={(e) => setDailyForm({ ...dailyForm, notes: e.target.value })}
                rows={2}
              />
            </div>

            <div className="form-actions">
              <button className="btn-cancel" onClick={() => { setShowDailyForm(false); resetDailyForm(); }}>
                Cancel
              </button>
              <button className="btn-save" onClick={handleCreateDailyLog}>
                Save Log
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Weekly Plan Form */}
      {showWeeklyForm && (
        <div className="form-overlay" onClick={() => { setShowWeeklyForm(false); resetWeeklyForm(); }}>
          <div className="operations-form large" onClick={(e) => e.stopPropagation()}>
            <h4>Create Weekly Plan</h4>

            <div className="form-row">
              <div>
                <label>Week Start Date *</label>
                <input
                  type="date"
                  value={weeklyForm.weekStartDate}
                  onChange={(e) => setWeeklyForm({ ...weeklyForm, weekStartDate: e.target.value })}
                />
              </div>
              <div>
                <label>Week End Date *</label>
                <input
                  type="date"
                  value={weeklyForm.weekEndDate}
                  onChange={(e) => setWeeklyForm({ ...weeklyForm, weekEndDate: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label>Week Goal</label>
              <input
                type="text"
                placeholder="What's the main goal for this week?"
                value={weeklyForm.weekGoal}
                onChange={(e) => setWeeklyForm({ ...weeklyForm, weekGoal: e.target.value })}
              />
            </div>

            <div>
              <label>🔴 Must Do - Survival (one task per line)</label>
              <textarea
                placeholder="Critical tasks you must do to survive/pay bills"
                value={weeklyForm.mustDoSurvival}
                onChange={(e) => setWeeklyForm({ ...weeklyForm, mustDoSurvival: e.target.value })}
                rows={4}
              />
            </div>

            <div>
              <label>🟡 Should Do - Growth (one task per line)</label>
              <textarea
                placeholder="Important tasks for personal/business growth"
                value={weeklyForm.shouldDoGrowth}
                onChange={(e) => setWeeklyForm({ ...weeklyForm, shouldDoGrowth: e.target.value })}
                rows={4}
              />
            </div>

            <div>
              <label>🟢 Want Do - Vision (one task per line)</label>
              <textarea
                placeholder="Tasks aligned with your Subercraftex vision"
                value={weeklyForm.wantDoVision}
                onChange={(e) => setWeeklyForm({ ...weeklyForm, wantDoVision: e.target.value })}
                rows={4}
              />
            </div>

            <div className="form-actions">
              <button className="btn-cancel" onClick={() => { setShowWeeklyForm(false); resetWeeklyForm(); }}>
                Cancel
              </button>
              <button className="btn-save" onClick={handleCreateWeeklyPlan}>
                Create Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyOperations;
