const express = require("express");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
require("dotenv").config(); // To use the environment variables for DB credentials

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

// Set up MySQL database connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
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
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Query to find the user by username
  connection.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      const user = results[0];

      // Compare the hashed password using bcrypt
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error("Bcrypt error:", err);
          return res.status(500).json({ message: "Server error" });
        }

        if (!isMatch) {
          return res.status(401).json({ message: "Invalid username or password" });
        }

        // Login successful
        res.json({
          message: "Login successful",
          user: {
            id: user.id,
            username: user.username
          }
        });
      });
    }
  );
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
