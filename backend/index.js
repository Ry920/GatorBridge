const express = require("express");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2");
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
const authenticate = require("./middleware/authjwt")
require("dotenv").config(); // To use the environment variables for DB credentials

const SECRET_KEY = process.env.JWT_SECRET
const app = express();
const PORT = process.env.PORT || 3001;
const DB_PORT = process.env.DB_PORT || 3306;

app.use(bodyParser.json());

//

// Set up MySQL database connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: DB_PORT
});

// Connect to MySQL database
connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password || email === "" || password === "") {
    return res.status(400).json({ message: "email and password are required" });
  }

  if (!email.endsWith("@ufl.edu")) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // Query to find the user by email
  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const user = results[0];

      // Compare the hashed password using bcrypt
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error("Bcrypt error:", err);
          return res.status(500).json({ message: "Server error" });
        }

        if (!isMatch) {
          return res.status(401).json({ message: "Invalid email or password" });
        }
        const jwtToken = jwt.sign({ email: email }, SECRET_KEY, { expiresIn: '24h' });
        // Login successful
        res.json({
          message: "Login successful",
          user: {
            id: user.id,
            email: user.email,
            token: jwtToken
          }
        });
      });
    }
  );
});
// Signup route
app.post("/signup", (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  // Check if email and password are provided
  if (!email || !password || !firstname || !lastname) {
    return res.status(400).json({ message: "email and password are required" });
  }

  if (email === "" || password === "" || firstname === "" || lastname === "") {
    return res.status(400).json({ message: "email and password are required" });
  }

  if (!email.endsWith("@ufl.edu")) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // Check if the email already exists
  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error" });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: "email already exists" });
      }

      // Hash the password before saving it
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error("Bcrypt error:", err);
          return res.status(500).json({ message: "Error hashing password" });
        }

        // Insert the new user into the database
        connection.query(
          "INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)",
          [firstname, lastname, email, hashedPassword],
          (err, results) => {
            if (err) {
              console.error("Database error:", err);
              return res.status(500).json({ message: "Error saving user" });
            }
            const jwtToken = jwt.sign({ email: email }, SECRET_KEY, { expiresIn: '24h' });
            // Respond with a success message
            res.status(201).json({
              message: "Signup successful",
              user: {
                id: results.insertId,
                email: email,
                token: jwtToken
              }
            });
          }
        );
      });
    }
  );
});
app.post("/usernameCheckDefault", authenticate,(req, res) => {
  // const searchText = req.body.searchText;
  const userEmail = req.body.email;
  console.log("check def log2", userEmail)
  connection.query(`SELECT username FROM users WHERE email = "${userEmail}"`, (err, result) => {
    console.log('1',result[0].username)
    console.log('2',result[0])
    console.log('3',result)
    if (err) {
      console.log(err.stack);
      return res.status(500).json({
        message: "Server error."
      });
    }
    if (result[0].username != null){
      return res.status(200).json(result);
    }  
    else{
      return res.status(200).json({userNull: true});
    }
  });
});
app.post("/userSetDef", authenticate,(req, res) => {
  // const searchText = req.body.searchText;
  const userEmail = req.body.email;
  connection.query(`UPDATE users SET username = "${userEmail}" WHERE email = "${userEmail}"`, (err, result) => {
    if (err) {
      console.log(err.stack);
      return res.status(500).json({
        message: "Server error."
      });
    }
      return res.status(200).json(result);
  });
});
app.post("/username", authenticate,(req, res) => {
  // const searchText = req.body.searchText;
  const userEmail = req.body.email;
  connection.query(`SELECT username FROM users WHERE email = "${userEmail}"`, (err, result) => {
    if (err) {
      console.log(err.stack);
      return res.status(500).json({
        message: "Server error."
      });
    }
    return res.status(200).json(result);
  });
});
app.post("/biography", authenticate,(req, res) => {
  // const searchText = req.body.searchText;
  const userEmail = req.body.email;
  connection.query(`SELECT biography FROM users WHERE email = "${userEmail}"`, (err, result) => {
    if (err) {
      console.log(err.stack);
      console.log("first q");
      return res.status(500).json({
        message: "Server error. first q"
      });
    }
    if (result[0].biography === null){
      connection.query(`UPDATE users SET biography = 'Here to talk all things UF!' WHERE email = "${userEmail}"`, (err, updatedResult) => {
        if (err) {
          console.log(err.stack);
          console.log("second q");
          return res.status(500).json({
            message: "Server error. second q"
          });
        }
      });
    }
    else{
      return res.status(200).json(result);
    }
});
});
app.post("/usernameCheckMultiple", authenticate,(req, res) => {
  // const searchText = req.body.searchText;
  const {userEdit} = req.body;
  const email = req.user.email;
  if (userEdit === ""){
    return res.status(400).json({ message: "username too short" });
  }
  connection.query(`SELECT username FROM users WHERE username = "${userEdit}"`, (err, result) => {
    if (err) {
      console.log(err.stack);
      return res.status(500).json({
        message: `Server error. "${userEdit}"`
      });
    }
    if (result.length > 0){
      return res.status(400).json({ message: "username already exists" });
    }
    return res.status(200).json(result);
  });
});
app.post("/usernameChange", authenticate,(req, res) => {
  // const searchText = req.body.searchText;
  const {userEdit} = req.body;
  const email = req.user.email;
  connection.query(`UPDATE users SET username = "${userEdit}" WHERE email = "${email}"`, (err, newUser) => {
    if (err) {
      console.log(err.stack);
      return res.status(500).json({
        message: "Server error."
      });
    }
    return res.status(200).json(newUser);
  })
});
app.post("/biographyChange", authenticate,(req, res) => {
  // const searchText = req.body.searchText;
  const {biographyEdit} = req.body;
  const email = req.user.email;
  connection.query(`UPDATE users SET biography = "${biographyEdit}" WHERE email = "${email}"`, (err, newBio) => {
    if (err) {
      console.log(err.stack);
      return res.status(500).json({
        message: "Server error."
      });
    }
    return res.status(200).json(newBio);
  })
});

app.post("/verifytoken", authenticate, (req, res) => {
  res.status(200).json({
    message: "Verified",
    user: req.user
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = app;