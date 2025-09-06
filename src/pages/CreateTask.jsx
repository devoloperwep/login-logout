import { addDoc, collection, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    const task = {
      name,
      description,
      dueTo,
      selectUsers,
      comments: [],
    };

    await addDoc(collection(db, "tasks"), {
      ...task,
    }).then(() => {
      alert("Qo'shildi !!!");
      navigate("/");
    });

    console.log(task);
  };

  return (
    <>
      <form onSubmit={hendleSubmit} className="w-xl">
        <FormInput label="Title: " name="title" type="text" />
        <FormTextArea label="Description: " name="description" />
        <FormInput label="Due to:" name="due-to" type="date" />

        <Select
          isMulti
          name="Users"
          options={userOptions}
          className="basic-multi-select mt-5"
          classNamePrefix="select"
          placeholder="Userlarni tanlang..."
          onChange={(selected) => setSelectUsers(selected)}
          formatOptionLabel={(option) => (
            <div className="flex items-center gap-2">
              <span>{option.label}</span>
            </div>
          )}
        />
        <button className="btn w-full mt-5">Create Task</button>
      </form>
    </>
  );
}

export default CreateTask;
