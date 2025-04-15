import React, { useState, useEffect } from 'react'
import { v4 as uuidv4} from 'uuid'

const completedStyle = {
    textDecoration: 'line-through',
    color: 'gray'
};

const ToDoList = () => {

    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem("tasks");
        return storedTasks ? JSON.parse(storedTasks) : [];
    });
    const [title, setTitle] = useState(""); 


    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])

    const addTask = () => {
        if (title.trim() === "") return;
        setTasks([...tasks, {id: uuidv4(), title, completed:false}])
        setTitle('')
    }

    const markTask = (id) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === id) {
                return { ...task, completed: !task.completed }; // create a new object
            }
            return task
        })

        setTasks(updatedTasks)
    }

    return (
        
        <>
            <div className='row'>
                <ul className="list-group">
                    {
                        tasks.length >0 ? tasks.map((task, index) => (
                            <li key={task.id} className={`list-group-item`}>
                                <input 
                                className="form-check-input me-1" 
                                type="checkbox" 
                                onChange={() => markTask(task.id)} 
                                checked={task.completed} 
                                id={`task-${index}`}></input>
                                <label 
                                className="form-check-label" 
                                htmlFor={`task-${index}`}
                                style={task.completed?completedStyle:{}}
                                >{task.title}</label>
                            </li>
                        )) : <li className="list-group-item">No Tasks</li>
                    }
                </ul>
            </div>
            <hr />
            <form className="row g-3" onSubmit={(e) => e.preventDefault()}>
                <div className="col-md-6">
                    <label htmlFor="title" className="form-label">Enter Task Title</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    name='title' 
                    id="title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value) } 
                    placeholder="Task Title Here" 
                    />
                </div>
                <div className="col-12">
                    <button type="button" className="btn btn-primary" onClick={() => addTask()}>Add</button>
                </div>
            </form>
        </>
    )
}

export default ToDoList