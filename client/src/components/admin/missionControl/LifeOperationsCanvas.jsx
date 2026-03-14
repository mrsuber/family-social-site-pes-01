import React, { useState, useEffect } from 'react';
import FinancialDashboard from './FinancialDashboard';
import ConnectionManager from './ConnectionManager';
import DailyOperations from './DailyOperations';
import { AttachMoney, People as PeopleIcon, TrendingUp } from '@material-ui/icons';
import './LifeOperationsCanvas.css';
import { getAPI } from '../../../utils/fetchData';

const LifeOperationsCanvas = () => {
  const [activeTab, setActiveTab] = useState('financial');
  const [personId, setPersonId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the high commander's person ID
    const fetchPersonId = async () => {
      try {
        const res = await getAPI('people/by-relationship/high_commander');
        if (res.data && res.data.data && res.data.data.length > 0) {
          setPersonId(res.data.data[0].id);
        }
      } catch (err) {
        console.error('Error fetching person ID:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPersonId();
  }, []);

  const renderTabContent = () => {
    if (loading) {
      return <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>Loading...</div>;
    }

    if (!personId) {
      return <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>No person data found. Please seed the database first.</div>;
    }

    switch (activeTab) {
      case 'financial':
        return <FinancialDashboard personId={personId} />;
      case 'connections':
        return <ConnectionManager personId={personId} />;
      case 'daily':
        return <DailyOperations personId={personId} />;
      default:
        return <FinancialDashboard personId={personId} />;
    }
  };

  return (
    <div className="life-ops-canvas">
      <div className="life-ops-header">
        <h2>Life Operations</h2>
        <p>Personal management dashboard for tracking finances, connections, and daily progress</p>
      </div>

      <div className="life-ops-tabs">
        <button
          className={`life-ops-tab ${activeTab === 'financial' ? 'active' : ''}`}
          onClick={() => setActiveTab('financial')}
        >
          <AttachMoney />
          <span>Financial Dashboard</span>
        </button>
        <button
          className={`life-ops-tab ${activeTab === 'connections' ? 'active' : ''}`}
          onClick={() => setActiveTab('connections')}
        >
          <PeopleIcon />
          <span>Connection Manager</span>
        </button>
        <button
          className={`life-ops-tab ${activeTab === 'daily' ? 'active' : ''}`}
          onClick={() => setActiveTab('daily')}
        >
          <TrendingUp />
          <span>Daily Operations</span>
        </button>
      </div>

      <div className="life-ops-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default LifeOperationsCanvas;
