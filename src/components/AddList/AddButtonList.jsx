import React, { useState } from 'react';
import Badge from '../Badge/Badge';
import List from '../List/List';
import s from './AddList.module.css'

const AddList = ({ colors, onAddList }) => {
    let [isPopup, setPopup] = useState(false)
    let visiblePopup = () => {
        setPopup(!isPopup)
    }

    let onClose = () => {
        setPopup(false)
        setInputValue('')
        setActiveColor(colors[0].id)
    }

    let [activeColor, setActiveColor] = useState(colors[0].id)
    let [inputValue, setInputValue] = useState('')

    const addNewList = () => {
        if (!inputValue) {
            alert('error')
            return
        }
        onAddList({
            id: Math.random(),
            name: inputValue,
            colors: colors.filter(color => color.id === activeColor)[0].name
        })
        onClose()


    }


    return (
        <div className={s.add_list}>
            <List onClick={visiblePopup} items={[{ icon: <i class="fas fa-plus"></i>, name: 'Добавить список' }]} />
            {isPopup ? <div className={s.add_list_popup}>
                <div className={s.add_list_popup_close}
                    onClick={onClose}>
                    <i class="fas fa-times"></i></div>
                <input
                    onChange={(e) => { setInputValue(e.currentTarget.value) }}
                    value={inputValue}
                    type='text'
                    placeholder='new list'></input>
                <div>
                    <div className={s.add_list_popup_colors}>
                        {colors.map(colors => (<Badge
                            className={activeColor === colors.id && s.active}
                            onClick={() => setActiveColor(colors.id)}
                            key={colors.id}
                            colors={colors.name} />))}
                    </div>
                </div>
                <div><button onClick={addNewList}>Добавить список</button></div>


            </div> : null}
        </div>


    )
}

export default AddList