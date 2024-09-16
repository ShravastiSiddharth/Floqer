const express = require('express');
const {getSalaryStatistics, getJobTitlesByYear} = require('../controllers/salaryController');

const router = express.Router();

router.get('/avgsalary',getSalaryStatistics);
router.post('/job-titles/', getJobTitlesByYear);




module.exports = router;