const initialState = {};

function app(state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    default:
      return state;
  }
}

export default app;
