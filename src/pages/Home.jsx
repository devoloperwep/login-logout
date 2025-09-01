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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-16 relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute -top-5 right-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 relative z-10">
            Hello,{" "}
            <span className="text-indigo-600 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {user.displayName}
            </span>{" "}
            👋
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Welcome to your dashboard
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                {data?.length || 0}
              </div>
              <div className="text-gray-600">Total Users</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {data?.filter((u) => u.online).length || 0}
              </div>
              <div className="text-gray-600">Online Now</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {data?.filter((u) => !u.online).length || 0}
              </div>
              <div className="text-gray-600">Offline</div>
            </div>
          </div>
        </div>

        {error && (
          <div className="max-w-md mx-auto mb-12">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          </div>
        )}

        <div className="flex justify-center mb-20">
          {!isPending ? (
            <button
              onClick={_logout}
              className="px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 
                     text-white font-semibold rounded-2xl shadow-2xl hover:shadow-xl 
                     transition-all duration-300 flex items-center space-x-3"
            >
              <span className="text-lg">Logout</span>
              <svg
                className="w-6 h-6"
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
              className="px-10 py-5 bg-gray-400 text-white font-semibold rounded-2xl shadow-lg flex items-center space-x-3"
            >
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <span className="text-lg">Loading...</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {data &&
            data.map((user) => (
              <div
                key={user.uid}
                className="relative group flex flex-col items-center text-center p-8 bg-white rounded-3xl 
                     shadow-lg hover:shadow-xl border border-gray-100 hover:border-indigo-100 
                     transition-all duration-300"
              >
                <div className="relative mb-6">
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                  <div
                    className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 border-white ${
                      user.online ? "bg-green-400" : "bg-gray-300"
                    }`}
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
                         hover:shadow-lg w-full max-w-[160px]"
                >
                  View Profile
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
