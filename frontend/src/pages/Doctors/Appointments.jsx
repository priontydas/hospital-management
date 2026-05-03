import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { API_BASE_URL, getAuthHeaders } from "../../lib/api";
import DoctorData from "./DoctorsData.json";

const Appointments = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const docInfo = DoctorData.find((doctor) => doctor.id == id) || {};

  const handleBook = async () => {
    try {
      if (!token) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      const { data } = await axios.post(
        `${API_BASE_URL}/api/v1/appointment/book`,
        {
          doctor_id: docInfo.id,
          appointment_date: selectedDateTime,
        },
        {
          headers: getAuthHeaders(token),
        }
      );

      if (data.success) {
        toast.success("Appointment booked!");
        navigate("/user/appointments");
      }
    } catch {
      toast.error("Booking failed");
    }
  };

  return (
    <div className="container docinfo-container">
      <div className="row m-3">
        <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
          <img src={docInfo?.pic} alt="docImage" height={200} width={200} />
          <h6>{docInfo?.name}</h6>
          <h6 className={docInfo?.available ? "text-success" : "text-danger"}>
            {docInfo?.available ? "Available" : "Not Available"}
          </h6>
        </div>

        <div className="col-md-8 d-flex flex-column justify-content-center m-3">
          <h6>Experience: {docInfo?.experience} Years</h6>
          <h6>About Doctor :</h6>
          <p>{docInfo?.about}</p>
          <h5>Consultation Fee : {docInfo?.fee}</h5>

          <div className="date-time mt-3">
            <h6>Select Your Booking Date & Time :</h6>

            <DatePicker
              className="calender"
              minDate={new Date()}
              selected={selectedDateTime}
              onChange={(date) => setSelectedDateTime(date)}
              showTimeSelect
              timeFormat="h:mm aa"
              timeIntervals={30}
              dateFormat="d-MMMM-yyyy h:mm aa"
              timeCaption="Time"
              minTime={new Date()}
              maxTime={setHours(setMinutes(new Date(), 0), 22)}
            />

            <p>
              Your Selected Booking:{" "}
              {selectedDateTime
                ? selectedDateTime.toLocaleString()
                : "Please select date & time"}
            </p>
          </div>

          <button
            className="btn btn-primary w-50 mt-3"
            disabled={!docInfo?.available}
            onClick={handleBook}
          >
            {docInfo?.available ? "Book Now" : "Doctor Not Available"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
