import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleComplete, deleteTodo, editTodo, setFilter } from "./todoSlice";

const Todo = () => {
  const [text, setText] = useState("");
  const [deadline, setDeadline] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editDeadline, setEditDeadline] = useState("");
  const todos = useSelector((state) => state.todos.todos);
  const filter = useSelector((state) => state.todos.filter);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  const handleAddTodo = () => {
    if (text.trim() && deadline) {
      dispatch(addTodo({ text, deadline }));
      setText("");
      setDeadline("");
    }
  };

  const handleToggleComplete = (id) => {
    dispatch(toggleComplete(id));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEditTodo = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
    setEditDeadline(todo.deadline || "");
  };

  const handleSaveEdit = (id) => {
    if (editText.trim() && editDeadline) {
      dispatch(editTodo({ id, text: editText, deadline: editDeadline }));
      setEditingId(null);
      setEditText("");
      setEditDeadline("");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
    setEditDeadline("");
  };

  const handleFilterChange = (filter) => {
    dispatch(setFilter(filter));
  };

  const getDeadlineColor = (deadline) => {
    if (!deadline) return "text-muted";
    const currentDate = new Date();
    const deadlineDate = new Date(deadline);
    if (isNaN(deadlineDate.getTime())) return "text-muted";
    const timeDiff = deadlineDate - currentDate;
    const oneDay = 24 * 60 * 60 * 1000;

    if (timeDiff < 0) {
      return "text-danger";
    } else if (timeDiff > oneDay) {
      return "text-success";
    } else {
      return "text-warning";
    }
  };

  const getTodosToShow = () => {
    if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    }
    if (filter === "active") {
      return todos.filter((todo) => !todo.completed);
    }
    return todos;
  };

  const groupByDate = (todos) => {
    return todos.reduce((acc, todo) => {
      const date = todo.deadline
        ? new Date(todo.deadline).toLocaleDateString()
        : "Без даты";
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(todo);
      return acc;
    }, {});
  };

  const groupedTodos = groupByDate(getTodosToShow());

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center p-4">
      <div className="container">
        <div className="card shadow-lg p-4" style={{ maxWidth: "800px", margin: "0 auto" }}>
          {/* Заголовок */}
          <h1 className="text-center text-primary mb-4">Список дел</h1>

          {/* Форма добавления */}
          <div className="d-flex flex-column flex-md-row gap-2 mb-4">
            <input
              type="text"
              value={text}
              onChange={handleInputChange}
              placeholder="Новое дело"
              className="form-control"
            />
            <input
              type="datetime-local"
              value={deadline}
              onChange={handleDeadlineChange}
              className="form-control"
            />
            <button
              onClick={handleAddTodo}
              className="btn btn-primary"
              disabled={!text.trim() || !deadline}
              data-bs-toggle="tooltip"
              title="Добавить новое дело"
            >
              <i className="bi bi-plus-circle me-1"></i> Добавить
            </button>
          </div>

          {/* Фильтры */}
          <div className="btn-group mb-4">
            <button
              onClick={() => handleFilterChange("all")}
              className={`btn ${filter === "all" ? "btn-primary" : "btn-outline-primary"}`}
            >
              Все
            </button>
            <button
              onClick={() => handleFilterChange("active")}
              className={`btn ${filter === "active" ? "btn-primary" : "btn-outline-primary"}`}
            >
              Активные
            </button>
            <button
              onClick={() => handleFilterChange("completed")}
              className={`btn ${filter === "completed" ? "btn-primary" : "btn-outline-primary"}`}
            >
              Завершенные
            </button>
          </div>

          {/* Список дел */}
          <div>
            {Object.entries(groupedTodos).map(([date, todos]) => (
              <div key={date} className="mb-4">
                <h3 className="text-secondary">{date}</h3>
                <ul className="list-group">
                  {todos.map((todo) => (
                    <li
                      key={todo.id}
                      className="list-group-item d-flex align-items-center gap-3"
                      style={{ transition: "background-color 0.3s" }}
                    >
                      {editingId === todo.id ? (
                        <>
                          <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="form-control me-2"
                          />
                          <input
                            type="datetime-local"
                            value={editDeadline}
                            onChange={(e) => setEditDeadline(e.target.value)}
                            className="form-control me-2"
                          />
                          <button
                            onClick={() => handleSaveEdit(todo.id)}
                            className="btn btn-success btn-sm"
                            disabled={!editText.trim() || !editDeadline}
                            data-bs-toggle="tooltip"
                            title="Сохранить изменения"
                          >
                            <i className="bi bi-check-circle"></i>
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="btn btn-secondary btn-sm"
                            data-bs-toggle="tooltip"
                            title="Отменить"
                          >
                            <i className="bi bi-x-circle"></i>
                          </button>
                        </>
                      ) : (
                        <>
                          <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleToggleComplete(todo.id)}
                            className="form-check-input"
                          />
                          <span
                            style={{
                              textDecoration: todo.completed ? "line-through" : "none",
                              flex: 1,
                            }}
                          >
                            {todo.text}
                          </span>
                          {!todo.completed && (
                            <span className={getDeadlineColor(todo.deadline)}>
                              {todo.deadline
                                ? new Date(todo.deadline).toLocaleString()
                                : "Без дедлайна"}
                            </span>
                          )}
                          {todo.completed && todo.completedDate && (
                            <span className="text-muted">
                              Завершено: {new Date(todo.completedDate).toLocaleString()}
                            </span>
                          )}
                          <button
                            onClick={() => handleEditTodo(todo)}
                            className="btn btn-outline-warning btn-sm me-2"
                            data-bs-toggle="tooltip"
                            title="Редактировать"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            onClick={() => handleDeleteTodo(todo.id)}
                            className="btn btn-outline-danger btn-sm"
                            data-bs-toggle="tooltip"
                            title="Удалить"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;