import React,{useState} from "react";
import './App.css'
function App(){
  const [todos,setTodos]=useState([{text:"Update Resume",completed:false },
    {text:"Complete React Exercises",completed:false }]);
  const [newTodo,setNewTodo]=useState("");
  const [editIndex,setEditIndex]=useState(-1);
  const [editText,setEditText]=useState("");
  const addTodo=()=>{
    if(newTodo.trim()!==""){
      setTodos([...todos,{text:newTodo,completed:false}]);
      setNewTodo("");
    }
  };
  const deleteTodo=(index)=>{
    const updatedTodos=todos.filter((_,i)=>i!=index);
    setTodos(updatedTodos);
  };
  const startEditing=(index)=>{
    setEditIndex(index);
    setEditText(todos[index].text);
  };
  const saveEdit=()=>{
    const updatedTodos=todos.map((todo,index)=>
      index===editIndex?{...todo,text:editText}:todo
    );
    setTodos(updatedTodos);
    setEditIndex(-1);
    setEditText("");
  };
  const toggleTodoCompletion=(index)=>{
    const updatedTodos=todos.map((todo,i)=>
      i===index?{...todo,completed:!todo.completed}:todo
    );
    setTodos(updatedTodos);
  };
  return (
    <div className="App">
      <ul className="todo-list">
      <h3>My Todo List</h3>
        {todos.map((todo,index)=>(
          <li key={index}>
            <input type="checkbox" className="check"checked={todo.completed} onChange={()=>toggleTodoCompletion(index)}/>
            {editIndex===index?(
              <>
              <input type="text" value={editText} onChange={(e)=>setEditText(e.target.value)}/>
              <button onClick={saveEdit}>Save</button>
              </>
            ):(
              <>
              <span style={{textDecoration:todo.completed?"line-through":"none"}}>
                {todo.text}
              </span>
              <button onClick={()=>startEditing(index)}>Edit</button>
              <button onClick={()=>deleteTodo(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      <div className="input-container">
        <input type="text" placeholder="Add a new Todo" value={newTodo} onChange={(e)=>setNewTodo(e.target.value)}/>
        <button onClick={addTodo}>Add</button>
      </div>
      </ul>
    </div>
  );
}
export default App;