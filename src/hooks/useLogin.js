import { useState } from "react";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../app/userSlice";
import { getFirebaseErrorMessage } from "../components/Errorld";

export const useLogin = () => {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const _login = async (email, password) => {
    try {
      setIsPending(true);
      const req = await signInWithEmailAndPassword(auth, email, password);
      if (!req.user) {
        throw new Error("Login failed");
      }
      console.log(req.user);
      dispatch(login(req.user));
    } catch (error) {
      setError(getFirebaseErrorMessage(error.message));
      console.log("Firebase error:", error.message);
    } finally {
      setIsPending(false);
    }
  };

  return { _login, isPending, error };
};
