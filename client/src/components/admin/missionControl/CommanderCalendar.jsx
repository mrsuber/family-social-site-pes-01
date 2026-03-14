import React, { useState, useEffect } from 'react';
import './CommanderCalendar.css';
import {
  Add,
  Event,
  AccessTime,
  CheckCircle,
  Error,
  Delete,
  Edit,
  ChevronLeft,
  ChevronRight,
  Today,
  ViewModule
} from '@material-ui/icons';
import { getAPI, postAPI, putAPI, deleteAPI } from '../../../utils/fetchData';

const CommanderCalendar = ({ personId }) => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventType: 'task',
    startDate: '',
    endDate: '',
    allDay: false,
    priority: 'medium',
    status: 'pending'
  });

  useEffect(() => {
    if (personId) {
      fetchEvents();
    }
  }, [personId]);

  const fetchEvents = async () => {
    try {
      const res = await getAPI(`calendar/person/${personId}`);
      if (res.data.success) {
        setEvents(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching calendar events:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const eventData = {
        ...formData,
        personId
      };

      if (editingEvent) {
        await putAPI(`calendar/${editingEvent.id}`, eventData);
      } else {
        await postAPI('calendar', eventData);
      }

      fetchEvents();
      resetForm();
    } catch (err) {
      console.error('Error saving event:', err);
    }
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('Delete this event?')) {
      try {
        await deleteAPI(`calendar/${eventId}`);
        fetchEvents();
      } catch (err) {
        console.error('Error deleting event:', err);
      }
    }
  };

  const handleStatusChange = async (eventId, newStatus) => {
    try {
      await putAPI(`calendar/${eventId}/status`, { status: newStatus });
      fetchEvents();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      eventType: 'task',
      startDate: '',
      endDate: '',
      allDay: false,
      priority: 'medium',
      status: 'pending'
    });
    setEditingEvent(null);
    setShowEventForm(false);
  };

  const editEvent = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description || '',
      eventType: event.eventType,
      startDate: event.startDate.split('T')[0],
      endDate: event.endDate ? event.endDate.split('T')[0] : '',
      allDay: event.allDay,
      priority: event.priority,
      status: event.status
    });
    setShowEventForm(true);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle style={{ color: '#fff', fontSize: 12 }} />;
      case 'in-progress':
        return <AccessTime style={{ color: '#fff', fontSize: 12 }} />;
      case 'cancelled':
        return <Error style={{ color: '#fff', fontSize: 12 }} />;
      default:
        return <Event style={{ color: '#fff', fontSize: 12 }} />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return '#dc2626';
      case 'high':
        return '#ea580c';
      case 'medium':
        return '#3b82f6';
      default:
        return '#6b7280';
    }
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setSelectedDate(newDate);
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getEventsForDate = (date) => {
    if (date === null) return [];
    return events.filter(event => {
      const eventDate = new Date(event.startDate);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const isToday = (date) => {
    if (date === null) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const handleDayClick = (date) => {
    if (date === null) return;
    setFormData({
      ...formData,
      startDate: date.toISOString().split('T')[0]
    });
    setShowEventForm(true);
  };

  const calendarDays = getDaysInMonth(selectedDate);

  return (
    <div className="commander-calendar">
      <div className="calendar-header">
        <div className="calendar-nav">
          <button onClick={goToToday} className="btn-today">
            <Today /> Today
          </button>
          <button onClick={() => navigateMonth(-1)} className="nav-btn">
            <ChevronLeft />
          </button>
          <button onClick={() => navigateMonth(1)} className="nav-btn">
            <ChevronRight />
          </button>
          <h3 className="current-month">
            {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
        </div>

        <div className="calendar-actions">
          <button className="view-btn active">
            <ViewModule />
          </button>
          <button onClick={() => setShowEventForm(true)} className="btn-add-event">
            <Add /> New Event
          </button>
        </div>
      </div>

      {showEventForm && (
        <div className="event-form-overlay" onClick={resetForm}>
          <form className="event-form" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
            <h4>{editingEvent ? 'Edit Event' : 'New Event'}</h4>

            <input
              type="text"
              placeholder="Event title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <textarea
              placeholder="Description (optional)"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />

            <div className="form-row">
              <select
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
              >
                <option value="task">Task</option>
                <option value="appointment">Appointment</option>
                <option value="meeting">Meeting</option>
                <option value="deadline">Deadline</option>
                <option value="reminder">Reminder</option>
              </select>

              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <div className="form-row">
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />

              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
            </div>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.allDay}
                onChange={(e) => setFormData({ ...formData, allDay: e.target.checked })}
              />
              All day event
            </label>

            <div className="form-actions">
              <button type="button" onClick={resetForm} className="btn-cancel">
                Cancel
              </button>
              <button type="submit" className="btn-save">
                {editingEvent ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="calendar-grid">
        <div className="calendar-weekdays">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="weekday-header">{day}</div>
          ))}
        </div>

        <div className="calendar-days">
          {calendarDays.map((date, index) => {
            const dayEvents = getEventsForDate(date);
            return (
              <div
                key={index}
                className={`calendar-day ${date === null ? 'empty' : ''} ${isToday(date) ? 'today' : ''}`}
                onClick={() => handleDayClick(date)}
              >
                {date !== null && (
                  <>
                    <div className="day-number">{date.getDate()}</div>
                    <div className="day-events">
                      {dayEvents.slice(0, 3).map(event => (
                        <div
                          key={event.id}
                          className={`mini-event ${event.status}`}
                          style={{ backgroundColor: getPriorityColor(event.priority) }}
                          onClick={(e) => {
                            e.stopPropagation();
                            editEvent(event);
                          }}
                          onContextMenu={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDelete(event.id);
                          }}
                          title={`${event.title} (Right-click to delete)`}
                        >
                          <span className="mini-event-icon">{getStatusIcon(event.status)}</span>
                          <span className="mini-event-title">{event.title}</span>
                        </div>
                      ))}
                      {dayEvents.length > 3 && (
                        <div className="more-events">+{dayEvents.length - 3} more</div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CommanderCalendar;
