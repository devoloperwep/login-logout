import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Select from "react-select";
import FormInput from "../components/FormInput";
import FormTextArea from "../components/FormTextArea";
import { db } from "../firebase/config";
import { useCollection } from "../hooks/useCollection";

function CreateTask() {
  const { data } = useCollection("users");
  const [userOptions, setUserOptions] = useState(null);
  const [selectUsers, setSelectUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const users = data?.map((user) => {
      return {
        value: user.displayName,
        label: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
      };
    });
    setUserOptions(users);
  }, [data]);

  const hendleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("title");
    const description = formData.get("description");
    const dueTo = formData.get("due-to");

    if (name.trim() && description.trim() && dueTo.trim()) {
      const task = {
        name,
        description,
        dueTo,
        selectUsers,
        comments: [],
        timestamp: serverTimestamp(),
      };

      await addDoc(collection(db, "tasks"), {
        ...task,
      }).then(() => {
        alert("Qo'shildi !!!");
        navigate("/");
      });
    } else {
      alert("Formani to'ldiring!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-5 flex-col gap-1">
      <Link
        to="/"
        className="inline-block rounded-lg border border-blue-600 px-5 py-2 text-sm font-medium text-blue-600 hover:bg-blue-600 hover:text-white transition"
      >
        Home
      </Link>

      <form
        onSubmit={hendleSubmit}
        className="w-full max-w-xl bg-white/60 backdrop-blur-lg rounded-2xl shadow-lg p-8 flex flex-col gap-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">
          ✨ Create New Task
        </h2>

        <FormInput label="Title:" name="title" type="text" />
        <FormTextArea label="Description:" name="description" />
        <FormInput label="Due to:" name="due-to" type="date" />

        <Select
          isMulti
          name="Users"
          options={userOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Userlarni tanlang..."
          onChange={(selected) => setSelectUsers(selected)}
          formatOptionLabel={(option) => (
            <div className="flex items-center gap-2">
              <img
                src={option.photoURL}
                alt={option.label}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-gray-700">{option.label}</span>
            </div>
          )}
        />

        <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold text-lg py-3 rounded-xl shadow transition cursor-pointer">
          Create Task 🚀
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
