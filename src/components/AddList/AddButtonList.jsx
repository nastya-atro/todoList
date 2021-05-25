import React, { useState, useEffect } from 'react';
import Badge from '../Badge/Badge';
import List from '../List/List';
import s from './AddList.module.css'
import { addNewListThunk } from '../../redux-store/listsRuducer';
import { useDispatch, useSelector } from 'react-redux';

const AddList = ({ colors }) => {
    const [isPopup, setPopup] = useState(false)
    const [activeColor, setActiveColor] = useState(3)
    const [inputValue, setInputValue] = useState('')

    const isFetching = useSelector((state)=>state.lists.isFetching)

    const dispatch=useDispatch()

    let visiblePopup = () => {
        setPopup(!isPopup)
    }
    const onClose = () => {
        setPopup(false)
        setInputValue('')
        setActiveColor(colors[0].id)
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
        const color = colors.filter(color => color.id === activeColor)[0]
        dispatch(addNewListThunk(inputValue, activeColor, color))       
    }


    return (
        <div className={s.add_list}>
            <List onClick={visiblePopup} items={[{ icon: <i className="fas fa-plus"></i>, name: 'Добавить список' }]} />
            {isPopup ? <div className={s.add_list_popup}>
                <div className={s.add_list_popup_close}
                    onClick={onClose}>
                    <i className="fas fa-times"></i></div>
                <input
                    onChange={(e) => { setInputValue(e.currentTarget.value) }}
                    value={inputValue}
                    type='text'
                    placeholder='new list'></input>
                <div>
                    <div className={s.add_list_popup_colors}>

                        {colors.map(color => (
                            <Badge
                                className={activeColor === color.id && s.active}
                                onClick={() => setActiveColor(color.id)}
                                key={color.id}
                                colors={color.name} />))}
                    </div>
                </div>
                <div>
                    <button onClick={addNewList}>
                        {isFetching ? 'Загрузка...' : 'Добавить список'}</button></div>
            </div> : null}
        </div>


    )
}

export default AddList