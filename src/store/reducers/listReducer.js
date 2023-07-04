import { defaultListboxReducer } from "@mui/base";
import { GET_LIST, ADD_DATA } from "../types";

const initialState = {
  lists: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST:
      return {
        ...state,
        lists: action.payload,
      };
    case ADD_DATA:
      return {
        ...state,
        newdata: action.payload,
      };
    default:
      return state;
  }
}
