import React, { useEffect } from 'react';
import './App.css';
import AddList from './components/AddList/AddButtonList';
import List from './components/List/List';
import Tasks from './components/Tasks/Tasks';
import { Route, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setColors, setLists, setActiveItemAction } from './redux-store/listsRuducer';


const App = () => {

  const lists = useSelector((state) => state.lists.lists)
  const colors = useSelector((state) => state.lists.colors)
  const activeItem = useSelector((state) => state.lists.activeItem)

  const dispatch = useDispatch()

  const history = useHistory();
  const location = useLocation()

  useEffect(() => {
    dispatch(setLists())
    dispatch(setColors())
  }, [])

  useEffect(() => {
    const listId = location.pathname.split('lists/')[1]
    if (lists) {
      const list = lists.find(list => list.id === Number(listId))
      dispatch(setActiveItemAction(list))
    }
  }, [lists, location.pathname])

  return (
    <div className='todo'>
      <div className='todo_sidebar'>
        <List
          onClickItem={(list) => dispatch(setActiveItemAction(history.push(`/`)))}
          items={[
            { icon: <i className="fas fa-align-justify"></i>, name: 'Все задачи' }]} />
        {lists ?
          <List onClickItem={(list) => history.push(`/lists/${list.id}`)}
            activeItem={activeItem}
            isRemovable
            items={lists} /> : ('Загрузка...')}

        <AddList colors={colors} />
      </div>

      <div className='todo_main'>
        <Route exact path='/'>
          {lists && lists.map((list) =>
            <Tasks key={list.id} withoutInput
              list={list} />
          )}</Route>

        <Route path='/lists/:id'>
          {lists && activeItem &&
            <Tasks
              list={activeItem} />}
        </Route>
      </div>
    </div>
  );
}

export default App;