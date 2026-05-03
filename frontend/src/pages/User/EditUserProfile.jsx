import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/useAuth";
import { API_BASE_URL, getAuthHeaders } from "../../lib/api";
import "./User.css";

const createFormData = (user) => ({
  name: user?.name || "",
  gender: user?.gender || "",
  dob: user?.dob || "",
  phone: user?.phone || "",
  address: user?.address || "",
  email: user?.email || "",
  image: user?.image || "",
});

const EditUserProfile = ({ isOpen, onClose, user, refreshProfile }) => {
  const [formData, setFormData] = useState(() => createFormData(user));
  const [preview, setPreview] = useState(() => user?.image || "");
  const [image, setImage] = useState(null);
  const { token } = useAuth();

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();

      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("dob", formData.dob);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("address", formData.address);

      if (image) {
        formDataToSend.append("image", image);
      }

      const { data } = await axios.put(
        `${API_BASE_URL}/api/v1/user/profile`,
        formDataToSend,
        {
          headers: {
            ...getAuthHeaders(token),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success("Profile updated");

        if (typeof refreshProfile === "function") {
          await refreshProfile();
        }

        onClose();
      }
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="editModal modal d-block">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Edit Your Profile</h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            <div className="text-center mb-2">
              <img
                src={
                  preview ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                height={80}
                width={80}
                style={{ borderRadius: "50%" }}
                alt="user"
              />
            </div>

            <input type="file" onChange={handleImage} />

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <input
              type="date"
              name="dob"
              value={formatDate(formData.dob)}
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
            />

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
            />
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>

            <button className="btn btn-primary" onClick={handleSave}>
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserProfile;
