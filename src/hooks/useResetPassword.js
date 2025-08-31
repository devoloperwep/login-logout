import { auth } from "../firebase/config";
import { formError } from "../components/Errorld";
import { sendPasswordResetEmail } from "firebase/auth";

export const useResetPassword = () => {
  const reserPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email, {
        url: "http://localhost:5173/",
      });
      alert("Check your email");
    } catch (error) {
      const errorMessage = error.message;
      formError(errorMessage);
    }
  };
  return { reserPassword };
};
