import React, { useState, useEffect } from "react";
import "./todo.css";
import Forms from "./todo/Form";
import TodoList from "./todo/TodoList";
import Navbar from "../components/Navbar";

function Todo() {
  //For input texts
  const [inputText, setInputText] = useState("");

  //For todos to render on UI
  const [todos, setTodos] = useState([]);

  //For filtering todos on UI
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
 
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos && storedTodos.length > 0) {
        setTodos(storedTodos);
    }
}, []);

useEffect(() => {
    filterHandler(); // Filter todos based on status
    localStorage.setItem('todos', JSON.stringify(todos)); // Update local storage with filtered todos
}, [todos, status]);



  //filterHandler
  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  return (
    <div className="Todo">

      <div className="Todo-header page-header"><h2>Todo List</h2></div>
     
     <div className="page-layout">
      <Forms
        inputText={inputText}
        setInputText={setInputText}
        todos={todos}
        setTodos={setTodos}
        setStatus={setStatus}
        />
      <TodoList
       
        filteredTodos={filteredTodos}
        todos={todos}
        setTodos={setTodos}
      />
        </div> 
      <Navbar></Navbar>
    </div>
  );
}

export default Todo;
