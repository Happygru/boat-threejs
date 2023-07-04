import { GET_LIST, ADD_DATA } from "../types";
import listData from "../../listData.json";

export const getAllLists = () => (dispatch) => {
  dispatch({
    type: GET_LIST,
    payload: listData,
  });
};

export const addData = (newData) => (dispatch) => {
  dispatch({
    type: ADD_DATA,
    payload: newData,
  });
};
