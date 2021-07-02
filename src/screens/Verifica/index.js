import React, { useState, useEffect } from 'react';
import { StackActions } from '@react-navigation/native';
import { 
  SafeAreaView,
  StatusBar,
} from'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashLight from '../../../assets/splash.light.json';
import Lottie from 'lottie-react-native';
import { theme } from '../../global/styles/theme';



export default function Verifica({ navigation }) {
    
        //// Buscar uid
        const [uidUsuario, setUid] = useState(null);
        const Buscar = async (chave)=>{
        const valor = await AsyncStorage.getItem(chave)
        setUid(valor);
        }
        Buscar('uid');
        ///////
        useEffect(()=>{
            const timer = setTimeout(() => {
                if(uidUsuario === null){
                  navigation.dispatch(StackActions.replace('Login')); // IR PARA LOGIN
                }else{
                  navigation.dispatch(StackActions.replace('Inicio')); // IR PARA INICIO
                }
              }, 4000);
              return () => clearTimeout(timer);
        });
    
    return(
    <SafeAreaView style={{flex:1, backgroundColor:theme.dark.backgroundcolor}}>
      <StatusBar
      hidden={true}
      translucent
      barStyle="dark-content"
      backgroundColor={theme.dark.backgroundcolor}
      />

      <Lottie source={SplashLight} autoPlay loop/>
    </SafeAreaView>
  );
}
