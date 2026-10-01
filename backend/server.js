require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
 password: process.env.DB_PASSWORD,
  database: "vgs"
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err.message);
    return;
  }

  console.log("MySQL connected successfully!");
});

// Home route
app.get("/", (req, res) => {
  res.send("VGS Backend is running!");
});

// Register a new user
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please fill in all fields."
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      message: "Password must contain at least 8 characters."
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users (name, email, password)
      VALUES (?, ?, ?)
    `;

    db.query(
      sql,
      [name.trim(), email.trim().toLowerCase(), hashedPassword],
      (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
              message: "This email is already registered."
            });
          }

          console.error("Registration error:", err);
          return res.status(500).json({
            message: "Registration failed. Please try again."
          });
        }

        res.status(201).json({
          message: "Registration successful!",
          userId: result.insertId
        });
      }
    );
  } catch (error) {
    console.error("Password hashing error:", error);
    res.status(500).json({
      message: "Something went wrong during registration."
    });
  }
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please enter your email and password."
    });
  }

  const sql = `
    SELECT id, name, email, password
    FROM users
    WHERE email = ?
  `;

  db.query(
    sql,
    [email.trim().toLowerCase()],
    async (err, results) => {
      if (err) {
        console.error("Login database error:", err);
        return res.status(500).json({
          message: "Login failed. Please try again."
        });
      }

      if (results.length === 0) {
        return res.status(401).json({
          message: "Invalid email or password."
        });
      }

      try {
        const user = results[0];
        const isPasswordCorrect = await bcrypt.compare(
          password,
          user.password
        );

        if (!isPasswordCorrect) {
          return res.status(401).json({
            message: "Invalid email or password."
          });
        }

        res.status(200).json({
          message: "Login successful!",
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          }
        });
      } catch (error) {
        console.error("Password verification error:", error);
        res.status(500).json({
          message: "Something went wrong during login."
        });
      }
    }
  );
});

// Submit a complaint
app.post("/complaints", (req, res) => {
  const {
    title,
    category,
    description,
    village,
    location,
    user_id
  } = req.body;

  if (!title || !category || !description || !village || !location) {
    return res.status(400).send(
      "Please fill in all complaint fields."
    );
  }

  const sql = `
    INSERT INTO complaints
    (title, category, description, village, location, user_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      title,
      category,
      description,
      village,
      location,
      user_id || null
    ],
    (err, result) => {
      if (err) {
        console.error("Complaint submission error:", err);
        return res.status(500).send(
          "Failed to submit complaint."
        );
      }

      res.status(201).send(
        "Complaint submitted successfully! Complaint ID: " +
        result.insertId
      );
    }
  );
});

// Track a complaint using its ID
app.get("/complaints/:id", (req, res) => {
  const complaintId = req.params.id;

  if (!/^\d+$/.test(complaintId)) {
    return res.status(400).json({
      message: "Please enter a valid complaint ID."
    });
  }

  const sql = "SELECT * FROM complaints WHERE id = ?";

  db.query(sql, [complaintId], (err, results) => {
    if (err) {
      console.error("Complaint tracking error:", err);
      return res.status(500).json({
        message: "Unable to track complaint."
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Complaint not found."
      });
    }

    res.status(200).json(results[0]);
  });
});

// Start the backend server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});