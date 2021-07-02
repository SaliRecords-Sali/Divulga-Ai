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
  Image,
} from'react-native';
import firebase from '../../../firebaseConfig';
import { styles } from './styles';
import BouncyCheckbox from "react-native-bouncy-checkbox";
// Glogal
import { theme } from '../../global/styles/theme';

// Icon
import Icon from 'react-native-vector-icons/MaterialIcons';
import Back from 'react-native-vector-icons/Entypo';

export default function Registre({ navigation, route }) {

  const [nome, setNome] =   useState('');
  const [sobrenome, setSobrenome] =   useState('');
  const [email, setEmail] =   useState('');
  const [nicho, setNicho] =   useState('');
  const [senha, setSenha] =   useState('');
  const [confsenha, setConfSenha] =   useState('');

  const database = firebase.firestore();
  const [usuarios, setUsuarios] = useState([]);
     
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


  function registrarFirebase(){
    if (email === ""){
      alert("Preencha seu email!");
    }else{
      if (senha===""){
        alert("Preencha sua senha!");
      }else{
        if (senha.length < 8){
          alert("Sua senha deve conter ao menos oito caracteres!");
        }else{
          if (senha === confsenha){
              firebase.auth().createUserWithEmailAndPassword(email, senha)
                .then((user) => {
                  const uidToken = user.user.uid ;
                  database.collection('usuarios').add({
                    uid: uidToken,
                    nome: nome,
                    sobrenome: sobrenome,
                    email: email,
                    nicho: nicho,
                  });
                  alert("Usuário registrado com sucesso!"), 2000
                  navigation.dispatch(StackActions.popToTop())
                })
                .catch((error) => {
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  // ..
                });
            }else{
              alert("Senha e Confirmar senha são diferentes!");
            }
        }
      }
    }
  }



  const [offset] = useState(new Animated.ValueXY({x: 0, y: 90}))
  const [opacity] = useState(new Animated.Value(0));

  useEffect(()=> {
 

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20,
        useNativeDriver: false
      }),
      Animated.timing(opacity,{
        toValue: 1,
        duration: 200,
        useNativeDriver: false
      })
    ]).start();
  },[]);





return (
  
  <SafeAreaView style={styles.background}>
    
    <View style={styles.header}>
      <TouchableOpacity style={styles.btnVoltar} onPress={() =>navigation.dispatch(StackActions.popToTop())}>
        <Back name="chevron-thin-left" size={24} color={theme.dark.fontColor}/>       
      </TouchableOpacity>
    </View>

    <ScrollView style={{width:'100%'}}>
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
        <TouchableOpacity activeOpacity={0.5} style={styles.viewImg}>
          <Icon name="photo" size={60} color={theme.dark.fontColor} style={{opacity:1, position:'absolute', alignSelf:'center', top:'30%'}}/>
          <Image style={styles.img} resizeMode={'contain'} source={{uri:'https://media-exp1.licdn.com/dms/image/C4D03AQGMGNS2W_tT4w/profile-displayphoto-shrink_200_200/0/1622397670677?e=1628726400&v=beta&t=W7avAkCFy8odTQEDAFBwk88N-f6mWh2_UdJxcdSbuFo'}}/>
        </TouchableOpacity>

        <TextInput
          placeholderTextColor={theme.dark.fontColor}
          style={styles.input}
          placeholder="Nome"
          autoCorrect={false}
          onChangeText={nome => setNome(nome)}
          value={nome}
        />

        <TextInput
          placeholderTextColor={theme.dark.fontColor}
          style={styles.input}
          placeholder="Sobrenome"
          autoCorrect={false}
          onChangeText={sobrenome => setSobrenome(sobrenome)}
          value={sobrenome}
        />

        <TextInput
          placeholderTextColor={theme.dark.fontColor}
          style={styles.input}
          placeholder="Email"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={email => setEmail(email)}
          value={email}
        />
        <TextInput
          placeholderTextColor={theme.dark.fontColor}
          style={styles.input}
          placeholder="Nicho"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="default"
          onChangeText={nicho => setNicho(nicho)}
          value={nicho}
        />

        <TextInput
          placeholderTextColor={theme.dark.fontColor}
          style={styles.input}
          placeholder="Senha"
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={secState} // Caracter Senha
          onChangeText={senha => setSenha(senha)}
          value={senha}
        />

        <TextInput
          placeholderTextColor={theme.dark.fontColor}
          style={styles.input}
          placeholder="Confirme sua Senha"
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={secState} // Caracter Senha
          onChangeText={confsenha => setConfSenha(confsenha)}
          value={confsenha}
        />
        <View style={{width:100, alignItems:'flex-start'}}>
          <View style={{marginLeft:20,marginBottom:30,marginTop:10,width:'100%',alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
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
        </View>

        <TouchableOpacity style={styles.btnSumit} onPress={( )=>{registrarFirebase()}}>
          <Text style={styles.submitText}>REGISTRAR</Text>
        </TouchableOpacity>
      
    </Animated.View>
    </ScrollView>
</SafeAreaView >


);
}