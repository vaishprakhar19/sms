import React, { useState, useEffect, useCallback } from "react";
import "./todo.css";
import Forms from "./todo/Form";
import TodoList from "./todo/TodoList";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import BackHandler from "../components/BackHandler";

function Todo() {
  BackHandler();
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

  //filterHandler
  const filterHandler = useCallback(() => {
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
  },[status,todos]);

  useEffect(() => {
    filterHandler(); // Filter todos based on status
    localStorage.setItem('todos', JSON.stringify(todos)); // Update local storage with filtered todos
  }, [todos, status, filterHandler]);

  return (
    <div className="Todo">

      <div className="Todo-header page-header">
      <Link to="/dashboard">
        <h2>Todo List</h2>
        </Link>
        
        </div>

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
      <Navbar />
    </div>
  );
}

export default Todo;
