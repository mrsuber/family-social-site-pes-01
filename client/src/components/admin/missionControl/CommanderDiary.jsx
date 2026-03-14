import React, { useState, useEffect } from 'react';
import './CommanderDiary.css';
import {
  Add,
  Book,
  Edit,
  Delete,
  ChevronLeft,
  ChevronRight,
  SentimentVerySatisfied,
  SentimentSatisfied,
  SentimentDissatisfied,
  SentimentVeryDissatisfied,
  Mic,
  PlayArrow,
  GetApp,
  Face,
  Today,
  ViewModule
} from '@material-ui/icons';
import { getAPI, postAPI, putAPI, deleteAPI } from '../../../utils/fetchData';

const CommanderDiary = ({ personId }) => {
  const [entries, setEntries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [formData, setFormData] = useState({
    entryDate: new Date().toISOString().split('T')[0],
    textContent: '',
    mood: 'neutral',
    tags: [],
    audioUrl: null
  });
  const [newTag, setNewTag] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  useEffect(() => {
    if (personId) {
      fetchEntries();
    }
  }, [personId]);

  const fetchEntries = async () => {
    try {
      const res = await getAPI(`diary/person/${personId}?limit=1000`);
      if (res.data.success) {
        setEntries(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching diary entries:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let audioUrl = formData.audioUrl;

      // If there's a new audio recording, upload it first
      if (audioBlob) {
        console.log('Uploading audio blob:', audioBlob);
        const formDataUpload = new FormData();
        formDataUpload.append('audio', audioBlob, 'diary-audio.webm');

        try {
          const uploadRes = await fetch('/api/upload/diary-audio', {
            method: 'POST',
            body: formDataUpload
          });

          console.log('Upload response status:', uploadRes.status);
          const uploadData = await uploadRes.json();
          console.log('Upload response data:', uploadData);

          if (uploadData.url) {
            audioUrl = uploadData.url;
            console.log('Audio uploaded successfully to:', audioUrl);
          } else {
            console.error('No URL in upload response');
            alert('Audio upload failed. Please try again.');
            return;
          }
        } catch (uploadErr) {
          console.error('Error uploading audio:', uploadErr);
          alert('Audio upload error: ' + uploadErr.message);
          return;
        }
      }

      const entryData = {
        ...formData,
        audioUrl,
        personId
      };

      console.log('Saving diary entry with data:', entryData);

      if (editingEntry) {
        await putAPI(`diary/${editingEntry.id}`, entryData);
      } else {
        await postAPI('diary', entryData);
      }

      fetchEntries();
      resetForm();
    } catch (err) {
      console.error('Error saving diary entry:', err);
      alert('Error saving entry: ' + err.message);
    }
  };

  const handleDelete = async (entryId) => {
    if (window.confirm('Delete this diary entry?')) {
      try {
        await deleteAPI(`diary/${entryId}`);
        fetchEntries();
      } catch (err) {
        console.error('Error deleting entry:', err);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      entryDate: new Date().toISOString().split('T')[0],
      textContent: '',
      mood: 'neutral',
      tags: [],
      audioUrl: null
    });
    setNewTag('');
    setEditingEntry(null);
    setShowEntryForm(false);
    setAudioBlob(null);
    setAudioURL(null);
    setIsRecording(false);
    setRecordingTime(0);
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  const editEntry = (entry) => {
    setEditingEntry(entry);
    setFormData({
      entryDate: entry.entryDate,
      textContent: entry.textContent || '',
      mood: entry.mood || 'neutral',
      tags: entry.tags || [],
      audioUrl: entry.audioUrl || null
    });
    if (entry.audioUrl) {
      setAudioURL(entry.audioUrl);
    }
    setShowEntryForm(true);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
        setAudioURL(URL.createObjectURL(blob));
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      const interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      setTimerInterval(interval);
    } catch (err) {
      console.error('Error starting recording:', err);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      if (timerInterval) {
        clearInterval(timerInterval);
        setTimerInterval(null);
      }
    }
  };

  const deleteAudio = () => {
    setAudioBlob(null);
    setAudioURL(null);
    setFormData({ ...formData, audioUrl: null });
    setRecordingTime(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const getMoodIcon = (mood, small = false) => {
    const size = small ? 16 : 24;
    switch (mood) {
      case 'excellent':
        return <SentimentVerySatisfied style={{ color: '#10b981', fontSize: size }} />;
      case 'good':
        return <SentimentSatisfied style={{ color: '#3b82f6', fontSize: size }} />;
      case 'stressed':
        return <SentimentDissatisfied style={{ color: '#f59e0b', fontSize: size }} />;
      case 'difficult':
        return <SentimentVeryDissatisfied style={{ color: '#ef4444', fontSize: size }} />;
      case 'neutral':
        return <Face style={{ color: '#6b7280', fontSize: size }} />;
      default:
        return <Face style={{ color: '#6b7280', fontSize: size }} />;
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

  const getEntryForDate = (date) => {
    if (date === null) return null;
    const dateStr = date.toISOString().split('T')[0];
    return entries.find(entry => entry.entryDate === dateStr);
  };

  const isToday = (date) => {
    if (date === null) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const handleDayClick = (date) => {
    if (date === null) return;
    const existingEntry = getEntryForDate(date);
    if (existingEntry) {
      editEntry(existingEntry);
    } else {
      setFormData({
        ...formData,
        entryDate: date.toISOString().split('T')[0]
      });
      setShowEntryForm(true);
    }
  };

  const calendarDays = getDaysInMonth(selectedDate);

  return (
    <div className="commander-diary">
      <div className="diary-header">
        <div className="diary-nav">
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

        <div className="diary-actions">
          <button className="view-btn active">
            <ViewModule />
          </button>
          <button onClick={() => setShowEntryForm(true)} className="btn-add-entry">
            <Add /> New Entry
          </button>
        </div>
      </div>

      {showEntryForm && (
        <div className="entry-form-overlay" onClick={resetForm}>
          <form className="entry-form" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
            <h4>{editingEntry ? 'Edit Entry' : 'New Diary Entry'}</h4>

            <input
              type="date"
              value={formData.entryDate}
              onChange={(e) => setFormData({ ...formData, entryDate: e.target.value })}
              required
            />

            <textarea
              placeholder="Mission report for the day..."
              value={formData.textContent}
              onChange={(e) => setFormData({ ...formData, textContent: e.target.value })}
              rows={10}
              required
            />

            <div className="mood-selector">
              <label>How was your day?</label>
              <div className="mood-options">
                {['excellent', 'good', 'neutral', 'stressed', 'difficult'].map(mood => (
                  <button
                    key={mood}
                    type="button"
                    className={`mood-btn ${formData.mood === mood ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, mood })}
                  >
                    {getMoodIcon(mood)}
                    <span>{mood}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="tags-section">
              <label>Tags</label>
              <div className="tags-input">
                <input
                  type="text"
                  placeholder="Add tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <button type="button" onClick={addTag} className="btn-add-tag">
                  Add
                </button>
              </div>
              {formData.tags.length > 0 && (
                <div className="tags-list">
                  {formData.tags.map(tag => (
                    <span key={tag} className="tag">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)}>×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="audio-section">
              <label>Voice Note (Optional)</label>
              <div className="audio-controls">
                {!audioURL && !isRecording && (
                  <button type="button" onClick={startRecording} className="btn-record">
                    <Mic /> Start Recording
                  </button>
                )}

                {isRecording && (
                  <div className="recording-indicator">
                    <button type="button" onClick={stopRecording} className="btn-stop-recording">
                      <span className="recording-dot"></span> Stop ({formatTime(recordingTime)})
                    </button>
                  </div>
                )}

                {audioURL && !isRecording && (
                  <div className="audio-playback">
                    <audio controls src={audioURL} />
                    <button type="button" onClick={deleteAudio} className="btn-delete-audio">
                      <Delete /> Remove
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={resetForm} className="btn-cancel">
                Cancel
              </button>
              <button type="submit" className="btn-save">
                {editingEntry ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="diary-calendar-grid">
        <div className="diary-weekdays">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="weekday-header">{day}</div>
          ))}
        </div>

        <div className="diary-days">
          {calendarDays.map((date, index) => {
            const entry = getEntryForDate(date);
            const hasEntry = entry !== null && entry !== undefined;
            return (
              <div
                key={index}
                className={`diary-day ${date === null ? 'empty' : ''} ${isToday(date) ? 'today' : ''} ${hasEntry ? 'has-entry' : ''}`}
                onClick={() => handleDayClick(date)}
              >
                {date !== null && (
                  <>
                    <div className="day-number">{date.getDate()}</div>
                    {hasEntry && entry && (
                      <div className="day-entry-indicator">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                          {getMoodIcon(entry.mood || 'neutral', true)}
                          {entry.audioUrl && <Mic style={{ fontSize: 12, color: '#3b82f6', marginLeft: 4 }} />}
                        </div>
                        <div className="entry-preview">
                          {entry.textContent ? entry.textContent.substring(0, 100) : 'No content'}...
                        </div>
                        {entry.audioUrl && (
                          <div className="day-audio-player" onClick={(e) => e.stopPropagation()}>
                            <audio controls src={entry.audioUrl} style={{ width: '100%', height: '30px', marginTop: '6px' }} />
                          </div>
                        )}
                      </div>
                    )}
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

export default CommanderDiary;
