import { combineReducers } from 'redux';

import { reducer as authReducer } from "../modules/auth"
import { reducer as homeReducer } from "../modules/home"

const rootReducer = combineReducers({ authReducer, homeReducer });

export default rootReducer;