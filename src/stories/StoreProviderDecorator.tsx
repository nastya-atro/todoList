import React from 'react';
import { Provider } from "react-redux"
import store, { AppStateType } from "../redux-store/redux-store"
import { combineReducers } from 'redux';
import listsReducer from '../redux-store/listsRuducer';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';

const rootReducer = combineReducers({
    lists: listsReducer
})

const initialGlobalState = {
    lists: [
        {name: "Films",
            colorId: 4,
            id: 1,
            tasks: [
                { listId: 1, text: "Ameli", completed: false, id: 1 },
                { listId: 1, text: "Titanic", completed: true, id: 2 },
                { listId: 1, text: "Adventure Time", completed: true, id: 3 },
                { listId: 1, text: "Friends", completed: false, id: 4 }],
            color: [
                { id: 1, hex: "#C9D1D3", name: "grey" }]
        },

        {name: "Books",
            colorId: 5,
            id: 2,
            tasks: [{ listId: 2, text: "A Smarter Way to Learn JavaScript.", completed: false, id: 5 },
            { listId: 2, text: "Eloquent JavaScript: A Modern Introduction to Programming.", completed: true, id: 6 }],
            color: [{ id: 1, hex: "#C9D1D3", name: "grey" }]
        }
    ]
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as any)


export const StotyProviderDecorator = (storyFn: any) => {
    return <BrowserRouter><Provider store={store}>{storyFn()}</Provider></BrowserRouter>
}