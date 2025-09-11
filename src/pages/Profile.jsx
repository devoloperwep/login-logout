import { sendEmailVerification } from "firebase/auth";
import { doc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore/lite";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase/config";
import { useCollection } from "../hooks/useCollection";
import { useLogout } from "../hooks/useLogout";

function Profile() {
  const { user } = useSelector((store) => store.user);
  const { _logout, isPending, error } = useLogout();
  const { data } = useCollection("users", null, [
    "uid",
    "==",
    auth.currentUser.uid,
  ]);

  const hendleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const bgImage = formData.get("bgImage");
    const userRef = doc(db, "users", user.uid);

    await updateDoc(userRef, {
      bgURL: bgImage,
    }).then(() => {
      alert("Image added successfully");
    });
  };

  const sendEmailLink = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        alert(`📩 Link sent to ${user.email}`);
      })
      .catch((error) => {
        alert(`⚠️ Error: ${error.message}`);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-3xl shadow-2xl p-8 text-center border border-gray-700">
        <img
          src={user.photoURL}
          alt="profile"
          className="w-28 h-28 mx-auto rounded-full border-4 border-gray-700 object-cover shadow-lg"
        />
        <h2 className="mt-4 text-2xl font-bold text-white">
          {user.displayName}
        </h2>
        <p className="text-gray-400 text-sm">{user.email}</p>

        <div className="mt-6">
          {user.emailVerified ? (
            <p className="text-green-400 font-medium flex items-center justify-center gap-2">
              ✅ Email Verified
            </p>
          ) : (
            <div>
              <p className="text-red-400 font-medium mb-3">
                Email Not Verified ❌
              </p>
              <button
                onClick={sendEmailLink}
                className="px-6 cursor-pointer py-2 text-sm rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow hover:from-indigo-600 hover:to-purple-700 transition"
              >
                Send Verification Link
              </button>
            </div>
          )}
        </div>

        <button
          onClick={_logout}
          disabled={isPending}
          className="mt-8 cursor-pointer w-full px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold shadow hover:from-red-600 hover:to-red-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Loading..." : "Logout"}
        </button>

        {error && (
          <p className="mt-2 text-red-400 text-sm font-medium">⚠️ {error}</p>
        )}

        <Link
          to="/"
          className="mt-4 inline-block px-6 py-2 rounded-xl text-sm font-medium text-gray-300 border border-gray-600 hover:border-indigo-500 hover:text-white hover:bg-indigo-600 transition"
        >
          ⬅️ Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Profile;
