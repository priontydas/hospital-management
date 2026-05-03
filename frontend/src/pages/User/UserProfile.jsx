import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { API_BASE_URL } from "../../lib/api";
import EditUserProfile from "./EditUserProfile";

const UserProfile = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { authLoading, logout, refreshAuth, token, user } = useAuth();

  useEffect(() => {
    if (!token && !authLoading) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (token) {
      refreshAuth();
    }
  }, [authLoading, navigate, refreshAuth, token]);

  const handleLogout = () => {
    logout();
    toast.success("Logout successfully");
    navigate("/login");
  };

  const getImage = () => {
    if (!user?.image) {
      return "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    }

    if (user.image.startsWith("http")) {
      return user.image;
    }

    return `${API_BASE_URL}/uploads/${user.image}`;
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <h4 className="text-center">Manage Your Account & Appointments</h4>

          <div className="col-md-3 text-center">
            <img
              src={getImage()}
              alt="user"
              width={200}
              height={200}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #ddd",
              }}
              onError={(e) => {
                e.target.src =
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png";
              }}
            />
          </div>

          <div className="col-md-8 mt-3">
            <div className="user-container mb-3">
              <h6>Name : {user?.name || "N/A"}</h6>
              <h6>Gender : {user?.gender || "N/A"}</h6>
              <h6>
                DOB :{" "}
                {user?.dob ? new Date(user.dob).toLocaleDateString() : "N/A"}
              </h6>
              <h6>Phone : {user?.phone || "N/A"}</h6>
              <h6>Address : {user?.address || "N/A"}</h6>
            </div>

            <div className="button-container mt-5">
              <button
                className="btn btn-warning"
                onClick={() => setIsOpen(true)}
              >
                Edit Profile
              </button>

              <button
                className="btn btn-primary ms-3"
                onClick={() => navigate("/user/appointments")}
              >
                Appointments
              </button>

              <button
                className="btn btn-danger ms-3"
                onClick={handleLogout}
              >
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <EditUserProfile
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          user={user}
          refreshProfile={refreshAuth}
        />
      )}
    </>
  );
};

export default UserProfile;
