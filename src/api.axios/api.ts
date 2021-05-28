import axios from "axios";
import { TastsType } from "../redux-store/listsRuducer";

//used fake json-server - 'assets/db.json'

const instanse= axios.create({
    baseURL: `http://localhost:3001/`
})

export const todoListApi={
    getLists(){
        return instanse.get(`lists?_expand=color&_embed=tasks`)
    },
    getColors(){
        return instanse.get(`colors`)
    },
    deleteTask(id:number){
        return instanse.delete(`tasks/${id}`)
    },
    changeTaskText(idTaskObj:number, newTaskText:string){
        return instanse.patch(`tasks/${idTaskObj}`, { text: newTaskText })
    },
    changeSelectTask(taskId:number, completed:boolean){
        return instanse.patch(`tasks/${taskId}`, {completed})
    },
    addNewList(name:string, colorId:number){
        return instanse.post(`lists`, {name, colorId}) 
    },
    addNewTask(newTask: TastsType){
        return instanse.post(`tasks`, newTask) 
    },
    deleteList(id:number){
        return instanse.delete(`lists/`+ id)
    },
    changeTitleList(listId:number, name: string){
        return instanse.patch(`lists/${listId}`, { name })
    }
}
