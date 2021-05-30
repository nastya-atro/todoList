
import { setLists, setColors, actions, addNewListThunk, removeTaskThunk, addNewTaskThunk, changeTitleItemThunk, changeTaskTextThunk, changeSelectTaskThunk } from './listsRuducer';
import { todoListApi } from './../api.axios/api';

/* 
jest.mock('./../api.axios/api')

const todoListApiMock=todoListApi 

const result = {}

todoListApiMock.getLists.mockReturnValue(Promise.resolve(result))
*/


test('setLists testing', async()=>{
    const thunk = setLists()
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(1)
})

test('setColors testing', async()=>{
    const thunk = setColors()
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(1)
})

test('addNewListThunk testing', async()=>{
    const thunk = addNewListThunk('', 1, null)
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(4)
})

test('removeTaskThunk testing', async()=>{
    const thunk = removeTaskThunk(1,1)
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(1)
})

test('addNewTaskThunk testing', async()=>{
    const thunk = addNewTaskThunk({id:1, listId: 1, text:'', completed: true}, 1)
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(4)
})

test('removeTaskThunk testing', async()=>{
    const thunk = removeTaskThunk(1, 1)
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(1)
})

test('changeTitleItemThunk testing', async()=>{
    const thunk = changeTitleItemThunk(1, '')
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(1)
})

test('changeTaskTextThunk testing', async()=>{
    const thunk = changeTaskTextThunk(1, 1,'')
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(1)
})

test('changeSelectTaskThunk testing', async()=>{
    const thunk = changeSelectTaskThunk(1, 1, true)
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(1)
})