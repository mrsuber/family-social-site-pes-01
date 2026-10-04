import React, { useState, useEffect } from 'react';
import { CalendarToday, Chat } from '@material-ui/icons';
import './AliView.css';

const AliView = ({ onSwitchToCommander }) => {
  const [tasks, setTasks] = useState([]);
  const [daysUntilLaunch, setDaysUntilLaunch] = useState(0);
  const [platformProgress, setPlatformProgress] = useState(70);

  useEffect(() => {
    // Calculate days until SuberFood launch
    const today = new Date();
    const launchDate = new Date(2026, 11, 1); // Dec 1, 2026
    const diffTime = launchDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysUntilLaunch(diffDays);

    // Initialize tasks for Ali (can be fetched from backend)
    setTasks([
      { id: 1, label: 'Complete platform training (3 days)', done: false },
      { id: 2, label: 'Review customer survey plan', done: false },
      { id: 3, label: 'Identify target quarters in Buea', done: false },
      { id: 4, label: 'Draft customer outreach script', done: false }
    ]);
  }, []);

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, done: !task.done } : task
    ));
  };

  const handleViewCalendar = () => {
    alert('Calendar: Nov 1–15 surveys · Nov 16–30 farmers · Dec 1 launch');
  };

  const handleAskCommander = () => {
    alert('Message sent to the Commander');
  };

  return (
    <div className="ali-view-container">
      <div className="ali-view-content">
        {/* Header */}
        <div className="ali-view-header">
          <div className="ali-view-subtitle">SUBERFOOD · OPERATIONS</div>
          <button className="ali-switch-btn" onClick={onSwitchToCommander}>
            Switch to Commander view
          </button>
        </div>

        {/* Welcome Card */}
        <div className="ali-welcome-card">
          <div className="ali-welcome-name">Welcome, Ali Barkat</div>
          <div className="ali-welcome-role">SuberFood Operations Manager · Buea</div>

          <div className="ali-welcome-stats">
            <div className="ali-stat-box">
              <span className="ali-stat-label">LAUNCH</span>
              <span className="ali-stat-value">Dec 1 · {daysUntilLaunch} days</span>
            </div>
            <div className="ali-stat-box">
              <span className="ali-stat-label">PLATFORM</span>
              <span className="ali-stat-value">{platformProgress}% complete</span>
            </div>
          </div>
        </div>

        {/* Tasks This Week */}
        <div className="ali-tasks-card">
          <div className="ali-card-label">YOUR TASKS THIS WEEK</div>
          {tasks.map(task => (
            <label key={task.id} className="ali-task-item">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
                className="ali-task-checkbox"
              />
              <span className={`ali-task-label ${task.done ? 'done' : ''}`}>
                {task.label}
              </span>
            </label>
          ))}
        </div>

        {/* Upcoming Events */}
        <div className="ali-upcoming-card">
          <div className="ali-card-label">UPCOMING</div>
          <div className="ali-timeline">
            <div className="ali-timeline-item">
              <span className="ali-timeline-date amber">Nov 1–15</span>
              <span className="ali-timeline-desc">Field surveys in Buea — Mile 2, Bonduma, Molyko</span>
            </div>
            <div className="ali-timeline-item">
              <span className="ali-timeline-date amber">Nov 16–30</span>
              <span className="ali-timeline-desc">Farmer visits — Foumbot, Yaoundé</span>
            </div>
            <div className="ali-timeline-item">
              <span className="ali-timeline-date red">Dec 1</span>
              <span className="ali-timeline-desc">SuberFood launch</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="ali-actions">
          <button className="ali-btn-secondary" onClick={handleViewCalendar}>
            <CalendarToday /> View full calendar
          </button>
          <button className="ali-btn-primary" onClick={handleAskCommander}>
            <Chat /> Ask Commander
          </button>
        </div>
      </div>
    </div>
  );
};

export default AliView;
