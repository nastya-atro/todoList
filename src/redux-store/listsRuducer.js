import { todoListApi } from "../api.axios/api"


let SET_LISTS = 'lists/SET_LISTS'
let SET_COLORS = 'lists/SET_COLORS'
let SET_ACTIVE_ITEM = 'lists/SET_ACTIVE_ITEM'
let ADD_NEW_LIST = 'lists/ADD_NEW_LIST'
let TOOGLE_IS_FETCHING = 'lists/TOOGLE_IS_FETCHING'
let REMOVE_LIST = 'lists/REMOVE_LIST'
let ADD_NEW_TASK = 'tasks/ADD_NEW_TASK'
let REMOVE_TASK = 'tasks/REMOVE_TASK'
let CHANGE_TITLE_TASK = 'tasks/CHANGE_TITLE_TASK'
let CHANGE_TASK_TEXT = 'tasks/CHANGE_TASK_TEXT'
let CHANGE_SELECT_TASK = 'tasks/CHANGE_SELECT_TASK'



let initialState = {
    lists: null,
    colors: null,
    activeItem: null,
    isFetching: false


}

const listsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LISTS:
            return {
                ...state,
                lists: action.lists

            }
        case SET_COLORS:
            return {
                ...state,
                colors: action.colors

            }
        case SET_ACTIVE_ITEM:
            return {
                ...state,
                activeItem: action.activeItem
            }
        case ADD_NEW_LIST:
            return {
                ...state,
                lists: [...state.lists, action.newList]
            }

        case TOOGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case REMOVE_LIST:
            return {
                ...state,
                lists: state.lists.filter(lists =>
                    lists.id !== action.listId
                )
            }
        case ADD_NEW_TASK:
            return {
                ...state,
                lists: state.lists.map(item => {
                    if (item.id === action.listId) {
                        item.tasks = [...item.tasks, action.taskObj]
                    }
                    return item
                })
            }
        case REMOVE_TASK:
            return {
                ...state,
                lists: state.lists.map(item => {
                    if (item.id === action.listId) {
                        item.tasks = item.tasks.filter(task => task.id !== action.taskId)
                    }
                    return item
                })
            }

        case CHANGE_TITLE_TASK:
            return {
                ...state,
                lists: state.lists.map(item => {
                    if (item.id === action.id) {
                      item.name = action.title
                    }
                    return item
            })
        }

        case CHANGE_TASK_TEXT:
            return {
                ...state,
                lists: state.lists.map((list) => {
                    if (list.id === action.listId) {
                      list.tasks = list.tasks.map((task) => {
                        if (task.id === action.taskObjId) {
                          task.text = action.newTaskText
                        }
                        return task
                      })
                    }
                    return list
                  })
        }


        case CHANGE_SELECT_TASK:
            return {
                ...state,
                lists: state.lists.map((list) => {
                    if (list.id === action.listId) {
                      list.tasks = list.tasks.map((task) => {
                        if (task.id === action.taskId) {
                          task.completed = action.completed
                        }
                        return task
                      })
                    }
                    return list
                  })
        }





        default: return state


    }
}


const setListsAction = (lists) => ({
    type: SET_LISTS, lists
})

const setColorsAction = (colors) => ({
    type: SET_COLORS, colors
})

export const setActiveItemAction = (activeItem) => ({
    type: SET_ACTIVE_ITEM, activeItem
})

export const addNewListAction = (newList) => ({
    type: ADD_NEW_LIST, newList
})

export const toogleIsFetchingAction = (isFetching) => ({
    type: TOOGLE_IS_FETCHING, isFetching
})

export const removeListAction = (listId) => ({
    type: REMOVE_LIST, listId
})

export const addNewTaskAction = (listId, taskObj) => ({
    type: ADD_NEW_TASK, listId, taskObj
})

export const removeTaskAction = (listId, taskId) => ({
    type: REMOVE_TASK, listId, taskId
})

export const changeTitleItemAction = (id, title) => ({
    type: CHANGE_TITLE_TASK, id, title
})

export const changeTaskTextAction = (listId, taskObjId, newTaskText) => ({
    type: CHANGE_TASK_TEXT, listId, taskObjId, newTaskText
})

export const changeSelectTaskAction = (listId, taskId, completed) => ({
    type: CHANGE_TASK_TEXT, listId, taskId, completed
})



export const setLists = () => {
    return async (dispatch) => {
        let response = await todoListApi.getLists()
        dispatch(setListsAction(response.data))
    }
}

export const setColors = () => {
    return async (dispatch) => {
        let response = await todoListApi.getColors()
        dispatch(setColorsAction(response.data))
    }
}

export const addNewListThunk = (inputValue, activeColor, color) => {

    return async (dispatch) => {
        dispatch(toogleIsFetchingAction(true))

        const response = await todoListApi.addNewList(inputValue, activeColor)
        const newObj = { ...response.data, color, tasks: [] }
        dispatch(setLists())
        dispatch(toogleIsFetchingAction(false))
        dispatch(addNewListAction(newObj))
    }
}

export const removeListThunk = (listId) => {
    return async (dispatch) => {
        await todoListApi.deleteList(listId)
        dispatch(setLists())
        dispatch(removeListAction(listId))
    }
}

export const addNewTaskThunk = (newTask, listId) => {
    return async (dispatch) => {
        dispatch(toogleIsFetchingAction(true))
        const response = await todoListApi.addNewTask(newTask)
        dispatch(setLists())
        dispatch(addNewTaskAction(listId, response.data))
        dispatch(toogleIsFetchingAction(false))
    }
}

export const removeTaskThunk = (listId, taskId) => {
    return async (dispatch) => {

        dispatch(removeTaskAction(listId, taskId))
        dispatch(setLists())
        await todoListApi.deleteTask(taskId)
    }
}

export const changeTitleItemThunk = (id, title) => {
    return async (dispatch) => {

        dispatch(changeTitleItemAction(id, title))
        dispatch(setLists())
        await todoListApi.changeTitleList(id, title)
        
    }
}

export const changeTaskTextThunk  = (listId, taskObjId, newTaskText) => {
    return async (dispatch) => {

        dispatch(changeTaskTextAction(listId, taskObjId))
        dispatch(setLists())
        await todoListApi.changeTaskText(taskObjId, newTaskText)
        
    }
}

export const changeSelectTaskThunk  = (listId, taskId, completed) => {
    return async (dispatch) => {

        dispatch(changeSelectTaskAction(listId, taskId, completed))
        dispatch(setLists())
        await todoListApi.changeSelectTask(taskId, completed)
        
    }
}



export default listsReducer