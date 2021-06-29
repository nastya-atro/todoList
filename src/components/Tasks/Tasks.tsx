import React, { Fragment, useState } from 'react';
import s from './Tasks.module.css'
import AddTasksForm from './../AddTasksForm/AddTasksForm';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeTaskThunk, changeTitleItemThunk, changeTaskTextThunk, changeSelectTaskThunk } from '../../redux-store/listsRuducer';
import { Typography, makeStyles, Paper, FormControlLabel, Checkbox, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import { changeTaskTextToolkit, changeTitleItemToolkit, removeTaskToolkit, changeSelectTaskToolkit } from './../../redux-toolkit/reducerToolkit';
 
type PropsType = {
    list: any
    withoutInput: boolean
}

const useStyles = makeStyles((theme) => ({
    tasks_header_text: {
        aligItem: 'center'
    },
    todo_main_tasks_block: {
        padding: theme.spacing(2)

    }
}))

const Tasks: React.FC<PropsType> = (props) => {
    const classes = useStyles();
    let [tasks, changeTasks] = useState(true)
    const dispatch = useDispatch()

    const changeTitleItem = () => {
        const newTitle = window.prompt('Write new title', props.list.name)
        if (!newTitle) { return }
        dispatch(changeTitleItemToolkit(props.list.id, newTitle))
    }

    const onRemoveTask = (listId: number, taskId: number) => {
        dispatch(removeTaskToolkit(listId, taskId))
    }

    const changeTaskText = (listId: number, taskObj: { id: number, text: string }) => {
        const newTaskText = window.prompt('Rewrite your task', taskObj.text)
        if (!newTaskText) { return }
        dispatch(changeTaskTextToolkit(listId, taskObj.id, newTaskText))
    }

    const onCompleteTask = (listId: number, taskId: number, completed: boolean) => {
        dispatch(changeSelectTaskToolkit(listId, taskId, completed))
    }


    return (
        <div className={s.todo_main_tasks}>
            <Link className={s.tasks_header_text} to={`/lists/${props.list.id}`}>
                <Paper elevation={0} className={s.tasks_header_tpaper}>
                    <Typography variant='h6' onClick={changeTitleItem} className={s.todo_main_tasks_title} style={{ color: props.list.color.hex }}>
                       <span className='name_list'>{props.list.name}</span>  </Typography>
                </Paper>
            </Link>
            <div>
                <div>
                    {props.list.tasks && props.list.tasks.map((list: any) =>
                        <Paper elevation={0} className={classes.todo_main_tasks_block} key={list.id}>
                            <FormControlLabel control={<Checkbox checked={list.completed}
                                onChange={(e) => { onCompleteTask(list.listId, list.id, e.target.checked) }} name="checkedA" />}
                                label={tasks ? list.text : null} />
                            <Fragment>
                                {tasks ?
                                    <span className={s.todo_main_input_block}>

                                        {!props.withoutInput &&
                                            <Fragment>
                                                <IconButton >
                                                    <EditIcon onClick={() => { changeTaskText(list.listId, { id: list.id, text: list.text }) }} />
                                                </IconButton>
                                                <IconButton >
                                                    <CloseIcon onClick={() => { onRemoveTask(list.listId, list.id) }} />
                                                </IconButton>
                                            </Fragment>
                                        }
                                    </span>
                                    : <input type='text' onBlur={() => { changeTasks(true) }} />}
                            </Fragment>
                        </Paper>)}
                </div>
                <Paper elevation={0} className={classes.todo_main_tasks_block}>
                    {props.list.tasks && props.list.tasks.length === 0 && <Typography variant='h6'>There are no current issues</Typography>}
                </Paper>
            </div>
            <div>{!props.withoutInput && <AddTasksForm key={props.list.id} list={props.list} />}</div>
        </div>
    )
}

export default Tasks