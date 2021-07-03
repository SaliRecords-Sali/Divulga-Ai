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

// Icon
import Icon from '@expo/vector-icons/Entypo';
//import Social from '@expo/vector-icons/EvilIcons';
import Social from '@expo/vector-icons/FontAwesome';


export default function Login({ navigation }) {
    // LOGIN

    const [email, setEmail] =   useState('');
    const [senha, setSenha] =   useState('');            ////

    // Verifica
    const [emailVerificado, setEmailVerificado] =   useState(false);
    const [senhaVerificada, setSenhaVerificada] =   useState(false);
    // Erro
    const [erroEmail, setErroEmail] = useState('');
    const [erroSenha, setErroSenha] = useState('');

    // Erro Cor Borda
    const [InputEmail, setInputEmail] = useState();
    const [InputBottomEmail, setInputBottomEmail] = useState(theme.dark.fontColor);

    const [InputSenha, setInputSenha] = useState();
    const [InputBottomSenha, setInputBottomSenha] = useState(theme.dark.fontColor);
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

    // Zera conf. input
    useEffect(()=>{
      setErroEmail('');
      setInputEmail();
      setInputBottomEmail(theme.dark.fontColor);
      setEmailVerificado(false);
    },[email]);

    useEffect(()=>{
      setErroSenha('');
      setInputSenha();
      setInputBottomSenha(theme.dark.fontColor);
      setSenhaVerificada(false);
    },[senha]);

    useEffect(()=>{
      if(emailVerificado !== false){
        loginFirebase();
      }
    },[emailVerificado]);

    function VerificaEmail(){
      if(email !== ''){
        if(email.indexOf("@") != -1){
          if(email.indexOf(".com") != -1){
            setEmailVerificado(true);
          }else{
            setErroEmail('Seu email não é válido!');
            setInputEmail('red');
            setInputBottomEmail('red');
          }
        }else{
          setErroEmail('Seu email não é válido!');
          setInputEmail('red');
          setInputBottomEmail('red');
        }    
      }else{
        setErroEmail('Este campo é necessário para proceguir!');
        setInputEmail('red');
        setInputBottomEmail('red');
      }
    }

    function VerificaSenha(){
      if(senha !== ''){
        if((senha).length > 7){
          setSenhaVerificada(true);
        }else{
          setErroSenha('Sua senha não contém oito caractéres!');
          setInputSenha('red');
          setInputBottomSenha('red');
        }
      }else{
        setErroSenha('Este campo é necessário para proceguir!');
        setInputSenha('red');
        setInputBottomSenha('red');
      }
    }
    function logar(){
      firebase.auth().signInWithEmailAndPassword(email, senha)
        .then((user) => {
          const uidToken = user.user.uid;
          AsyncStorage.setItem('uid', uidToken)
            const estado = this.isAuthenticated = true; 
            navigation.dispatch(StackActions.replace('Inicio')); // IR PARA INICIO
        })
        .catch((error) => {
          setErroSenha('Usuario ou senha inválidos!');
          setErroEmail('Usuario ou senha inválidos!');
          setInputSenha('red');
          setInputBottomSenha('red');
          setInputEmail('red');
          setInputBottomEmail('red');
        });
        
    }

    function loginFirebase(){
      // Verificação
      if((senhaVerificada)&&(emailVerificado) === true){
        logar();
      }else{
        VerificaEmail();
        VerificaSenha();
      }
    }

    /// ANIMAÇÃO
    const [offset] = useState(new Animated.ValueXY({x: 0, y: 90}))
    const [opacity] = useState(new Animated.Value(0));

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
      
      

      <ScrollView 
      showsVerticalIndicator={false}
      showsHorizontalIndicator={false}
      style={{width:"100%"}}>
      <View style={{justifyContent:'center', paddingVertical:'40%'}}>
        <View>
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
                style={[styles.input,{borderColor:InputEmail, borderBottomColor:InputBottomEmail}]}
                placeholder="Email"
                autoCorrect={false}
                autoCapitalize="none" // Desativa a primeira letra maiúscula
                keyboardType="email-address"
                onChangeText={email => setEmail(email)}
                value={email}
              />
              <>
              <Text style={{color:'red', marginTop:-10, marginBottom:5, opacity:0.5}}>{erroEmail}</Text>
              </>
              <TextInput
                errorMessage={erroSenha}
                placeholderTextColor={theme.dark.fontColor}
                style={[styles.input,{borderColor:InputSenha, borderBottomColor:InputBottomSenha}]}
                placeholder="Senha"
                autoCorrect={false}
                secureTextEntry={secState} // Caracter Senha
                onChangeText={senha => setSenha(senha)}
                value={senha}
              />
              <>
              <Text style={{color:'red', marginTop:-10, marginBottom:5, opacity:0.5}}>{erroSenha}</Text>
              </>
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

              {/* Btn Login */}
              <TouchableOpacity style={styles.btnSumit} onPress={( )=>{loginFirebase()}}>
                  <Text opacity={0.7} style={styles.submitText}>ENTRAR</Text>
              </TouchableOpacity>
              
              {/* Redes Sociais */}
              <View style={{borderBottomColor:theme.dark.fontColor, borderBottomWidth:0.2, width: '80%', marginTop:20}}/>
              <View style={styles.social}>
                <TouchableOpacity style={styles.btnSocial}>
                  <Social name="google" size={30} color={theme.dark.fontColor}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnSocial}>
                  <Social name="facebook" size={27} color={theme.dark.fontColor}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnSocial}>
                  <Social name="apple" size={20} color={theme.dark.fontColor}/>
                </TouchableOpacity>
              </View>

              
            
            </Animated.View>
          </View>
        </View>
        </ScrollView>
        <View style={styles.footer}>
          {/* Btn Registre */}
          <TouchableOpacity style={styles.btnRegister}>
                <Text style={styles.registerText} onPress={() =>navigation.dispatch(StackActions.push('Registre'))}>NÃO POSSUI UMA CONTA? CLIQUE AQUI </Text>        
            </TouchableOpacity>
        </View>
    </SafeAreaView>
    
  );
}