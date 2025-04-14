import { useAuth } from "@/Context/AuthContext";
import React, { useEffect, useState } from "react";

const ProfilePage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { user } = useAuth();

  useEffect(() => {
    console.log(user);
    if (user) {
      setUsername(user.userName);
      setEmail(user.email);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Profile Settings
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
            />
            <button className="mt-4 px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md">
              Upload New
            </button>
          </div>

          {/* Form Section */}
          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <label className="w-full px-4 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                {username}
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <label className="w-full px-4 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                {email}
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                placeholder="Tell us a little about yourself..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>
          </div>
        </div>

        {/* <div className="flex justify-end mt-6">
          <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-md">
            Save Changes
          </button> 
        </div>  */}
      </div>
    </div>
  );
};

export default ProfilePage;
