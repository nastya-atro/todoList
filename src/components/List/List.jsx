import React from 'react';
import cn from 'classnames'
import Badge from '../Badge/Badge';
import s from './List.module.css'
import { useDispatch } from 'react-redux';
import { removeListThunk } from '../../redux-store/listsRuducer';


const List = ({ items, isRemovable, onClick, onClickItem, activeItem}) => {
    
    const dispatch = useDispatch()

    const onRemove=(item)=>{
        dispatch(removeListThunk(item.id))
    }

    return (
        <ul onClick={onClick} className='todo__list'>
            {items.map((item, index) =>
                <li onClick={onClickItem ?()=>{onClickItem(item)}:null}
                key={index} 
                className={cn(item.noactive, { active: activeItem && activeItem.id ===item.id })}>
                    <span>{item.icon ? item.icon :
                        (<Badge colors={item.color.name}/>)
                    }</span>
                    <span>{item.name}{item.tasks && `(${item.tasks.length})`}</span>
                    {isRemovable? <span onClick={()=>onRemove(item)} className={s.todo__list_remove}><i className="fas fa-times"></i></span> :null}
                </li>)}
        </ul>

    )
}

export default List