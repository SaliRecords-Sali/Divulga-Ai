import React from 'react';
import {View, Text, SafeAreaView,} from 'react-native';


//Component
import { Header } from '../../components/Header';

// Styles
import { styles } from './styles';

//Icones
import { theme } from '../../global/styles/theme';



//-------------------- Página inicial -----------------//



export default function App() {
  return(
    <SafeAreaView style={{ flex: 0, height: '100%', backgroundColor: theme.dark.backgroundcolor}}>
      <Header />
      <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
        <Text style={{color:'#FFF'}}>Seguindo</Text>
      </View>
    </SafeAreaView>
  );
}