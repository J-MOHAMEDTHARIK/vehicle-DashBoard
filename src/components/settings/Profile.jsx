import { useState } from "react";
import { User, X, Upload } from "lucide-react";
import SettingSection from "./SettingSection";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Dhaksina");
  const [email, setEmail] = useState("dhaksina@gamil.com");
  const [profilePic, setProfilePic] = useState(null);

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  return (
    <SettingSection icon={User} title={"Profile"}>
      <div className="flex flex-col sm:flex-row items-center mb-6">
        {profilePic ? (
          <img
            src={profilePic}
            alt="Profile"
            className="rounded-full w-16 h-16 object-cover"
          />
        ) : (
          <div className="bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center">
            <User size={32} className="text-gray-400" />
          </div>
        )}

        <div className="ml-4 text-center sm:text-left">
          <h3 className="text-lg font-semibold text-gray-100">{name}</h3>
          <p className="text-gray-400">{email}</p>
        </div>
      </div>

      <button
        onClick={toggleEdit}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-3 rounded transition duration-200 w-full sm:w-auto text-sm"
      >
        Edit Profile
      </button>

      {/* Smaller Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-4 rounded-lg w-80 shadow-lg">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-white">Edit Profile</h2>
              <button onClick={toggleEdit}>
                <X size={20} className="text-gray-400 hover:text-gray-200" />
              </button>
            </div>

            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center mb-3">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile Preview"
                  className="rounded-full w-20 h-20 object-cover mb-2"
                />
              ) : (
                <div className="bg-gray-700 w-20 h-20 rounded-full flex items-center justify-center mb-2">
                  <User size={36} className="text-gray-400" />
                </div>
              )}

              <label className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded cursor-pointer flex items-center text-sm">
                <Upload size={16} className="mr-2" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                Change Picture
              </label>
            </div>

            {/* Name & Email Inputs */}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-1 mb-2 bg-gray-700 text-white rounded text-sm"
              placeholder="Enter name"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-1 mb-2 bg-gray-700 text-white rounded text-sm"
              placeholder="Enter email"
            />

            {/* Save Button */}
            <button
              onClick={toggleEdit}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1 px-3 rounded transition duration-200 w-full text-sm"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </SettingSection>
  );
};

export default Profile;
