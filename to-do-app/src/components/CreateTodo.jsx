import React,{useState} from "react";

function CreateTodoForm({addTodo, onCancel}){
     const [inputValue, setInputValue] = useState("");

     const handleInputChange=(event)=>{
        setInputValue(event.target.value);
    }

    const handleSaveTodo = () => {
        addTodo(inputValue);
        setInputValue("");
        setCreateTodo(false);
    };

   function handleCancelTodo() {
        setInputValue("");
        onCancel(); 
    }


    return (
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
            <button className="bg-white border border-gray-300 text-black px-4 py-2 rounded" onClick={handleCancelTodo}>
              Cancel
            </button>
          </div>
        </div>
    )
}

export default CreateTodoForm;