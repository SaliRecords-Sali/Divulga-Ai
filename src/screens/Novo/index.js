import React, {useEffect, useState, useRef} from 'react';
import {Animated, View, Text, TouchableOpacity, SafeAreaView, Image, ScrollView, TextInput, Keyboard} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../../../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import Complete from '../../../assets/complete.json';
import Lottie from 'lottie-react-native';
//Modal
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';


// Style
import { styles } from './styles';

//Component
import { Header } from '../../components/Header';

// Icones
import Icon from 'react-native-vector-icons/MaterialIcons';

// Global
import { theme } from '../../global/styles/theme';


//-------------------- Página inicial -----------------//


export default function App() {
  
  const [nome, setNome] =   useState('');
  const [descricao, setDescricao] =   useState('');
  const [nicho, setNicho] =   useState('');
  const [url, setUrl] =   useState('http://');
  const [uri, setUri] = useState('initialState');
  const [dataehora, setDataehora] = useState(new Date().toISOString());


      // Prograsso //\
 const AnimatedValue = new Animated.Value(0);
 
 
 const circleAnimate = () => {
   AnimatedValue.setValue(0)
   Animated.timing(
     AnimatedValue,
     {
       toValue: 1,
       duration: 20000,
       useNativeDriver: false
     }
   ).start( () => {})
 }
 const translateX = AnimatedValue.interpolate({
   inputRange:[0,1],
   outputRange:[0, 380]
 })

  //modal//
  const modalizeRef = useRef(null);
  function onOpen(){
    modalizeRef.current?.open();
  }

  const modalizeRef2 = useRef(null);
   function onOpenAlert(){
    modalizeRef2.current?.open();
  }

  //Hora
  const hora = new Date().getHours();
  const minuto = new Date().getMinutes();

  //Data
  const dia = new Date().getDay() -3;
  const mes = new Date().getMonth() +1;
  const ano = new Date().getFullYear();

  //Format Hora
  const [horaFormatado, setHFormat] = useState('');
  const [minFormatado, setMinFormat] = useState('');
  useEffect(()=>{
    if(hora < 10){
      setHFormat(`0${hora}`);
    }else{
      setHFormat(`${hora}`);
    }
    if(minuto < 10){
      setMinFormat(`0${minuto}`);
    }else{
      setMinFormat(`${minuto}`);
    }
  },[hora]);
  //Format Data
  const [diaFormatado, setDFormat] = useState('');
  const [mesFormatado, setMFormat] = useState('');
  useEffect(()=>{
    
    if(dia < 10){
      setDFormat(`0${dia}`);
    }else{
      setDFormat(`${dia}`);
    }
    if(mes < 10){
      setMFormat(`0${mes}`);
    }else{
      setMFormat(`${mes}`);
    }
  },[mes])

  const horamin = (`publicado ${diaFormatado}-${mesFormatado}-${ano} as ${horaFormatado}:${minFormatado}`);

  //firebase
  const database = firebase.firestore();

  //// Buscar uid
  const [uidUsuario, setUid] = useState(null);
  const Buscar = async (chave)=>{
  const valor = await AsyncStorage.getItem(chave)
  setUid(valor);
  }
  Buscar('uid')
  ///////

  // ------ Seleciona a Imagem -------- //

 const [image, setImage] = useState(null);


  

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });


    if (!result.cancelled) {
      setImage(result.uri)

    }
  };

  /// Fire Storage //

  const uploadImage = async () => {
    modalizeRef2.current?.close();
    const blob = await new Promise((resolve, reject)=> {
      const xhr = new XMLHttpRequest();
      xhr.onload = function(){
        resolve(xhr.response);
      };
      xhr.onerror = function(){
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', image, true);
      xhr.send(null);
    });

    const ref = firebase.storage().ref().child(new Date().toISOString());
    const snapshot = ref.put(blob);

    snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
      ()=>{
        setUploading(true)
      },
      (error)=>{
        setUploading(false);
        console.log('Erro');
        blob.closed();
        return;
      },
      ()=>{
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUri(url);
          setUploading(false);
          blob.closed();
          return url;
        })
      })
    

  }
  
  useEffect(() => {
    circleAnimate();
  }, [uri]);

  useEffect(() => {
    circleAnimate();
    if(uri !== 'initialState'){
      circleAnimate();
      salvarFirebase();
    }
  }, [uri]);

  function salvarFirebase(){

  


    if(uidUsuario === null){
      alert('Você precisa estar logado!');
    }else{
      if(uri !== 'nitialState'){
      database.collection('publicacoes').add({
        uid: uidUsuario,
        hora: horamin,
        nome: nome,
        descricao: descricao,
        nicho: nicho,
        url: url,
        uri: uri,
        dataehora: dataehora,
      });
      //onClosed();
      onOpen();
      //alert("Publicado com sucesso!");
      setImage(null);
      setNome();
      setDescricao();
      setNicho();
      setUrl('http://');
      setUri('initialState');
    }else{
      alert('A URI não está presente!');
    }
    }
    
  }



  return(
    
    <SafeAreaView style={{ flex: 0, height: '100%', backgroundColor: theme.dark.backgroundcolor}}>
      <SafeAreaView style={styles.backgound} onPress = {Keyboard.dismiss}>
        
        <Header />
        
        <ScrollView style={styles.scrollTela} showsVerticalScrollIndicator={false}>
        
          
          <View style={styles.conteudo}>
            

              <View style={styles.containerview}>
                <View style={styles.viewPublicacao}>
                  
                  <TouchableOpacity style={styles.viewPublicacao} onPress={pickImage}>
                  <Icon name="photo" size={60} color={'#3399ff'} style={{opacity:1, position:'absolute', marginTop:'45%'}}/>
                    <Image
                      source={{ uri: image}}
                      style={styles.fotoPublicacao}
                    />
                  </TouchableOpacity>
                </View>
                
                <TextInput
                  style={styles.input}
                  placeholder="Título"
                  placeholderTextColor={theme.dark.fontColor}
                  autoCorrect={true}
                  keyboardType="default"
                  onChangeText={nome => setNome(nome)}
                  value={nome}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Descrição"
                  placeholderTextColor={theme.dark.fontColor}
                  autoCorrect={true}
                  keyboardType="default"
                  onChangeText={descricao => setDescricao(descricao)}
                  value={descricao}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Nicho ex: Gameplay"
                  placeholderTextColor={theme.dark.fontColor}
                  autoCorrect={true}
                  keyboardType="default"
                  onChangeText={nicho => setNicho(nicho)}
                  value={nicho}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Url"
                  placeholderTextColor={theme.dark.fontColor}
                  autoCorrect={true}
                  keyboardType="url"
                  autoCapitalize="none"
                  onChangeText={url => setUrl(url)}
                  value={url}
                />
                
                <TouchableOpacity style={styles.btnSumit} onPress={( )=>{onOpenAlert()}}>
                  <Animated.View style={{backgroundColor: '#000000', opacity:0.1, position:'absolute' ,width: '100%' ,height: 60, transform: [{translateX: translateX}]}}>
                    
                  </Animated.View>
                  <View style={{alignItems:'center', justifyContent:'center'}}>
                    <Text style={styles.submitText}>PUBLICAR</Text>
                  </View>
                </TouchableOpacity>
                
                </View>
            </View>
        </ScrollView>
        
        <Portal>
          <Modalize style={styles.modalView} ref={modalizeRef} snapPoint={600}>
            <View style={{flex:1,marginRight: '29%', marginLeft: '29%' ,marginTop:'20%',width: 200, height: 200}}>
              <Lottie source={Complete} autoPlay loop/>
            </View>
          </Modalize>

          <Modalize style={styles.modalView} ref={modalizeRef2} snapPoint={300}>
            <View style={{alignItems: 'center',}}>
              <View style={{flex:1, alignItems: 'center', justifyContent: 'center' , marginTop:'20%', width: '100%', height: '100%'}}>
                <Text>Deseja realmente publicar?</Text>
                <TouchableOpacity style={styles.btnSumit} onPress={( )=>{uploadImage()}}>
                  <View style={{alignItems:'center', justifyContent:'center'}}>
                    <Text style={styles.submitText}>PUBLICAR</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Modalize>
        </Portal>
      </SafeAreaView>
    </SafeAreaView>
  );
}