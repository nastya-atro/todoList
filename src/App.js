import React, { useState } from 'react';
import './App.css';
import AddList from './components/AddList/AddButtonList';
import List from './components/List/List';
import db from './assets/db.json'
import Tasks from './components/Tasks/Tasks';


function App() {

  const [lists, setLists] = useState(db.lists.map(item => {
    item.colors = db.colors.filter(color => color.id === item.colorId)[0].name
    return item
  }))

  const onAddList = (newList) => {
    const addedList = [
      ...lists, newList
    ]
    setLists(addedList)
  }

  const removeList = () => {
    alert('list remove')
  }


  return (
    <div className='todo'>
      <div className='todo_sidebar'>
        <List items={[
          { icon: <i class="fas fa-align-justify"></i>, name: 'Все задачи' }]} />
        <List removeList={removeList} isRemovable items={lists} />
        <AddList onAddList={onAddList} colors={db.colors} />
      </div>
      <div className='todo_main'>
        <Tasks/>
      </div>

    </div>
  );
}

export default App;
