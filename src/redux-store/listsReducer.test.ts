import listsReducer, { actions } from "./listsRuducer";

let state = {
    lists: [
        {
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
        },
        {
            name: "Books",
            colorId: 5,
            id: 2,
            tasks: [{ listId: 2, text: "A Smarter Way to Learn JavaScript.", completed: false, id: 5 },
            { listId: 2, text: "Eloquent JavaScript: A Modern Introduction to Programming.", completed: true, id: 6 }],
            color: [{ id: 1, hex: "#C9D1D3", name: "grey" }]
        }
    ],
    colors: null,
    activeItem: null,
    isFetching: false
}

test('lists length should be increased', () => {
    //1. test data
    let action = actions.addNewListAction({
        name: "Podcast",
        colorId: 5,
        id: 2,
        tasks: [{ listId: 2, text: "A Smarter Way to Learn JavaScript.", completed: false, id: 5 },
        { listId: 2, text: "Eloquent JavaScript: A Modern Introduction to Programming.", completed: true, id: 6 }],
        color: [{ id: 1, hex: "#C9D1D3", name: "grey" }]
    })

    //2. action
    let newState = listsReducer(state, action)

    //3. expectation
    expect(newState.lists.length).toBe(3)
});


test('new lists name should be - Podcast', () => {
    //1. test data
    let action = actions.addNewListAction({
        name: "Podcast",
        colorId: 5,
        id: 2,
        tasks: [{ listId: 2, text: "A Smarter Way to Learn JavaScript.", completed: false, id: 5 },
        { listId: 2, text: "Eloquent JavaScript: A Modern Introduction to Programming.", completed: true, id: 6 }],
        color: [{ id: 1, hex: "#C9D1D3", name: "grey" }]
    })

    //2. action 
    let newState = listsReducer(state, action)

    //3. expectation
    expect(newState.lists[2].name).toBe("Podcast")
});

test('activeItem should be changed for click', () => {
    //1. test data
    let action = actions.setActiveItemAction(state.lists[0])

    //2. action 
    let newState = listsReducer(state, action)

    //3. expectation
    expect(newState.activeItem).toBe(state.lists[0])
});

test('isFetching should be changed', () => {
    //1. test data
    let action = actions.toogleIsFetchingAction(true)

    //2. action 
    let newState = listsReducer(state, action)

    //3. expectation
    expect(newState.isFetching).toBe(true)
});

test('list length should be decreased ', () => {
    //1. test data
    let action = actions.removeListAction(1)

    //2. action 
    let newState = listsReducer(state, action)

    //3. expectation
    expect(newState.lists.length).toBe(1)
});

test('tasks length should be increased', () => {
    //1. test data
    let action = actions.addNewTaskAction(1, { listId: 1, text: "Text", completed: false, id: 1 })

    //2. action 
    let newState = listsReducer(state, action)

    //3. expectation
    expect(newState.lists[0].tasks.length).toBe(5)
});

test('new tasks text should be - Text', () => {
    //1. test data
    let action = actions.addNewTaskAction(1, { listId: 1, text: "Text", completed: false, id: 1 })

    //2. action 
    let newState = listsReducer(state, action)

    //3. expectation
    expect(newState.lists[0].tasks[4].text).toBe('Text')
});

test('tasks length should be decreased', () => {
    //1. test data
    let action = actions.removeTaskAction(1, 1)

    //2. action 
    let newState = listsReducer(state, action)

    //3. expectation
    expect(newState.lists[0].tasks.length).toBe(3)
});

test('title of item should be changed', () => {
    //1. test data
    let action = actions.changeTitleItemAction(1, 'Podcast')

    //2. action 
    let newState = listsReducer(state, action)

    //3. expectation
    expect(newState.lists[0].name).toBe('Podcast')
});

test('title of tasks should be changed', () => {
    //1. test data
    let action = actions.changeTaskTextAction(1, 2, 'Hisory about Alice')

    //2. action 
    let newState = listsReducer(state, action)

    //3. expectation
    expect(newState.lists[0].tasks[0].text).toBe('Hisory about Alice')
});

test('seleted task should be changed', () => {
    //1. test data
    let action = actions.changeSelectTaskAction(1, 2, false)

    //2. action 
    let newState = listsReducer(state, action)

    //3. expectation
    expect(newState.lists[0].tasks[0].completed).toBe(false)
});

