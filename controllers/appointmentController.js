import db from "../hospital/config/db.js";
import fs from "fs";

const doctors = JSON.parse(
    fs.readFileSync(new URL("../hospital/src/pages/Doctors/DoctorsData.json", import.meta.url))
);
// BOOK APPOINTMENT
export const bookAppointment = (req, res) => {
    try {
        const { doctor_id, appointment_date } = req.body;
        const user_id = req.user?.id;

        if (!user_id || !doctor_id || !appointment_date) {
            return res.status(400).send({
                success: false,
                message: "All fields required"
            });
        }

        const sql = `
            INSERT INTO appointments (user_id, doctor_id, appointment_date)
            VALUES (?, ?, ?)
        `;

        db.query(sql, [user_id, doctor_id, appointment_date], (err, result) => {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: err.message
                });
            }

            res.status(201).send({
                success: true,
                message: "Appointment booked successfully",
                appointmentId: result.insertId
            });
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};
export const getUserAppointments = (req, res) => {
    try {
        const user_id = req.user?.id;

        if (!user_id) {
            return res.status(400).send({
                success: false,
                message: "User ID required"
            });
        }

        const sql = `
            SELECT 
                id,
                user_id,
                doctor_id,
                appointment_date,
                status,
                created_at
            FROM appointments
            WHERE user_id = ?
            ORDER BY appointment_date ASC
        `;

        db.query(sql, [user_id], (err, result) => {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: err.message
                });
            }

            // 🔥 Merge doctor JSON data
            const enrichedAppointments = result.map((appt, index) => {
                const doctor = doctors.find(d => d.id == appt.doctor_id);

                return {
                    ...appt,
                    serial_no: index + 1, // serial number
                    doctor_name: doctor?.name,
                    speciality: doctor?.speciality,
                    fee: doctor?.fee,
                    pic: doctor?.pic
                };
            });

            res.status(200).send({
                success: true,
                appointments: enrichedAppointments
            });
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};
