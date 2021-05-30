import React, { useState } from 'react';
import s from './AddTasksForm.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { addNewTaskThunk, ListsType } from '../../redux-store/listsRuducer';
import { isFetchingSelector } from '../../redux-store/listsSelector';
import { Paper, IconButton, makeStyles, createStyles, Button, Grid } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TextField from '@material-ui/core/TextField';
import { Theme } from '@material-ui/core/styles';

type PropsType = {
    list: ListsType
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        input_button: {
            marginTop: 10,
            backgroundColor: '#f1f0f067;'
        },
        input_buttons: {
            marginLeft: 10
        },

        input: {
            '& > *': {
                margin: theme.spacing(1),
                width: '95%'
            },
        },
    }),
);
 

const AddTasksForm: React.FC<PropsType> = ({ list }) => {
    const classes = useStyles();
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
                <div className='button' onClick={toogleVisibleForm}>
                    <IconButton className={s.icon_close}>
                        <AddCircleIcon />
                    </IconButton>
                    <span>Add new task</span>
                </div> :
                <div className='form_new_task'>
                    <form className={classes.input} noValidate autoComplete="off">
                        <TextField
                            id="outlined-basic"
                            label="New task text..."
                            variant="outlined"
                            onChange={(e: any) => { setInputValue(e.currentTarget.value) }}
                            value={inputValue}
                            type='text' />
                    </form>

                    <div className={classes.input_buttons}>

                        <Button onClick={addNewTaskItem} variant="contained" color="default" >
                            {!isFetching ? 'Add task' : 'Adding...'}
                        </Button>
                        <div>
                            <Button className={classes.input_button} onClick={toogleVisibleForm} variant="contained" color="default" >
                                Cancel
                    </Button>
                        </div>
                    </div>
                </div>
            }
        </Paper>
    )
}

export default AddTasksForm