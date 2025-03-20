import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import './style.css'
function Todo() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='todoapp'>
        <h1>
            Todo
        </h1>
        <h2>
            {count}
        </h2>
        <button onClick={()=>setCount(count+1)}>
                increase
        </button>
        <button onClick={()=>setCount(count-1)}>
                decrease
        </button>

    </div>
    </>
  )
}

//export default Todo
