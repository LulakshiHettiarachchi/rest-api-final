const express = require('express');
const res = require('express/lib/response');
const student_controller = require('../controllers/student_controller');
const student = express.Router();


student.route("/")
    .get( student_controller.get_all_students )
    .post( student_controller.register_students )

module.exports = student;