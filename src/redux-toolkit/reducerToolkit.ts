import { createSlice } from "@reduxjs/toolkit";
import { ColorsType, ListsType, TastsType } from "../redux-store/listsRuducer";
import { todoListApi } from './../api.axios/api';


const reducerToolkit = createSlice({
    name: 'lists',
    initialState: {
        lists: [] as Array<ListsType>,
        colors: null as null | Array<ColorsType>,
        activeItem: null as any,
        isFetching: false
 
    },
    reducers: {
        setListsAction(state, action){
            state.lists = action.payload
        },
        setColorsAction(state, action){
            state.colors = action.payload

        },
        setActiveItemAction(state, action){
            state.activeItem = action.payload

        },
        addNewListAction(state, action){
            state.lists = [...state.lists, action.payload]

        },
        toogleIsFetchingAction(state, action){
            state.isFetching = action.payload

        },
        removeListAction(state, action){
            state.lists = state.lists.filter(lists =>
                    lists.id !== action.payload
                )
        },
        addNewTaskAction(state, action){
            state.lists= state.lists.map(item => {
                    if (item.id === action.payload.listId) {
                        item.tasks = [...item.tasks, action.payload.taskObj]
                    }
                    return item
                })
        },
        removeTaskAction(state, action){
            state.lists = state.lists.map(item => {
                    if (item.id === action.payload.listId) {
                        item.tasks = item.tasks.filter(task => task.id !== action.payload.taskId)
                    }
                    return item
                })
        },
        changeTitleItemAction(state, action){
            state.lists = state.lists.map(item => {
                    if (item.id === action.payload.id) {
                        item.name = action.payload.title
                    }
                    return item
                })
        },
        changeTaskTextAction(state, action){
            state.lists = state.lists.map((list) => {
                    if (list.id === action.payload.listId) {
                        list.tasks = list.tasks.map((task) => {
                            if (task.id === action.payload.taskObjId) {
                                task.text = action.payload.newTaskText
                            }
                            return task
                        })
                    }
                    return list
                })
        },
        changeSelectTaskAction(state, action){
            state.lists = state.lists.map((list) => {
                    if (list.id === action.payload.listId) {
                        list.tasks = list.tasks.map((task) => {
                            if (task.id === action.payload.taskId) {
                                task.completed = action.payload.completed
                            }
                            return task
                        })
                    }
                    return list
                })
        }
    }
})

export default reducerToolkit.reducer 
export const {setActiveItemAction, changeSelectTaskAction, changeTaskTextAction, changeTitleItemAction, removeTaskAction, addNewTaskAction, removeListAction, setListsAction, setColorsAction, toogleIsFetchingAction, addNewListAction}=reducerToolkit.actions


export const setListsToolkit = (): any => {
    return async (dispatch:any) => {
        let data = await todoListApi.getLists()
        dispatch(setListsAction(data))
    }
}

export const setColorsToolkit = (): any => {
    return async (dispatch:any) => {
        let data = await todoListApi.getColors()
        dispatch(setColorsAction(data))
        
    }
}

export const addNewListToolkit = (inputValue: string, activeColor: number, color: ColorsType | null): any => {

    return async (dispatch:any) => {
        dispatch(toogleIsFetchingAction(true))
        
        const data = await todoListApi.addNewList(inputValue, activeColor)
       
        const newObj = { ...data, color, tasks: [] }
        dispatch(setListsToolkit())
        dispatch(toogleIsFetchingAction(false))
        dispatch(addNewListAction(newObj))
    }
}

export const removeListToolkit = (listId: number): any => {
    return async (dispatch:any) => {
        await todoListApi.deleteList(listId)
        dispatch(setListsToolkit())
        dispatch(removeListAction(listId))
    }
}

export const addNewTaskToolkit = (newTask: TastsType, listId: number): any => {
    return async (dispatch:any) => {
        dispatch(toogleIsFetchingAction(true))
        const taskObj = await todoListApi.addNewTask(newTask)
        dispatch(setListsToolkit())
        dispatch(addNewTaskAction({listId, taskObj}))
        dispatch(toogleIsFetchingAction(false))
    }
}

export const removeTaskToolkit = (listId: number, taskId: number): any => {
    return async (dispatch:any) => {
        dispatch(removeTaskAction({listId, taskId}))
       
        await todoListApi.deleteTask(taskId)
    }
}

export const changeTitleItemToolkit = (id: number, title: string): any => {
    return async (dispatch: any) => {
        dispatch(changeTitleItemAction({id, title}))
        await todoListApi.changeTitleList(id, title)
    }
}

export const changeTaskTextToolkit = (listId: number, taskObjId: number, newTaskText: string): any => {
    return async (dispatch: any) => {
        dispatch(changeTaskTextAction({listId, taskObjId, newTaskText}))
        
        await todoListApi.changeTaskText(taskObjId, newTaskText)
    }
}

export const changeSelectTaskToolkit = (listId: number, taskId: number, completed: boolean): any => {
    return async (dispatch: any) => {
        dispatch(changeSelectTaskAction({listId, taskId, completed}))
        await todoListApi.changeSelectTask(taskId, completed)
    }
}