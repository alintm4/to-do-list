import React from "react";

function Todo({ tasks, deleteTask, editTask, taskCompleted }) {


  return (
    <>
      <div
        className=" bg-black w-full text-white
         text-xl mt-4 rounded-lg
        "
      >
        <div className="flex">
          <p
            className={`cursor-pointer ${
              tasks.completed
                ? "text-purple-300 line-through" 
                : "text-white" 
            } p-1`}
            onClick={() => taskCompleted(tasks.id)}
          >
            {tasks.tasks}
          </p>

          <div className="ml-auto">
            <button
            className="p-1"
              type="submit"
              onClick={() => {
                editTask(tasks.id);
              }}
            >
              {"✏️"}
            </button>
            <button
            className="p-1"
              type="submit"
              onClick={() => {
                deleteTask(tasks.id);
              }}
            >
              {"🗑️"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
