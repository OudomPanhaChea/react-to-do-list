import React, {useState} from "react";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    setTasks(task => [...task, newTask]);
    setNewTask('');
  }

  function deleteTask(index) {
    setTasks(tasks.filter((_, i) => i!==index));
  }

  function moveTaskUp(index) {
    if(index > 0) {
      const moveTaskUp = [...tasks];
      [moveTaskUp[index], moveTaskUp[index-1]] = [moveTaskUp[index-1], moveTaskUp[index]];
      setTasks(moveTaskUp);
    }
  }

  function moveTaskDown(index) {
    if(index < tasks.length-1) {
      const moveTaskDown = [...tasks];
      [moveTaskDown[index], moveTaskDown[index+1]] = [moveTaskDown[index+1], moveTaskDown[index]];
      setTasks(moveTaskDown);
    }
  }

  const btn = "px-4 py-2 rounded-lg font-semibold shadow-sm transition-all";

  return(
    <div className="flex flex-col items-center space-y-4 w-full">
      <h1 className="text-4xl font-bold bg-blue-300 px-10 py-2 rounded-md text-blue-50 shadow-sm">To Do List</h1>

      <div className="space-x-2">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={(key) => {if(key.key === 'Enter') {addTask()}}}
          className="bg-slate-200 py-2 px-4 rounded-lg outline-none shadow-sm"
        />
        <button
          className={`${btn} bg-blue-300 text-blue-50 hover:bg-blue-400`}
          onClick={addTask}
        >
          add
        </button>
      </div>

      <ol className="min-w-[400px] w-[100%] flex flex-col items-center">
        {tasks.map((task, index) => 
          <li 
            className="flex justify-between items-center w-[calc(100%/2)] px-4 py-1 cursor-default hover:bg-blue-100 transition-all rounded-md"
            key={index}
          >
            <span>
              {index+1+`. `} {task}
            </span>
            <div className="space-x-1">
              <button 
                className={`${btn} bg-red-400 text-red-50 hover:bg-red-500`}
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
              <button 
                className={`${btn} bg-green-400 text-green-50 hover:bg-green-500`}
                onClick={() => moveTaskUp(index)}
              >
                Up
              </button>
              <button 
                className={`${btn} bg-yellow-400 text-yellow-50 hover:bg-yellow-500`}
                onClick={() => moveTaskDown(index)}
              >
                Down
              </button>
            </div>
          </li>
        )}
      </ol>
    </div>
  );
}

export default ToDoList;