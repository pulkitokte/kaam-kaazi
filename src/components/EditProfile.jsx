// components/EditProfile.jsx
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [formData, setFormData] = useState({
    username: "",
    mobile: "",
    gender: "",
    dob: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData({ ...formData, ...docSnap.data() });
      }
    };
    fetchData();
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value || String(value).trim() === "") {
        newErrors[key] = "Required field.";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await setDoc(doc(db, "users", user.uid), formData, { merge: true });
      navigate("/profile");
    } catch (err) {
      console.error("Error saving profile:", err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["username", "mobile", "gender", "dob"].map((field) => (
          <div key={field}>
            <label className="block capitalize">{field}</label>
            <input
              type={field === "dob" ? "date" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="border w-full px-2 py-1 rounded"
            />
            {errors[field] && (
              <p className="text-red-500 text-sm">{errors[field]}</p>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
