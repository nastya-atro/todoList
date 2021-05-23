import React, {useState} from 'react';
import s from './Tasks.module.css'

const Tasks=()=>{
    let [tasks, changeTasks] = useState(true)


    return(
        <div className={s.todo_main_tasks}>
            <h2>Фронтенд</h2>
            <div>
                <input id='checkbox' type='checkbox'/>
                <span>{tasks? <label for='checkbox' onClick={()=>{changeTasks(false)}}>
                    Some task </label> : <input type='text' onBlur={()=>{changeTasks(true)}}/>}</span>
                
                
            </div>
            
            
        </div>

    )
}

export default Tasks