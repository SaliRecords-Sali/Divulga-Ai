import React, { useState, useEffect } from 'react';
import { StackActions } from '@react-navigation/native';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Animated,
  SafeAreaView,
  ScrollView,
} from'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../../../firebaseConfig';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { styles } from './styles';

// Global
import { theme } from '../../global/styles/theme';


export default function Login({ navigation }) {
    // LOGIN

    const [email, setEmail] =   useState('');
    const [senha, setSenha] =   useState('');            ////
    
    
    //CheckBox
    const [checkboxState, setCheckboxState] = React.useState(false);
    const [secState, setSecState] = React.useState(true);// define secure input true
    useEffect(()=>{
      if(checkboxState !== false){
        setSecState(false);
      }else{
        setSecState(true);
      }
    },[checkboxState])

    function loginFirebase(){
      firebase.auth().signInWithEmailAndPassword(email, senha)
        .then((user) => {
          const uidToken = user.user.uid;
          AsyncStorage.setItem('uid', uidToken)
            const estado = this.isAuthenticated = true; 
            navigation.dispatch(StackActions.replace('Inicio')); // IR PARA INICIO
        })
      .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert("Email ou Senha inválidos!");
        });
    }

    /// ANIMAÇÃO
    const [offset] = useState(new Animated.ValueXY({x: 0, y: 90}))
    const [opacity] = useState(new Animated.Value(0));
    const [logo] = useState (new Animated.ValueXY({x: 400, y: 400}))

    useEffect(() => {


      Animated.parallel([
        Animated.spring(offset.y, {
          toValue: 0,
          speed: 4,
          bounciness: 20,
          useNativeDriver: false,
        }),
        Animated.timing(opacity,{
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        })
      ]).start();
    },[]);


  return (
    <SafeAreaView style={styles.background}>
      
      
      <ScrollView style={{width:"100%"}}>
      <View style={{position:'relative',height:'100%', top:'50%'}}>
          <Animated.View 
          style={[
            styles.container,
            {
              opacity: opacity,
              transform: [
                {translateY: offset.y}
              ]
            }
            ]}
          >
          
            <TextInput
              placeholderTextColor={theme.dark.fontColor}
              style={styles.input}
              placeholder="Email"
              autoCorrect={false}
              autoCapitalize="none" // Desativa a primeira letra maiúscula
              keyboardType="email-address"
              onChangeText={email => setEmail(email)}
              value={email}
            />

            <TextInput
              placeholderTextColor={theme.dark.fontColor}
              style={styles.input}
              placeholder="Senha"
              autoCorrect={false}
              secureTextEntry={secState} // Caracter Senha
              onChangeText={senha => setSenha(senha)}
              value={senha}
            />
            <View style={{marginRight:'55%',marginBottom:30,width:'100%',alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
              <BouncyCheckbox
                style={{alignItems:'center', width:30, height:30}}
                fillColor={'#3399ff'}
                isChecked={checkboxState}
                disableBuiltInState
                iconStyle={{borderColor:theme.dark.fontColor}}
                onPress={() => setCheckboxState(!checkboxState)}
              />
              <Text style={{marginLeft:5, color:theme.dark.fontColor}}>Mostrar Senha</Text>
            </View>

            <TouchableOpacity style={styles.btnSumit} onPress={( )=>{loginFirebase()}}>
                <Text opacity={0.7} style={styles.submitText}>ENTRAR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnRegister}>
                <Text style={styles.registerText} onPress={() =>navigation.dispatch(StackActions.push('Registre'))}>NÃO POSSUI UMA CONTA? CLIQUE AQUI </Text>        
            </TouchableOpacity>
          
          </Animated.View>
        </View>
        </ScrollView>
    </SafeAreaView>
    
  );
}