import React from "react";

function TaskUI({ data, user }) {
  return (
    <>
      {data &&
        data.comments.map((comment) => {
          return (
            <div
              key={comment.id}
              className={`flex items-end gap-2 ${
                comment.uid === user.uid ? "justify-end" : "justify-start"
              }`}
            >
              {comment.uid !== user.uid && (
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-700 shadow">
                    <img src={comment.photoURL} alt="avatar" />
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1">
                    {comment.displayName}
                  </span>
                </div>
              )}

              <div
                className={`px-4 py-2 rounded-2xl text-sm max-w-xs break-words shadow-md ${
                  comment.uid === user.uid
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-800 text-gray-200 rounded-bl-none"
                }`}
              >
                <p>{comment.text}</p>
                <span
                  className={`block text-[10px] mt-1 text-right ${
                    comment.uid === user.uid ? "text-blue-200" : "text-gray-400"
                  }`}
                >
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {comment.uid === user.uid && (
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-700 shadow">
                    <img src={comment.photoURL} alt="avatar" />
                  </div>
                  <span className="text-[10px] text-blue-300 mt-1">
                    {comment.displayName}
                  </span>
                </div>
              )}
            </div>
          );
        })}
    </>
  );
}

export default TaskUI;
