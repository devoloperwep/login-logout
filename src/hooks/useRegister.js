import { useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../app/userSlice";
import { getFirebaseErrorMessage } from "../components/Errorld";

export const useRegister = () => {
  const dispatch = useDispatch();
  const [isPending, setIsPanding] = useState(false);
  const [error, setError] = useState(null);
  const register = async (name, email, password) => {
    try {
      setIsPanding(true);
      const req = await createUserWithEmailAndPassword(auth, email, password);
      if (!req.user) {
        throw new Error("Registration feiled");
      }
      await updateProfile(req.user, {
        displayName: name,
      });
      dispatch(login(req.user));
      console.log(req.user);
    } catch (error) {
      setError(getFirebaseErrorMessage(error.message));
      console.log(error.message);
    } finally {
      setIsPanding(false);
    }
  };
  return { register, isPending, error };
};
