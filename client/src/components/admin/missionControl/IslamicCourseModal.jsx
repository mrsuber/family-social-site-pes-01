import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PersonDetailModal.css';

const IslamicCourseModal = ({ department, objectiveTitle, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [module, setModule] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (department && objectiveTitle) {
      fetchModuleData();
    }
  }, [department, objectiveTitle]);

  const fetchModuleData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get all modules for this department
      const modulesRes = await axios.get(`/api/islamic-courses/department/${department.id}/modules`);

      // Find the module matching this objective
      const matchingModule = modulesRes.data.modules.find(
        m => m.objectiveTitle === objectiveTitle
      );

      if (matchingModule) {
        // Fetch full module details with lessons, resources, and assignments
        const moduleRes = await axios.get(`/api/islamic-courses/module/${matchingModule.id}`);
        setModule(moduleRes.data.module);
        setLessons(moduleRes.data.lessons || []);

        // Auto-select first lesson if available
        if (moduleRes.data.lessons && moduleRes.data.lessons.length > 0) {
          setSelectedLesson(moduleRes.data.lessons[0]);
        }
      } else {
        setError('No course content found for this objective yet.');
      }
    } catch (error) {
      console.error('Error fetching module data:', error);
      setError('Failed to load course content. This module may not have been created yet.');
    } finally {
      setLoading(false);
    }
  };

  const renderLessonContent = (lesson) => {
    if (!lesson) return null;

    // Parse detail text to support newlines
    const detailParagraphs = lesson.detail?.split('\n').filter(p => p.trim()) || [];

    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        {/* Lesson Header */}
        <h2 style={{
          fontSize: '28px',
          fontWeight: '700',
          marginBottom: '16px',
          color: '#667eea'
        }}>
          {lesson.name}
        </h2>

        {/* Lesson Detail */}
        {detailParagraphs.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            {detailParagraphs.map((paragraph, index) => (
              <p key={index} style={{
                marginBottom: '16px',
                lineHeight: '1.8',
                color: '#d1d5db'
              }}>
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {/* Key Points */}
        {lesson.keyPoints && lesson.keyPoints.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '12px',
              color: '#667eea'
            }}>
              🔑 Key Points
            </h3>
            <ul style={{
              listStyle: 'disc',
              paddingLeft: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              {lesson.keyPoints.map((point, index) => (
                <li key={index} style={{ color: '#d1d5db', lineHeight: '1.6' }}>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Images */}
        {lesson.images && lesson.images.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '12px',
              color: '#667eea'
            }}>
              📸 Visual Resources
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              {lesson.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Resource ${index + 1}`}
                  style={{
                    width: '100%',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                  onClick={() => window.open(img, '_blank')}
                />
              ))}
            </div>
          </div>
        )}

        {/* Videos */}
        {lesson.videos && lesson.videos.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '12px',
              color: '#667eea'
            }}>
              🎥 Video Resources
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {lesson.videos.map((video, index) => (
                <a
                  key={index}
                  href={video}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '12px',
                    background: 'rgba(102, 126, 234, 0.1)',
                    borderRadius: '8px',
                    color: '#667eea',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span>▶️</span>
                  <span>Video {index + 1}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Resources */}
        {lesson.resources && lesson.resources.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '12px',
              color: '#667eea'
            }}>
              📚 Reading Resources
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {lesson.resources.map((resource, index) => (
                <div
                  key={index}
                  style={{
                    padding: '16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px',
                    border: resource.isRequired ? '2px solid #10b981' : '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#fff',
                      margin: 0
                    }}>
                      {resource.name}
                    </h4>
                    {resource.isRequired && (
                      <span style={{
                        fontSize: '12px',
                        padding: '4px 8px',
                        background: '#10b981',
                        color: 'white',
                        borderRadius: '4px',
                        fontWeight: '600'
                      }}>
                        Required
                      </span>
                    )}
                  </div>

                  {resource.author && (
                    <p style={{ fontSize: '14px', color: '#9ca3af', margin: '4px 0' }}>
                      by {resource.author}
                    </p>
                  )}

                  {resource.description && (
                    <p style={{ fontSize: '14px', color: '#d1d5db', margin: '8px 0' }}>
                      {resource.description}
                    </p>
                  )}

                  {resource.link && (
                    <a
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '14px',
                        color: '#667eea',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        marginTop: '8px'
                      }}
                    >
                      <span>🔗</span>
                      <span>Access Resource</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Assignments */}
        {lesson.assignments && lesson.assignments.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '12px',
              color: '#667eea'
            }}>
              ✍️ Assignments
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {lesson.assignments.map((assignment, index) => (
                <div
                  key={index}
                  style={{
                    padding: '16px',
                    background: 'rgba(118, 75, 162, 0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(118, 75, 162, 0.3)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#fff',
                      margin: 0
                    }}>
                      {assignment.name}
                    </h4>
                    <span style={{
                      fontSize: '12px',
                      padding: '4px 8px',
                      background: 'rgba(118, 75, 162, 0.3)',
                      color: '#c4b5fd',
                      borderRadius: '4px',
                      textTransform: 'capitalize'
                    }}>
                      {assignment.type}
                    </span>
                  </div>

                  <p style={{ fontSize: '14px', color: '#d1d5db', margin: '8px 0' }}>
                    {assignment.description}
                  </p>

                  {assignment.completionCriteria && (
                    <div style={{ marginTop: '12px' }}>
                      <p style={{ fontSize: '13px', color: '#9ca3af', fontWeight: '600' }}>
                        Completion Criteria:
                      </p>
                      <p style={{ fontSize: '13px', color: '#d1d5db' }}>
                        {assignment.completionCriteria}
                      </p>
                    </div>
                  )}

                  {assignment.estimatedMinutes && (
                    <p style={{
                      fontSize: '12px',
                      color: '#9ca3af',
                      marginTop: '8px'
                    }}>
                      ⏱️ Estimated time: {assignment.estimatedMinutes} minutes
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="person-detail-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{ zIndex: 10000 }}
    >
      <div
        className="person-detail-modal-wrapper"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '95vw',
          maxHeight: '95vh',
          width: '1400px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div className="person-detail-modal" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <div
            className="person-detail-header"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '24px',
              borderRadius: '12px 12px 0 0',
              color: 'white'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: '700' }}>
                  📚 {objectiveTitle}
                </h2>
                <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>
                  {department.name} • Islamic Learning Management System
                </p>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  color: 'white',
                  fontSize: '24px',
                  cursor: 'pointer',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            </div>
          </div>

          {/* Body */}
          <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
            {/* Sidebar - Lessons List */}
            <div
              style={{
                width: '300px',
                borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '16px',
                overflowY: 'auto',
                background: 'rgba(0, 0, 0, 0.2)'
              }}
            >
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '16px',
                color: '#9ca3af',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Lessons ({lessons.length})
              </h3>

              {loading ? (
                <p style={{ color: '#9ca3af', fontSize: '14px' }}>Loading lessons...</p>
              ) : error ? (
                <div style={{
                  padding: '16px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(239, 68, 68, 0.3)'
                }}>
                  <p style={{ color: '#ef4444', fontSize: '14px', margin: 0 }}>
                    {error}
                  </p>
                  <p style={{ color: '#9ca3af', fontSize: '12px', marginTop: '8px' }}>
                    Course content will be added soon.
                  </p>
                </div>
              ) : lessons.length === 0 ? (
                <div style={{
                  padding: '16px',
                  background: 'rgba(102, 126, 234, 0.1)',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>
                    No lessons added yet.
                  </p>
                  <p style={{ color: '#667eea', fontSize: '12px', marginTop: '8px' }}>
                    Coming soon!
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {lessons.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      onClick={() => setSelectedLesson(lesson)}
                      style={{
                        padding: '12px',
                        background: selectedLesson?.id === lesson.id
                          ? 'rgba(102, 126, 234, 0.2)'
                          : 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        border: selectedLesson?.id === lesson.id
                          ? '2px solid #667eea'
                          : '1px solid transparent',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedLesson?.id !== lesson.id) {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedLesson?.id !== lesson.id) {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        }
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                        <span style={{
                          fontSize: '14px',
                          fontWeight: '700',
                          color: '#667eea',
                          minWidth: '24px'
                        }}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span style={{
                          fontSize: '14px',
                          color: selectedLesson?.id === lesson.id ? '#fff' : '#d1d5db',
                          fontWeight: selectedLesson?.id === lesson.id ? '600' : '400'
                        }}>
                          {lesson.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Main Content - Selected Lesson */}
            {selectedLesson ? (
              renderLessonContent(selectedLesson)
            ) : !loading && !error && lessons.length > 0 ? (
              <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9ca3af'
              }}>
                <p>Select a lesson to begin</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IslamicCourseModal;
