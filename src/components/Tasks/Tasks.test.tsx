import React from 'react';
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux';
import store from '../../redux-store/redux-store';
import Tasks from './Tasks';
import AddTasksForm from './../AddTasksForm/AddTasksForm';
import { BrowserRouter } from 'react-router-dom';


const list={
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
}

describe('Tasks component', () => {

    test('If props.withoutInput=true - AddTasksForm component should not be vizualize', () => {
        const component = create(<BrowserRouter><Provider store={store}><Tasks list={list}
        withoutInput={true} /></Provider></BrowserRouter>)

        const root = component.root
        expect(()=>{
            const addForm = root.findByType(AddTasksForm)
        }).toThrow()
    })

    test(' If props.withoutInput=false - AddTasksForm component should be vizualize', () => {
        const component = create(<BrowserRouter><Provider store={store}><Tasks list={list}
        withoutInput={false} /></Provider></BrowserRouter>)

        const root = component.root
        const addForm = root.findByType(AddTasksForm)
        expect(addForm).not.toBeNull()
    })

    test('span should contain correct name of list', () => {
        const component = create(<BrowserRouter><Provider store={store}><Tasks list={list}
        withoutInput={false} /></Provider></BrowserRouter>)

        const root = component.root
        const span = root.findByProps({className: 'name_list'})
        expect(span.children[0]).toBe("Films")
    })

    /*test('list from props should be in state', () => {
        const component = create(<Provider store={store}><Tasks list={list}
        withoutInput={false} /></Provider>)

        const instance = component.getInstance()

        expect(instance.state.list[0]).toBe(list)
    })*/

})