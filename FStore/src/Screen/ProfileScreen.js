import React from 'react'
import { StyleSheet, Text, View ,SafeAreaView} from 'react-native'
import CustomHeader from '../Components/CustomHeader'

const ProfileScreen = ({navigation}) => {
    return (
        
        <SafeAreaView>
            <CustomHeader title='Profile' righticons={require('../Image/edit.png')} navigation={()=>{navigation.navigate('EditeProfile')}}/>
            <View>
                <Text>ProfileScreen</Text>
            </View>
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})
