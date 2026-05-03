import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { API_BASE_URL, getAuthHeaders } from "../../lib/api";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const { authLoading, logout, token } = useAuth();

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!token) {
        if (!authLoading) {
          toast.error("Please login first");
          navigate("/login");
        }
        return;
      }

      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/v1/appointment/list`,
          {
            headers: getAuthHeaders(token),
          }
        );

        if (data.success) {
          setAppointments(data.appointments);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        if (error.response?.status === 401) {
          logout();
          navigate("/login");
        }

        toast.error("Failed to load appointments");
      }
    };

    fetchAppointments();
  }, [authLoading, logout, navigate, token]);

  return (
    <div className="container mt-4">
      <h3 className="mb-3">My Appointments</h3>

      {appointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        appointments.map((a) => (
          <div key={a.id} className="card p-3 mb-2">
            <h5>Doctor: {a.doctor_name}</h5>
            <p>Speciality: {a.speciality}</p>
            <p>Date: {new Date(a.appointment_date).toLocaleString()}</p>
            <p>Fee: {a.fee}</p>
            <p>
              Status:{" "}
              <span
                className={
                  a.status === "pending" ? "text-warning" : "text-success"
                }
              >
                {a.status}
              </span>
            </p>
            <small>Created: {new Date(a.created_at).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default MyAppointments;
