import React from 'react';
import { StotyProviderDecorator } from './StoreProviderDecorator';
import App from './../App';


export default {
    title: 'AppMain',
    component: App,
    decorators: [StotyProviderDecorator]
}

export const ListBaseExample = () => {
    return <App  />

}