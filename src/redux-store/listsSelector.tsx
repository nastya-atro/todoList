import { AppStateType } from "../redux-toolkit/reduxToolkit"



export const listsSelector=(state: AppStateType)=>{
    return state.lists.lists
}
export const colorsSelector=(state: AppStateType)=>{
    return state.lists.colors
}
export const activeItemSelector=(state: AppStateType)=>{
    return state.lists.activeItem
}
export const isFetchingSelector=(state: AppStateType)=>{
    return state.lists.isFetching
}



