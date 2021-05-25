import axios from "axios";

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
    deleteTask(id){
        return instanse.delete(`tasks/${id}`)
    },
    changeTaskText(idTaskObj, newTaskText){
        return instanse.patch(`tasks/${idTaskObj}`, { text: newTaskText })
    },
    changeSelectTask(taskId, completed){
        return instanse.patch(`tasks/${taskId}`, {completed})
    },
    addNewList(name, colorId){
        return instanse.post(`lists`, {name, colorId}) 
    },
    addNewTask(newTask){
        return instanse.post(`tasks`, newTask) 
    },
    deleteList(id){
        return instanse.delete(`lists/`+ id)
    },
    changeTitleList(listId, name){
        return instanse.patch(`lists/${listId}`, { name })
    }
}
