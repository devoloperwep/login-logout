import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import { getRandomGradientImage } from "../utils";

function UserInfo() {
  const { id } = useParams();
  const { data, isPending, error } = useCollection("users", null, [
    "uid",
    "==",
    id,
  ]);
  const [bgImage, setBgImage] = useState("");

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
              <img
                src={bgImage || data[0].bgURL || getRandomGradientImage()}
                alt=""
                className="w-full h-40 object-cover"
              />
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                <img
                  src={data[0].photoURL}
                  alt=""
                  className="w-24 h-24 rounded-full border-4 border-gray-900 shadow-lg object-cover"
                />
              </div>
            </div>
            <div className="pt-16 pb-8 text-center px-6">
              <h2 className="text-2xl font-bold text-white">
                {data[0].displayName}
              </h2>
              <p className="text-gray-400 mt-2 text-sm">{data[0].email}</p>

              <div className="mt-6">
                <input
                  type="text"
                  placeholder="Paste background image URL..."
                  value={bgImage}
                  onChange={(e) => setBgImage(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-gray-800 text-gray-200 placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <button className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow hover:from-indigo-600 hover:to-purple-700 transition">
                  Follow
                </button>
                <button className="px-6 py-2 rounded-xl bg-gradient-to-r from-gray-700 to-gray-800 text-gray-300 font-semibold shadow hover:from-gray-600 hover:to-gray-700 transition">
                  Message
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserInfo;
