const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Resume = require('../models/Resume');

// @route   GET /api/resumes
// @desc    Get all resumes for the authenticated user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.userId }).sort({ updatedAt: -1 });
    res.json({
      success: true,
      resumes
    });
  } catch (error) {
    console.error('Fetch resumes error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error fetching resumes'
    });
  }
});

// @route   GET /api/resumes/:id
// @desc    Get a single resume by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.id || req.params.id, userId: req.userId });
    
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    res.json({
      success: true,
      resume
    });
  } catch (error) {
    console.error('Fetch resume detail error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error fetching resume details'
    });
  }
});

// @route   POST /api/resumes
// @desc    Create a new resume
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { title, resumeData, themeSettings } = req.body;

    const newResume = new Resume({
      userId: req.userId,
      title: title || 'Untitled Resume',
      resumeData: resumeData || {},
      themeSettings: themeSettings || {}
    });

    const savedResume = await newResume.save();

    res.status(201).json({
      success: true,
      message: 'Resume saved successfully',
      resume: savedResume
    });
  } catch (error) {
    console.error('Create resume error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error saving resume'
    });
  }
});

// @route   PUT /api/resumes/:id
// @desc    Update an existing resume
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, resumeData, themeSettings } = req.body;

    const resume = await Resume.findOne({ _id: req.params.id, userId: req.userId });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found or unauthorized'
      });
    }

    // Update fields if provided
    if (title !== undefined) resume.title = title;
    if (resumeData !== undefined) resume.resumeData = resumeData;
    if (themeSettings !== undefined) resume.themeSettings = themeSettings;

    const updatedResume = await resume.save();

    res.json({
      success: true,
      message: 'Resume updated successfully',
      resume: updatedResume
    });
  } catch (error) {
    console.error('Update resume error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error updating resume'
    });
  }
});

// @route   DELETE /api/resumes/:id
// @desc    Delete a resume
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await Resume.deleteOne({ _id: req.params.id, userId: req.userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found or unauthorized'
      });
    }

    res.json({
      success: true,
      message: 'Resume deleted successfully'
    });
  } catch (error) {
    console.error('Delete resume error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error deleting resume'
    });
  }
});

module.exports = router;
