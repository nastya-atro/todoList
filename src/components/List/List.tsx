import React from 'react';
import cn from 'classnames'
import Badge from '../Badge/Badge';
import s from './List.module.css'
import { useDispatch } from 'react-redux';
import { ListsType, removeListThunk } from '../../redux-store/listsRuducer';
import { Avatar, Card, CardHeader, createStyles, IconButton, makeStyles } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Theme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 345,
            marginTop: 20
        },
        avatar: {
            backgroundColor: 'white'
        },
    }),
);

type PropsType = {
    onClick?: () => void
    items: Array<OllTask> | Array<ListsType>
    onClickItem: (list: ListsType) => void
    activeItem?: ListsType
    isRemovable?: boolean
}

type OllTask = {
    icon: any
    name: string
}

const List: React.FC<PropsType> = (props) => {
    const classes = useStyles();

    const dispatch = useDispatch()

    const onRemove = (item: ListsType) => {
        dispatch(removeListThunk(item.id))
    }

    return (
        <div>
            <Card onClick={props.onClick} className='todo__list'>
                {props.items.map((item: any, index: number) =>

                    <CardHeader onClick={() => { props.onClickItem(item) }}
                        key={index}
                        className={cn(item.noactive, { active: props.activeItem && props.activeItem.id === item.id })+''+s.filter}
                        avatar={
                            <Avatar aria-label="recipe" style={{backgroundColor:!item.icon?  item.color.name: 'grey'}}>
                                {item.icon? item.icon:item.name.charAt(0).toUpperCase()}
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                  {props.isRemovable ?
                                <CloseIcon onClick={() => onRemove(item)}/>: null}
                            </IconButton>
                        }
                        title={item.name}
                        subheader={item.tasks && `${item.tasks.length} task`}
                    >      
                    </CardHeader>)}
            </Card>
        </div>

    )
}

export default List