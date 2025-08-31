import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import { useLogout } from "../hooks/useLogout";

function Home() {
  const { _logout, error, isPending } = useLogout();
  const { user } = useSelector((store) => store.user);
  const { data } = useCollection("users");
  console.log(data);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          Hello,{" "}
          <span className="text-indigo-600 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {user.displayName}
          </span>{" "}
          👋
        </h1>
        <p className="text-gray-600 text-lg">Welcome to your dashboard</p>
      </div>

      {error && (
        <div className="max-w-md mx-auto mb-8">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        </div>
      )}

      <div className="flex justify-center mb-16">
        {!isPending ? (
          <button
            onClick={_logout}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 
                   text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 
                   transition-all duration-200 flex items-center space-x-2"
          >
            <span>Logout</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7"
              />
            </svg>
          </button>
        ) : (
          <button
            disabled
            className="px-8 py-4 bg-gray-400 text-white font-semibold rounded-xl shadow-lg flex items-center space-x-2"
          >
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Loading...</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {data &&
          data.map((user) => (
            <div
              key={user.uid}
              className="relative group flex flex-col items-center text-center p-8 bg-white rounded-3xl 
                   shadow-lg hover:shadow-2xl border border-gray-100 hover:border-indigo-100 
                   transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative mb-6">
                <div className="absolute -inset-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur opacity-75 group-hover:opacity-100 transition"></div>
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="relative w-24 h-24 rounded-full border-4 border-white shadow-lg z-10"
                />
                <div
                  className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-2 border-white ${
                    user.online ? "bg-green-400" : "bg-gray-300"
                  } z-20`}
                ></div>
              </div>

              <h2 className="font-bold text-xl text-gray-900 mb-2">
                {user.displayName}
              </h2>

              <p
                className={`text-sm font-semibold mb-6 ${
                  user.online ? "text-green-600" : "text-gray-500"
                }`}
              >
                {user.online ? "Online" : "Offline"}
              </p>

              <button
                className="px-6 py-3 text-sm font-semibold text-indigo-600 hover:text-white 
                     bg-indigo-50 hover:bg-indigo-600 rounded-xl transition-all duration-200 
                     hover:shadow-lg transform hover:-translate-y-0.5 w-full max-w-[160px]"
              >
                View Profile
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
