import {SET_USER, SEND_MSG, SET_USER_2, RECIVE_MSG, OUT_USER, OUT_USER_2} from '../constants'
import { db } from '../../services/firebase'

export const setUser = (user) => ({
    type : SET_USER,
    user
})
export const sendMsg = (msg , user) => ({
    type : SEND_MSG,
    msg,
    user
}) 
export const setUser2 = (user2) => ({
    type : SET_USER_2,
    user2
})
export const outUser = () => ({
    type : OUT_USER
})
export const outUser2 = () => ({
    type : OUT_USER_2
})
export const handleSendMsg = (newMsg , user) => {
    return dispatch => {
        dispatch(sendMsg(newMsg , user));
        return db.collection('users').doc(user.email).update({
            data : {
                email : user.email,
                img : user.img,
                msgs : [...user.msgs , newMsg],
                token : user.token,
                userName : user.userName
            }
        }).catch(e => alert('from shared - handleSendMsg'))
    }
}
export const handleSetUser2 = (user2) => {
    return dispatch => {
        return db.collection('users').doc(user2.email).onSnapshot(snap => {
            const{email , img , msgs , userName , token} = snap.data().data
            dispatch(setUser2({
                email, img , msgs , userName , token
            }))
        })
    }
}