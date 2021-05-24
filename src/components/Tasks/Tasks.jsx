import axios from 'axios';
import React, {useState} from 'react';
import s from './Tasks.module.css'
import AddTasksForm from './../AddTasksForn/AddTasksForm';

const Tasks=({list, changeTitle, addNewTask, withoutInput})=>{
    let [tasks, changeTasks] = useState(true)

    const changeTitleItem=()=>{
        const newTitle = window.prompt('Write new title', list.name)
        if(newTitle){changeTitle(list.id, newTitle)}
        axios.patch('http://localhost:3001/lists/'+ list.id, {name: newTitle})
        .catch(()=>{alert('Не удалось обновить название списка')})
        
    }


    return(
        <div className={s.todo_main_tasks}>
            <h2 style={{color: list.color.hex}}>{list.name} <i onClick={changeTitleItem} className="far fa-edit"></i></h2>
            <div>
                <div>{list.tasks.map((list)=><div key={list.id}><input type='checkbox'/>
                <span>{ tasks? <span onClick={()=>{changeTasks(false)}}>
                    {list.text} </span> : <input type='text' onBlur={()=>{changeTasks(true)}}/>}</span></div>)}</div>
                {list.tasks.length ===0 && <div>Текущих задач нет</div>}
            </div>
            <div>{!withoutInput &&<AddTasksForm list={list} addNewTask={addNewTask}/>}</div>
            
            
        </div>

    )
}

export default Tasks