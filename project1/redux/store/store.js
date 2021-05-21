import { createStore, applyMiddleware } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import combinedReducer from '../reducers/root';

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous client state
      ...action.payload, // apply delta from hydration
    };

    // TODO: FEF-1415 - Look at long term solution to resolve this issue.
    const nextUserState = state?.user?.isAuthenticated
      ? {
          ...nextState,
          user: state.user,
        }
      : nextState;

    if (state.count) nextUserState.count = state.count; // preserve count value on client side navigation
    return nextUserState;
  } else {
    return combinedReducer(state, action);
  }
};

export const initStore = () => {
  return createStore(reducer, bindMiddleware([thunkMiddleware]));
};

export const wrapper = createWrapper(initStore);
