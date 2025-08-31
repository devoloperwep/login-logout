import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/userSlice";
import { getFirebaseErrorMessage } from "../components/Errorld";
import { auth, db } from "../firebase/config";

export function useLogout() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  const _logout = async () => {
    try {
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        online: false,
      });

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
