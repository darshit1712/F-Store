import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import CustomHeader from '../Components/CustomHeader'


const HomeScreen = ({navigation}) => {
    return (

        <SafeAreaView>
            <View>
            <CustomHeader title='Home' navigation={()=>{navigation.openDrawer()}} lefticons={require('../Image/menu.png')}/>
                <Text>home</Text>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
