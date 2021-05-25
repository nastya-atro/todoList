import React, { useState } from 'react';
import s from './AddTasksForm.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { addNewTaskThunk } from '../../redux-store/listsRuducer';

const AddTasksForm = ({ list }) => {
    const [visibleForm, setVisibleForm] = useState(true)
    const [inputValue, setInputValue] = useState('')
    // const [isFetching, toogleIsFetching] = useState(false)

    const isFetching = useSelector((state) => state.lists.isFetching)
    const dispatch = useDispatch()

    const toogleVisibleForm = () => {
        if (!isFetching) {
            setVisibleForm(!visibleForm)
            setInputValue('')
        }
    }

    const addNewTaskItem = () => {
        const newTask = {
            "listId": list.id,
            "text": inputValue,
            "completed": false
        }
        dispatch(addNewTaskThunk(newTask, list.id))
        toogleVisibleForm()
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