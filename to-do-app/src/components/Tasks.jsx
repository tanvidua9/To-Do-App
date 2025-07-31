import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";


function Tasks({ todos, addTodo, completeTodo, removeTodo}) {
    const [createTodo, setCreateTodo]= useState(false);
    const [inputValue, setInputValue] = useState("");

    const handleAddTodo=()=>{
        setCreateTodo(true);
    }

    const handleCancelTodo=()=>{
        setCreateTodo(false);
        setInputValue("");
    }

    const handleInputChange=(event)=>{
        setInputValue(event.target.value);
    }

    const handleSaveTodo = () => {
        addTodo(inputValue);
        setInputValue("");
        setCreateTodo(false);
    };

  
  return (
    <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Things to do</h2>

        <div className="flex flex-col gap-2">
            {todos.map((todo,index)=>(
                <div key={index} className="flex items-center gap-2">
                    <input type="checkbox" onChange={() => completeTodo(index)}/>
                    <span>{todo.text}</span>
                    <button onClick={()=>removeTodo(todo.id)} className="text-yellow-600 text-xl "><FaTimes /></button>
                </div>
            ))}
        </div>

       {!createTodo && (
            <button
            className=" w-fit bg-yellow-600 px-4 py-2 rounded-lg text-white"
            onClick={handleAddTodo}
            >
            + Add a Todo
            </button>
        )}
        

        {createTodo && (
        <div className="rounded-lg p-4 shadow-md bg-white w-full max-w-md">
          <h3 className="font-semibold mb-2">Create a todo</h3>
          <input
            value={inputValue}
            className="border-2 border-yellow-600 rounded p-2 w-full mb-3"
            onChange={handleInputChange}
            placeholder="Write an article about XState"
          />
          <div className="flex gap-2">
            <button onClick={handleSaveTodo}className="bg-yellow-600 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded">
              Save
            </button>
            <button
              className="bg-white border border-gray-300 text-black px-4 py-2 rounded"
              onClick={handleCancelTodo}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Tasks;
