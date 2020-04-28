import React, { useState } from 'react'
import { View , Text, StyleSheet } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { storage, db , auth } from '../services/firebase';
import { formatUser } from '../help';
import { setUser } from '../redux/actions/shared';


const LogIn = ({dispatch , navigation}) => {
    const [inp , setInp] = useState({email : '' , pass : ''});
    function logIn (email , pass) {
        auth.signInWithEmailAndPassword(email , pass + '').then(() => {
             db.collection('users').doc(email).get()
                 .then(doc => doc.data().data)
                 .then(data => {
                 const curUser = formatUser(email , data.userName , {uri : data.img.uri , type : ""} , 
                 data.token , data.msgs);
                 dispatch(setUser(curUser));
                 navigation.navigate('home')
                 })
                 .catch(e => console.warn(e))
            // db.collection('users').doc(email).onSnapshot(snap => {
            //     let data = snap.data().data
            //     const curUser = formatUser(email , data.userName , {uri : data.img.uri , type : ""} , 
            //      data.token , data.msgs);
            //      dispatch(setUser(curUser));
            //      navigation.navigate('home')
            // })
         }).catch(e => alert(e))
    }
    return (
        <View style = {{flex : 1}}>
            <View style = {styles.inpCnt}>
                <Input placeholder = "EMAIL" value = {inp.email} 
                    leftIcon = {<Icon type = "Material-Community" name = "email" />}
                    onChangeText = {(t) => setInp({...inp , email : t})}    
                />
                <Input placeholder = "PASSWORD" value = {inp.pass} 
                    leftIcon = {<Icon type = "Entypo" name = "lock"/>}
                    onChangeText = {(t) => setInp({...inp , pass : t})}
                />
            </View>
            <View style = {styles.btnHldr}>
                <Button title = "LOGIN" 
                    onPress = {() => {
                        logIn(inp.email , inp.pass)
                    }} 
                />
                <Button title = "SIGNUP" onPress = {() => navigation.navigate('signup')}/>
                <Button title = "FORGETPASS" onPress = {() => navigation.navigate('forget')}/>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    inpCnt : {
        flexDirection : "column",
        justifyContent : "space-around",
        height : '30%'
    },
    btnHldr : {
        justifyContent : "space-around",
        flexDirection : "row",
        marginTop : 20
    }
})
export default connect()(LogIn)
