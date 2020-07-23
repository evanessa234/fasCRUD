const express = require('express');
const db = require('../../dbConnection');

module.exports = {  
    postCourseDetails: async(req, res) => {
      const body =req.body;
      try {
          const conn = await db();
          await conn.query('START TRANSACTION');
          const result = await conn.query(`INSERT into course(fromAcadYr, toAcadYr, sem, subjectCode, courseName, credits, lectHr, totLectHr) VALUES(?,?,?,?,?,?,?,?)`,
          [
            body.fromAcadYr,
            body.toAcadYr,
            body.sem,
            body.subjectCode,
            body.courseName,
            body.credits,
            body.lectHr,
            body.totLectHr,
          ],
          );
          await conn.query('COMMIT'); // this step is only when we make any changes in database
          res.type('json');
          res.status(200).json({
              success: 1,
              data: result
          });
      } catch (err) {
          res.status(500).json({
              success: 0,
              error: err,
              message: "Database connection error"
  
          });
      } finally{
          await conn.release();
          await conn.destroy();
      }
  },
    getCourseDetails: async(req, res) => {
      const body =req.body;
      try {
          const conn = await db();
          await conn.query('START TRANSACTION');
          const result = await conn.query(`select * from course where \`fromAcadYr\` = ? and \`toAcadYr\` = ? and \`sem\` = ? and \`subjectCode\` = ?`,
          [
            body.fromAcadYr,
            body.toAcadYr,
            body.sem,
            body.subjectCode,
          ],
          );
          await conn.query('COMMIT'); // this step is only when we make any changes in database
          res.type('json');
          res.status(200).json({
              success: 1,
              data: result
          });
      } catch (err) {
          res.status(500).json({
              success: 0,
              error: err,
              message: "Database connection error"
  
          });
      } finally{
          await conn.release();
          await conn.destroy();
      }
  } 
}    
    

       