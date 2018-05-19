const initialState = {
  x: 0,
  y: 0,
  output: '',
  left: false,
  right: false,
  bottom: false,
  top: true,
  facing: 'NORTH'
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FACE':
      return {
        ...state,
        left: payload.left,
        right: payload.right,
        bottom: payload.bottom,
        top: payload.top,
        facing: payload.facing
      };
    case 'POSITION':
      return {
        ...state,
        x: payload.x === undefined ? state.x : payload.x,
        y: payload.y === undefined ? state.y : payload.y
      };
    case 'REPORT':
      return {
        ...state,
        output: payload.output
      };
  }
  return state;
};

export default reducer;
