import React, { useState } from "react";

function Todoform({ item }) {
  const [dataitem, setDataItem] = useState("");

  const submitfncn = async (e) => {
    e.preventDefault();
    item(dataitem);
    setDataItem("");
    const token = localStorage.getItem("token");

    const response = await fetch("https://to-do-xnc4.onrender.com/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ todo_task: dataitem }),
    });

    const data = await response.json();
    console.log(data);
  };
  return (
    <form onSubmit={submitfncn}>
      <h1
        className=" text-white block 
        font-bold text-3xl mb-4 m-2"
      >
        Manage your Todo's
      </h1>
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Enter your task.."
          className=" p-2 m-2 rounded-lg"
          value={dataitem}
          onChange={(e) => {
            setDataItem(e.target.value);
          }}
        />{" "}
        <button
          type="submit"
          className="bg-blue-400
         text-white rounded-lg cursor-pointer 
         w-20 hover:bg-green-400 hover:text-black p-1 m-2 "
        >
          AddTask
        </button>
      </div>
    </form>
  );
}

export default Todoform;
