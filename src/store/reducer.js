const initialState = {
  loading: false,
  data: [
    {
      name: "John Smith0",
      username: "fJane Smith",
      email: "john@smith.com",
      city: "fdkjfjajfd",
    },
    {
      name: "John Smith1",
      username: "fsJane Smith",
      email: "john@smith.com",
      city: "fdkjfjajfd",
    },
    {
      name: "John Smith2",
      username: "ffaJane Smith",
      email: "john@smith.com",
      city: "fdkjfjajfd",
    },
    {
      name: "John Smith3",
      username: "dsaJane Smith",
      email: "john@smith.com",
      city: "fdkjfjajfd",
    },
    {
      name: "Jdsagohn Smith4",
      username: "Jane Smith",
      email: "john@smith.com",
      city: "fdkjfjajfd",
    },
  ],
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
        loading: false,
        data: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
