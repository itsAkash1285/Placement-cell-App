const InterviewDB = require('../models/interview');
//use for create or convert json into csv
const excelJS = require('exceljs');

//download csv 
module.exports.downloadCSV = function (req, res) {
    //find all interviews
    InterviewDB.find()
        .populate('student')
        .populate('company')
        .exec(function (err, allInterviews) {
            if (err) {
                console.log("Error in retrive all interview inside download csv :: ", err);
                return;
            }
            //making obj of excelJS
            const workbook = new excelJS.Workbook();
            const worksheet = workbook.addWorksheet('Student Data');
            //adding headers
            worksheet.columns = [
                { header: "Student ID", key: "student.id" },
                { header: "Student Name", key: "student.name" },
                { header: "Student Email", key: "student.email" },
                { header: "Student Batch", key: "student.batch" },
                { header: "Student College", key: "student.college" },
                { header: "DSA_score", key: "student.dsa_score" },
                { header: "WEBD_score", key: "student.webd_score" },
                { header: "React_score", key: "student.react_score" },
                { header: "Placement_Status", key: "student.placement_status" },
                { header: "Company Name", key: "company.company_name" },
                { header: "Interview Date", key: "company.interview_date" },
                { header: "Job Location", key: "company.work_location" },
                { header: "Interview Status", key: "interviewStatus" },
            ];

            //inserting data into worksheet 
            allInterviews.forEach((students) => {

                worksheet.addRow([students.student.id, students.student.name, students.student.email,
                students.student.batch,
                students.student.college,
                students.student.dsa_score,
                students.student.webd_score,
                students.student.react_score,
                students.student.placement_status,
                students.company.company_name,
                students.company.interview_date,
                students.company.work_location,
                students.interviewStatus
                ]);

            });

            //making bold headings
            worksheet.getRow(1).eachCell((cell) => {
                cell.font = { bold: true }
            })

            //seting header
            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheatml.sheet"
            );

            //seting header
            res.setHeader('Content-Disposition', `attachment; filename=studentdata.xlsx`);
            //returning res to user as csv file
            req.flash("success","Get Report download successfully");
            return workbook.xlsx.write(res).then(() => {
                res.status(200);
            });

        })
}