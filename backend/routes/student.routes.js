const express = require("express");
const app = express();
const studentRoute = express.Router();
const cors = require("cors");

// Student model
let Student = require("../model/Student");

// CORS OPTIONS
var whitelist = ["http://localhost:4200", "http://localhost:8000"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    };
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions);
};

// Add Student
studentRoute.route("/add-student").post(async (req, res, next) => {
  await Student.create(req.body)
    .then((result) => {
      res.json({
        data: result,
        message: "Data successfully added!",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});

// Get all student
studentRoute
  .route("/", cors(corsOptionsDelegate))
  .get(async (req, res, next) => {
    await Student.find()
      .then((result) => {
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
      })
      .catch((err) => {
        return next(err);
      });
  });

// Get single student
studentRoute.route("/read-student/:id").get(async (req, res, next) => {
  await Student.findById(req.params.id, req.body)
    .then((result) => {
      res.json({
        data: result,
        message: "Data successfully retrieved.",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});

// Update student
studentRoute.route("/update-student/:id").put(async (req, res, next) => {
  await Student.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  })
    .then((result) => {
      res.json({
        data: result,
        msg: "Data successfully updated.",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Delete student
studentRoute.route("/delete-student/:id").delete(async (req, res) => {
  await Student.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        msg: "Data successfully updated.",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = studentRoute;
