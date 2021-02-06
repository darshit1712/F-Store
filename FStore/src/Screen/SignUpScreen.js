 import React from 'react'
 import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
 
 const SignUpScreen = ({navigation}) => {
     return (
         <SafeAreaView>
            <View>
                <Text>SignUpScreen</Text>
                <Button title='go home' onPress={()=>navigation.navigate("Drawer")}/>
            </View>
         </SafeAreaView>
     )
 }
 
 export default SignUpScreen
 
 const styles = StyleSheet.create({})
 