import React from "react";
import { Link } from "react-router-dom";

function TasksChat({ tasks }) {
  return (
    <>
      {tasks.length && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-10 bg-zinc-900 py-5 gap-5">
          {tasks.map((task) => {
            return (
              <li
                key={task.uid}
                title={task.name + " Chat"}
                className="cursor-pointer rounded-3xl bg-cyan-400 p-5 transition hover:shadow-xl hover:scale-[1.02]"
              >
                <Link to={`/task/${task.uid}`} className="block text-center">
                  <h5 className="text-white text-2xl md:text-xl sm:text-lg font-semibold mb-3">
                    Chat name:
                    <span className="text-black font-bold ml-2">
                      {task.name}
                    </span>
                  </h5>

                  <div className="flex justify-center flex-wrap gap-1 py-4">
                    {task.selectUsers.map((user) => (
                      <div
                        key={user.uid}
                        className="w-16 sm:w-12 md:w-14 lg:w-20"
                      >
                        <img
                          src={user.photoURL}
                          alt="user"
                          className="rounded-full border-2 border-white shadow-md w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  <p className="text-gray-900 text-base md:text-sm sm:text-xs  rounded-lg px-4 mb-2 ">
                    <span className="font-semibold text-gray-800">
                      📝 Description:
                    </span>{" "}
                    {task.description}
                  </p>
                  <p className="text-gray-900 text-base md:text-sm sm:text-xs  rounded-lg">
                    <span className="font-semibold text-gray-800">
                      📅 Date:
                    </span>{" "}
                    {task.dueTo}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default TasksChat;
