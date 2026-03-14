import axios from 'axios';

const API_URL = '/api';

export const uploadProfilePhoto = async (personId, file) => {
  try {
    const formData = new FormData();
    formData.append('photo', file);
    formData.append('personId', personId);

    const res = await axios.post(`${API_URL}/upload/profile-photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return res.data;
  } catch (err) {
    console.error('Upload profile photo error:', err);
    throw err;
  }
};

export const uploadGalleryPhoto = async (personId, file) => {
  try {
    const formData = new FormData();
    formData.append('photo', file);
    formData.append('personId', personId);

    const res = await axios.post(`${API_URL}/upload/gallery-photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return res.data;
  } catch (err) {
    console.error('Upload gallery photo error:', err);
    throw err;
  }
};

export const deleteGalleryPhoto = async (personId, photoUrl) => {
  try {
    const res = await axios.delete(`${API_URL}/upload/gallery-photo`, {
      data: { personId, photoUrl }
    });

    return res.data;
  } catch (err) {
    console.error('Delete gallery photo error:', err);
    throw err;
  }
};

export const uploadDocument = async (personId, file, documentType = 'general') => {
  try {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('personId', personId);
    formData.append('documentType', documentType);

    const res = await axios.post(`${API_URL}/upload/document`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return res.data;
  } catch (err) {
    console.error('Upload document error:', err);
    throw err;
  }
};

export const deleteDocument = async (personId, documentUrl) => {
  try {
    const res = await axios.delete(`${API_URL}/upload/document`, {
      data: { personId, documentUrl }
    });

    return res.data;
  } catch (err) {
    console.error('Delete document error:', err);
    throw err;
  }
};

export const uploadDiaryAudio = async (diaryEntryId, audioBlob, duration) => {
  try {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'diary-audio.webm');
    formData.append('diaryEntryId', diaryEntryId);
    formData.append('duration', duration);

    const res = await axios.post(`${API_URL}/upload/diary-audio`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return res.data;
  } catch (err) {
    console.error('Upload diary audio error:', err);
    throw err;
  }
};

export const deleteDiaryAudio = async (diaryEntryId) => {
  try {
    const res = await axios.delete(`${API_URL}/upload/diary-audio`, {
      data: { diaryEntryId }
    });

    return res.data;
  } catch (err) {
    console.error('Delete diary audio error:', err);
    throw err;
  }
};
