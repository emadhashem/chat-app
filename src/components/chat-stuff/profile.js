import React from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Avatar } from 'react-native-elements'

const Profile = ({user}) => {
    // console.warn(props.user.img.uri)
    return (
        <View style = {{flex : 1 , alignItems : "center" , marginTop : 100}}>
            
                <Avatar 
                    rounded
                    size = "xlarge"
                    source = {{
                        uri : user.img.uri
                    }}
                />
                <Text style = {{fontSize : 50 , fontWeight : "bold"}}>
                    {user.userName}
                </Text>
        </View>
    )
}
const mapStateToProps = ({user}) => ({
    user,
})
export default connect(mapStateToProps)(Profile)
