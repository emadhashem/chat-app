import {SET_USER, SEND_MSG, SET_USER_2 , RECIVE_MSG, OUT_USER, OUT_USER_2} from '../constants'
import {combineReducers} from 'redux'
let initState = {
    email : '',
    img : {
        type : '',
        uri : ''
    },
    msgs : [],
    userName : '',
    token : ''
}
const user = (state = initState , action) => {
    switch (action.type) {
        case SET_USER: return action.user
        case SEND_MSG : return  {...state , msgs : [...state.msgs , action.msg]}
        case OUT_USER : return {}
        default : return state
    }
}
const user2 = (state = initState, action) => {
    switch (action.type) {
        case SET_USER_2: return action.user2
        case OUT_USER_2 : return initState
        default : return state
    }
}

export default combineReducers({user , user2});