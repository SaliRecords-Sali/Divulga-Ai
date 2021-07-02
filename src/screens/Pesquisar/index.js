import React, {useState, useEffect,useRef } from 'react';
import {View, Text, TouchableOpacity, Image, Keyboard, FlatList, SafeAreaView, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../../../firebaseConfig';
import { WebView } from 'react-native-webview';
import { Modalize } from 'react-native-modalize';

// Style
import { styles } from './styles';

//Component
import { Header } from '../../components/Header';

// Icones
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../global/styles/theme';


//-------------------- Página inicial -----------------//


export default function App() {
  ///// Buscar UID
const [uidUsuario, setUid] = useState(null);
const Buscar = async (chave)=>{
  const valor = await AsyncStorage.getItem(chave)
  setUid(valor);
}
Buscar('uid')
///////----//////

const database = firebase.firestore();
const datauser = firebase.firestore();

const [publicacoes, setPublicacao] = useState([]);
const [usuario, setUsuario] = useState([]);
const [erro, setErro] = useState('');

const [valorpesquisa, setPesquisa] = useState('');


  useEffect(() => {

      database
      .collection('publicacoes')
      .orderBy("nome", "asc")// Exibir Decrescente
      .onSnapshot((query) => {
        const list = [];
        query.forEach((doc) => {
          list.push({...doc.data(), id: doc.id});
        });
    
      if(valorpesquisa === ''){
        setErro('Você ainda não pesquisou nada!');

        setPublicacao(null);
      }else{
        setErro('');
        setPublicacao(list.filter((item) =>{  
      
          if(item.nicho.toLowerCase().indexOf(valorpesquisa.toLowerCase()) > -1) {
            return true;
          }else{
            if(item.nome.toLowerCase().indexOf(valorpesquisa.toLowerCase()) > -1) {
              return true;
            }else{
              if(item.descricao.toLowerCase().indexOf(valorpesquisa.toLowerCase()) > -1) {
                return true;
              }else{
                return false;
              }
          } }
        }));
      }
    
  });
}, [valorpesquisa]);

  useEffect(() => {
    datauser
    .collection('usuarios').where("uid", "==", String(uidUsuario))     // Filtra apenas este nome
    .onSnapshot((query) => {
      const listUsuario = [];
      query.forEach((doc) => {
        listUsuario.push(doc.data());
      });
  
      setUsuario(listUsuario);
  
    });
  }, []);

//Modal
const modalizeRef = useRef(null);
const [url, setUrl] = useState('');



function onOpen(){
  modalizeRef.current?.open();
}

  return(
    <SafeAreaView style={{ flex: 0, height: '100%', backgroundColor: theme.dark.backgroundcolor}}>
    <SafeAreaView style={styles.backgound} onPress = {Keyboard.dismiss}>

      <Header />

      <View style={styles.pesquisa} >
        <View style={styles.containerpesquisa} >
          <Icon style={styles.icon} name="search" size={20} color={'#666666'}/>
          <TextInput
            style={styles.barrapesquisa}
            placeholder="Pesquisar"
            autoCorrect={true}
            onChangeText={valorpesquisa => setPesquisa(valorpesquisa)}
            value={valorpesquisa}
          />
        </View>
      </View>
      <>
      <Text style={{color:theme.dark.fontColor,marginTop:'50%',position:'absolute',alignSelf:'center'}}>{erro}</Text>
      </>
      <FlatList
        contentContainerStyle={{paddingTop:10, paddingBottom:'47%' }}
        style={styles.conteudo,{}}
        data={publicacoes}
        extraData={publicacoes}
        map={(item) => {item.id}}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {

          function abrir(){
            setUrl(item.url);
            onOpen();
          }
                
        return (
                  
          <View style={styles.box}>
            <View style={styles.viewPublicacao}>
              <Image
                source={{ uri: item.uri }}
                style={styles.fotoPublicacao}
              />
              <TouchableOpacity style={styles.btnPlay} onPress={()=>{abrir()}}>
                <Entypo name="youtube" size={60} color={'#FFF'} style={{opacity:0.5}}/>
              </TouchableOpacity>
            </View>

            <View style={styles.foto}>
              <TouchableOpacity>
                <Image
                  source={require('../../assets/logo.png')}
                  style={{width: 40, height: 40, borderRadius: 100, borderColor: '#FFFFFF', borderWidth: 1}}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.title}>
              <Text style={styles.nome}>
                {item.nome}
              </Text>
              <Text>
                {item.hora}
              </Text>
            </View>

            <View style={styles.descricao}>
              <Text>
                {item.descricao}
              </Text>
            </View>

          </View>
                  
      )}}/>
          
      <Modalize style={styles.modalView} ref={modalizeRef} snapPoint={600}>
        <View style={{paddingTop:10 ,width: '100%', height:580}}>
          <WebView
            source={{ uri: url }}
          />
        </View>
      </Modalize> 

    </SafeAreaView>
  </SafeAreaView>
  );
}