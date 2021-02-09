import React,{useState} from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Card from '../Components/Card'
import CustomHeader from '../Components/CustomHeader'
import Search from '../Components/Search'

const FavoriteScreen = ({navigation}) => {
    const [like, setLike] = useState(true);

    const onlike = () => {
      setLike(like === true ? false : true);
    };
    return (
        <SafeAreaView style={styles.contioner}>
        <CustomHeader title='Favorit' lefticons={require('../Image/menu.png')} navigation={()=>{navigation.openDrawer()}} />
        <Search />
        <ScrollView>
            <Card
            like={like}
            image={require('../Image/event.jpeg')}
            title="Title"
            descripation="it is good"
            onPress={onlike}
            date="12-12-1953"
            />
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
