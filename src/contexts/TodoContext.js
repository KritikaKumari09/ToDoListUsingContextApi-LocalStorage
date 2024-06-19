import {createContext, useContext} from 'react'


// in below we can pass default  value also in createContext() . in project 8th we did not but in this we pass an object with 1 prperty todo that will accept and array of object
// in 9 th project our property was themeMode which accepted string value but here todo property accepts array of object and we have set its 1 default value
// and while declaraing method of the object which we pass as its default value we dont set functionality , we just use arrow notation to indicate that it is a method 
// most of the time in context api above way is only done i.e. method functionality not written but there can be other way also
export const TodoContext = createContext({
    todos: [{
        id:1,
        todo: "todo mssg",
        completed:false,
    }
],
// while declaring methods below we dont write functionality 
addTodo : (todo)=> {},
updatedTodo:(id, todo) =>{},
// since 2 update we need 2 things one its id and other the string stored in todo variable
deleteTodo:(id)=>{},
toggleComplete:(id)=>{}
}) 

// custom hook
export const useTodo = () =>{
    return useContext(TodoContext)
    // whenever we use useContext we need to give it context i.e. about what we are talking 
}


export const TodoProvider= TodoContext.Provider