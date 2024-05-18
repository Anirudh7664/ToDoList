import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ToDoProvider } from './Contexts'
import { useEffect } from 'react'
import TodoForm from './Components/ToDoForm'
import  ToDoList  from './Components/ToDoList'

function App() {
  const [todos, setTodos] = useState([])


  const addTodo = (todo) => {
    //using prev here signifies that all the previous values which the todos contained  will be passed to this function as an argument
    // and "todo" that we want would be added in this new array
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter(val => val.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) =>
    prevTodo.id === id ?
      {
        ...prevTodo, completed:
          !prevTodo.completed
      } : prevTodo))
  }

  //this function runs when site is loaded for the first time, 
  //it gets all the todos from local storage and display them
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if(todos && todos.length>0){
      setTodos(todos);
    }
  }, [])



  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos));
    
  }, [todos]) 
  

  
  

  return (
    <ToDoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-green-400">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm/>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo)=>(
              <div key={todo.id} className='w-full'>
                <ToDoList todo={todo}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToDoProvider>
  )
}

export default App
