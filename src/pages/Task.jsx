import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import TaskUI from "../components/TaskUI";
import { db } from "../firebase/config";
import useDocument from "../hooks/useDocument";
import { v4 as uuidv4 } from "uuid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Task() {
  const { id } = useParams();
  const { data } = useDocument("tasks", id);
  const { user } = useSelector((store) => store.user);

  const messagesEndRef = useRef(null);

  // scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data?.comments]);

  // scroll to top button state
  const [showTopBtn, setShowTopBtn] = useState(false);

  // show button when scroll down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const comment = formData.get("comment");

    if (comment.trim()) {
      const newComment = {
        text: comment,
        uid: user.uid,
        id: uuidv4(),
        photoURL: user.photoURL,
        displayName: user.displayName,
        createdAt: new Date(),
      };

      try {
        const commentRef = doc(db, "tasks", data.id);
        await updateDoc(commentRef, {
          comments: [...data.comments, newComment],
        });
        e.target.reset();
      } catch (error) {
        toast.error("❌ Failed to send!", { position: "bottom-right" });
      }
    } else {
      toast.warn("⚠️ Write something!", { position: "bottom-right" });
    }
  };

  if (!data) {
    return (
      <h1 className="text-center text-error text-3xl mt-30">Loading...</h1>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-2 text-sm font-semibold text-white shadow-md hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Home
        </Link>

        <h1 className="text-2xl font-bold text-center flex-1">
          Chat – <span className="text-blue-400">{data.name}</span>
        </h1>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {data.comments.length === 0 ? (
          <p className="text-center text-gray-500">No comments yet</p>
        ) : (
          <>
            <TaskUI data={data} user={user} />
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex gap-3 mt-6 sticky bottom-0 bg-gray-900 py-3"
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

      {/* Scroll To Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 left-6 bg-white/10 backdrop-blur-md border border-white/20 
                     hover:bg-white/20 text-white p-3 rounded-full shadow-lg transition 
                     active:scale-95 flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default Task;
