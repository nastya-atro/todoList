import React from 'react';
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux';
import store from '../../redux-store/redux-store';
import List from './List';

const activeItem = {
    id: 1, name: 'one', colorId: 1, tasks: [{
        id: 1,
        listId: 1,
        text: 'jj',
        completed: false
    }], color: [{ id: 1, hex: '#0000', name: 'white' }]
}

const items = [{
    id: 1, name: 'one', colorId: 1,
    tasks: [{ id: 1, listId: 1, text: 'jj', completed: false }],
    color: [{ id: 1, hex: '#0000', name: 'white' }]
}]


describe('List component', () => {
    test('list from props should be in state', () => {

        const component = create(<Provider store={store}>
            <List items={items} onClick={()=>{}} onClickItem={()=>{}} isRemovable={false} activeItem={activeItem}  />
            </Provider>)

        const instance = component.root
        const card = instance.findByProps({ className: 'todo__list' })

        expect(card).not.toBeNull()
    })



    /*  test('list from props should be in state', () => {
          const component = create(<Provider store={store}><List activeItem={activeItem} items={items} /></Provider>)
  
          const instance = component.getInstance()
  
          expect(instance.state.activeItem).toBe(activeItem)
          expect(instance.state.lists).toBe(items)
      })*/

    /*test('callback onClick should be colled', () => {

        const mockCallback = jest.fn()
        const component = create(<Provider store={store}><List onClickItem={mockCallback} activeItem={activeItem} items={items} /></Provider>)
        const instance = component.getInstance()
        instance.onClickItem()
        expect(mockCallback.mock.calls.length).toBe(1)
    })*/


})