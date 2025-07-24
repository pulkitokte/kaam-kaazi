import React, { useState, useEffect } from "react";
import { FaUserCircle, FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "react-toastify/dist/ReactToastify.css";

export default function IndividualProfile() {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    mobile: "",
    address: "",
    landmark: "",
    city: "",
    pincode: "",
    payment: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/login");
        return;
      }

      const uid = user.uid;

      try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        let data = {};
        if (docSnap.exists()) {
          data = docSnap.data();
        }

        const fallbackUsername = localStorage.getItem("username") || "";
        const fallbackMobile = localStorage.getItem("mobile") || "";

        setFormData({
          fullName: data.fullName || "",
          username: data.username || fallbackUsername,
          email: data.email || user.email || "",
          mobile: data.mobile || fallbackMobile,
          address: data.address || "",
          landmark: data.landmark || "",
          city: data.city || "",
          pincode: data.pincode || "",
          payment: data.payment || "",
        });

        if (data.profileImage) {
          setProfileImagePreview(data.profileImage);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        toast.error("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Store file
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result); // Preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "landmark") return; // optional
      if (!value || String(value).trim() === "") {
        newErrors[key] = "This field is required.";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const user = auth.currentUser;
    if (!user) {
      toast.error("User not logged in.");
      return;
    }

    let profileImageURL = profileImagePreview;

    // Upload image to Firebase Storage if selected
    if (imageFile) {
      try {
        const imageRef = ref(storage, `profileImages/${user.uid}`);
        await uploadBytes(imageRef, imageFile);
        profileImageURL = await getDownloadURL(imageRef);
      } catch (uploadErr) {
        console.error("Image upload failed:", uploadErr);
        toast.error("Failed to upload image.");
        return;
      }
    }

    const payload = {
      ...formData,
      profileImage: profileImageURL || "",
      uid: user.uid,
      type: "individual",
    };

    try {
      await setDoc(doc(db, "users", user.uid), payload, { merge: true });

      localStorage.removeItem("username");
      localStorage.removeItem("mobile");

      toast.success("Profile saved!");
      setTimeout(() => navigate("/home"), 1000);
    } catch (err) {
      console.error("Error saving profile:", err);
      toast.error("Failed to save profile.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EF2C4A] flex items-center justify-center px-4 py-8">
      <div className="bg-[#D9D9D9] p-8 rounded-2xl w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center mb-8">PROFILE DETAILS</h2>

        {/* Profile Photo */}
        <div className="flex flex-col items-start sm:items-center sm:flex-row gap-4 mb-8">
          <div className="text-left sm:text-center">
            <label className="font-semibold flex items-start mb-1">PROFILE PHOTO</label>
            <div className="relative">
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label htmlFor="profile-upload" className="cursor-pointer">
                {profileImagePreview ? (
                  <img
                    src={profileImagePreview}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="text-6xl text-black" />
                )}
              </label>
            </div>
            <label
              htmlFor="profile-upload"
              className="text-sm flex items-center gap-1 mt-2 cursor-pointer"
            >
              Click on icon to update photo <FaPen size={12} />
            </label>
          </div>
        </div>

        {/* Form */}
        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          {[
            // Render fields dynamically
            { name: "fullName", label: "FULL NAME" },
            { name: "username", label: "USERNAME" },
            { name: "email", label: "EMAIL", type: "email" },
            { name: "mobile", label: "MOBILE NUMBER" },
            { name: "address", label: "ADDRESS" },
            { name: "landmark", label: "ANY LANDMARK (OPTIONAL)" },
            { name: "city", label: "CITY" },
            { name: "pincode", label: "PINCODE" },
          ].map(({ name, label, type = "text" }) => (
            <div key={name}>
              <label className="block text-xs font-semibold mb-1">
                {label}
              </label>
              <input
                name={name}
                type={type}
                placeholder={label}
                value={formData[name]}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-white text-sm"
              />
              {errors[name] && (
                <p className="text-red-600 text-xs mt-1">{errors[name]}</p>
              )}
            </div>
          ))}

          {/* Payment Method */}
          <div>
            <label className="block text-xs font-semibold mb-1">
              PAYMENT METHOD
            </label>
            <select
              name="payment"
              value={formData.payment}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-white text-sm"
            >
              <option value="">Choose your payment method</option>
              <option>Cash</option>
              <option>Card</option>
              <option>UPI</option>
              <option>Net Banking</option>
            </select>
            {errors.payment && (
              <p className="text-red-600 text-xs mt-1">{errors.payment}</p>
            )}
          </div>

          {/* Save Button */}
          <div className="col-span-1 sm:col-span-2">
            <button
              type="submit"
              className="w-full bg-[#EF2C4A] text-white font-semibold py-2 rounded hover:bg-[#d6223e] transition"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
