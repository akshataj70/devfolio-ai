const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Portfolio = require('../models/Portfolio');

// @route   GET /api/portfolios
// @desc    Get all portfolios for the authenticated user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ userId: req.userId }).sort({ updatedAt: -1 });
    res.json({
      success: true,
      portfolios
    });
  } catch (error) {
    console.error('Fetch portfolios error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error fetching portfolios'
    });
  }
});

// @route   GET /api/portfolios/:id
// @desc    Get a single portfolio by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ _id: req.params.id, userId: req.userId });
    
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    res.json({
      success: true,
      portfolio
    });
  } catch (error) {
    console.error('Fetch portfolio detail error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error fetching portfolio details'
    });
  }
});

// @route   POST /api/portfolios
// @desc    Create a new portfolio
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { title, resumeData, portfolioSettings } = req.body;

    const newPortfolio = new Portfolio({
      userId: req.userId,
      title: title || 'Untitled Portfolio',
      resumeData: resumeData || {},
      portfolioSettings: portfolioSettings || {}
    });

    const savedPortfolio = await newPortfolio.save();

    res.status(201).json({
      success: true,
      message: 'Portfolio saved successfully',
      portfolio: savedPortfolio
    });
  } catch (error) {
    console.error('Create portfolio error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error saving portfolio'
    });
  }
});

// @route   PUT /api/portfolios/:id
// @desc    Update an existing portfolio
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, resumeData, portfolioSettings } = req.body;

    const portfolio = await Portfolio.findOne({ _id: req.params.id, userId: req.userId });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found or unauthorized'
      });
    }

    // Update fields if provided
    if (title !== undefined) portfolio.title = title;
    if (resumeData !== undefined) portfolio.resumeData = resumeData;
    if (portfolioSettings !== undefined) portfolio.portfolioSettings = portfolioSettings;

    const updatedPortfolio = await portfolio.save();

    res.json({
      success: true,
      message: 'Portfolio updated successfully',
      portfolio: updatedPortfolio
    });
  } catch (error) {
    console.error('Update portfolio error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error updating portfolio'
    });
  }
});

// @route   DELETE /api/portfolios/:id
// @desc    Delete a portfolio
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await Portfolio.deleteOne({ _id: req.params.id, userId: req.userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found or unauthorized'
      });
    }

    res.json({
      success: true,
      message: 'Portfolio deleted successfully'
    });
  } catch (error) {
    console.error('Delete portfolio error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error deleting portfolio'
    });
  }
});

module.exports = router;
