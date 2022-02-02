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
      dispatch(fetched(res));
    } catch (err) {
      dispatch(errorMessage(err.message));
    } finally {
      dispatch(fetchingData());
    }
  };
};
