const ConnectDB = require('../config/db');



const getSalaryStatistics = async (req, res) => {
  try {
    const db = await ConnectDB();
    const collection = db.collection('salaries');


    const result = await collection.aggregate([
      {
        $group: {
          _id: "$work_year",
          totalJobs: { $sum: 1 },
          averageSalary: { $avg: "$salary_in_usd" }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]).toArray();

    res.json({ msg: "success", data: result });
  } catch (error) {
    res.status(500).json({ msg: "error", error: error.message });
  }
};


const getJobTitlesByYear = async (req, res) => {
  const { year } = req.body;

  if (!year) {
    return res.status(400).json({ msg: 'Year is required' });
  }

  try {
    const db = await ConnectDB();
    const Salary = db.collection('salaries');

    const jobTitles = await Salary.aggregate([
      {
        $match: { work_year: parseInt(year) }
      },
      {
        $group: {
          _id: '$job_title',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]).toArray();

    res.json({ msg: 'success', jobTitles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};
module.exports = { getSalaryStatistics, getJobTitlesByYear }