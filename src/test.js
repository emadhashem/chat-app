import React, { useState, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { db, storage } from './services/firebase'
import * as ImagePicker from 'expo-image-picker'
import * as permissions from 'expo-permissions'
import {Notifications} from 'expo'
const Test = () => {
    const [data , setData] = useState([]);
    const tst = () => {
        db.collection('users').doc('doc').onSnapshot(snap => {
            setData([...snap.data().data])
        })
    }
    return (
       <View style = {{marginTop : 15}}>
          
        <Button title = "get token" onPress = {() => tst()} />
        {
            data.map(item => {
                return <Text>{item}</Text>
            })
        }
       </View>
    )
}

export default Test
