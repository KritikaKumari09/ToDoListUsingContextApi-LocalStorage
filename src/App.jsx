import { useState , useEffect} from 'react'
import { TodoProvider } from './contexts' 
import './App.css'
import { TodoForm, TodoItem } from './components'

function App() {
  const [todos , setTodos]= useState([])
// default value is an empty array , we dont set null or we may get an error

// // we created below  mehtods with same name. as in TodoContext.js now functionaliyt will be atuomatically added to those methods
// in TodoContext.js we just written method name and not theri functionality
// keep in mind having same name is imp or elese functionlaity will not be added
const addTodo =(todo) =>{
  setTodos((prev)=> [{id:Date.now(),...todo},...prev])
}
// The setTodos function is called with a callback function that receives the previous state (prev).
// The callback function creates a new array where the new todo (augmented with a unique id created using Date.now()) is added at the beginning of the previous todos array.
// ...todo is spreading the properties of the todo object into the new object being created.
// For example, if todo is { text: 'New Todo Item', completed: false }, then { ...todo } will expand to { text: 'New Todo Item', completed: false }.

const updatedTodo = (id , todo) =>{
  setTodos((prev)=> prev.map((prevTodo)=>(prevTodo.id===id? todo : prevTodo)))
}

const deleteTodo = (id) =>{
  setTodos((prev)=> prev.filter((todo)=> todo.id !== id))
  
  // The expression (prev) => prev.filter((todo) => todo.id !== id) is used to create a new state array by removing the todo item with the specified id, 
  // thereby updating the state in an immutable way, which is a common practice in React to ensure predictable and efficient state updates.
//   The filter function checks each todo:
// todo.id === 1 -> included (1 !== 2)
// todo.id === 2 -> excluded (2 !== 2)
// todo.id === 3 -> included (3 !== 2)

}

const toggleComplete =(id) =>{
  setTodos((prev) => prev.map((prevTodo) => prevTodo.id=== id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo))
  // before : statement accccessed when cond.n is true and aftter it when cond.n is false
  // The spread operator ... is used to create a shallow copy of the properties from the prevTodo object.
  // After spreading the properties, completed: !prevTodo.completed overrides the existing completed property in the new object.
  // !prevTodo.completed negates the current value of prevTodo.completed, effectively toggling it from true to false or from false to true.

  // setTodo has a callback function through which it has access to previous state(here we denote it using prev variable)
}

// ()=>{} vs ()=>() vs ()=> arrow method differences
// in last 2 two things are implicitly returned without using return keyword. its used when we have simply return values
// for returning in 1st method we need to explicitly use return keyword

useEffect(()=>{
  const todos=JSON.parse(localStorage.getItem("todos"))
  // by default we get string from local storage therefore we convert it into json since it is an array and only json can preserve its type and not string
  // since json can be both object or an array
  if(todos && todos.length > 0){
    // the above checks whether todos exist or not and whether its length>0 or not  
    // we check length because above we have already declared null array therefore it means array exist in that case its important to check length
    setTodos(todos)
  }
}, [])
// above code to bring todos from local storage in first render 

useEffect(() => {
  localStorage.setItem("todos",JSON.stringify(todos))
}  , [todos])
// since key and value in setItem is string we use stringify func to convert json to string 
// setItem(key , value)
// above code to set items in todos list to local storage



  return (
   <TodoProvider value ={{todos , addTodo,updatedTodo,deleteTodo,toggleComplete}}>
{/* the values whose access we have  . in below whatever components we will have between opening and closing tag of context provider
// will have access to above valus that we got through destructuring the context object 
        {/* we are basically destruturing the prop and method that we want from the context object */}


  <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo)=>(
                          <div key={todo.id}
                          className='w-full'>
                            {/* key used to tell react that for different todo we have different div
                            sinve its a loop and for all individual todo this div will be called therefore we are using this key to differentiate 2 div of different todo  */}
                            {/*  programmers advice to avoid index and prefer to use id whhch we have created
                             or id which we get from database. but if no other option then we use key but for performance point of view id preferred   */}
                             <TodoItem todo={ todo}/> 
                          </div>
                        ))}
                    </div>
                </div>
            </div>
   </TodoProvider>
  )
}

export default App
