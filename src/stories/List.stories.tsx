import React from 'react';
import List from './../components/List/List';
import { action } from '@storybook/addon-actions';
import { StotyProviderDecorator } from './StoreProviderDecorator';

 
export default {
    title: 'List',
    component: List,
    decorators: [StotyProviderDecorator]
}
const onClickCallback = action('onClick work')
const onClickItemCallback = action('onClickItem work')

export const ListBaseExample = () => {
    return <List onClick={onClickCallback}
            onClickItem={onClickItemCallback}
            activeItem={{
                id: 1, name: 'one', colorId: 1, tasks: [{
                    id: 1,
                    listId: 1,
                    text: 'jj',
                    completed: false
                }], color: [{ id: 1, hex: '#0000', name: 'white' }] 
            }}
            isRemovable={false}
            items={[{
                id: 1, name: 'one', colorId: 1,
                tasks: [{ id: 1, listId: 1, text: 'jj', completed: false }],
                color: [{ id: 1, hex: '#0000', name: 'white' }]
            }]}
        /> 

    
}