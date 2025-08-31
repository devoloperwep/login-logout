import { signOut } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../app/userSlice";
import { getFirebaseErrorMessage } from "../components/Errorld";
import { auth } from "../firebase/config";

export function useLogout() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const _logout = async () => {
    try {
      setIsPending(true);
      await signOut(auth);
      dispatch(logout());
    } catch (err) {
      setError(getFirebaseErrorMessage(err.message));
    } finally {
      setIsPending(false);
    }
  };

  return { _logout, isPending, error };
}
