import { ACCOUNT } from '../action';

const initState = {
  userInfo: {}
}

const doSomething = (state = initState, { type, payload }) => {
  console.log(state, type, payload)
  switch (type) {
    case ACCOUNT:
      return {
        ...state,
        ...payload
      }
    default:
      return state
  }
}

export default doSomething;