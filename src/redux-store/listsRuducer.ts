import { todoListApi } from "../api.axios/api"
import { CommonActionsTypes, CommonThunkType } from "./redux-store"

let initialState = {
    lists: [] as Array<ListsType>,
    colors: null as null | Array<ColorsType>,
    activeItem: null as any,
    isFetching: false
}

export type ListsType = {
    id: number
    name: string,
    colorId: number,
    tasks: Array<TastsType>,
    color: Array<ColorsType>
}
export type TastsType = {
    id?: number,
    listId: number,
    text: string,
    completed: boolean
}

export type ColorsType = {
    id: number,
    hex: string,
    name: string
}


type InitialStateType = typeof initialState

const listsReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SET_LISTS':
            return {
                ...state,
                lists: action.lists

            }
        case 'SET_COLORS':
            return {
                ...state,
                colors: action.colors

            }
        case 'SET_ACTIVE_ITEM':
            return {
                ...state,
                activeItem: action.activeItem
            }
        case 'ADD_NEW_LIST':
            return {
                ...state,
                lists: [...state.lists, action.newList]
            }

        case 'TOOGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'REMOVE_LIST':
            return {
                ...state,
                lists: state.lists.filter(lists =>
                    lists.id !== action.listId
                )
            }
        case 'ADD_NEW_TASK':
            return {
                ...state,
                lists: state.lists.map(item => {
                    if (item.id === action.listId) {
                        item.tasks = [...item.tasks, action.taskObj]
                    }
                    return item
                })
            }
        case 'REMOVE_TASK':
            return {
                ...state,
                lists: state.lists.map(item => {
                    if (item.id === action.listId) {
                        item.tasks = item.tasks.filter(task => task.id !== action.taskId)
                    }
                    return item
                })
            }

        case 'CHANGE_TITLE_TASK':
            return {
                ...state,
                lists: state.lists.map(item => {
                    if (item.id === action.id) {
                        item.name = action.title
                    }
                    return item
                })
            }

        case 'CHANGE_TASK_TEXT':
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

        case 'CHANGE_SELECT_TASK':
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

type ActionsTypes = CommonActionsTypes<typeof actions>
type ThunkType = CommonThunkType<ActionsTypes>


export const actions = {
    setListsAction: (lists: Array<ListsType>) => ({
        type: 'SET_LISTS', lists
    } as const),

    setColorsAction: (colors: Array<ColorsType>) => ({
        type: 'SET_COLORS', colors
    } as const),
 
    setActiveItemAction: (activeItem: any) => ({
        type: 'SET_ACTIVE_ITEM', activeItem
    } as const),

    addNewListAction: (newList: ListsType) => ({
        type: 'ADD_NEW_LIST', newList
    } as const),

    toogleIsFetchingAction: (isFetching: boolean) => ({
        type: 'TOOGLE_IS_FETCHING', isFetching
    } as const),

    removeListAction: (listId: number) => ({
        type: 'REMOVE_LIST', listId
    } as const),

    addNewTaskAction: (listId: number, taskObj: TastsType) => ({
        type: 'ADD_NEW_TASK', listId, taskObj
    } as const),

    removeTaskAction: (listId: number, taskId: number) => ({
        type: 'REMOVE_TASK', listId, taskId
    } as const),

    changeTitleItemAction: (id: number, title: string) => ({
        type: 'CHANGE_TITLE_TASK', id, title
    } as const),

    changeTaskTextAction: (listId: number, taskObjId: number, newTaskText: string) => ({
        type: 'CHANGE_TASK_TEXT', listId, taskObjId, newTaskText
    } as const),

    changeSelectTaskAction: (listId: number, taskId: number, completed: boolean) => ({
        type: 'CHANGE_SELECT_TASK', listId, taskId, completed
    } as const),

}



export const setLists = (): ThunkType => {
    return async (dispatch) => {
        let response = await todoListApi.getLists()
        dispatch(actions.setListsAction(response.data))
    }
}

export const setColors = (): ThunkType => {
    return async (dispatch) => {
        let response = await todoListApi.getColors()
        dispatch(actions.setColorsAction(response.data))
    }
}

export const addNewListThunk = (inputValue: string, activeColor: number, color: ColorsType | null): ThunkType => {

    return async (dispatch) => {
        dispatch(actions.toogleIsFetchingAction(true))
        const response = await todoListApi.addNewList(inputValue, activeColor)
        const newObj = { ...response.data, color, tasks: [] }
        dispatch(setLists())
        dispatch(actions.toogleIsFetchingAction(false))
        dispatch(actions.addNewListAction(newObj))
    }
}

export const removeListThunk = (listId: number): ThunkType => {
    return async (dispatch) => {
        await todoListApi.deleteList(listId)
        dispatch(setLists())
        dispatch(actions.removeListAction(listId))
    }
}

export const addNewTaskThunk = (newTask: TastsType, listId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toogleIsFetchingAction(true))
        const response = await todoListApi.addNewTask(newTask)
        dispatch(setLists())
        dispatch(actions.addNewTaskAction(listId, response.data))
        dispatch(actions.toogleIsFetchingAction(false))
    }
}

export const removeTaskThunk = (listId: number, taskId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.removeTaskAction(listId, taskId))
       
        await todoListApi.deleteTask(taskId)
    }
}

export const changeTitleItemThunk = (id: number, title: string): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.changeTitleItemAction(id, title))
        await todoListApi.changeTitleList(id, title)
    }
}

export const changeTaskTextThunk = (listId: number, taskObjId: number, newTaskText: string): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.changeTaskTextAction(listId, taskObjId, newTaskText))
        
        await todoListApi.changeTaskText(taskObjId, newTaskText)
    }
}

export const changeSelectTaskThunk = (listId: number, taskId: number, completed: boolean): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.changeSelectTaskAction(listId, taskId, completed))
        await todoListApi.changeSelectTask(taskId, completed)
    }
}



export default listsReducer