import { ADD_TODO } from '../actions/todos'
import { ADD_GOAL } from '../actions/goals'

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

export default checker