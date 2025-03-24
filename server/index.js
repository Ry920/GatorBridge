const express = require("express");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authenticate = require("../middleware/authjwt");

const mysql = require('mysql2');
const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const SECRET_KEY = process.env.JWT_SECRET

const PORT = process.env.PORT || 3001;

con.connect();

const app = express();
app.use(bodyParser.json());
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/signup", async (req, res) => {
  const userInfo = req.body;
  if (!userInfo.userEmail.endsWith("@ufl.edu")) {
    return res.status(400).json({
      message: "Invalid email."
    });
  }
  if (userInfo.userFirstName == "") {
    return res.status(400).json({
      message: "No first name specified."
    });
  }
  if (userInfo.userLastName == "") {
    return res.status(400).json({
      message: "No last name specified."
    });
  }
  if (userInfo.userEmail == "") {
    return res.status(400).json({
      message: "No email specified."
    });
  }
  if (userInfo.userPassword == "") {
    return res.status(400).json({
      message: "No password specified."
    });
  }
  const password = await bcrypt.hash(userInfo.userPassword, 10);
  con.query("SELECT Email FROM Users WHERE Email = (?)", [userInfo.userEmail], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Server error."
      });
    }
    if (result.length > 0) {
      return res.status(400).json({
        message: "This email is already associated with an account."
      });
    }
    else {
      con.query("INSERT INTO Users (FirstName, LastName, Email, Password, username) VALUES (?, ?, ?, ?, ?)", 
        [userInfo.userFirstName, userInfo.userLastName, userInfo.userEmail, password, userInfo.userFirstName + " " + userInfo.userLastName], (error, _result) => {
          if (error) {
            return res.status(500).json({
              message: "Could not add user."
            });
          }
          const jwtToken = jwt.sign({ email: userInfo.userEmail }, SECRET_KEY, { expiresIn: '24h' });
          return res.status(201).json({
            jwtToken
          });
        });
    }
  });
});

app.post("/login", (req, res) => {
  const userInfo = req.body;
  if (userInfo.userEmail == "") {
    return res.status(400).json({
      message: "No email specified."
    });
  }
  if (userInfo.userPassword == "") {
    return res.status(400).json({
      message: "No password specified."
    });
  }
  con.query("SELECT Email, Password FROM Users WHERE Email = (?)", [userInfo.userEmail], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Server error."
      });
    }
    if (result.length > 0) {
      bcrypt.compare(userInfo.userPassword, result[0].Password, (err, result2) => {
        if (err) {
          return res.status(500).json({
            message: "Server error."
          });
        }
        if (result2) {
          const jwtToken = jwt.sign({ email: userInfo.userEmail }, SECRET_KEY, { expiresIn: '24h' });
          return res.status(201).json({
            jwtToken
          });
        }
        return res.status(400).json({
          message: "Wrong email and/or password."
        });
      });
    }
    else {
      return res.status(400).json({
        message: "Wrong email and/or password."
      });
    }
  });
});

app.post('/userpost', authenticate, (req, res) => {
  const postText = req.body.postText;
  const userEmail = req.user.email;
  con.query("INSERT INTO Posts (PostText, UserEmail) VALUES (?, ?)", [postText, userEmail], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error saving post"
      });
    }
    return res.status(200).json({
      message: "Posted successfully"
    });
  });
});

app.post("/verifytoken", authenticate, (req, res) => {
  res.status(200).json({
    message: "Verified"
  });
});

app.listen(PORT, () => {
  
});

module.exports = app;