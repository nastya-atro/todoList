import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';
import AddList from './components/AddList/AddButtonList';
import List from './components/List/List';
import Tasks from './components/Tasks/Tasks';
import { Route, useHistory, useLocation } from 'react-router-dom';


function App() {

  const [lists, setLists] = useState(null)
  const [colors, setColors] = useState(null)
  const [activeItem, setActiveItem] = useState(null)

  const history = useHistory();
  const location=useLocation()

  useEffect(() => {
    axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks')
      .then(res => setLists(res.data));
    axios.get('http://localhost:3001/colors')
      .then(res => setColors(res.data));

  }, [])
  
  useEffect(()=>{
    const listId=location.pathname.split('lists/')[1]
    if(lists){
      const list = lists.find(list=>list.id ===Number(listId))
      setActiveItem(list)
    }


    

  },[lists, location.pathname])



  const onAddList = (newList) => {
    const addedList = [
      ...lists, newList
    ]
    setLists(addedList)
  }

  const removeList = (itemId) => {
    const nedListAfterDelete = lists.filter(lists => lists.id !== itemId)
    setLists(nedListAfterDelete)
  }

  const changeTitleItem = (id, title) => {
    const newList = lists.map(item => {
      if (item.id === id) {
        item.name = title
      }
      return item

    })
    setLists(newList)
  }

  const addNewTask = (listId, taskObj) => {
    const newListTask = lists.map(item => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj]
      }
      return item
    })
    setLists(newListTask)

  }



  return (
    <div className='todo'>

      <div className='todo_sidebar'>
        <List
        onClickItem={(list) =>setActiveItem(history.push(`/`))} 
         items={[
          { icon: <i className="fas fa-align-justify"></i>, name: 'Все задачи' }]} />
        {lists ? 
        <List onClickItem={(list) =>history.push(`/lists/${list.id}`)} 
        activeItem={activeItem} 
        removeList={removeList} 
        isRemovable 
        items={lists} /> : ('Загрузка...')}
        
        <AddList onAddList={onAddList} colors={colors} />
      </div>

      <div className='todo_main'>
        <Route exact path='/'>
          {lists && lists.map((list) =>
            <Tasks key={list.id} withoutInput
              addNewTask={addNewTask}
              changeTitle={changeTitleItem}
              list={list} />
          )}</Route>

        <Route path='/lists/:id'>
          {lists && activeItem &&
            <Tasks addNewTask={addNewTask}
              changeTitle={changeTitleItem}
              list={activeItem} />}
        </Route>
      </div>

    </div>
  );
}

export default App;
