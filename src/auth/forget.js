import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'
import { auth } from '../services/firebase';

const ForGet = ({navigation}) => {
    const [email , setEmail] = useState('');
    const [done , setDone] = useState(false);
    const [note , setNote] = useState('');
    return (
        <View>
            <Input value = {email} placeholder = "EMAIL" 
                leftIcon = {<Icon type = "Material-Community" name = "email" />}
                onChangeText = {(t) => setEmail(t)}
            />
            {
                (note) ? (<Text>
                    SEND To {note}
                </Text>) : null
            }
            <View style = {styles.btnHldr}>
                <Button title = "SEND" onPress = { () => {
                    auth.sendPasswordResetEmail(email).catch(e => alert(e))
                    setNote(email)
                    setEmail('')
                    setDone(true)
                    setTimeout(() => {
                        setDone(false)
                    }, 5000)
                }}/>
                <Button title = "LOGIN" onPress = {() => navigation.navigate('login')}/>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    
    btnHldr : {
        justifyContent : "space-around",
        flexDirection : "row",
        marginTop : 20
    }
})
export default ForGet
