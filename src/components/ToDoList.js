import React, { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4} from 'uuid'

const completedStyle = {
    textDecoration: 'line-through',
    color: 'gray'
};

const ToDoList = () => {

    const inputRef = useRef();
    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem("tasks");
        return storedTasks ? JSON.parse(storedTasks) : [];
    });
    const [editId, setEditId] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [title, setTitle] = useState(""); 

    useEffect(() => {
        inputRef.current?.focus();
    }, [editId]);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])

    const handleAdd = () => {
        setTasks(prev => [...prev, { id: uuidv4(), title, completed: false }]);
    };
    
    const handleEdit = () => {
        const updatedTasks = tasks.map((task) =>
            task.id === editId ? { ...task, title } : task
        );
        setTasks(updatedTasks);
    };

    const addTask = () => {
        if (title.trim() === "") return;

        // setTasks([...tasks, {id: uuidv4(), title, completed:false}]) //below is the optimized version

        if(editId==="") handleAdd()
        else handleEdit()
        
        setTitle('')
        setEditId('')
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

    const filter = (type) => {
        setFilterType(type);
    };

    const getFilteredTasks = () => {
        switch (filterType) {
            case "completed":
                return tasks.filter(task => task.completed);
            case "pending":
                return tasks.filter(task => !task.completed);
            default:
                return tasks;
        }
    }

    const editTask = (task_id) => {
        setEditId(task_id)
        const editTask = tasks.filter((task) => task.id === task_id)
        setTitle(editTask[0].title);
    }

    const handleFilterChange = (type) => () => setFilterType(type);


    const filteredTasks = getFilteredTasks()

    return (
        
        <>
            <div className='row'>
                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" className="btn-check" name="btnradio" id="btnradio1" onChange={()=>filter('all')} autoComplete="off" checked={filterType==="all"} />
                    <label className="btn btn-outline-primary" htmlFor="btnradio1">All</label>

                    <input type="radio" className="btn-check" name="btnradio" id="btnradio2" onChange={()=>filter('completed')} autoComplete="off" checked={filterType==="completed"}/>
                    <label className="btn btn-outline-primary" htmlFor="btnradio2">Completed</label>

                    <input type="radio" className="btn-check" name="btnradio" id="btnradio3" onChange={()=>filter('pending')} autoComplete="off" checked={filterType==="pending"}/>
                    <label className="btn btn-outline-primary" htmlFor="btnradio3">Pending</label>
                </div>
                <ul className="list-group">
                    {
                        filteredTasks.length >0 ? filteredTasks.map((task, index) => (
                            <li key={task.id} className={`list-group-item d-flex justify-content-between align-items-start`}>
                                <div className='ms-2 me-auto'>
                                    <input 
                                    className="form-check-input me-1" 
                                    type="checkbox" 
                                    onChange={() => markTask(task.id)} 
                                    checked={task.completed} 
                                    id={`task-${task.id}`}></input>
                                    <label 
                                    className="form-check-label" 
                                    htmlFor={`task-${task.id}`}
                                    style={task.completed?completedStyle:{}}
                                    >{task.title}</label>
                                </div>
                                <span className="badge text-bg-primary rounded-pill" onClick={()=>editTask(task.id)}>
                                    Edit
                                </span>
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
                    ref={inputRef}
                    />
                </div>
                <div className="col-12">
                    <button type="button" className="btn btn-primary" onClick={() => addTask()}>{ editId!==""?"Edit":"Add" }</button>
                </div>
            </form>
        </>
    )
}

export default ToDoList