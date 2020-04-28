import React, { useState, useEffect } from 'react'
import { Input, Button, Card, Icon, Avatar } from 'react-native-elements'
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { handleSendMsg, reciveMsg, handleSetUser2} from '../../redux/actions/shared';
import { formatMsg, sortByDate } from '../../help';
import { db } from '../../services/firebase';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import {v4} from 'uuid';
const ChatRoom = ({navigation , dispatch , user , route}) => {
    const [msgText , setMsgText] = useState('');
    const [chat , setChat] = useState([]);
    const {user2} = route.params
    const sendNotifi = async (token) => {
        const message = {
            to: token,
            sound: true,
            title: 'CHAT APP',
            body: msgText,
            data: { data: 'goes here' },
            _displayInForeground: true,
        };
        const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
    }
    useEffect(() => {
        let arr = user.msgs.filter(item => item.to === user2.email)
        let brr = user2.msgs.filter(item => item.to === user.email)
        setChat([...sortByDate([...arr , ...brr])])
        // console.warn(arr , '\n' , brr)
    } , [user.msgs, user2.msgs])
    
    return (
       <View style = {{flex : 1 , marginTop : 15}}>
           
           <View style = {[styles.bar]}>
                    <View style = {[{width : '23%' , flexDirection : "row" , alignItems : 'center' , 
                        justifyContent : "space-between" , marginLeft : 5
                    }]}>
                        <TouchableOpacity onPress = {() => navigation.goBack()}>
                            <Icon name = "ios-arrow-back" type = "ionicon" color = 'white' size = {30}/>
                        </TouchableOpacity>
                        <Avatar 
                            rounded
                            size = "medium"
                            source = {{
                                uri : user2.img.uri
                            }}
                        />
                        
                    </View>
            </View>

           <FlatList 
                // inverted = {true}
                data = {chat}
                renderItem = {({item}) => {
                    return (
                            <View
                                style = {[ (item.from === user.email) ? styles.txtRight : styles.txtLeft
                                    ,styles.txtContainer ]}
                            >
                                <Text style = {[styles.txt]}>
                                    {item.text}
                                </Text>
                            </View>
                        // </View>
                    )
                }}
                keyExtractor = {(item , i) => v4()}
            
            />
           <View style = {styles.msgContainer}>
                <TouchableOpacity 
                    style = {{marginLeft : 2, borderRadius : 50 , padding : 5 , backgroundColor : 'rgba(0,0,0,.5)'}}
                onPress = {() => {
                        if(msgText.length > 0) {
                            const newMsg = formatMsg(msgText , (new Date()).getTime() , user.email , user2.email)
                            dispatch(handleSendMsg(newMsg , user))
                            setMsgText('')
                            // sendNotifi(user2.token)
                        }
                }}>
                    <Icon name = "send" type = "material" size = {30} color = "white" />
                </TouchableOpacity>
                
                <Input inputContainerStyle = {{
                    width : '90%',
                    // alignSelf : "flex-start",
                    // backgroundColor : 'red',
                    borderRadius : 20,
                    borderWidth : 1,
                    padding : 4
                }}
                
                placeholder = "say hi" value = {msgText} onChangeText = {t => setMsgText(t)}/>
                
            </View>
            
            {/* {
              user2.msgs.map(item => {
                    return <Text>{item.text}</Text>
                })
            } */}
       </View>
    )
}
const styles = StyleSheet.create({
    txt : {
        fontSize : 18,
    },
    txtContainer : {
        height : 30,
        marginBottom : 5,
        borderRadius : 50,
        backgroundColor : 'rgba(0 , 0 , 0 , .1)',
        padding : 5,
        
    },
    txtRight : {
        alignSelf : 'flex-end',

    },
    txtLeft : {
        alignSelf : 'flex-start',
    },
    msgContainer : {
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
        marginBottom : 2
    },
    bar : {
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "space-between",
        height : 60,
        backgroundColor : 'rgba(0,0,0,.3)',
        marginBottom : 5
        
    },
    
})
const mapStateToProps = ({user}) => ({
    user,
})
export default connect(mapStateToProps)(ChatRoom);
