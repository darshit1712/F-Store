import React from 'react'
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'


const SignInScreen = ({navigation}) => {
    return (
        <SafeAreaView>
            <View>
                <Text>SignInScreen</Text>
                <Button title='Signup' onPress={()=>navigation.navigate('SignUp')}/>
            </View>
        </SafeAreaView>
    )
}

export default SignInScreen

const styles = StyleSheet.create({})
