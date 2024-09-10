import React,{useState} from 'react'

function EditTodoForm({editTask,tasks}) {
    const [dataitem, setDataItem] = useState(tasks.tasks);

    const submitfncn =async (e) => {
      e.preventDefault();
      editTask(dataitem,tasks.id)


      const token = localStorage.getItem("token");
      const response = await fetch(`https://to-do-list-tor6.onrender.com/todos/${tasks.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({todo_task: dataitem}),
      });
      if(response.ok){
        console.log("Haha Edit")
      }
    };

    return (
      <form onSubmit={submitfncn}>
        <h1
          className=" text-white block 
        font-bold text-3xl mb-4 m-2
          "
        >
          Edit your Todo
        </h1>
        <div>
          <input
            type="text"
            placeholder="Edit Task.."
            className=" p-2 m-2 rounded-lg"
            value={dataitem}
            onChange={(e) => {
              setDataItem(e.target.value);
            }}
          />{" "}
          <button type="submit"
            className="bg-blue-400
         text-white rounded-lg cursor-pointer 
         w-20 hover:bg-green-400 hover:text-black p-1 m-2 "
          >
            Edit Task
          </button>
        </div>
      </form>
    )
}

export default EditTodoForm