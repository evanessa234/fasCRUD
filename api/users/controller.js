const express = require('express');
const db = require('../../dbConnection');

module.exports = {
    postCourseDetails: async (req, res) => {
        const body = req.body;
        const conn = await db();

        try {
            await conn.query('START TRANSACTION');
            console.log(body);
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
            console.log(result);
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
        } finally {
            await conn.release();
            await conn.destroy();
        }
    },
    getCourseDetails: async (req, res) => {
        const body = req.body;
        const baseCondition = `\`fromAcadYr\` = ${body.fromAcadYr} and  \`toAcadYr\` = ${body.toAcadYr} and \`sem\` = ${body.sem} and \`subjectCode\` = "${body.subjectCode}"`

        try {
            const conn = await db();
            await conn.query('START TRANSACTION');
            const result = await conn.query(`select * from course where ${baseCondition}`);
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
        } finally {
            await conn.release();
            await conn.destroy();
        }
    },
    getCourses: async (req, res) => {
        const body = req.body;
        try {
            const conn = await db();
            await conn.query('START TRANSACTION');
            const result = await conn.query(`select * from course where 1`);
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
        } finally {
            await conn.release();
            await conn.destroy();
        }
    },
    postAndUpdateCourseDetails: async (req, res) => {
        const body = req.body;
        try {
            const conn = await db();
            await conn.query('START TRANSACTION');
            const result = await conn.query(`INSERT INTO course (fromAcadYr, toAcadYr, sem, subjectCode, courseName, credits, lectHr, totLectHr) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE
        fromAcadYr = ?, toAcadYr = ?, sem = ?, subjectCode = ?, courseName = ?, credits = ?, practHr = ?, totPractHr = ?`,
                [
                    body.fromAcadYr,
                    body.toAcadYr,
                    body.sem,
                    body.subjectCode,
                    body.courseName,
                    body.credits,
                    body.lectHr,
                    body.totLectHr,
                    body.fromAcadYr,
                    body.toAcadYr,
                    body.sem,
                    body.subjectCode,
                    body.courseName,
                    body.credits,
                    body.lectHr,
                    body.totLectHr
                ]);
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
        } finally {
            await conn.release();
            await conn.destroy();
        }
    },
    postAndUpdateObjectives: async (req, res) => {
        const body = req.body;
        const baseCondition = `SELECT courseID from course WHERE \`fromAcadYr\` = ${body.fromAcadYr} and  \`toAcadYr\` = ${body.toAcadYr} and \`sem\` = ${body.sem} and \`subjectCode\` = \"${body.subjectCode}\"`;

        try {
            const conn = await db();
            await conn.query('START TRANSACTION');
            const result = await conn.query(`INSERT INTO courseobjective (courseID, objNo, objName) VALUES (\`${baseCondition}\`, ${body.objNo}, "${body.objName}") ON DUPLICATE KEY UPDATE
        objName = "${body.objName}"`);
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
        } finally {
            await conn.release();
            await conn.destroy();
        }
    },
    getObjectives: async (req, res) => {

        const body = req.body;
        const baseCondition = `SELECT courseID from course WHERE \`fromAcadYr\` = ${body.fromAcadYr} and  \`toAcadYr\` = ${body.toAcadYr} and \`sem\` = ${body.sem} and \`subjectCode\` = \"${body.subjectCode}\"`;

        try {
            const conn = await db();
            await conn.query('START TRANSACTION');
            const result = await conn.query(`SELECT * FROM courseobjective WHERE courseID = ${baseCondition}`);
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
        } finally {
            await conn.release();
            await conn.destroy();
        }
    },
    postAndUpdateCO: async (req, res) => {
        const body = req.body;
        const baseCondition = `(SELECT courseID from course WHERE \`fromAcadYr\` = ${body.fromAcadYr} and  \`toAcadYr\` = ${body.toAcadYr} and \`sem\` = ${body.sem} and \`subjectCode\` = "${body.subjectCode}")`;

        try {
            const conn = await db();
            await conn.query('START TRANSACTION');
            const result = await conn.query(`INSERT INTO courseoutcome (courseID, CO_no, CO_name, weightagePercent, durationHr, noOfExp) VALUES (${baseCondition}, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE
                CO_no = ?, CO_name = ?, weightagePercent = ?, durationHr = ?, noOfExp = ?`,
                [
                    body.CO_no,
                    body.CO_name,
                    body.weightagePercent,
                    body.durationHr,
                    body.noOfExp,                    
                    body.CO_no,
                    body.CO_name,
                    body.weightagePercent,
                    body.durationHr,
                    body.noOfExp
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
        } finally {
            await conn.release();
            await conn.destroy();
        }
    },
    getCO: async (req, res) => {
        const body = req.body;
        const baseCondition = `(SELECT courseID from course WHERE \`fromAcadYr\` = ${body.fromAcadYr} and  \`toAcadYr\` = ${body.toAcadYr} and \`sem\` = ${body.sem} and \`subjectCode\` = "${body.subjectCode}")`;
        console.log(baseCondition);
        try {
            const conn = await db();
            await conn.query('START TRANSACTION');
            const result = await conn.query(`SELECT * FROM courseoutcome WHERE courseID = ${baseCondition}`);
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
        } finally {
            await conn.release();
            await conn.destroy();
        }
    },
    postAndUpdatePO: async (req, res) => {
        const body = req.body;
        const baseCondition = `(SELECT courseID from course WHERE \`fromAcadYr\` = ${body.fromAcadYr} and  \`toAcadYr\` = ${body.toAcadYr} and \`sem\` = ${body.sem} and \`subjectCode\` = "${body.subjectCode}")`;
        try {
            const conn = await db();
            await conn.query('START TRANSACTION');
            const result = await conn.query(`INSERT INTO progoutcomes (courseID, PO_no, PO_title, PO_description) VALUES (${baseCondition}, ?, ?, ?) ON DUPLICATE KEY UPDATE
            PO_title = ?, PO_description = ?`,
            [
                body.PO_no,
                body.PO_title,
                body.PO_description,
                body.PO_title,
                body.PO_description        
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
        } finally {
            await conn.release();
            await conn.destroy();
        }
    },
    getPO: async (req, res) => {
        const body = req.body;
        const baseCondition = `(SELECT courseID from course WHERE \`fromAcadYr\` = ${body.fromAcadYr} and  \`toAcadYr\` = ${body.toAcadYr} and \`sem\` = ${body.sem} and \`subjectCode\` = "${body.subjectCode}")`;
        try {
            const conn = await db();
            await conn.query('START TRANSACTION');
            const result = await conn.query(`SELECT * FROM progoutcomes WHERE courseID = ${baseCondition}`);
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
        } finally {
            await conn.release();
            await conn.destroy();
        }
    },
    postAndUpdatePSO: async (req, res) => {
        const body = req.body;
        const baseCondition = `(SELECT courseID from course WHERE \`fromAcadYr\` = ${body.fromAcadYr} and  \`toAcadYr\` = ${body.toAcadYr} and \`sem\` = ${body.sem} and \`subjectCode\` = "${body.subjectCode}")`;
        try {
            const conn = await db();
            await conn.query('START TRANSACTION');
            const result = await conn.query(`INSERT INTO progspecificoutcome (courseID, PSO_no, PSO_description) VALUES (${baseCondition}, ?, ?) ON DUPLICATE KEY UPDATE
            PSO_no = ?, PSO_description = ?`,
            [
                body.PSO_no,
                body.PSO_description,                
                body.PSO_no,
                body.PSO_description
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
        } finally {
            await conn.release();
            await conn.destroy();
        }
    },
    getPSO: async (req, res) => {
        const body = req.body;
        const baseCondition = `(SELECT courseID from course WHERE \`fromAcadYr\` = ${body.fromAcadYr} and  \`toAcadYr\` = ${body.toAcadYr} and \`sem\` = ${body.sem} and \`subjectCode\` = "${body.subjectCode}")`;
        try {
            const conn = await db();
            await conn.query('START TRANSACTION');
            const result = await conn.query(`SELECT * FROM progspecificoutcome WHERE courseID = ${baseCondition}`);
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
        } finally {
            await conn.release();
            await conn.destroy();
        }
    },
    postAndUpdateDqaTeamFeedback: async(req, res) => {
        const body =req.body;
        const baseCondition = `(SELECT courseID from course WHERE \`fromAcadYr\` = ${body.fromAcadYr} and  \`toAcadYr\` = ${body.toAcadYr} and \`sem\` = ${body.sem} and \`subjectCode\` = \"${body.subjectCode}\")`;


        try {
            const conn = await db();
            await conn.query('START TRANSACTION');
            const result = await conn.query(`INSERT INTO dqateam (courseID, BTlevel, grammar, commentCO, properDistriMap, commentMap, syllabusCoverage, COweightage, chp_expWeightage, commentWeightage, CO_coverageAssMethod, marksDistribution, QuestionQuality, commentAssMethod, typeOfExp, timeJustified, modernToolsUsed, OutOfSyllabus) VALUES (${baseCondition}, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE
            BTlevel = ?, grammar = ?, commentCO = ?, properDistriMap = ?, commentMap = ?, syllabusCoverage = ?, COweightage = ?, chp_expWeightage = ?,commentWeightage = ?,CO_coverageAssMethod = ?,marksDistribution = ?,QuestionQuality = ?,commentAssMethod = ?,typeOfExp = ?,timeJustified = ?,modernToolsUsed = ?,OutOfSyllabus = ?`,
                [
                    body.BTlevel,
                    body.grammar,
                    body.commentCO,
                    body.properDistriMap,
                    body.commentMap,
                    body.syllabusCoverage,
                    body.COweightage,
                    body.chp_expWeightage,
                    body.commentWeightage,
                    body.CO_coverageAssMethod,
                    body.marksDistribution,
                    body.QuestionQuality,
                    body.commentAssMethod,
                    body.typeOfExp,
                    body.timeJustified,
                    body.modernToolsUsed,
                    body.OutOfSyllabus,
                    body.BTlevel,
                    body.grammar,
                    body.commentCO,
                    body.properDistriMap,
                    body.commentMap,
                    body.syllabusCoverage,
                    body.COweightage,
                    body.chp_expWeightage,
                    body.commentWeightage,
                    body.CO_coverageAssMethod,
                    body.marksDistribution,
                    body.QuestionQuality,
                    body.commentAssMethod,
                    body.typeOfExp,
                    body.timeJustified,
                    body.modernToolsUsed,
                    body.OutOfSyllabus
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
    getDqaTeamFeedback: async (req, res) => {
        const body = req.body;
        const baseCondition = `(SELECT courseID from course WHERE \`fromAcadYr\` = ${body.fromAcadYr} and  \`toAcadYr\` = ${body.toAcadYr} and \`sem\` = ${body.sem} and \`subjectCode\` = "${body.subjectCode}")`;
        console.log(baseCondition);
        try {
            const conn = await db();
            await conn.query('START TRANSACTION');
            const result = await conn.query(`SELECT * FROM dqateam WHERE courseID = ${baseCondition}`);
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
        } finally {
            await conn.release();
            await conn.destroy();
        }
    },
    updateHodFeedback: async (req, res) => {
        const body = req.body;


        try {
            const conn = await db();
            await conn.query('START TRANSACTION');
            const result = await conn.query(`UPDATE course SET \`HODapproved\` = ?, \`HODcomment\` = ?, \`HODcommentTime\` = CURRENT_TIMESTAMP Where \`fromAcadYr\` = ${body.fromAcadYr} AND \`toAcadYr\` = ${body.toAcadYr} AND \`sem\` = ${body.sem} AND \`subjectCode\` = "${body.subjectCode}" `,
                [   
                    body.HODapproved,
                    body.HODcomment,
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
        } finally {
            await conn.release();
            await conn.destroy();
        }
    },
    getHodFeedback: async (req, res) => {
        const body = req.body;
        const baseCondition = `(SELECT courseID from course WHERE \`fromAcadYr\` = ${body.fromAcadYr} and  \`toAcadYr\` = ${body.toAcadYr} and \`sem\` = ${body.sem} and \`subjectCode\` = "${body.subjectCode}")`;
        console.log(baseCondition);
        try {
            const conn = await db();
            await conn.query('START TRANSACTION');
            const result = await conn.query(`SELECT HODapproved, HODcomment, HODcommentTime FROM course WHERE courseID = ${baseCondition}`);
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
        } finally {
            await conn.release();
            await conn.destroy();
        }
    },
    postAndUpdateCO_PO_Mapping: async (req, res) => {
        const body = req.body;
        const baseCondition = `(SELECT courseID from course WHERE \`fromAcadYr\` = ${body.fromAcadYr} and  \`toAcadYr\` = ${body.toAcadYr} and \`sem\` = ${body.sem} and \`subjectCode\` = "${body.subjectCode}")`;

        try {
            const conn = await db();
            await conn.query('START TRANSACTION');
            const result = await conn.query(`INSERT INTO co_po_mapping (courseID, CO_no, PO_no, rating) VALUES (${baseCondition}, ?, ?, ?) ON DUPLICATE KEY UPDATE
                CO_no = ?, PO_no = ?, rating = ?`,
                [
                    body.CO_no,
                    body.PO_no,
                    body.rating,
                    body.CO_no,
                    body.PO_no,
                    body.rating
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
        } finally {
            await conn.release();
            await conn.destroy();
        }
    },
    getCO_PO_Mapping: async (req, res) => {
        const body = req.body;
        const baseCondition = `(SELECT courseID from course WHERE \`fromAcadYr\` = ${body.fromAcadYr} and  \`toAcadYr\` = ${body.toAcadYr} and \`sem\` = ${body.sem} and \`subjectCode\` = "${body.subjectCode}")`;
        
        console.log(baseCondition);
        try {
            const conn = await db();
            await conn.query('START TRANSACTION');
            const result = await conn.query(`SELECT * FROM co_po_mapping WHERE courseID = ${baseCondition}`);
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
        } finally {
            await conn.release();
            await conn.destroy();
        }
    },  
    postAndUpdateCO_PSO_Mapping: async(req, res) => {
        const body =req.body;
        const baseCondition = `(SELECT courseID from course WHERE \`fromAcadYr\` = ${body.fromAcadYr} and  \`toAcadYr\` = ${body.toAcadYr} and \`sem\` = ${body.sem} and \`subjectCode\` = "${body.subjectCode}")`;

        try {
            const conn = await db();
            await conn.query('START TRANSACTION');
            const result = await conn.query(`INSERT INTO co_pso_mapping (courseID, CO_no, PSO_no, rating) VALUES (${baseCondition}, ?, ?, ?) ON DUPLICATE KEY UPDATE
            CO_no = ?, PSO_no = ?, rating = ?`,
            [
                body.CO_no,
                body.PSO_no,
                body.rating,
                body.CO_no,
                body.PSO_no,
                body.rating
            ],);
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
    getCO_PSO_Mapping: async(req, res) => {
        const body =req.body;
        const baseCondition = `(SELECT courseID from course WHERE \`fromAcadYr\` = ${body.fromAcadYr} and  \`toAcadYr\` = ${body.toAcadYr} and \`sem\` = ${body.sem} and \`subjectCode\` = "${body.subjectCode}")`;

        try {
            const conn = await db();
            await conn.query('START TRANSACTION');
            const result = await conn.query(`SELECT * FROM co_pso_mapping WHERE courseID = ${baseCondition}`);
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


