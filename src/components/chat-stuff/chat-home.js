import React, { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator, Modal , TouchableOpacity, StyleSheet } from 'react-native'
import { db } from '../../services/firebase'
import { Button, Icon } from 'react-native-elements'
import List from './list'
import ChatRoom from './chat-room'
import { connect } from 'react-redux'
import { setUser2, outUser2 } from '../../redux/actions/shared'
import Constants from 'expo-constants'

const ChatHome = ({navigation , curUser , dispatch}) => {
    const[refresh , setRefresh] = useState(false)
    const[users , setUsers] = useState([]);
    const [receiver , setReceiver] = useState({});
    const [mod , setMod] = useState(false)
    useEffect(() => {
        let arr = []
        db.collection('users').get()
        .then(ref => {
            ref.forEach(doc => {
                if(doc.data().data.email !== curUser.email) {
                    arr.push(doc.data().data)
                }
                
            })
            return arr
        })
        .then(a => setUsers(a))
        .then(() => setRefresh(false))
        .catch(e => alert(e))
    } , [refresh]);
    const handleChatRoom = async (userFromDash) => {
        await db.collection('users').doc(userFromDash.email).onSnapshot(snap => {
            const{email , img , msgs , userName , token} = snap.data().data
            setReceiver()
            navigation.navigate('chatroom' , {
                user2 : {
                    email, img , msgs , userName , token
                }
            })
        })
        
    }
    return (
        <View style = {styles.container}>
            {
                (refresh) ? <ActivityIndicator /> 
                : (
                    <View>
                        <View style = {[styles.row_shape , styles.bar]}>
                            <View style = {[styles.row_shape ,]}>
                                {/* <Button icon = {<Icon name = "menu" type = "entypo"/>}/> */}
                                <TouchableOpacity onPress = {() => navigation.toggleDrawer()}>
                                    <Icon iconStyle = {styles.icon} name = "menu" type = "entypo"/>
                                </TouchableOpacity>
                            </View>
                            <Text style = {styles.logo}>
                                    CHATHOME
                            </Text>
                            <View style = {[styles.row_shape]}>
                                {/* <Button icon = {<Icon name = "comment-search" type = "material-community"/>}/> */}
                                <TouchableOpacity>
                                    <Icon iconStyle = {styles.icon} name = "comment-search" type = "material-community"/>
                                </TouchableOpacity>
                                {/* <Button icon = {<Icon name = "more-vertical" type = "feather"/>}/> */}
                                <TouchableOpacity>
                                    <Icon iconStyle = {styles.icon}  name = "more-vertical" type = "feather"/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Button title = "refresh" onPress = {() => setRefresh(true)} type = "clear"
                            buttonStyle = {{marginBottom : 5}}
                        />
                        <List data = {users} goToChat = {handleChatRoom}/>
                    </View>
                )
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container : {
        flex : 1,
        marginTop : Constants.statusBarHeight
    },
    row_shape : {
        justifyContent : "space-between",
        flexDirection : "row"
    },
    bar : {
        alignItems : "center",
        height : '10%'

    },
    logo : {
        fontSize : 20,
        letterSpacing : 1,
        fontWeight : "bold",
        width : '50%',
        textAlign : "center"
    },
    icon : {
        fontSize : 40
    }
})
const mapStateToProps = ({user}) => ({
    curUser : user
})
export default connect(mapStateToProps)(ChatHome)
