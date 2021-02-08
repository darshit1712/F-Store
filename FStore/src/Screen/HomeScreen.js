import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace'
import CustomHeader from '../Components/CustomHeader'
import Search from '../Components/Search'


const HomeScreen = ({navigation}) => {
    return (

        <SafeAreaView>
            <CustomHeader title='Home' navigation={()=>{navigation.openDrawer()}} lefticons={require('../Image/menu.png')}/>
            <Search />
        <ScrollView>
            <View style={styles.contioner}>
                <Text>home</Text>
            </View>
        </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    contioner:{
        flex: 1,
        marginHorizontal:5,
    }
})
