import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { use } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import TaskUI from "../components/TaskUI";
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
      <Link
        to="/"
        className="inline-block rounded-lg border border-blue-600 px-5 py-2 text-sm font-medium text-white  hover:bg-blue-600   transition"
      >
        Home
      </Link>
      <h1 className="text-2xl font-bold mb-6 text-center">
        Chat – <span className="text-blue-400">{data.name}</span>
      </h1>
      <div className="space-y-4">
        {data.comments.length === 0 ? (
          <p className="text-center text-gray-500">No comments yet</p>
        ) : (
          <TaskUI data={data} user={user} />
        )}
      </div>
      <form
        onSubmit={hendleSubmit}
        className="flex gap-3 mb-6 mt-10 sticky bottom-5"
      >
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
    </div>
  );
}

export default Task;
