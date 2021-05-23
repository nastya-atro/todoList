import React from 'react';
import cn from 'classnames'
import Badge from '../Badge/Badge';
import s from './List.module.css'



const List = ({ items, isRemovable, onClick, removeList}) => {
    return (

        <ul onClick={onClick} className='todo__list'>
            {items.map((item, index) =>
                <li key={index} className={cn(item.noactive, { active: item.active })}>
                    <span>{item.icon ? item.icon :
                        (<Badge colors={item.colors}/>)
                    }</span>
                    <span>{item.name}</span>
                    {isRemovable? <span onClick={()=>{removeList()}} className={s.todo__list_remove}><i class="fas fa-times"></i></span> :null}
                    
                </li>)}
        </ul>

    )
}

export default List