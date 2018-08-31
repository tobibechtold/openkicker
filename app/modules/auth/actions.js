import * as t from './actionTypes';
import * as api from './api';
import { auth } from "../../config/firebase";

import { AsyncStorage } from 'react-native';

export function register(data, successCB, errorCB) {
    return (dispatch) => {
        api.register(data, function (success, data, error) {
            if (success) {
                dispatch({type: t.LOGGED_IN, data});
                successCB(data);
            }
            else if (error) errorCB(error)
        });
    };
}

export function createUser(user, successCB, errorCB) {
    return (dispatch) => {
        api.createUser(user, function (success, data, error) {
            if (success) {
                dispatch({type: t.LOGGED_IN, data: user});
                successCB();
            }else if (error) errorCB(error)
        });
    };
}

export function login(data, successCB, errorCB) {
    return (dispatch) => {
        api.login(data, function (success, data, error) {
            if (success) {
                if (data.exists) dispatch({type: t.LOGGED_IN, data: data.user});
                successCB(data);
            }else if (error) errorCB(error)
        });
    };
}

export function resetPassword(data, successCB, errorCB) {
    return (dispatch) => {
        api.resetPassword(data, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error)
        });
    };
}

export function signOut(successCB, errorCB) {
    return (dispatch) => {
        api.signOut(function (success, data, error) {
            if (success) {
                dispatch({type: t.LOGGED_OUT});
                successCB();
            }else if (error) errorCB(error)
        });
    };
}

export function checkLoginStatus(callback) {
    return (dispatch) => {
        auth.onAuthStateChanged((user) => {
            let isLoggedIn = (user !== null);

            if (isLoggedIn){
                api.getUser(user, function (success, { exists, user }, error) {
                    if (success) {
                        if (exists) dispatch({type: t.LOGGED_IN, data: user});
                        callback(exists, isLoggedIn);
                    }else if (error) {
                        //unable to get user
                        dispatch({type: t.LOGGED_OUT});
                        callback(false, false);
                    }
                });
            }else {
                dispatch({type: t.LOGGED_OUT});
                callback(false, isLoggedIn)
            }
        });
    };
}