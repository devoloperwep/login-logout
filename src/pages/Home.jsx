import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import HomeTasksUi from "../components/HomeTasksUi";
import { useCollection } from "../hooks/useCollection";
import { useLogout } from "../hooks/useLogout";

function Home() {
  const { _logout, error, isPending } = useLogout();
  const { user } = useSelector((store) => store.user);
  const { data } = useCollection("users");
  const { data: tasks } = useCollection("tasks");
  return (
    <HomeTasksUi
      tasks={tasks}
      user={user}
      data={data}
      error={error}
      isPending={isPending}
      _logout={_logout}
    />
  );
}

export default Home;
