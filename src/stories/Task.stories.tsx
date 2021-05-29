import React from 'react';
import { StotyProviderDecorator } from './StoreProviderDecorator';
import Tasks from './../components/Tasks/Tasks';

export default {
    title: 'Task',
    component: Tasks,
    decorators: [StotyProviderDecorator]
}

export const ListBaseExample = () => {
    return <Tasks
            list={{
                name: "Films",
                colorId: 4,
                id: 1,
                tasks: [
                    { listId: 1, text: "Ameli", completed: false, id: 1 },
                    { listId: 1, text: "Titanic", completed: true, id: 2 },
                    { listId: 1, text: "Adventure Time", completed: true, id: 3 },
                    { listId: 1, text: "Friends", completed: false, id: 4 }],
                color: [
                    { id: 1, hex: "#C9D1D3", name: "grey" }]
            }}
            withoutInput={false} />
}