import React, { useEffect } from 'react';
import './App.css';
import AddList from './components/AddList/AddButtonList';
import List from './components/List/List';
import Tasks from './components/Tasks/Tasks';
import { Route, useHistory, useLocation, BrowserRouter, withRouter } from 'react-router-dom';
import { Provider, useDispatch, useSelector} from 'react-redux';
import { setColors, setLists, actions} from './redux-store/listsRuducer';
import { colorsSelector, listsSelector, activeItemSelector } from './redux-store/listsSelector';
import { AppBar, Box, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import store from './redux-store/redux-store';


const useStyles = makeStyles((theme) => ({
  appbar: {
    height: 50
  },
  todo_main: {
    marginTop: theme.spacing(10),
    marginBottom: 50
  },
  todo_main_all_tasks: {
    marginBottom: theme.spacing(2)
  },
  appbar_text: {
    marginLeft: 150,
    padding: 10
  }
})
)

const App: React.FC = () => {

  const classes = useStyles();
  const lists = useSelector(listsSelector)
  const colors = useSelector(colorsSelector)
  const activeItem = useSelector(activeItemSelector)

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
      dispatch(actions.setActiveItemAction(list))
    }
  }, [lists, location.pathname])

  return (
    <Box>
      <Container maxWidth="lg">
        <AppBar position="fixed" className={classes.appbar} style={{ backgroundColor: activeItem ? activeItem.color.hex : 'grey' }}>
          <Typography className={classes.appbar_text} variant='h6'>ToDo - Create your perfect list :)</Typography>
        </AppBar>

        <Grid className={classes.todo_main} container spacing={2}>
          <Grid item xs={5}>
            <div className={classes.todo_main_all_tasks}>
              <List
                onClickItem={() =>history.push(`/`)  }
                items={[{ icon: <i className="fas fa-align-justify"></i>, name: 'All tasks' }]} />
            </div>
            {lists ?
              <List onClickItem={(list) => history.push(`/lists/${list.id}`)}
                activeItem={activeItem}
                isRemovable
                items={lists} /> : ('Loading...')}
            <AddList colors={colors} />
          </Grid>

          <Grid item xs={7}>
            <Route exact path='/'>{lists && lists.map((list) => <Tasks key={list.id} withoutInput list={list} />)}</Route>
            <Route path='/lists/:id'>{lists && activeItem && <Tasks list={activeItem} withoutInput={false} />} </Route>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

let AppC = withRouter(App)

const AppContainer = () => {
  return (
    <AppC />
  )
}

let MainApp: React.FC = () => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
    </BrowserRouter>
}

export default MainApp