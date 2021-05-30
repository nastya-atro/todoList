import React from 'react';
import { create } from 'react-test-renderer'
import AddList from './AddButtonList';
import { Provider } from 'react-redux';
import store from '../../redux-store/redux-store';
import List from '../List/List';

const colors = [
    { id: 1, hex: "#C9D1D3", name: "grey" },
    { id: 2, hex: "#42B883", name: "green" },
    { id: 3, hex: "#64C4ED", name: "blue" }
]


describe('AddButtonList component', () => {

    

    test('span Popup should not be visualize', () => {
        const component = create(<Provider store={store}><AddList colors={colors} /></Provider>)

        const root = component.root

        expect(() => {
            let popup = root.findByType('span')
        }).toThrow()
    })

    test('List should be vizualize', () => {
        const component = create(<Provider store={store}><AddList colors={colors} /></Provider>)

        const root = component.root
        let list =root.findByType(List)

        expect(list).not.toBeNull()
  
    })

    test('span Popup should be visible after click', () => {
        const component = create(<Provider store={store}><AddList colors={colors} /></Provider>)

        const root = component.root
        let list =root.findByType(List)
        list.props.onClick()
        let popup = root.findByProps({className:'popup'})

        expect(popup).not.toBeNull()
    })

    /*test('colors from props should be in state', () => {
        const component = create(<Provider store={store}><AddList colors={colors} /></Provider>)

        const instance = component.getInstance()

        expect(instance.state.colors).toBe(colors)
    })*/

})


