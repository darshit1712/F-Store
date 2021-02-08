import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import CustomHeader from '../Components/CustomHeader'
import Search from '../Components/Search'

const FavoriteScreen = ({navigation}) => {
    return (
        <SafeAreaView>
        <CustomHeader title='Favorit' lefticons={require('../Image/menu.png')} navigation={()=>{navigation.openDrawer()}} />
        <Search />
        <ScrollView>
            <View style={styles.contioner}>
                <Text>FavoriteScreen</Text>
                <Text>FavoriteScreen</Text>
            </View>
        </ScrollView>
        </SafeAreaView>
    )
}

export default FavoriteScreen

const styles = StyleSheet.create({
    contioner:{
        flex: 1,
    }
})
