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
  };
  console.log(data);
  if (!data) {
    return (
      <h1 className="text-center text-error text-3xl mt-30 ">Loading...</h1>
    );
  }
  return (
    <div>
      <h1>Task - {data.name}</h1>

      <form onSubmit={hendleSubmit} className="flex gap-3 mt-5">
        <input
          className="input"
          type="text"
          placeholder="add comment"
          name="comment"
        />
        <button className="btn">Add</button>
      </form>
      <div>
        {data.comments.length == 0 ? (
          "No comments"
        ) : (
          <div>
            {data.comments.map((comment) => {
              return (
                <div key={comment.id} className="flex gap-2">
                  <span>{comment.displayName}</span>
                  <img src={comment.photoURL} alt="" width={20} height="20" />
                  <span className="text-success">{comment.text}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Task;
