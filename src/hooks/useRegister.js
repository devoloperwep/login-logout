import { useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../app/userSlice";
import { getFirebaseErrorMessage } from "../components/Errorld";
import { db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";

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
        photoURL: "https://api.dicebear.com/9.x/open-peeps/svg?seed=" + name,
      });

      await setDoc(doc(db, "users", req.user.uid), {
        displayName: req.user.displayName,
        photoURL: req.user.photoURL,
        online: true,
        uid: req.user.uid,
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
