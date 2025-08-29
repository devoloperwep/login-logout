import { useSelector } from "react-redux";
import { useLogout } from "../hooks/useLogout";

function Home() {
  const { _logout, error, isPending } = useLogout();
  const { user } = useSelector((store) => store.user);
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
    </div>
  );
}

export default Home;
