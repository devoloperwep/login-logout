import { sendEmailVerification } from "firebase/auth";
import React from "react";
import { useSelector } from "react-redux";
import { auth } from "../firebase/config";

function Profile() {
  const { user } = useSelector((store) => store.user);
  const sendEmailLink = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        alert("Check Your Email");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  return (
    <div>
      <img
        src={user.photoURL}
        alt=""
        width={100}
        height={100}
        style={{ borderRadius: "50%", cursor: "pointer" }}
      />
      <h3>{user.displayName}</h3>
      <div>
        <h3>{user.email}</h3>
        <small>
          {user.emailVerified ? (
            <p>Email Verified ✅</p>
          ) : (
            <>
              <p>Email Not Verified</p>
              <button onClick={sendEmailLink}>Send Verifaction Link</button>
            </>
          )}
        </small>
      </div>
    </div>
  );
}

export default Profile;
