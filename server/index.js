const express = require("express");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3001;

// TODO: 
// Add database connection with MySQL
// Add user login logic

const app = express();
app.use(bodyParser.json());
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/login", (req, res) => {
  console.log("Received form!");
  console.log(req.body);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

