import React, { useState, useEffect } from 'react';
import './BiographyViewer.css';
import {
  ChevronLeft,
  ChevronRight,
  LocalOffer,
  CalendarToday,
  StarRate
} from '@material-ui/icons';
import ReactMarkdown from 'react-markdown';

const BiographyViewer = ({ personId }) => {
  const [sections, setSections] = useState([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('BiographyViewer personId:', personId);
    if (personId) {
      fetchBiography();
    } else {
      setError('No person ID provided');
      setLoading(false);
    }
  }, [personId]);

  const fetchBiography = async () => {
    try {
      setLoading(true);
      console.log('Fetching biography for person:', personId);
      const response = await fetch(`/api/biography/${personId}`);
      console.log('Biography response status:', response.status);

      if (!response.ok) {
        if (response.status === 404) {
          console.log('No biography found (404)');
          setSections([]);
          setLoading(false);
          return;
        }
        throw new Error(`Failed to fetch biography: ${response.status}`);
      }

      const data = await response.json();
      console.log('Biography data received:', data.sections?.length, 'sections');
      setSections(data.sections || []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching biography:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const goToNextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const goToPreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="biography-viewer">
        <div className="biography-loading">
          <StarRate className="loading-icon" />
          <p>Loading biography...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="biography-viewer">
        <div className="biography-error">
          <p>Error loading biography: {error}</p>
        </div>
      </div>
    );
  }

  if (!sections || sections.length === 0) {
    return (
      <div className="biography-viewer">
        <div className="biography-empty">
          <p>No biography available</p>
        </div>
      </div>
    );
  }

  const section = sections[currentSection];

  return (
    <div className="biography-viewer">
      {/* Section Navigator */}
      <div className="biography-navigator">
        <button
          className="nav-btn"
          onClick={goToPreviousSection}
          disabled={currentSection === 0}
          title="Previous Section"
        >
          <ChevronLeft />
        </button>

        <div className="section-indicator">
          <span className="section-number">Section {section.sectionNumber} of {sections.length}</span>
          <h4 className="section-title-small">{section.sectionTitle}</h4>
        </div>

        <button
          className="nav-btn"
          onClick={goToNextSection}
          disabled={currentSection === sections.length - 1}
          title="Next Section"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Section Content */}
      <div className="biography-content">
        <div className="biography-header">
          <h3>{section.sectionTitle}</h3>
          {(section.startDate || section.endDate) && (
            <div className="biography-dates">
              <CalendarToday fontSize="small" />
              <span>
                {section.startDate && formatDate(section.startDate)}
                {section.startDate && section.endDate && ' - '}
                {section.endDate && formatDate(section.endDate)}
              </span>
            </div>
          )}
        </div>

        {section.tags && section.tags.length > 0 && (
          <div className="biography-tags">
            <LocalOffer fontSize="small" />
            {section.tags.map((tag, index) => (
              <span key={index} className="biography-tag">{tag}</span>
            ))}
          </div>
        )}

        <div className="biography-text">
          <ReactMarkdown>{section.content}</ReactMarkdown>
        </div>

        {section.keyNumbers && Object.keys(section.keyNumbers).length > 0 && (
          <div className="biography-key-numbers">
            <h4>Key Numbers</h4>
            <div className="key-numbers-grid">
              {Object.entries(section.keyNumbers).map(([key, value]) => (
                <div key={key} className="key-number-item">
                  <span className="key-number-label">
                    {key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                  </span>
                  <span className="key-number-value">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {section.rawDiaryExcerpt && (
          <div className="biography-diary-excerpt">
            <h4>Diary Excerpt</h4>
            <div className="diary-text">
              <blockquote>
                {section.rawDiaryExcerpt}
              </blockquote>
            </div>
          </div>
        )}
      </div>

      {/* Section Dots */}
      <div className="biography-dots">
        {sections.map((_, index) => (
          <button
            key={index}
            className={`section-dot ${index === currentSection ? 'active' : ''}`}
            onClick={() => setCurrentSection(index)}
            title={sections[index].sectionTitle}
          />
        ))}
      </div>
    </div>
  );
};

export default BiographyViewer;
