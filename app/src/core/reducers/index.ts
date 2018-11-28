import {combineReducers} from "redux";
import {Action} from "../actions";

export default combineReducers({
    core: (state = {}, action: Action) => {
        switch (action.type) {
            default:
                return state;
        }
    }
})
