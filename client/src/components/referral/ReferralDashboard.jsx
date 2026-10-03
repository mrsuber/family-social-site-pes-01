import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './ReferralDashboard.css';

const ReferralDashboard = () => {
  const { auth } = useSelector(state => state);
  const [referralData, setReferralData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showVerificationForm, setShowVerificationForm] = useState(false);

  // Form state
  const [idCard, setIdCard] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchReferralData();
  }, [auth.token]);

  const fetchReferralData = async () => {
    try {
      const res = await axios.get('/api/referrals/my-referral', {
        headers: { Authorization: auth.token }
      });
      setReferralData(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching referral data:', err);
      setMessage({ type: 'error', text: 'Failed to load referral data' });
      setLoading(false);
    }
  };

  const handleIdCardChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'ID card image must be less than 10MB' });
        return;
      }
      setIdCard(file);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Photo must be less than 10MB' });
        return;
      }
      setPhoto(file);
    }
  };

  const handleSubmitVerification = async (e) => {
    e.preventDefault();

    if (!idCard || !photo || !phoneNumber) {
      setMessage({ type: 'error', text: 'Please fill all fields and upload both files' });
      return;
    }

    setSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const formData = new FormData();
      formData.append('idCard', idCard);
      formData.append('photo', photo);
      formData.append('phoneNumber', phoneNumber);

      const res = await axios.post(
        '/api/referrals/submit-verification',
        formData,
        {
          headers: {
            Authorization: auth.token,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setMessage({ type: 'success', text: res.data.msg });
      setShowVerificationForm(false);
      fetchReferralData(); // Refresh data

      // Reset form
      setIdCard(null);
      setPhoto(null);
      setPhoneNumber('');
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.msg || 'Failed to submit verification'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const copyReferralLink = () => {
    if (referralData?.referral?.referralCode) {
      const link = `${window.location.origin}/register?ref=${referralData.referral.referralCode}`;
      navigator.clipboard.writeText(link);
      setMessage({ type: 'success', text: 'Referral link copied to clipboard!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      not_submitted: { text: 'NOT SUBMITTED', class: 'status-badge status-not-submitted' },
      pending: { text: 'PENDING REVIEW', class: 'status-badge status-pending' },
      approved: { text: 'VERIFIED', class: 'status-badge status-approved' },
      rejected: { text: 'REJECTED', class: 'status-badge status-rejected' }
    };

    const badge = badges[status] || badges.not_submitted;
    return <span className={badge.class}>{badge.text}</span>;
  };

  if (loading) {
    return <div className="referral-loading">Loading referral information...</div>;
  }

  return (
    <div className="referral-dashboard">
      <div className="referral-header">
        <h1>SuberFood Referral Program</h1>
        <p>Earn commissions by referring new users!</p>
      </div>

      {message.text && (
        <div className={`message-banner ${message.type}`}>
          {message.text}
        </div>
      )}

      {/* Verification Status Section */}
      <div className="verification-section card">
        <div className="section-header">
          <h2>Verification Status:</h2>
          {referralData?.referral && getStatusBadge(referralData.referral.verificationStatus)}
        </div>

        {referralData?.referral?.verificationStatus === 'not_submitted' && (
          <div className="verification-notice">
            <p className="notice-text">
              ⚠️ You need to verify your account to start earning referral commissions.
              Submit your ID and photo for verification.
            </p>
            <button
              className="btn-primary btn-submit-verification"
              onClick={() => setShowVerificationForm(!showVerificationForm)}
            >
              {showVerificationForm ? 'Cancel' : 'Submit Verification'}
            </button>
          </div>
        )}

        {referralData?.referral?.verificationStatus === 'pending' && (
          <div className="verification-notice pending">
            <p>Your verification is under review. We'll notify you once approved.</p>
            <small>Submitted: {new Date(referralData.referral.submittedAt).toLocaleDateString()}</small>
          </div>
        )}

        {referralData?.referral?.verificationStatus === 'rejected' && (
          <div className="verification-notice rejected">
            <p>Your verification was rejected.</p>
            <p><strong>Reason:</strong> {referralData.referral.rejectionReason}</p>
            <button
              className="btn-primary btn-submit-verification"
              onClick={() => setShowVerificationForm(!showVerificationForm)}
            >
              Resubmit Verification
            </button>
          </div>
        )}

        {referralData?.referral?.verificationStatus === 'approved' && (
          <div className="verification-notice approved">
            <p>✅ Your account is verified! You can now earn commissions.</p>
            <small>Verified: {new Date(referralData.referral.verifiedAt).toLocaleDateString()}</small>
          </div>
        )}
      </div>

      {/* Verification Form */}
      {showVerificationForm && (
        <div className="verification-form-section card">
          <h2>Submit Verification Documents</h2>
          <form onSubmit={handleSubmitVerification} className="verification-form">
            <div className="form-group">
              <label htmlFor="idCard">ID Card (Upload Image) *</label>
              <input
                type="file"
                id="idCard"
                accept="image/*"
                onChange={handleIdCardChange}
                required
                className="file-input"
              />
              {idCard && <small className="file-name">✓ {idCard.name}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="photo">Your Photo *</label>
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                required
                className="file-input"
              />
              {photo && <small className="file-name">✓ {photo.name}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number *</label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="671234567"
                required
                className="text-input"
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn-secondary btn-cancel"
                onClick={() => setShowVerificationForm(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary btn-submit"
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Referral Stats */}
      <div className="referral-stats">
        <div className="stat-card">
          <div className="stat-value">{referralData?.referral?.totalReferrals || 0}</div>
          <div className="stat-label">Total Referrals</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{referralData?.referral?.activeReferrals || 0}</div>
          <div className="stat-label">Active Referrals</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {parseFloat(referralData?.referral?.totalCommission || 0).toFixed(2)} XAF
          </div>
          <div className="stat-label">Total Commission</div>
        </div>
        <div className="stat-card highlight">
          <div className="stat-value">
            {parseFloat(referralData?.referral?.availableCommission || 0).toFixed(2)} XAF
          </div>
          <div className="stat-label">Available Commission</div>
        </div>
      </div>

      {/* Referral Link */}
      <div className="referral-link-section card">
        <h2>Your Referral Link</h2>
        <div className="referral-link-container">
          <input
            type="text"
            value={referralData?.referral?.referralCode ?
              `${window.location.origin}/register?ref=${referralData.referral.referralCode}` :
              'Loading...'}
            readOnly
            className="referral-link-input"
          />
          <button onClick={copyReferralLink} className="btn-copy">
            Copy Link
          </button>
        </div>
        <p className="referral-code">
          Your Code: <strong>{referralData?.referral?.referralCode || 'N/A'}</strong>
        </p>
      </div>

      {/* My Referrals List */}
      <div className="my-referrals-section card">
        <h2>My Referrals</h2>
        <p className="section-subtitle">People you've referred</p>

        {referralData?.referrals && referralData.referrals.length > 0 ? (
          <div className="referrals-list">
            {referralData.referrals.map((ref) => (
              <div key={ref.id} className="referral-item">
                <div className="referral-info">
                  <div className="referral-name">{ref.User?.fullname || ref.User?.username}</div>
                  <div className="referral-email">{ref.User?.email}</div>
                </div>
                <div className="referral-meta">
                  <div className="referral-date">
                    {new Date(ref.createdAt).toLocaleDateString()}
                  </div>
                  {getStatusBadge(ref.verificationStatus)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-referrals">No referrals yet</div>
        )}
      </div>
    </div>
  );
};

export default ReferralDashboard;
