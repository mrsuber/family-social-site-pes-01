import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAPI, putAPI } from '../../../utils/fetchData';
import './FocusHeatMap.css';

const FocusHeatMap = () => {
  const { auth } = useSelector(state => state);
  const [draggedItem, setDraggedItem] = useState(null);
  const [lanes, setLanes] = useState({
    critical: [],
    active: [],
    hold: []
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      // Load all projects and categorize by priority
      const res = await getAPI('projects', auth.token);
      if (res.data.success) {
        const projects = res.data.data || [];

        // Categorize projects by status/priority
        const critical = projects.filter(p =>
          p.priority === 'critical' || p.status === 'critical'
        );
        const active = projects.filter(p =>
          (p.priority === 'active' || p.status === 'active') &&
          p.priority !== 'critical' && p.status !== 'critical'
        );
        const hold = projects.filter(p =>
          p.status === 'on_hold' || p.status === 'planning'
        );

        setLanes({
          critical: critical.map(p => formatProjectCard(p)),
          active: active.map(p => formatProjectCard(p)),
          hold: hold.map(p => formatProjectCard(p))
        });
      }
    } catch (err) {
      console.error('Error loading projects for heat map:', err);
      // Load default/mock data if backend not ready
      loadMockData();
    }
  };

  const loadMockData = () => {
    setLanes({
      critical: [
        {
          id: 'suberfood',
          title: 'SuberFood Platform',
          meta: ['6 days until Ali arrives', 'Due Oct 31 · 27 days'],
          pct: 70,
          missing: ['Pre-orders', 'Wallet system', 'PayWithCamsol'],
          hours: '12h',
          hasMissing: true,
          hasPct: true,
          hasHours: true
        },
        {
          id: 'camsol-sdo',
          title: 'Camsol SDO Report',
          meta: ['Due Oct 20 · 16 days'],
          pct: 60,
          ok: 'On track',
          hours: '24h',
          hasOk: true,
          hasPct: true,
          hasHours: true
        }
      ],
      active: [
        {
          id: 'pwc',
          title: 'PayWithCamsol',
          meta: ['Icons integrating', 'Monitor only'],
          ok: 'Stable',
          hasOk: true
        },
        {
          id: 'craftex',
          title: 'SuberCraftex',
          meta: ['106 products · low revenue', 'Needs marketing — after SuberFood'],
          hasOk: false
        }
      ],
      hold: [
        {
          id: 'ngo',
          title: 'ProFundra NGO Partnerships',
          resume: 'Q1 2027'
        },
        {
          id: 'bank',
          title: 'PayWithCamsol Bank Integration',
          resume: 'Q1 2027'
        },
        {
          id: 'growth',
          title: 'SuberCraftex Aggressive Growth',
          resume: 'Dec 2026'
        }
      ]
    });
  };

  const formatProjectCard = (project) => {
    return {
      id: project.id,
      title: project.name,
      meta: [project.description || ''],
      pct: project.progress || 0,
      hasPct: !!project.progress,
      hasOk: project.status === 'active',
      ok: project.status === 'active' ? 'On track' : '',
      resume: project.resumeDate || ''
    };
  };

  const handleDragStart = (e, itemId, sourceLane) => {
    setDraggedItem({ id: itemId, source: sourceLane });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e, targetLane) => {
    e.preventDefault();

    if (!draggedItem) return;

    const { id, source } = draggedItem;

    if (source === targetLane) {
      setDraggedItem(null);
      return;
    }

    // Move item between lanes
    const sourceItems = [...lanes[source]];
    const targetItems = [...lanes[targetLane]];

    const itemIndex = sourceItems.findIndex(item => item.id === id);
    if (itemIndex === -1) return;

    const [movedItem] = sourceItems.splice(itemIndex, 1);
    targetItems.push(movedItem);

    setLanes({
      ...lanes,
      [source]: sourceItems,
      [targetLane]: targetItems
    });

    setDraggedItem(null);

    // Update backend if project exists
    try {
      let newStatus = 'active';
      if (targetLane === 'critical') newStatus = 'critical';
      if (targetLane === 'hold') newStatus = 'on_hold';

      await putAPI(`projects/${id}`, { status: newStatus }, auth.token);
    } catch (err) {
      console.error('Error updating project priority:', err);
    }
  };

  const handleWorkNow = (itemId) => {
    console.log('Starting work on:', itemId);
    // Can add routing or modal here
  };

  const handleDetails = (itemId) => {
    console.log('Show details for:', itemId);
    // Can add modal or routing here
  };

  const pulseRed = (
    <span style={{
      display: 'inline-block',
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: '#EF4444',
      animation: 'ecc-pulse 1.6s infinite',
      flexShrink: 0
    }}></span>
  );

  return (
    <section className="focus-heat-map">
      <div className="focus-heat-map-header">
        <div className="focus-heat-map-title">02 · FOCUS HEAT MAP</div>
        <div className="focus-heat-map-subtitle">
          Drag cards between lanes to change priority
        </div>
      </div>

      {/* CRITICAL Lane */}
      <div
        className="heat-map-lane critical-lane"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'critical')}
      >
        <div className="lane-header">
          {pulseRed} CRITICAL — needs your attention right now
        </div>
        <div className="lane-cards">
          {lanes.critical.map(item => (
            <div
              key={item.id}
              className="heat-map-card critical-card"
              draggable
              onDragStart={(e) => handleDragStart(e, item.id, 'critical')}
            >
              <div className="card-title">{item.title}</div>
              {item.meta.map((m, i) => (
                <div key={i} className="card-meta">{m}</div>
              ))}

              {item.hasPct && (
                <div className="card-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill critical-fill"
                      style={{ width: `${item.pct}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{item.pct}%</span>
                </div>
              )}

              {item.hasMissing && (
                <div className="card-missing">
                  <span className="missing-label">Missing</span>
                  {item.missing.map((x, i) => (
                    <span key={i} className="missing-item">— {x}</span>
                  ))}
                </div>
              )}

              {item.hasOk && (
                <div className="card-status success">✓ {item.ok}</div>
              )}

              {item.hasHours && (
                <div className="card-hours">TIME THIS WEEK · {item.hours}</div>
              )}

              <div className="card-actions">
                <button className="btn-work-now" onClick={() => handleWorkNow(item.id)}>
                  Work now
                </button>
                <button className="btn-details" onClick={() => handleDetails(item.id)}>
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ACTIVE Lane */}
      <div
        className="heat-map-lane active-lane"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'active')}
      >
        <div className="lane-header">
          <span className="lane-dot"></span> ACTIVE — in progress, stable
        </div>
        <div className="lane-cards">
          {lanes.active.map(item => (
            <div
              key={item.id}
              className="heat-map-card active-card"
              draggable
              onDragStart={(e) => handleDragStart(e, item.id, 'active')}
            >
              <div className="card-title">{item.title}</div>
              {item.meta.map((m, i) => (
                <div key={i} className="card-meta">{m}</div>
              ))}

              {item.hasPct && (
                <div className="card-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill active-fill"
                      style={{ width: `${item.pct}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{item.pct}%</span>
                </div>
              )}

              {item.hasOk && (
                <div className="card-status success">✓ {item.ok}</div>
              )}

              <div className="card-actions">
                <button className="btn-monitor" onClick={() => handleWorkNow(item.id)}>
                  Monitor
                </button>
                <button className="btn-details" onClick={() => handleDetails(item.id)}>
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ON HOLD Lane */}
      <div
        className="heat-map-lane hold-lane"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'hold')}
      >
        <div className="lane-header">
          <span className="lane-square"></span> ON HOLD — resume later
        </div>
        <div className="lane-chips">
          {lanes.hold.map(item => (
            <div
              key={item.id}
              className="hold-chip"
              draggable
              onDragStart={(e) => handleDragStart(e, item.id, 'hold')}
              onClick={() => handleDetails(item.id)}
            >
              <span className="hold-chip-title">{item.title}</span>
              <span className="hold-chip-resume">→ {item.resume}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FocusHeatMap;
