import React from 'react'
import {NavigationContainer, useNavigation } from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import SignUp from '../auth/signUp';
import logIn from '../auth/logIn';
import ForGet from '../auth/forget';
import HomeChat from './chat-stuff/home';
import { Button } from 'react-native';
import { auth } from '../services/firebase';
import ChatRoom from './chat-stuff/chat-room';
const stack = createStackNavigator();
const Home = () => {
    return (
        <NavigationContainer>
            <stack.Navigator>
                <stack.Screen name = "signup" component = {SignUp}/>
                <stack.Screen name = "login" component = {logIn}/>
                <stack.Screen name = "forget" component = {ForGet}/>
                <stack.Screen name = "home" component = {HomeChat}
                    options = {{
                        header : () => null
                        
                    }}
                />
                <stack.Screen name = "chatroom" component = {ChatRoom}
                    options = {{
                        header : () => null
                        
                    }}
                />
                
            </stack.Navigator>
        </NavigationContainer>
    )
}

export default Home
