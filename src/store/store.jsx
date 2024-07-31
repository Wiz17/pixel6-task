import { createStore } from "redux";
import dataAdd from '../reducer/dataAddToArray'
const store = createStore(
    dataAdd
);
export default store;