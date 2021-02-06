import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import CustomHeader from '../Components/CustomHeader'

const FavoriteScreen = ({navigation}) => {
    return (
        <SafeAreaView>
        <View>
        <CustomHeader title='Favorit'  />
            <Text>FavoriteScreen</Text>
        </View>
        </SafeAreaView>
    )
}

export default FavoriteScreen

const styles = StyleSheet.create({})
