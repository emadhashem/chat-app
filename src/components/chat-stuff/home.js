import React from 'react'
import { Text, Button, View } from 'react-native'
import {createDrawerNavigator} from '@react-navigation/drawer'
import ChatHome from './chat-home';
import Profile from './profile';
import { auth } from '../../services/firebase';
import { connect } from 'react-redux';
import { outUser } from '../../redux/actions/shared';
const drawer = createDrawerNavigator();
const Home = ({navigation , dispatch}) => {
    return (
        <drawer.Navigator>
            <drawer.Screen name = "chathome" component = {ChatHome}
        
            />
            <drawer.Screen name = "profile" component = {Profile}
                options ={{
                    drawerLabel : () => {
                        return (
                            <View style = {{flexDirection : 'row' , alignItems : "center"}}>

                                <Button title = "signout" onPress = {() => {
                                auth.signOut();
                                navigation.navigate('signup')
                                dispatch(outUser());
                                }}/>
                                <Text style = {{marginLeft : 15}}>
                                    MY PROFILE
                                </Text>
                            </View>
                        )
                    }
                }}

            />
        </drawer.Navigator>
    )
}

export default connect()(Home)
