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
    loadMockData();
  }, []);

  const loadMockData = () => {
    setLanes({
      critical: [
        {
          id: 'suberfood',
          title: 'SuberFood Platform',
          meta: ['7 days until Ali arrives', 'Due Oct 31 · 28 days'],
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
          meta: ['Due Oct 20 · 17 days'],
          pct: 60,
          ok: 'On track',
          hours: '24h',
          hasOk: true,
          hasPct: true,
          hasHours: true,
          hasPf: true
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
          meta: ['106 products · low revenue', 'Needs marketing — after SuberFood']
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
    if (!draggedItem || draggedItem.source === targetLane) {
      setDraggedItem(null);
      return;
    }

    const { id, source } = draggedItem;
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
    <section className="focus-heat-map">
      <div className="focus-heat-map-header">
        <div className="focus-heat-map-title">02 · FOCUS HEAT MAP</div>
        <div className="focus-heat-map-subtitle">Drag cards between lanes to change priority</div>
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
              className="heat-map-card"
              draggable
              onDragStart={(e) => handleDragStart(e, item.id, 'critical')}
            >
              <div className="card-title">{item.title}</div>

              {item.meta.map((m, i) => (
                <div key={i} className="card-meta">{m}</div>
              ))}

              {item.hasPct && (
                <div className="card-progress-row">
                  <div className="progress-bar-horizontal">
                    <div
                      className="progress-fill-red"
                      style={{ width: `${item.pct}%` }}
                    ></div>
                  </div>
                  <span className="progress-pct">{item.pct}%</span>
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
                <div className="card-status-ok">✓ {item.ok}</div>
              )}

              {item.hasHours && (
                <div className="card-time-week">TIME THIS WEEK · {item.hours}</div>
              )}

              <div className="card-actions">
                <button className="btn-work-now">Work now</button>
                <button className="btn-details">Details</button>
                {item.hasPf && (
                  <a
                    href="https://profundra.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-profundra"
                  >
                    View in ProFundra →
                  </a>
                )}
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
                <div className="card-progress-row">
                  <div className="progress-bar-horizontal">
                    <div
                      className="progress-fill-amber"
                      style={{ width: `${item.pct}%` }}
                    ></div>
                  </div>
                  <span className="progress-pct">{item.pct}%</span>
                </div>
              )}

              {item.hasOk && (
                <div className="card-status-ok">✓ {item.ok}</div>
              )}

              <div className="card-actions">
                <button className="btn-monitor">Monitor</button>
                <button className="btn-details">Details</button>
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
            >
              <span>{item.title}</span>
              <span className="chip-resume">→ {item.resume}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FocusHeatMap;
