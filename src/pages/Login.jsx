import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Form, Link, useActionData } from "react-router-dom";
import { loginError } from "../components/Errorld";
import FormInput from "../components/FormInput";
import { useGoogle } from "../hooks/useGoogle";
import { useLogin } from "../hooks/useLogin";
import { useResetPassword } from "../hooks/useResetPassword";
import { FaGoogle } from "react-icons/fa";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  return data;
}

function Login() {
  const { _login, error: _error, isPending } = useLogin();
  const user = useActionData();
  const [error, setError] = useState(null);
  const { reserPassword } = useResetPassword();
  const [forgetPassword, setForgetPassword] = useState(false);
  const email = useRef();
  const {
    googleProvider,
    isPending: googleIsPending,
    error: googleError,
  } = useGoogle();

  useEffect(() => {
    if (user?.email && user?.password) {
      _login(user.email, user.password);
      setError(false);
    } else {
      console.log(user ? loginError(user) : false);
      setError(user ? loginError(user) : false);
    }
    if (user?.emailRecovery) {
      reserPassword(user.emailRecovery);
      email.current.value = "";
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          {forgetPassword ? "Reset Password 🔑" : "Welcome Back 👋"}
        </h1>

        {!forgetPassword && (
          <Form method="post" className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Email
              </label>
              <FormInput
                name="email"
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Password
              </label>
              <FormInput
                name="password"
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>
            <div className="text-end">
              {error && <p className="text-red-600 text-sm">{error}</p>}
              {_error && <p className="text-red-600 text-sm">{_error}</p>}
              {googleError && (
                <p className="text-red-600 text-sm">{googleError}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isPending}
              className={`w-full py-3 rounded-lg font-semibold text-white shadow-md transition duration-300 ${
                isPending
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg cursor-pointer"
              }`}
            >
              {isPending ? "Loading..." : "Login"}
            </button>
            {!googleIsPending && (
              <button
                type="button"
                onClick={googleProvider}
                className="flex items-center justify-center gap-2 w-full 
             bg-white text-gray-800 border border-gray-300 
             py-3 rounded-lg font-medium 
             shadow-sm hover:shadow-md hover:bg-gray-50 
             active:scale-95 transition cursor-pointer"
              >
                <FaGoogle className="text-red-500 text-lg" />
                Continue with Google
              </button>
            )}
            {googleIsPending && (
              <button
                type="submit"
                disabled
                className="w-full cursor-pointer bg-black text-white py-3 disabled rounded-lg font-semibold shadow-md hover:shadow-lg transition duration-300"
              >
                Loading...
              </button>
            )}
          </Form>
        )}

        {forgetPassword && (
          <Form method="post" className="space-y-5">
            <div>
              <label
                htmlFor="resetEmail"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Enter your email
              </label>
              <input
                type="email"
                ref={email}
                id="resetEmail"
                placeholder="example@mail.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition"
              />
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer py-3 rounded-lg font-semibold text-white shadow-md bg-pink-500 hover:bg-pink-600 hover:shadow-lg transition duration-300"
            >
              Send Reset Link
            </button>
          </Form>
        )}

        <button
          onClick={() => setForgetPassword(!forgetPassword)}
          className="w-full py-2 mt-5 cursor-pointer rounded-lg font-medium text-indigo-600 bg-indigo-100 hover:bg-indigo-200 transition"
        >
          {forgetPassword ? "Back to Login" : "Forgot Password"}
        </button>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
