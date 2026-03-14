const Person = require('../models/Person');
const CommanderDiary = require('../models/CommanderDiary');
const path = require('path');
const fs = require('fs');

const uploadCtrl = {
  // Upload profile photo
  uploadProfilePhoto: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }

      const { personId } = req.body;
      if (!personId) {
        return res.status(400).json({ msg: 'Person ID is required' });
      }

      const person = await Person.findByPk(personId);
      if (!person) {
        return res.status(404).json({ msg: 'Person not found' });
      }

      // Delete old photo if exists
      if (person.photoUrl) {
        const oldPhotoPath = path.join(__dirname, '..', person.photoUrl);
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
        }
      }

      // Update person with new photo URL
      const photoUrl = `/uploads/photos/${req.file.filename}`;
      await person.update({ photoUrl });

      res.status(200).json({
        success: true,
        msg: 'Profile photo uploaded successfully',
        photoUrl
      });
    } catch (err) {
      console.error('Upload profile photo error:', err);
      res.status(500).json({ msg: err.message });
    }
  },

  // Upload photo to gallery
  uploadGalleryPhoto: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }

      const { personId } = req.body;
      if (!personId) {
        return res.status(400).json({ msg: 'Person ID is required' });
      }

      const person = await Person.findByPk(personId);
      if (!person) {
        return res.status(404).json({ msg: 'Person not found' });
      }

      const photoUrl = `/uploads/photos/${req.file.filename}`;
      const photoGallery = person.photoGallery || [];

      photoGallery.push({
        url: photoUrl,
        uploadedAt: new Date(),
        filename: req.file.originalname
      });

      await person.update({ photoGallery });

      res.status(200).json({
        success: true,
        msg: 'Photo added to gallery successfully',
        photoUrl,
        gallery: photoGallery
      });
    } catch (err) {
      console.error('Upload gallery photo error:', err);
      res.status(500).json({ msg: err.message });
    }
  },

  // Delete photo from gallery
  deleteGalleryPhoto: async (req, res) => {
    try {
      const { personId, photoUrl } = req.body;

      const person = await Person.findByPk(personId);
      if (!person) {
        return res.status(404).json({ msg: 'Person not found' });
      }

      const photoGallery = person.photoGallery || [];
      const updatedGallery = photoGallery.filter(photo => photo.url !== photoUrl);

      // Delete file from disk
      const filePath = path.join(__dirname, '..', photoUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      await person.update({ photoGallery: updatedGallery });

      res.status(200).json({
        success: true,
        msg: 'Photo deleted from gallery',
        gallery: updatedGallery
      });
    } catch (err) {
      console.error('Delete gallery photo error:', err);
      res.status(500).json({ msg: err.message });
    }
  },

  // Upload document
  uploadDocument: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }

      const { personId, documentType } = req.body;
      if (!personId) {
        return res.status(400).json({ msg: 'Person ID is required' });
      }

      const person = await Person.findByPk(personId);
      if (!person) {
        return res.status(404).json({ msg: 'Person not found' });
      }

      const documentUrl = `/uploads/documents/${req.file.filename}`;
      const documents = person.documents || [];

      documents.push({
        url: documentUrl,
        name: req.file.originalname,
        type: documentType || 'general',
        uploadedAt: new Date(),
        size: req.file.size
      });

      await person.update({ documents });

      res.status(200).json({
        success: true,
        msg: 'Document uploaded successfully',
        documentUrl,
        documents
      });
    } catch (err) {
      console.error('Upload document error:', err);
      res.status(500).json({ msg: err.message });
    }
  },

  // Delete document
  deleteDocument: async (req, res) => {
    try {
      const { personId, documentUrl } = req.body;

      const person = await Person.findByPk(personId);
      if (!person) {
        return res.status(404).json({ msg: 'Person not found' });
      }

      const documents = person.documents || [];
      const updatedDocuments = documents.filter(doc => doc.url !== documentUrl);

      // Delete file from disk
      const filePath = path.join(__dirname, '..', documentUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      await person.update({ documents: updatedDocuments });

      res.status(200).json({
        success: true,
        msg: 'Document deleted',
        documents: updatedDocuments
      });
    } catch (err) {
      console.error('Delete document error:', err);
      res.status(500).json({ msg: err.message });
    }
  },

  // Upload audio diary entry
  uploadDiaryAudio: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ msg: 'No audio file uploaded' });
      }

      const { diaryEntryId, duration } = req.body;
      if (!diaryEntryId) {
        return res.status(400).json({ msg: 'Diary entry ID is required' });
      }

      const entry = await CommanderDiary.findByPk(diaryEntryId);
      if (!entry) {
        return res.status(404).json({ msg: 'Diary entry not found' });
      }

      // Delete old audio if exists
      if (entry.audioUrl) {
        const oldAudioPath = path.join(__dirname, '..', entry.audioUrl);
        if (fs.existsSync(oldAudioPath)) {
          fs.unlinkSync(oldAudioPath);
        }
      }

      const audioUrl = `/uploads/audio/${req.file.filename}`;
      await entry.update({
        audioUrl,
        audioDuration: parseInt(duration) || 0,
        entryType: entry.textContent ? 'both' : 'audio'
      });

      res.status(200).json({
        success: true,
        msg: 'Audio uploaded successfully',
        audioUrl,
        entry
      });
    } catch (err) {
      console.error('Upload diary audio error:', err);
      res.status(500).json({ msg: err.message });
    }
  },

  // Delete audio from diary entry
  deleteDiaryAudio: async (req, res) => {
    try {
      const { diaryEntryId } = req.body;

      const entry = await CommanderDiary.findByPk(diaryEntryId);
      if (!entry) {
        return res.status(404).json({ msg: 'Diary entry not found' });
      }

      if (entry.audioUrl) {
        const audioPath = path.join(__dirname, '..', entry.audioUrl);
        if (fs.existsSync(audioPath)) {
          fs.unlinkSync(audioPath);
        }
      }

      await entry.update({
        audioUrl: null,
        audioDuration: null,
        entryType: entry.textContent ? 'text' : 'text'
      });

      res.status(200).json({
        success: true,
        msg: 'Audio deleted',
        entry
      });
    } catch (err) {
      console.error('Delete diary audio error:', err);
      res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = uploadCtrl;
