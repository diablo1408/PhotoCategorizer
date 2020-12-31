import { combineReducers } from "redux";
import imageReducer from "./imageReducer";
import authReducer from "./authReducer";

export default combineReducers({
  image: imageReducer,
  auth: authReducer,
});
