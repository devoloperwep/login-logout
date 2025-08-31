import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import { useLogout } from "../hooks/useLogout";

function Home() {
  const { _logout, error, isPending } = useLogout();
  const { user } = useSelector((store) => store.user);
  const { data } = useCollection("users");
  console.log(data);
  return (
    <div>
      <h1>Hello - {user.displayName}</h1>
      {error && <p>{error}</p>}
      {!isPending && (
        <button className="btn" onClick={_logout}>
          Logout
        </button>
      )}
      {isPending && (
        <button className="btn" disabled>
          Loading...
        </button>
      )}

      {data &&
        data.map((user) => {
          return (
            <div key={user.uid} className="flex gap-4 bg-base-300 p-5 mb-2">
              <h1>{user.displayName}</h1>
              <p>{user.online ? "online" : "offline"}</p>
              <img src={user.photoURL} width="50" height="50" alt="" />
            </div>
          );
        })}
    </div>
  );
}

export default Home;
