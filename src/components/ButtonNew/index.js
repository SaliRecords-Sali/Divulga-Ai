import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

import Entypo from '@expo/vector-icons/Entypo';
import Icon from '@expo/vector-icons/MaterialIcons';
import { theme } from '../../global/styles/theme';

export default function ButtonNew({size, color}){
    return(
        <View style={styles.container}>
            <Icon name="add" size={30} color={'#FFFFFF'}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#3399ff',
        alignItems: 'center',
        justifyContent: 'center',
        //marginBottom: 30,
        borderWidth:2,
        borderColor: theme.colors.primary
    }
})