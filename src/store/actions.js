import axios from "axios";
import * as action from "./actionTypes";

export const fetched = data => ({
  type: action.FETCHED,
  payload: data,
});

export const fetchingData = () => ({
  type: action.FETCHING,
});

export const errorMessage = error => ({
  type: action.ERROR,
  payload: error,
});

export const deleteUser = (data, id) => dispatch => {
  const newData = [...data.filter(val => val.name !== id)];
  dispatch(fetched(newData));
};

export const fetchData = url => {
  return async dispatch => {
    dispatch(fetchingData());
    dispatch(errorMessage(""));
    try {
      const res = await axios.get(url);
      dispatch(fetched(res.data));
    } catch (err) {
      dispatch(errorMessage("Network Error"));
    } finally {
      dispatch(fetchingData());
    }
  };
};

export const editData = () => {
  return async dispatch => {
    dispatch(fetchingData());
    dispatch(errorMessage(""));
    try {
      await axios.post("https://jsonplaceholder.typicode.com/posts", {
        body: JSON.stringify({
          title: "foo",
          body: "bar",
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    } catch {
      dispatch(errorMessage("Network Error"));
    } finally {
      dispatch(fetchingData());
    }
  };
};
