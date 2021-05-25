import React, { useState } from 'react';
import { todoListApi } from '../../api.axios/api';
import s from './AddTasksForm.module.css'

const AddTasksForm = ({ addNewTask, list }) => {
    const [visibleForm, setVisibleForm] = useState(true)
    const [inputValue, setInputValue] = useState('')
    const [isFetching, toogleIsFetching] = useState(false)

    const toogleVisibleForm = () => {
        setVisibleForm(!visibleForm)
        setInputValue('')
    }

    const addNewTaskItem = () => {
        const newTask = {
            "listId": list.id,
            "text": inputValue,
            "completed": false
        }
        toogleIsFetching(true)

        todoListApi.addNewTask(newTask)
            .then(({ data }) => {
                addNewTask(list.id, data)
                toogleVisibleForm()
            })
            .catch(() => { alert('Error: task not added. Please, try again') })
            .finally(() => {
                toogleIsFetching(false)
            })


    }



    return (
        <div className={s.tasks_form}>
            {visibleForm ? <div onClick={toogleVisibleForm}>
                <span><i className="fas fa-plus"></i></span>
                <span>Добавить новую задачу</span>
            </div> :
                <div>
                    <input value={inputValue} onChange={(e) => { setInputValue(e.currentTarget.value) }} type='text' placeholder='New task...'></input>
                    <div>
                        <button onClick={addNewTaskItem}>{!isFetching ? 'Добавить задачу' : 'Добавление...'}</button>
                        <button onClick={toogleVisibleForm}>Отмена</button>
                    </div>
                </div>
            }


        </div>



    )
}

export default AddTasksForm