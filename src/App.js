import React, { useEffect, useState } from 'react';
import './App.css';
import AddList from './components/AddList/AddButtonList';
import List from './components/List/List';
import Tasks from './components/Tasks/Tasks';
import { Route, useHistory, useLocation } from 'react-router-dom';
import { todoListApi } from './api.axios/api';


function App() {

  const [lists, setLists] = useState(null)
  const [colors, setColors] = useState(null)
  const [activeItem, setActiveItem] = useState(null)

  const history = useHistory();
  const location = useLocation()

  useEffect(() => {
    todoListApi.getLists().then(res => setLists(res.data));
    todoListApi.getColors().then(res => setColors(res.data));
  }, [])

  useEffect(() => {
    const listId = location.pathname.split('lists/')[1]

    if (lists) {
      const list = lists.find(list => list.id === Number(listId))
      setActiveItem(list)
    }

  }, [lists, location.pathname])



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

  const onRemoveTask = (listId, taskId) => {
    const newListTasks = lists.map(item => {
      if (item.id === listId) {
        item.tasks = item.tasks.filter(task => task.id !== taskId)
      }
      return item
    })
    setLists(newListTasks)

    todoListApi.deleteTask(taskId)
    .catch(() => { alert('Не удалось удалить задачу') })
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

  const changeTaskText = (listId, taskObj) => {
    const newTaskText = window.prompt('Rewrite your task', taskObj.text)
    if (!newTaskText) { return }

    const newList = lists.map((list) => {
      if (list.id === listId) {
        list.tasks = list.tasks.map((task) => {
          if (task.id === taskObj.id) {
            task.text = newTaskText
          }
          return task
        })
      }
      return list
    })
    setLists(newList)

    todoListApi.changeTaskText(taskObj.id, newTaskText)
            .catch(() => { alert('Не удалось обновить название списка') })
  }

 

  const onCompleteTask=(listId, taskId, completed)=>{
    const newList = lists.map((list) => {
      if (list.id === listId) {
        list.tasks = list.tasks.map((task) => {
          if (task.id === taskId) {
            task.completed = completed
          }
          return task
        })
      }
      return list
    })
    setLists(newList)

    todoListApi.changeSelectTask(taskId, completed)
            .catch(() => { alert('Не удалось обновить выполнение списка') })
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
          onClickItem={(list) => setActiveItem(history.push(`/`))}
          items={[
            { icon: <i className="fas fa-align-justify"></i>, name: 'Все задачи' }]} />
        {lists ?
          <List onClickItem={(list) => history.push(`/lists/${list.id}`)}
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
            <Tasks onCompleteTask={onCompleteTask} changeTaskText={changeTaskText} onRemoveTask={onRemoveTask} addNewTask={addNewTask}
              changeTitle={changeTitleItem}
              list={activeItem} />}
        </Route>
      </div>

    </div>
  );
}

export default App;
