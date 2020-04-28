import React, { useState, useEffect } from 'react'
import { Text, View, Modal , TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { Input, Icon, Button, Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker'
import * as permissions from 'expo-permissions'
import {Notifications} from 'expo'
import { db, storage , auth} from '../services/firebase';
import {formatUser} from '../help'
import { connect } from 'react-redux';
import {setUser} from '../redux/actions/shared'

const signUp = ({dispatch , navigation}) => {
    const [inp , setInp] = useState({email : '' , pass1 : '' , pass2 : '' , userName : ''});
    const [mod , setMod] = useState(false);
    const [img , setImg] = useState({
        uri : 'https://vectorified.com/images/no-profile-picture-icon-8.jpg'  , 
        type : ''});

    const onCamera = async () => {
        const {granted} = await permissions.askAsync(permissions.CAMERA)
        if(granted) {
                await ImagePicker.launchCameraAsync( {
                mediaTypes : 'images',
                allowsEditing : true,
                aspect : [1, 1],
                quality : 0.5
            }).then(res => {
                setImg({type : res.type , uri : res.uri});
            })
        } else {
            alert('some thing wrong with camera')
        }

    }
    const onGallery = async () => {
        const {granted} = await permissions.askAsync(permissions.CAMERA_ROLL)
        if(granted) {
            let res = await ImagePicker.launchImageLibraryAsync({
                
                allowsEditing : true,
                aspect : [1, 1],
                quality : 0.5
            }).then(res => {
                setImg({type : res.type , uri : res.uri});
            })
            

        } else {
            alert('some thing wrong with camera')
        }
    }
    
    const upload = async (uri , name) => {
        const respons = await fetch(uri);
        const blob = await respons.blob();
        const ref = storage
        .ref()
        .child("imgs/" + name);
        const task = ref.put(blob);
        return task;
    }
    function done (email , userName , url , token) {
        const newUser = formatUser(email , userName , {type : '' , uri : url} , token)
        dispatch(setUser(newUser))
        db.collection('users').doc(inp.email).set({
                data : newUser
        }).catch(e => alert('db wrong')) 
        navigation.navigate('home')
    }
    function down (email , userName , token) {
        storage.ref('imgs/' + email).getDownloadURL().then(url => {
            done(email , userName ,url , token)
        })
        return 
    }
    const registerForPushNotification = async () => {
        // chaeck for existing permitions
        const {status} = await permissions.getAsync(permissions.NOTIFICATIONS);
        let finalStatus = status;

        // if existing permitions ask for permission
        if(status !== 'granted') {
            const {status} = await permissions.getAsync(permissions.NOTIFICATIONS);
            finalStatus = status;
        } 
        //if no permission exit function
        if(finalStatus !== 'granted') {
            return;
        }
        let tkn = await Notifications.getExpoPushTokenAsync();
        // console.warn(token)
        if(Platform.os === 'android') {
            Notifications.createChannelAndroidAsync('default' , {
                name : 'default',
                sound : true,
                priority : max,
                vibrate : [0, 250, 250, 250],
            })
        }
        return tkn
    }
    function signUp () {
        if(inp.pass1 === inp.pass2) {
            auth.createUserWithEmailAndPassword(inp.email , inp.pass1 + '')
            .then(() => {
                upload(img.uri , inp.email).catch(e => alert(e))
            }).then(() => registerForPushNotification()).then((token) => down(inp.email , inp.userName , token))
            .catch(e => alert(e.massage))
        } else alert('some thing wrong with password')
    }
    return (
        <View>
            <Modal visible = {mod} animationType = "slide">
                <TouchableOpacity onPress = {() => setMod(false)}>
                    <Icon name = "arrow-back" type = "material"/>
                </TouchableOpacity>
                <Button icon = {<Icon name = "photo-library" type = "material" />} 
                    onPress = {() => onGallery()}
                />
                <Button icon = {<Icon name = "camera" type = "font-awesome" />} 
                    onPress = {() => onCamera()}
                />
            </Modal>
            <View style = {styles.avtr}>
                <Avatar 
                
                    rounded
                    size = 'large'
                    source = {{
                        uri : img.uri
                    }}
                />
            </View>
            <View style = {styles.inpCnt}>
                <Input 
                    inputContainerStyle = {styles.txtInpt}
                    placeholder = "USERNAME"
                    value = {inp.userName}
                    onChangeText = {(t) => setInp({...inp , userName : t})}
                />
                <Input 
                    inputContainerStyle = {styles.txtInpt}
                    placeholder = "EMAIL"
                    value = {inp.email}
                    onChangeText = {(t) => setInp({...inp , email : t})}
                    leftIcon = {<Icon type = "Material-Community" name = "email" />}
                    inputContainerStyle
                />
                <Input 
                    inputContainerStyle = {styles.txtInpt}
                    placeholder = "PASSWORD"
                    value = {inp.pass1}
                    onChangeText = {(t) => setInp({...inp , pass1 : t})}
                    leftIcon = {<Icon type = "Entypo" name = "lock" />}
                    
                />
                <Input 
                    inputContainerStyle = {styles.txtInpt}
                    placeholder = "CONFIREMPASS"
                    value = {inp.pass2}
                    onChangeText = {(t) => setInp({...inp , pass2 : t})}
                    leftIcon = {<Icon type = "Entypo" name = "lock" />}
                    
                />
            </View>
            <View style = {styles.btnHldr}>
                <Button title = "SIGNUP" type = "outline"
                    onPress = {() => {
                        signUp();
                    }}

                />
                <Button title = "ADD PHOTO" type = "outline" onPress = {() => setMod(true)}/>
                <Button title = "HAVE ACOUNT" type = "solid"
                        onPress = {() => navigation.navigate('login')}
                />
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    txtInpt : {
        // alignItems : "center",
        // paddingBottom : 15
    },
    inpCnt : {
        justifyContent : "space-between",
        marginBottom : 10,
        flexDirection : "column"
    },
    btnHldr : {
        flexDirection : "row",
        justifyContent : "space-around",
        marginBottom : 15
    },
    avtr : {
        
        // flexDirection : "column",
        justifyContent : "center",
        alignItems : "center"
        
    }
})
export default connect()(signUp)
