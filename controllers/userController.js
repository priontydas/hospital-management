import bcrypt from "bcrypt";
import db from "../hospital/config/db.js";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please Provide All fields"
            });
        }

        // 🔐 HASH PASSWORD (IMPORTANT)
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            (err, result) => {
                if (err) return res.status(500).send(err);

                if (result.length > 0) {
                    return res.status(400).send({
                        success: false,
                        message: "User already exists"
                    });
                }

                db.query(
                    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
                    [name, email, hashedPassword],
                    (err, result) => {
                        if (err) return res.status(500).send(err);

                        res.status(201).send({
                            success: true,
                            message: "Register Successfully"
                        });
                    }
                );
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};
export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please provide email and password"
            });
        }

        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            async (err, result) => {
                if (err) {
                    return res.status(500).send({
                        success: false,
                        message: err.message
                    });
                }

                if (result.length === 0) {
                    return res.status(404).send({
                        success: false,
                        message: "User not found"
                    });
                }

                const user = result[0];

                // compare password
                const match = await bcrypt.compare(password, user.password);

                if (!match) {
                    return res.status(401).send({
                        success: false,
                        message: "Invalid credentials"
                    });
                }

                // create token
                const token = jwt.sign(
                    { id: user.id, email: user.email },
                    process.env.JWT_SECRET,
                    { expiresIn: "7d" }
                );

                res.status(200).send({
                    success: true,
                    message: "Login successful",
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                });
            }
        );

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};
export const userLogout = (req, res) => {
    try {
        res.status(200).send({
            success: true,
            message: "Logout successful (remove token from frontend)"
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};
export const getUserProfile = (req, res) => {
  try {
    db.query(
      `SELECT id, name, email, gender, dob, phone, address, image 
       FROM users 
       WHERE id = ?`,
      [req.user.id],
      (err, result) => {
        if (err) {
          return res.status(500).send({
            success: false,
            message: err.message,
          });
        }

        res.status(200).send({
          success: true,
          user: result[0],
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
export const updateUserProfile = (req, res) => {
  try {
    const { name, email, gender, dob, phone, address } = req.body;

    const image = req.file
      ? `http://localhost:8080/uploads/${req.file.filename}`
      : null;

    db.query(
      `UPDATE users 
       SET name=?, email=?, gender=?, dob=?, phone=?, address=?, image=COALESCE(?, image)
       WHERE id=?`,
      [name, email, gender, dob, phone, address, image, req.user.id],
      (err, result) => {
        if (err) {
          return res.status(500).send({ success: false, message: err.message });
        }

        res.status(200).send({
          success: true,
          message: "Profile updated successfully",
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
};