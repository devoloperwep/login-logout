import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { use } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { db } from "../firebase/config";
import useDocument from "../hooks/useDocument";

function Task() {
  const { id } = useParams();
  const { data } = useDocument("tasks", id);
  const { user } = useSelector((store) => store.user);

  const hendleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const comment = formData.get("comment");

    if (comment.trim()) {
      const newComment = {
        text: comment,
        uid: user.uid,
        id: Math.random(),
        photoURL: user.photoURL,
        displayName: user.displayName,
      };

      const commentRef = doc(db, "tasks", data.id);
      await updateDoc(commentRef, {
        comments: [...data.comments, newComment],
      });
      e.target.reset();
    } else {
      alert("Xabar kiriting!");
    }
  };
  console.log(data);
  if (!data) {
    return (
      <h1 className="text-center text-error text-3xl mt-30 ">Loading...</h1>
    );
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6 text-center">
        Task – <span className="text-blue-400">{data.name}</span>
      </h1>

      {/* Comment form */}
      <form onSubmit={hendleSubmit} className="flex gap-3 mb-6">
        <input
          className="flex-1 bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          type="text"
          placeholder="💬 Write a comment..."
          name="comment"
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition active:scale-95">
          Send
        </button>
      </form>

      {/* Comments */}
      <div className="space-y-4">
        {data.comments.length === 0 ? (
          <p className="text-center text-gray-500">No comments yet</p>
        ) : (
          data.comments.map((comment) => (
            <div
              key={comment.id}
              className={`flex items-end gap-2 ${
                comment.uid === user.uid ? "justify-end" : "justify-start"
              }`}
            >
              {/* Avatar (chap yoki o'ng tomonda) */}
              {comment.uid !== user.uid && (
                <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-700 shadow">
                  <img src={comment.photoURL} alt="avatar" />
                </div>
              )}

              {/* Chat bubble */}
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
                <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-700 shadow">
                  <img src={comment.photoURL} alt="avatar" />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Task;
