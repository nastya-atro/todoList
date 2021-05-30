import React from 'react';
import { create } from 'react-test-renderer'
import AddTasksForm from './AddTasksForm';
import { Provider } from 'react-redux';
import store from '../../redux-store/redux-store';

const list = {
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
}

 
describe('AddTasksForm component', () => {

    

    test('Popup with form should not be vizualize', () => {
        const component = create(<Provider store={store}><AddTasksForm list={list} /></Provider>)

        const root = component.root

        expect(() => {
            let popup = root.findByProps({ className: 'form_new_task' })
        }).toThrow()
    })

    test('button "add new form" should be vizualize', () => {
        const component = create(<Provider store={store}><AddTasksForm list={list} /></Provider>)

        const root = component.root
        const button= root.findByProps({ className: 'button' })

        expect(button).not.toBeNull()
    })

    test('Popup with form should be vizualize after click', () => {
        const component = create(<Provider store={store}><AddTasksForm list={list} /></Provider>)

        const root = component.root
        const button= root.findByProps({ className: 'button' })
        button.props.onClick()
        const popup = root.findByProps({ className: 'form_new_task' })

        expect(popup).not.toBeNull()
    }) 

    /*test('list from props should be in state', () => {
        const component = create(<Provider store={store}><AddTasksForm list={list} /></Provider>)

        const instance = component.getInstance()

        expect(instance.state.colors).toBe(list)
    })*/




})


