import React, { useState } from 'react';
import s from './AddTasksForm.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { addNewTaskThunk, ListsType } from '../../redux-store/listsRuducer';
import { isFetchingSelector } from '../../redux-store/listsSelector';
import { Paper, IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

type PropsType={
    list: ListsType

}

const AddTasksForm:React.FC<PropsType> = ({ list }) => {
    const [visibleForm, setVisibleForm] = useState(true)
    const [inputValue, setInputValue] = useState('')

    const isFetching = useSelector(isFetchingSelector)
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
        <Paper elevation={0} className={s.tasks_form}>
            {visibleForm ? 
            <div onClick={toogleVisibleForm}>
                <IconButton className={s.icon_close}>
                        <AddCircleIcon />
                    </IconButton>
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
        </Paper>
    )
}

export default AddTasksForm