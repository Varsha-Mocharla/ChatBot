import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
//import './style.css'
function Todo() {
  const [myTodo, setMyTodo] = useState([])
  const [inp,setInp]=useState([])
  useEffect(()=>{
    console.log(inp);
  },[inp])
  const handleSubmit=(e)=>{
    e.preventDefault()
    setMyTodo([inp, ...myTodo])// ... to get last entered value
    console.log(myTodo);
  }
  return (
    <>
    <div className='todoApp'>
        <h1>
            Todo App
        </h1>
        <form action="#" onSubmit={handleSubmit}>
            <input type='text' onChange={(e)=>setInp(e.target.value)}></input>
            <button>
                Submit
            </button>
        </form>
    </div>
    </>
  )
}

export default Todo