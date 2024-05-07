import React from "react";

const Forms = ({ inputText, setInputText, todos, setTodos, setStatus }) => {
  const inputHandler = (e) => {
    setInputText(e.target.value);
  };

  const buttonHandler = (e) => {
    e.preventDefault();
    setTodos([
      ...todos,
      {
        text: inputText,
        completed: false,
        id: Math.floor(Math.random() * 1000) + 1,
      },
    ]);
    //clearing the inputField when the is button clicked
    setInputText("");
  };

  //selectHandler

  const selectHandler = (e) => {
    //console.log(e.target.value)
    setStatus(e.target.value);
  };

  return (
    <form>
      <input
        type="text"
        className="todo-input"
        onChange={inputHandler}
        value={inputText}
      />
      <button onClick={buttonHandler} className="todo-button" type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-plus"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 5l0 14" />
          <path d="M5 12l14 0" />
        </svg>
      </button>
      <div className="select">
        <select onClick={selectHandler} name="todos" className="filter-todo">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </form>
  );
};

export default Forms;
