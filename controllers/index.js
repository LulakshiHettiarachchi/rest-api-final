const AppError = require("../utils/appError"); // global error handler
const conn = require("../services/db"); // database connection to make crud

exports.getAllstudents = (req, res, next) => {
    conn.query("SELECT * FROM students", function (err, data, fields) {
        if (err) return next(new AppError(err))
        res.status(200).json({
            status: "success",
            length: data?.length,
            data: data,
        });
    });
};

exports.deleteStudent = (req, res, next) => {
    if (!req.params.s_id) {
        return next(new AppError("No student s_id found", 404));
    }
    conn.query(
        "DELETE FROM students WHERE s_id=?",
        [req.params.s_id],
        function (err, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "Student deleted!",
            });
        }
    );
}

exports.updateStudentDetails = (req, res, next) => {
    if (!req.body.s_id) {
        return next(new AppError("No student s_id found", 404));
    }
    conn.query(
        "UPDATE students SET name= ? , age = ? , rank= ?  WHERE s_id = ?",
        [req.body.name, req.body.age, req.body.rank, req.body.s_id],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "student details updated!",
            });
        }
    );
};

exports.registerStudent = (req, res, next) => {
    console.log(req.body);
    if (!req.body) return next(new AppError("No form data found", 404));
    const values = [req.body.name, req.body.age, req.body.rank];
    conn.query(
        "INSERT INTO `students` (`s_id`, `name`, `age`, `rank`) VALUES ( NULL , ? );",
        [values],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "student registered!",
            });
        }
    );
};

exports.getStudent = (req, res, next) => {
    if (!req.params.s_id) {
        return next(new AppError("No student s_id found", 404));
    }
    conn.query(
        "SELECT * FROM students WHERE s_id = ?",
        [req.params.s_id],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(200).json({
                status: "success",
                length: data?.length,
                data: data,
            });
        }
    );
};