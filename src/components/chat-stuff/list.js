import React from 'react'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Card, Avatar, Icon } from 'react-native-elements'
import { Text, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { handleSetUser2 } from '../../redux/actions/shared'
import {v4} from 'uuid';
const List = ({data = [] , goToChat = f => f , dispatch}) => {
    return (
        <FlatList style = {{height : '80%'}}
            data = {data}
            renderItem = {({item}) => {
                return (
                    <TouchableOpacity onPress = {() => {
                        goToChat(item)
                    }}>
                        <Card containerStyle = {styles.user}>
                            <View style = {styles.cnt}>
                                <View style = {[styles.avtrTxt , {}]}>
                                    <Avatar 
                                        rounded
                                        size = "medium"
                                        source = {{
                                            uri : item.img.uri
                                        }}
                                    />
                                    <Text style = {styles.txt}>{item.userName}</Text>
                                </View>
                                <View style = {styles.details}>
                                    <TouchableOpacity>
                                        <Icon name = "more-horizontal" type = "feather"/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Card>
                    </TouchableOpacity>
                )
            }}
            keyExtractor = {() => v4()}
        />
    )
}
const styles = StyleSheet.create({
    user : {
        borderRadius : 50,
    },
    cnt : {
        justifyContent : "space-between",
        flexDirection : "row"
    },
    avtrTxt : {
        width : 'auto',
        alignItems : "center",
        justifyContent : "space-between",
        flexDirection : "row"
    },
    txt : {
        fontSize : 15,
        textTransform : "uppercase",
        marginLeft : 10,
        fontWeight : "bold",
        width : 200,
        textAlign : "left"
    },
    details : {
        alignItems : "center",
        justifyContent : "center"
    }
    
})
export default connect()(List)
