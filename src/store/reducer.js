const initialState = {
  loading: false,
  data: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCHING":
      return {
        ...state,
        loading: !state.loading,
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "FETCHED":
      return {
        ...state,
        data: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
