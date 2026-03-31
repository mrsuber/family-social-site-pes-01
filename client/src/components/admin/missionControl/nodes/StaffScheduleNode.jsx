import React from 'react';
import { Handle, Position } from 'reactflow';
import { People, Today, AccessTime, Person } from '@material-ui/icons';
import './NodeStyles.css';

const StaffScheduleNode = ({ data }) => {
  const getShiftDistribution = () => {
    if (data.shiftsToday > 0) {
      return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginTop: 8 }}>
          <div style={{
            padding: '6px 4px',
            background: 'rgba(251, 191, 36, 0.1)',
            borderRadius: 6,
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fbbf24' }}>
              {data.morningShifts || 0}
            </div>
            <div style={{ fontSize: 8, color: '#9ca3af', textTransform: 'uppercase', marginTop: 2 }}>
              Morning
            </div>
          </div>

          <div style={{
            padding: '6px 4px',
            background: 'rgba(59, 130, 246, 0.1)',
            borderRadius: 6,
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#60a5fa' }}>
              {data.afternoonShifts || 0}
            </div>
            <div style={{ fontSize: 8, color: '#9ca3af', textTransform: 'uppercase', marginTop: 2 }}>
              Afternoon
            </div>
          </div>

          <div style={{
            padding: '6px 4px',
            background: 'rgba(139, 92, 246, 0.1)',
            borderRadius: 6,
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#a78bfa' }}>
              {data.eveningShifts || 0}
            </div>
            <div style={{ fontSize: 8, color: '#9ca3af', textTransform: 'uppercase', marginTop: 2 }}>
              Evening
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="restaurant-staff-node custom-node"
      onClick={() => data.onNodeClick && data.onNodeClick(data)}
      style={{ borderColor: '#ec4899' }}
    >
      <Handle type="target" position={Position.Top} className="node-handle" />

      <div className="staff-node-header" style={{ background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)' }}>
        <People style={{ fontSize: 20, color: 'white' }} />
        <span style={{ color: 'white', fontWeight: 700, fontSize: 11, letterSpacing: '0.5px' }}>STAFF SCHEDULE</span>
      </div>

      <div className="staff-node-body" style={{ padding: 16, color: '#f3f4f6' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: 15, fontWeight: 600, color: '#f3f4f6' }}>
          {data.label || 'Staff Management'}
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Total Staff */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            background: 'rgba(236, 72, 153, 0.1)',
            borderRadius: 8,
            border: '1px solid rgba(236, 72, 153, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Person style={{ fontSize: 18, color: '#ec4899' }} />
              <span style={{ fontSize: 12, color: '#d1d5db' }}>Total Staff</span>
            </div>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#f472b6' }}>
              {data.totalStaff || 0}
            </span>
          </div>

          {/* Today's Schedule */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            background: 'rgba(16, 185, 129, 0.1)',
            borderRadius: 8,
            border: '1px solid rgba(16, 185, 129, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Today style={{ fontSize: 18, color: '#10b981' }} />
              <span style={{ fontSize: 12, color: '#d1d5db' }}>On Duty Today</span>
            </div>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#10b981' }}>
              {data.onDutyToday || 0}
            </span>
          </div>

          {/* Shift Distribution */}
          {getShiftDistribution()}

          {/* Role Breakdown */}
          {data.roles && data.roles.length > 0 && (
            <div style={{
              padding: '8px 10px',
              background: 'rgba(59, 130, 246, 0.05)',
              borderRadius: 6,
              border: '1px solid rgba(59, 130, 246, 0.2)'
            }}>
              <div style={{ fontSize: 10, color: '#9ca3af', textTransform: 'uppercase', marginBottom: 6 }}>
                Roles
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {data.roles.slice(0, 4).map((role, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: 9,
                      padding: '2px 6px',
                      background: 'rgba(236, 72, 153, 0.2)',
                      color: '#f472b6',
                      borderRadius: 4,
                      fontWeight: 600,
                      textTransform: 'capitalize'
                    }}
                  >
                    {role}
                  </span>
                ))}
                {data.roles.length > 4 && (
                  <span style={{ fontSize: 9, color: '#9ca3af' }}>
                    +{data.roles.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Attendance Status */}
          {(data.checkedIn > 0 || data.absent > 0) && (
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 8 }}>
              <div style={{
                padding: '6px 10px',
                background: 'rgba(16, 185, 129, 0.1)',
                borderRadius: 6,
                border: '1px solid rgba(16, 185, 129, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}>
                <AccessTime style={{ fontSize: 14, color: '#10b981' }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#10b981' }}>
                    {data.checkedIn || 0}
                  </div>
                  <div style={{ fontSize: 9, color: '#9ca3af', textTransform: 'uppercase' }}>
                    Checked In
                  </div>
                </div>
              </div>

              <div style={{
                padding: '6px 10px',
                background: 'rgba(239, 68, 68, 0.1)',
                borderRadius: 6,
                border: '1px solid rgba(239, 68, 68, 0.2)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#ef4444' }}>
                  {data.absent || 0}
                </div>
                <div style={{ fontSize: 9, color: '#9ca3af', textTransform: 'uppercase', marginTop: 2 }}>
                  Absent
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div style={{
          marginTop: 12,
          paddingTop: 10,
          borderTop: '1px solid #374151',
          textAlign: 'center'
        }}>
          <span style={{ fontSize: 10, color: '#ec4899', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Click to Manage Shifts
          </span>
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="node-handle" />
    </div>
  );
};

export default StaffScheduleNode;
