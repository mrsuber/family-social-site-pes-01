import React, { useState, useEffect } from 'react';
import { Close, PlayArrow } from '@material-ui/icons';
import './MorningBriefModal.css';

const MorningBriefModal = ({ onClose, onBeginDay }) => {
  const [priorities, setPriorities] = useState([]);
  const [daysUntilDeadline, setDaysUntilDeadline] = useState(0);

  useEffect(() => {
    // Calculate days until next major deadline (example: Ali arrives)
    const today = new Date();
    const deadline = new Date(2026, 9, 10); // Oct 10, 2026
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysUntilDeadline(diffDays);

    // Set daily priorities (can be fetched from backend later)
    setPriorities([
      {
        number: '1',
        label: 'SuberFood: Build pre-order form',
        estimate: '4h estimated',
        color: '#EF4444',
        action: 'suberfood-preorder'
      },
      {
        number: '2',
        label: 'Camsol SDO: Deploy AI agent',
        estimate: '3h estimated',
        color: '#EF4444',
        action: 'camsol-deploy'
      },
      {
        number: '3',
        label: "Plan Ali's first-week training",
        estimate: '1h estimated',
        color: '#F59E0B',
        action: 'ali-training'
      }
    ]);

    // Mark as seen in localStorage to avoid showing every time
    try {
      const dateKey = new Date().toDateString();
      const seenKey = `ecc-morning-${dateKey}`;
      if (!localStorage.getItem(seenKey)) {
        localStorage.setItem(seenKey, '1');
      }
    } catch (e) {
      console.error('localStorage not available:', e);
    }
  }, []);

  const handleStartTask = (action) => {
    console.log('Starting task:', action);
    // Can add routing or state changes here to navigate to specific task
  };

  const handleBeginDay = () => {
    if (onBeginDay) {
      onBeginDay();
    }
    onClose();
  };

  const handleAdjustPriorities = () => {
    alert('Drag cards in the Focus Heat Map to re-prioritize tasks');
    onClose();
  };

  const getTodayLabel = () => {
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  return (
    <div className="morning-brief-overlay" onClick={onClose}>
      <div className="morning-brief-modal" onClick={(e) => e.stopPropagation()}>
        <div className="morning-brief-header">
          <div>
            <div className="morning-brief-title">GOOD MORNING, HIGH COMMANDER</div>
            <div className="morning-brief-date">{getTodayLabel()}</div>
          </div>
          <button className="morning-brief-close" onClick={onClose}>
            <Close />
          </button>
        </div>

        <div className="morning-brief-body">
          <div className="morning-brief-section-label">TODAY'S PRIORITIES</div>

          {priorities.map((priority, index) => (
            <div key={index} className="morning-brief-priority">
              <span className="priority-number" style={{ color: priority.color }}>
                {priority.number}
              </span>
              <div className="priority-content">
                <span className="priority-label">{priority.label}</span>
                <span className="priority-estimate">{priority.estimate}</span>
              </div>
              <button
                className="priority-start-btn"
                onClick={() => handleStartTask(priority.action)}
              >
                Start now
              </button>
            </div>
          ))}

          <div className="morning-brief-warning">
            You have <strong>{daysUntilDeadline} days</strong> until Ali arrives — the SuberFood platform must be ready.
          </div>

          <div className="morning-brief-actions">
            <button className="btn-secondary" onClick={handleAdjustPriorities}>
              Adjust priorities
            </button>
            <button className="btn-primary" onClick={handleBeginDay}>
              <PlayArrow /> Begin day
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MorningBriefModal;
