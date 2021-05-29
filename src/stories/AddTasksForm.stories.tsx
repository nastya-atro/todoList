import React from 'react';
import { StotyProviderDecorator } from './StoreProviderDecorator';
import AddTasksForm from './../components/AddTasksForm/AddTasksForm';


export default {
    title: 'AddTaskForm',
    component: AddTasksForm,
    decorators: [StotyProviderDecorator]
}

export const ListBaseExample = () => {
    return <>
        <AddTasksForm list={{
                name: "Podcast",
                colorId: 4,
                id: 1,
                tasks: [
                    { listId: 1, text: "JavaScript for beginner", completed: false, id: 1 },
                    { listId: 1, text: "Junior Frontend", completed: true, id: 2 },
                    { listId: 1, text: "Five minutes about React", completed: true, id: 3 },
                    { listId: 1, text: "All abour TypeScrps", completed: false, id: 4 }],
                color: [
                    { id: 1, hex: "#C9D1D3", name: "grey" }]
            }}/>
    </>


}