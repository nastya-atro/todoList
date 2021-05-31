import axios from "axios";
import { TastsType } from "../redux-store/listsRuducer";

//used fake json-server - 'assets/db.json'

const instanse= axios.create({
    baseURL: `http://localhost:3001/`
})

export const todoListApi={
    getLists(){
        return instanse.get(`lists?_expand=color&_embed=tasks`).then(res => res.data)
    },
    getColors(){
        return instanse.get(`colors`).then(res => res.data)
    },
    deleteTask(id:number){
        return instanse.delete(`tasks/${id}`).then(res => res.data)
    },
    changeTaskText(idTaskObj:number, newTaskText:string){
        return instanse.patch(`tasks/${idTaskObj}`, { text: newTaskText }).then(res => res.data)
    },
    changeSelectTask(taskId:number, completed:boolean){
        return instanse.patch(`tasks/${taskId}`, {completed}).then(res => res.data)
    },
    addNewList(name:string, colorId:number){
        return instanse.post(`lists`, {name, colorId}).then(res => res.data)
    },
    addNewTask(newTask: TastsType){
        return instanse.post(`tasks`, newTask).then(res => res.data)
    },
    deleteList(id:number){
        return instanse.delete(`lists/`+ id).then(res => res.data)
    },
    changeTitleList(listId:number, name: string){
        return instanse.patch(`lists/${listId}`, { name }).then(res => res.data)
    }
}
