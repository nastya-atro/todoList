import { setLists, setColors, actions, addNewListThunk, removeTaskThunk, addNewTaskThunk, changeTitleItemThunk, changeTaskTextThunk, changeSelectTaskThunk, removeListThunk } from './listsRuducer';
import { todoListApi } from './../api.axios/api';

jest.mock('./../api.axios/api')
const todoListApiMock = todoListApi as jest.Mocked<typeof todoListApi>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
})

const result = {
    config: {}, data: {}, headers: {}, status: 201, statusText: ''
}



test('setLists testing', async () => {
    todoListApiMock.getLists.mockReturnValue(Promise.resolve(result))
    const thunk = setLists()
    

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(1)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setListsAction(
        { config: {}, data: {}, headers: {}, status: 201, statusText: "" } as any))
})

test('setColors testing', async () => {
    todoListApiMock.getColors.mockReturnValue(Promise.resolve(result))
    const thunk = setColors()

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(1)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setColorsAction(
        { config: {}, data: {}, headers: {}, status: 201, statusText: "" } as any))
})

test('addNewListThunk testing', async () => {
    todoListApiMock.addNewList.mockReturnValue(Promise.resolve(result))
    const thunk = addNewListThunk('', 1, null)
   
    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(4)
})


test('addNewTaskThunk testing', async () => {
    todoListApiMock.addNewTask.mockReturnValue(Promise.resolve(result))
    const thunk = addNewTaskThunk({ id: 1, listId: 1, text: '', completed: true }, 1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(4)
})

test('removeTaskThunk testing', async () => {
    todoListApiMock.deleteTask.mockReturnValue(Promise.resolve(result))
    const thunk = removeTaskThunk(1, 1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(1)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.removeTaskAction(1,1))
})

test('removeListThunk testing', async () => {
    todoListApiMock.deleteList.mockReturnValue(Promise.resolve(result))
    const thunk = removeListThunk(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(2)
})

test('changeTitleItemThunk testing', async () => {
    todoListApiMock.changeTitleList.mockReturnValue(Promise.resolve(result))
    const thunk = changeTitleItemThunk(1, '')

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(1)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.changeTitleItemAction(1,''))
})

test('changeTaskTextThunk testing', async () => {
    todoListApiMock.changeTaskText.mockReturnValue(Promise.resolve(result))
    const thunk = changeTaskTextThunk(1, 1, '')

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(1)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.changeTaskTextAction(1,1,''))
})

test('changeSelectTaskThunk testing', async () => {
    todoListApiMock.changeSelectTask.mockReturnValue(Promise.resolve(result))
    const thunk = changeSelectTaskThunk(1, 1, true)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(1)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.changeSelectTaskAction(1,1, true))
})