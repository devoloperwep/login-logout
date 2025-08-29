import { signOut } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../app/userSlice";
import { getFirebaseErrorMessage } from "../components/Errorld";
import { auth } from "../firebase/config"; // ✅ make sure this path is correct

export function useLogout() {
  const [isPending, setIsPending] = useState(false); // ✅ fixed typo
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const _logout = async () => {
    try {
      setIsPending(true);
      await signOut(auth); // ✅ now works
      dispatch(logout());
    } catch (err) {
      setError(getFirebaseErrorMessage(err.message));
      console.error(err); // ✅ log full error
    } finally {
      setIsPending(false);
    }
  };

  return { _logout, isPending, error };
}
