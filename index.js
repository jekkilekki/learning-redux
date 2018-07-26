/**
 * UDACITY REDUX : Lesson One Key Points
 * 1. Store
 * 2. Actions
 * 3. Reducers
 */ 

// Helper function
function generateId() {
  return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

// Library Code - REDUX now handles this
// function createStore(reducer) {
//   // The store should have four parts
//   // 1. The state
//   // 2. Get the state (API)
//   // 3. Listen to changes on the state
//   // 4. Update the state

//   let state
//   let listeners = []

//   const getState = () => state

//   const subscribe = (listener) => {
//     listeners.push(listener)
//     return () => {
//       listeners = listeners.filter((l) => l !== listener )
//     }
//   }

//   const dispatch = (action) => {
//     state = reducer( state, action )
//     listeners.forEach((listener) => listener())
//   }

//   return {
//     getState,
//     subscribe,
//     dispatch
//   }
// }

// App Code
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'
const RECEIVE_DATA = 'RECEIVE_DATA'

// Action Creators (creating an action)
function addTodoAction (todo) {
  return {
    type: ADD_TODO,
    todo
  }
}

function removeTodoAction (id) {
  return {
    type: REMOVE_TODO,
    id,
  }
}

function toggleTodoAction (id) {
  return {
    type: TOGGLE_TODO,
    id,
  }
}

function addGoalAction (goal) {
  return {
    type: ADD_GOAL,
    goal
  }
}

function removeGoalAction (id) {
  return {
    type: REMOVE_GOAL,
    id
  }
}

function receiveDataAction (todos, goals) {
  return {
    type: RECEIVE_DATA,
    todos,
    goals
  }
}

// Day to day items
function todos (state = [], action) {
  switch(action.type) {
    case ADD_TODO :
      return state.concat([action.todo])
    case REMOVE_TODO :
      return state.filter((todo) => todo.id !== action.id)
    case TOGGLE_TODO :
      return state.map((todo) => todo.id !== action.id ? todo : 
        Object.assign({}, todo, { complete: !todo.complete})
      )
    case RECEIVE_DATA : 
      return action.todos
    default : 
      return state
  }
}

// Long-term goals
function goals (state = [], action) {
  switch(action.type) {
    case ADD_GOAL :
      return state.concat([action.goal])
    case REMOVE_GOAL :
      return state.filter((goal) => goal.id !== action.id)
    case RECEIVE_DATA : 
      return action.goals
    default :
      return state
  }
}

// Loading Spinner
function loading (state = true, action) {
  switch(action.type) {
    case RECEIVE_DATA : 
      return false
    default : 
      return state
  }
}

// Root reducer - REDUX now handles this with Redux.CombineReducers()
// function app (state = {}, action) {
//   return {
//     todos: todos( state.todos, action ),
//     goals: goals( state.goals, action )
//   }
// }

// ES6 Syntax for checker
const checker = (store) => (next) => (action) => {
  // Access to store, next, action
  if (
    ( action.type === ADD_TODO &&
      action.todo.name.toLowerCase().includes('bitcoin') ) ||
    ( action.type === ADD_GOAL &&
      action.goal.name.toLowerCase().includes('bitcoin') )
  ) {
    return alert( "Nope. That's a bad idea.")
  }

  // returns either the "next" middleware, or Redux's dispatch()
  return next(action)
}

// Regular JS checker function
// function checker (store) {
//   return function (next) {
//     return function (action) {
//       // Access to store, next, action
//       if (
//         ( action.type === ADD_TODO &&
//           action.todo.name.toLowerCase().includes('bitcoin') ) ||
//         ( action.type === ADD_GOAL &&
//           action.goal.name.toLowerCase().includes('bitcoin') )
//       ) {
//         return alert( "Nope. That's a bad idea.")
//       }
    
//       // returns either the "next" middleware, or Redux's dispatch()
//       return next(action)
//     }
//   }
// }

const logger = (store) => (next) => (action) => {
  console.group(action.type)
    console.log('The action: ', action)
    const result = next(action)
    console.log('The new state: ', store.getState())
  console.groupEnd()
  return result
}

// Test code for the console
const store = Redux.createStore(Redux.combineReducers({
  todos,
  goals,
  loading
}), Redux.applyMiddleware(checker, logger)) // Tell Redux about our Middleware

// Unnecessary Code after refactoring with React
// store.subscribe(() => {
//   const { todos, goals } = store.getState()

//   // When store changes, reset the lists completely to not duplicate previously added list items
//   document.getElementById('todos').innerHTML = ''
//   document.getElementById('goals').innerHTML = ''

//   todos.forEach(addTodoToDOM)
//   goals.forEach(addGoalToDOM)
  
//   console.log('The new state is: ', store.getState())
// })

// // DOM Code
// function addTodo() {
//   const input = document.getElementById('todo')
//   const name = input.value
//   input.value = ''

//   store.dispatch(addTodoAction({
//     id: generateId(),
//     name,
//     complete: false
//   }))
// }

// function addGoal() {
//   const input = document.getElementById('goal')
//   const name = input.value
//   input.value = ''
  
//   store.dispatch(addGoalAction({
//     id: generateId(),
//     name
//   }))
// }

// document.getElementById('todoBtn')
//   .addEventListener('click', addTodo)

// document.getElementById('goalBtn')
//   .addEventListener('click', addGoal)

// function createRemoveButton (onClick) {
//   const removeBtn = document.createElement('button')
//   removeBtn.innerHTML = 'X'
//   removeBtn.addEventListener('click', onClick)
//   return removeBtn
// }

// function addTodoToDOM(todo) {
//   const node = document.createElement('li')

//   const check = document.createElement('input')
//   check.setAttribute('type', 'checkbox')
//   check.setAttribute('id', todo.id)

//   const text = document.createTextNode(todo.name)

//   const removeBtn = createRemoveButton(() => {
//     store.dispatch(removeTodoAction(todo.id))
//   })

//   node.appendChild(check)
//   node.appendChild(text)
//   node.appendChild(removeBtn)

//   node.style.textDecoration = todo.complete ? 'line-through' : 'none'
//   check.addEventListener('click', () => {
//     store.dispatch(toggleTodoAction(todo.id))
//     check.checked = !check.checked
//   })

//   document.getElementById('todos')
//     .appendChild(node)
// }

// function addGoalToDOM(goal) {
//   const node = document.createElement('li')
//   const text = document.createTextNode(goal.name)

//   const removeBtn = createRemoveButton(() => {
//     store.dispatch(removeGoalAction(goal.id))
//   })

//   node.appendChild(text)
//   node.appendChild(removeBtn)

//   document.getElementById('goals')
//     .appendChild(node)
// }