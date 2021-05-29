import React from 'react';
import { StotyProviderDecorator } from './StoreProviderDecorator';
import AddList from './../components/AddList/AddButtonList';

 
export default {
    title: 'AddList',
    component: AddList,
    decorators: [StotyProviderDecorator]
}

export const ListBaseExample = () => {
    return <AddList colors={ [
        {id: 1,hex: "#C9D1D3",name: "grey"},
        {id: 2,hex: "#42B883",name: "green"},
        {id: 3,hex: "#64C4ED",name: "blue"}
    ]}/>   
}