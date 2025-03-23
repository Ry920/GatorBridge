const express = require("express");
const bodyParser = require("body-parser");

const bcrypt = require('bcrypt');

const mysql = require('mysql2');
const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

const PORT = process.env.PORT || 3001;

con.connect();

const app = express();
app.use(bodyParser.json());
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/signup", async (req, res) => {
  const userInfo = req.body;
  if (userInfo.userFirstName == "") {
    return res.status(400).send({
      message: "No first name specified."
    });
  }
  if (userInfo.userLastName == "") {
    return res.status(400).send({
      message: "No last name specified."
    });
  }
  if (userInfo.userEmail == "") {
    return res.status(400).send({
      message: "No email specified."
    });
  }
  if (userInfo.userPassword == "") {
    return res.status(400).send({
      message: "No password specified."
    });
  }
  const password = await bcrypt.hash(userInfo.userPassword, 10);
  con.query("SELECT Email FROM Users WHERE Email = (?)", [userInfo.userEmail], (err, result) => {
    if (err) {
      return res.status(500).send({
        message: "Server error."
      });
    }
    if (result.length > 0) {
      return res.status(400).send({
        message: "This email is already associated with an account."
      });
    }
    else {
      con.query("INSERT INTO Users (FirstName, LastName, Email, Password) VALUES (?, ?, ?, ?)", 
        [userInfo.userFirstName, userInfo.userLastName, userInfo.userEmail, password], (error, _result) => {
          if (error) {
            return res.status(500).send({
              message: "Could not add user."
            });
          }
          return res.status(201).send({
            message: "User added successfully!"
          });
        });
    }
  });
});

app.post("/login", (req, res) => {
  const userInfo = req.body;
  if (userInfo.userEmail == "") {
    return res.status(400).send({
      message: "No email specified."
    });
  }
  if (userInfo.userPassword == "") {
    return res.status(400).send({
      message: "No password specified."
    });
  }
  con.query("SELECT Email, Password FROM Users WHERE Email = (?)", [userInfo.userEmail], (err, result) => {
    if (err) {
      return res.status(500).send({
        message: "Server error."
      });
    }
    if (result.length > 0) {
      bcrypt.compare(userInfo.userPassword, result[0].Password, (err, result2) => {
        if (err) {
          return res.status(500).send({
            message: "Server error."
          });
        }
        if (result2) {
          return res.status(201).send({
            message: "User logged on successfully."
          });
        }
        return res.status(400).send({
          message: "Wrong email and/or password."
        });
      });
    }
    else {
      return res.status(400).send({
        message: "Wrong email and/or password."
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

