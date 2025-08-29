import React, { useEffect, useState } from "react";
import { Form, Link, useActionData } from "react-router-dom";
import { loginError } from "../components/Errorld";
import FormInput from "../components/FormInput";
import { useLogin } from "../hooks/useLogin";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  return data;
}

function Login() {
  const user = useActionData();
  const [error, setError] = useState(null);
  const { _login: login, error: _error, isPending } = useLogin();
  useEffect(() => {
    if (user?.email && user?.password) {
      login(user.email, user.password);
      setError(null);
    } else {
      console.log(user);
      setError(user ? loginError(user) : false);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h1>

        <Form method="post" className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <FormInput
              name="email"
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <FormInput
              name="password"
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div>
            <p className="text-error">{error && error}</p>
            <p className="text-error">{_error && _error}</p>
          </div>
          {!isPending && (
            <button
              type="submit"
              className="w-full cursor-pointer bg-indigo-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-indigo-700 hover:shadow-lg transition duration-300"
            >
              Login
            </button>
          )}
          {isPending && (
            <button
              type="submit"
              className="w-full cursor-pointer bg-indigo-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-indigo-700 hover:shadow-lg transition duration-300"
            >
              Loading...
            </button>
          )}
        </Form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
