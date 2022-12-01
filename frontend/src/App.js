import "./App.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Todo from "./components/Todo";
import EditModal from "./components/EditModal";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const location = useLocation();
  const [name, setName] = useState("");
  const [modal, setModal] = useState(false);
  const [modalId, setModalId] = useState("");
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const pathname = location.pathname;
  const id = pathname.slice(6, pathname.length);

  const fetchData = () => {
    const url = `http://localhost:5000/todo/${id}`;
    axios
      .get(url)
      .then((response) => {
        const username = response.data.name;
        const todoItems = response.data.todos;
        setTodoList(todoItems);
        setName(username);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      {modal && (
        <div className="absolute w-[100vw] h-[100vh] flex items-center justify-center bg-slate-700/60 z-10">
          <EditModal
            setModal={setModal}
            modalId={modalId}
            paramId={id}
            fetchData={fetchData}
          />
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/todo/:id"
          element={
            <Todo
              setModal={setModal}
              setModalId={setModalId}
              paramId={id}
              fetchData={fetchData}
              todo={todo}
              setTodo={setTodo}
              todoList={todoList}
              name={name}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;