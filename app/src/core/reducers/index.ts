import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form'

import {Action} from "../actions";

export default combineReducers({
    form: formReducer,
    core: (state = {}, action: Action) => {
        switch (action.type) {
            default:
                return state;
        }
    }
})
