import React, { useState, useEffect } from 'react';
import Badge from '../Badge/Badge';
import List from '../List/List';
import s from './AddList.module.css'
import { addNewListThunk, ColorsType } from '../../redux-store/listsRuducer';
import { useDispatch, useSelector } from 'react-redux';
import { isFetchingSelector } from '../../redux-store/listsSelector';
import { Button, createStyles, IconButton, makeStyles, Paper } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

 
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 345,
            marginTop: 15,
            backgroundColor: 'rgba(240, 241, 241, 0.432)'
        },
        avatar: {
            backgroundColor: 'white'
        },
        button: {
            margin: theme.spacing(1),
            width: '95%'
        },
        input: {
            '& > *': {
                margin: theme.spacing(1),
                width: '95%'
            },
        },
    }), 
);

type PropsType = {
    colors: Array<ColorsType> | null
}

const AddList: React.FC<PropsType> = ({ colors }) => {

    const classes = useStyles();
    const [isPopup, setPopup] = useState(false)
    const [activeColor, setActiveColor] = useState(3)
    const [inputValue, setInputValue] = useState('')

    const isFetching = useSelector(isFetchingSelector)

    const dispatch = useDispatch()

    let visiblePopup = () => {
        setPopup(!isPopup)
    }
    const onClose = () => {
        setPopup(false)
        setInputValue('')
        colors && setActiveColor(colors[0].id)

    }
    useEffect(() => {
        if (Array.isArray(colors)) {
            setActiveColor(colors[0].id);
        }
    }, [colors])

    const addNewList = () => {
        if (!inputValue) {
            alert('Введите название списка')
            return
        }
        const color = colors && colors.filter(color => color.id === activeColor)[0]
        dispatch(addNewListThunk(inputValue, activeColor, color))
    }

    return (
        <div className={s.add_list}>
            <List onClickItem={visiblePopup} onClick={visiblePopup} items={[{ icon: <i className="fas fa-plus"></i>, name: 'Add new List' }]} />

            {isPopup ?
                <Paper className={classes.root}>
                    <span className='popup'>
                    <IconButton className={s.icon_close}>
                        <CloseIcon onClick={onClose} />
                    </IconButton>
                    <form className={classes.input} noValidate autoComplete="off">
                        <TextField
                            id="outlined-basic"
                            label="Write name of list..."
                            variant="outlined"
                            onChange={(e) => { setInputValue(e.currentTarget.value) }}
                            value={inputValue}
                            type='text' />
                    </form>
                    <div className={s.add_list_popup_colors}>

                        {colors && colors.map(color => (
                            <Badge
                                className={activeColor === color.id && s.active}
                                onClick={() => setActiveColor(color.id)}
                                key={color.id}
                                colors={color.name} />))}
                    </div>
                    <Button onClick={addNewList} variant="contained" color="default" className={classes.button} startIcon={<BookmarkBorderIcon />}>
                        {isFetching ? 'Loading...' : 'Save list'}
                    </Button>
                    </span>
                </Paper> : null}
        </div>
    )
}

export default AddList