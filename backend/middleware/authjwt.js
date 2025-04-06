require('dotenv').config();
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const con2 = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const authenticate = (req, res, func) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
            if (err) {
                return res.status(403).json({
                   authenticated: false,
                   result: "error" 
                });
            }
            con2.query("SELECT email FROM users WHERE email = (?)", [result.email], (err, result2) => {
                if (result2.length === 0) {
                    return res.status(403).json({
                        authenticated: false,
                        result: "error"
                    });
                }
                req.user = result;
                func();
            });
        });
    }
    else {
        return res.status(403).json({
            authenticated: false,
            result: "error"
        });
    }
}

module.exports = authenticate;