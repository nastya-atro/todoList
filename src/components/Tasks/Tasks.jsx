import React, { useState } from 'react';
import s from './Tasks.module.css'
import AddTasksForm from './../AddTasksForm/AddTasksForm';
import { Link } from 'react-router-dom';
import { todoListApi } from '../../api.axios/api';

const Tasks = ({onCompleteTask, list, changeTitle, addNewTask, withoutInput, onRemoveTask, changeTaskText }) => {
    let [tasks, changeTasks] = useState(true)

    const changeTitleItem = () => {
        const newTitle = window.prompt('Write new title', list.name)
        if(!newTitle){return}
        changeTitle(list.id, newTitle) 

        todoListApi.changeTitleList(list.id, newTitle)
            .catch(() => { alert('Не удалось обновить название списка') })
    }
    

return (
    <div className={s.todo_main_tasks}>
        <Link to={`/lists/${list.id}`}>
        <h2 style={{ color: list.color.hex }}>{list.name} <i onClick={changeTitleItem} className="far fa-edit"></i></h2>
        </Link>
        
        <div>
            <div>
                {list.tasks && list.tasks.map((list) =>
                 <div key={list.id}>
                     <input type='checkbox' 
                     checked={list.completed} 
                     onChange={(e)=>{onCompleteTask(list.listId, list.id, e.target.checked)}} />

                    <span className={s.todo_main_tasks_text}>

                        {tasks ?
                            <span >
                                {list.text}
                                {!withoutInput &&
                                <span className={s.todo_main_icon_changes}>
                                <i onClick={()=>{changeTaskText(list.listId, {id: list.id, text:list.text})}} className="fas fa-pencil-alt"></i>
                                <i onClick={()=>{onRemoveTask(list.listId, list.id)}} className="fas fa-times"></i>
                            </span>}
                                
                            </span>

                            : <input type='text' onBlur={() => { changeTasks(true) }} />}

                    </span>

                </div>)}
            </div>
            {list.tasks && list.tasks.length === 0 && <div>Текущих задач нет</div>}
        </div>
        <div>{!withoutInput && <AddTasksForm key={list.id} list={list} addNewTask={addNewTask} />}</div>


    </div>

)
}

export default Tasks