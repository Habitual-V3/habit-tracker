const express = require('express');
const dbController = require('../controllers/dbController');
const userController = require('../controllers/userController');

const router = express.Router();

// add habit to a user ROUTE HANDLER
router.post(
  '/add',
  userController.assignHabit,
  dbController.assignHabit,
  (req, res) => {
    return res.status(200).json('Added habit!');
  }
);

// update today's record ROUTE HANDLER
router.post(
  '/update',
  userController.updateRecord,
  dbController.updateRecord,
  (req, res) => {
    return res.status(200).json('Habit updated!');
  }
);

module.exports = router;
