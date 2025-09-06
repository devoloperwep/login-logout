import { useEffect, useState } from "react";
import { Form, Link, useActionData } from "react-router-dom";
import { formError } from "../components/Errorld";
import FormInput from "../components/FormInput";
import { useGoogle } from "../hooks/useGoogle";
import { useRegister } from "../hooks/useRegister";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  return data;
}

function Register() {
  const user = useActionData();
  const [error, setError] = useState(null);
  const { register, isPending, error: _error } = useRegister();
  const {
    googleProvider,
    isPending: googleIsPending,
    error: googleError,
  } = useGoogle();
  useEffect(() => {
    if (user?.name && user?.email && user?.password) {
      register(user.name, user.email, user.password);
      setError(false);
    } else {
      setError(user ? formError(user) : false);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create an Account ✨
        </h1>

        <Form method="post" className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <FormInput
              name="name"
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
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
          <div>{error && <p style={{ color: "red" }}>{error}</p>}</div>
          <div>{_error && <p style={{ color: "red" }}>{_error}</p>}</div>

          {!isPending && (
            <button
              type="submit"
              className="w-full cursor-pointer bg-indigo-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-indigo-700 hover:shadow-lg transition duration-300"
            >
              Register
            </button>
          )}
          {isPending && (
            <button
              type="submit"
              disabled
              className="w-full cursor-pointer bg-black text-white py-3 disabled rounded-lg font-semibold shadow-md hover:shadow-lg transition duration-300"
            >
              Loading...
            </button>
          )}
          {!googleIsPending && (
            <button
              type="button"
              onClick={googleProvider}
              className="w-full cursor-pointer bg-black text-white py-3 disabled rounded-lg font-semibold shadow-md hover:shadow-lg transition duration-300"
            >
              Google
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

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
