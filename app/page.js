"use client";
import React, { useState, useEffect } from "react";

const page = () => {
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [mainTask, setMainTask] = useState([]);

  useEffect(() => {
    const savedTask = JSON.parse(localStorage.getItem("task")) || [];
    setMainTask(savedTask);
  }, []);

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(mainTask));
  }, [mainTask]);

  const deleteHandler = (i) => {
    let copytask = [...mainTask];
    copytask.splice(i, 1);
    setMainTask(copytask);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setMainTask([...mainTask, { id: Date.now(), title, desc }]);
    settitle("");
    setdesc("");
  };

  const [editingIndex, setEditingIndex] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const saveEdit = (index) => {
    const updatedTasks = [...mainTask];
    updatedTasks[index] = {
      ...updatedTasks[index],
      title: editTitle,
      desc: editDesc,
    };

    setMainTask(updatedTasks);
    setEditingIndex(null); // Exit edit mode
  };

  let rendertask = <h2>No task available</h2>;
  if (mainTask.length > 0) {
    rendertask = mainTask.map((t, index) => {
      return (
        <li key={index}>
          <div className="flex justify-between mb-5 w-2/3 p-4 bg-white rounded-lg shadow-md border border-gray-300">
            {editingIndex === index ? (
              <div>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="text-xl border-gray-300 border-2 px-2 py-1"
                />
                <textarea
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="text-xl border-gray-300 border-2 px-2 py-1 mt-2 resize-none leading-none"
                />
                <button
                  onClick={() => saveEdit(index)}
                  className="bg-green-500 text-white px-4 py-2 rounded-3xl hover:bg-green-600 active:scale-95"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingIndex(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-3xl hover:bg-gray-600 active:scale-95 ml-2"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <h5 className="text-2xl font-semibold">{t.title}</h5>
                <p className="text-xl text-gray-700">{t.desc}</p>
                <button
                  onClick={() => {
                    setEditingIndex(index);
                    setEditTitle(t.title);
                    setEditDesc(t.desc);
                  }}
                  className="bg-blue-500 text-white  px-4 py-2 rounded-3xl hover:bg-blue-600 active:scale-95"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteHandler(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-3xl hover:bg-red-600 active:scale-95"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </li>
      );
    });
  }
  return (
    <>
      <h1 className=" p-7 text-3xl bg-black text-white flex text-center font-bold">
        My Todolist
      </h1>
      <form onSubmit={submitHandler}>
        <div className="flex items-start space-x-4">
          <input
            type="text"
            className="text-xl border-zinc-800 border-2 m-5 px-4 py-2 w-1/3 h-12 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter Task here"
            value={title}
            onChange={(e) => {
              settitle(e.target.value);
            }}
          />
          <textarea
            type="text"
            className="text-xl border-zinc-800 border-2 m-5 px-4 py-2 h-12 w-1/3 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none leading-none"
            placeholder="Enter Discription here"
            value={desc}
            onChange={(e) => {
              setdesc(e.target.value);
            }}
          />
        </div>
        <button className="text-xl font-medium border-3 m-5 bg-slate-700 hover:bg-slate-800 text-white px-3 py-1 border-black border-2 rounded-2xl active:scale-95">
          Add Task
        </button>
      </form>
      <hr />
      <div className="p-5 bg-slate-200">
        <ul>{rendertask}</ul>
      </div>
    </>
  );
};

export default page;
