import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import { getRandomGradientImage } from "../utils";
import { db } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";

function UserInfo() {
  const { id } = useParams();
  const { data, isPending, error } = useCollection("users", null, [
    "uid",
    "==",
    id,
  ]);
  const [bgImage, setBgImage] = useState("");

  // Save background image to Firestore
  const handleSaveBackground = async () => {
    if (!bgImage) return;
    try {
      // agar user hujjatining doc id si = uid bo'lsa
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, { bgURL: bgImage });
      alert("✅ Background updated!");
    } catch (err) {
      console.error("Error updating background:", err);
      alert("❌ Failed to update background.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-700">
        {isPending && (
          <p className="text-center py-8 text-gray-400 font-medium">
            Loading...
          </p>
        )}
        {error && (
          <p className="text-center py-8 text-red-400 font-medium">
            ⚠️ {error}
          </p>
        )}
        {data && data[0] && (
          <>
            <div className="relative">
              {/* Background image */}
              <img
                src={data[0].bgURL || getRandomGradientImage()}
                alt="background"
                className="w-full h-40 object-cover"
              />
              {/* Profile avatar */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                <img
                  src={data[0].photoURL}
                  alt="profile"
                  className="w-24 h-24 rounded-full border-4 border-gray-900 shadow-lg object-cover"
                />
              </div>
            </div>

            <div className="pt-16 pb-8 text-center px-6">
              <h2 className="text-2xl font-bold text-white">
                {data[0].displayName}
              </h2>
              <p className="text-gray-400 mt-2 text-sm">{data[0].email}</p>

              {/* Background image input */}
              <div className="mt-6 flex gap-2">
                <input
                  type="text"
                  placeholder="Paste background image URL..."
                  value={bgImage}
                  onChange={(e) => setBgImage(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-xl bg-gray-800 text-gray-200 placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleSaveBackground}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition"
                >
                  Save
                </button>
              </div>

              {/* Home button */}
              <div className="mt-6">
                <Link
                  to="/"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow hover:from-green-600 hover:to-emerald-700 transition"
                >
                  🏠 Home
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserInfo;
