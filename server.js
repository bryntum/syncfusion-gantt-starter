const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 3001;
require('dotenv').config();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

// create a mysql pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post('/api/ganttData', (req, res) => {
  var ganttData = [];
  pool.query(`SELECT * FROM syncTasks`, (error, results, fields) => {
    if (error) throw error;
    for (let i = 0; i < results.length; i++) {
      let task = {
        TaskID: results[i].TaskID,
        TaskName: results[i].TaskName,
        StartDate: new Date(results[i].StartDate).toISOString(),
        EndDate: new Date(results[i].EndDate).toISOString(),
        Duration: results[i].Duration,
        Progress: results[i].Progress,
        ParentID: results[i].ParentID,
        Predecessor: results[i].Predecessor,
      };
      ganttData.push(task);
    }
    res.json({ result: ganttData, count: ganttData.length });
  });
});

app.post('/api/batchData', (req, res) => {
  if (req.body.changed != null && req.body.changed.length > 0) {
    const changed = req.body.changed;

    for (let i = 0; i < changed.length; i++) {
      pool.query(
        `UPDATE syncTasks SET TaskName = ?, StartDate = ?, EndDate = ?, Duration = ?, Progress = ?, ParentID = ?, Predecessor = ? WHERE TaskID = ?`,
        [
          changed[i].TaskName,
          new Date(changed[i].StartDate).toISOString().slice(0, 10),
          new Date(changed[i].EndDate).toISOString().slice(0, 10),
          changed[i].Duration,
          changed[i].Progress,
          changed[i].ParentID,
          changed[i].Predecessor,
          changed[i].TaskID,
        ],
        (error, results, fields) => {
          if (error) throw error;
        }
      );
    }
  }
  if (req.body.added != null && req.body.added.length > 0) {
    const added = req.body.added[0];

    pool.query(
      `INSERT INTO syncTasks (TaskID, TaskName, StartDate, EndDate, Duration, Progress, Predecessor, ParentID) VALUES (?,?,?,?,?,?,?,?)`,
      [
        added.TaskID,
        added.TaskName,
        new Date(added.StartDate).toISOString().slice(0, 10),
        new Date(added.EndDate).toISOString().slice(0, 10),
        added.Duration,
        added.Progress,
        added.Predecessor,
        added.ParentID,
      ],
      (error, results, fields) => {
        if (error) throw error;
      }
    );
  }
  if (req.body.deleted != null && req.body.deleted.length > 0) {
    const deleted = req.body.deleted;

    pool.query(
      `DELETE t1, t2
      FROM syncTasks t1
      LEFT JOIN syncTasks t2 ON t1.TaskID = t2.ParentID
      WHERE t1.TaskID = ?;`,
      [deleted[0].TaskID],
      (error, results, fields) => {
        if (error) throw error;
      }
    );
  }
  console.log({
    result: {
      changedRecords: req.body.changed,
      addedRecords: req.body.added,
      deletedRecords: req.body.deleted,
    },
  });
  res.json({
    result: {
      changedRecords: req.body.changed,
      addedRecords: req.body.added,
      deletedRecords: req.body.deleted,
    },
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
