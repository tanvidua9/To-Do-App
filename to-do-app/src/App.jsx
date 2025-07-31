import React, { useState, useEffect, useCallback, useMemo } from "react";
import Navbar from "./components/Navbar";
import Tasks from "./components/Tasks";
import CompletedTasks from "./components/CompletedTasks";
import Refresh from "./components/Refresh";
import { sampleTasks, sampleTasksDone } from './SampleData';

function App() {
  const savedTodos = JSON.parse(localStorage.getItem("To-do") ||JSON.stringify(sampleTasks));
  const savedCompleted =  JSON.parse(localStorage.getItem("completed") ||JSON.stringify(sampleTasksDone));

  const [todos, setTodos] = useState(savedTodos);
  const [completedTodos, setCompletedTodos] = useState(savedCompleted);

  useEffect(() => {
    localStorage.setItem("To-do", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("completed", JSON.stringify(completedTodos));
  }, [completedTodos]);

  const addTodo = (text) => {
    if (text.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        text: text,
        done: false
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }
  };

 
  const completeTodo = (index) => {
    const completed = todos[index];
    const remainingTodos = todos.filter((todo,i) => i !== index);
    setTodos(remainingTodos);
    setCompletedTodos(prev => {
      const updatedCompleted = [...prev, completed];
      localStorage.setItem("completedTodos", JSON.stringify(updatedCompleted));
      return updatedCompleted;
    });

    localStorage.setItem("todos", JSON.stringify(remainingTodos));
  };


   const handleRefresh = () => {
     const completedIds = sampleTasksDone.map(task => task.id);
    const remainingTodos = todos.filter(todo => !completedIds.includes(todo.id));

    setTodos(remainingTodos);
    setCompletedTodos(sampleTasksDone);

    localStorage.setItem("To-do", JSON.stringify(remainingTodos));
    localStorage.setItem("completed", JSON.stringify(sampleTasksDone));
  };

  const restoreTodo = (index) => {
    const restored = completedTodos[index];
    const remainingCompleted = completedTodos.filter((todo, i) => i !== index);

    setCompletedTodos(remainingCompleted);
    setTodos(prev => [...prev, restored]);

    localStorage.setItem("completed", JSON.stringify(remainingCompleted));
    localStorage.setItem("To-do", JSON.stringify([...todos, restored]));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex flex-col px-4 sm:px-10 md:px-20 pt-6 pb-20 gap-6 flex-1">
        <Refresh handleRefresh={handleRefresh}/>
        <Tasks todos={todos} addTodo={addTodo} completeTodo={completeTodo} />
        <CompletedTasks completedTodos={completedTodos} restoreTodo={restoreTodo} />
      </main>
    </div>
  );
}

export default App;
