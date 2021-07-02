import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView, FlatList, SafeAreaView, TextInput, NativeModules} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//Modal
import { WebView } from 'react-native-webview';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';

//Styles
import { styles } from './styles';

//Component
import { Header } from '../../components/Header';

import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialIcons';


import firebase from '../../../firebaseConfig';
import { theme } from '../../global/styles/theme';



//-------------------- Página inicial -----------------//


export default function MeusPosts() {
  // logout //
function sair(){
  firebase.auth().signOut().then(() => {
    AsyncStorage.clear();
    console.log('Saiu');
    NativeModules.DevSettings.reload();
  }).catch((error) => {
    console.log('Erro!');
  });
}
///// Buscar UID
  const [uidUsuario, setUid] = useState(null);
  const Buscar = async (chave)=>{
  const valor = await AsyncStorage.getItem(chave)
    setUid(valor);
  }
  Buscar('uid')
  ///////----//////

const database = firebase.firestore();
const [FiltroPublicacoes, setFiltroPublicacao] = useState([]);
const [usuario, setUsuario] = useState([]);

const [erroMsg, setErroMsg] = useState(null);
/*
  useEffect(() => {
    database
    .collection('publicacoes')
    .orderBy("dataehora","desc") // Exibir Decrescente
    .onSnapshot((query) => {
      const list = [];
      query.forEach((doc) => {
        list.push({...doc.data(), id: doc.id});
      });
        setPublicacao(list);
  });
   
  }); 
  */

useEffect(() => {
  database
  .collection('publicacoes')//.where("uid", "==", String(uidUsuario))
  .orderBy("dataehora", "desc")// Exibir Decrescente
  .onSnapshot((query) => {
    const list = [];
    query.forEach((doc) => {
      list.push({...doc.data(), id: doc.id});
    });
      setFiltroPublicacao(list.filter((item)=>{
        if(item.uid === String(uidUsuario)) {
            return true;
        }else{
          setErroMsg('Você ainda não publicou nada!');
          return false;
        }
      }));
  });
 
}); 




const modalizeRef = useRef(null);
const modalizeRef4 = useRef(null);
const modalizeRef5 = useRef(null);
const modalizeRef6 = useRef(null);
const modalizeRef7 = useRef(null);

// Dados Post
const [Ptitulo, setPtitulo] = useState('');
const [Pdescricao, setPdescricao] = useState('');
const [Puri, setPuri] = useState('');
const [Pid, setPid] = useState('');
const [url, setUrl] = useState('');


function onOpen(){
  modalizeRef.current?.open();
}

function onOpenMenuGerencia(){
  modalizeRef5.current?.open();
}
function onOpenEdit(){
  modalizeRef5.current?.close();
  modalizeRef6.current?.open();
}
function onOpenExcluir(){
  modalizeRef5.current?.close();
  modalizeRef7.current?.open();
}

async function Excluir (){

  await database.collection("publicacoes").doc(Pid).delete().then(() => {
       modalizeRef7.current?.close();
       setExcluirStatus(false)
     }).catch((error) => {
      modalizeRef7.current?.close();
     });

}

  return(
<SafeAreaView style={{ flex: 0, height: '100%', backgroundColor: theme.dark.backgroundcolor}}>
    <SafeAreaView forceInset={{ top: 'always' }} style={{backgroundColor: '#212121', flex: 1}}>


        <Header />
        
        <>
        <Text style={{color:theme.dark.fontColor,marginTop:'50%',position:'absolute',alignSelf:'center'}}>{erroMsg}</Text>
        </>

          <FlatList style={styles.conteudo}
            contentContainerStyle={{ paddingBottom: 95 }}
            showsVerticalScrollIndicator={false}
            data={FiltroPublicacoes}
            map={(item) => {item.id}}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
            
            function abrir(){
              setUrl(item.url);
              onOpen();
            }

            function infoPost(){
              setUrl(item.url);
              setPuri(item.uri);
              setPtitulo(item.nome);
              setPid(item.id);
              setPdescricao(item.descricao);
              onOpenMenuGerencia();
            }
              
          return (
                
            <View style={styles.box}>


                <View style={styles.viewPublicacao}>
                  <Image
                    source={{ uri: item.uri }}
                    style={styles.fotoPublicacao}
                  />
                  <View style={{alignItems:'center',justifyContent:'center',width:'100%', position:'absolute', borderRadius:10}}>
                      <TouchableOpacity 
                      style={styles.btnMore} onPress={()=>{infoPost()}}>
                        <Icon name="more-horiz" size={30} color={'#666666'} style={{}}/>
                      </TouchableOpacity>
                  </View>
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
                
          );}}/>
  
      <Portal>    
            <Modalize style={styles.modalView} ref={modalizeRef} snapPoint={700}>
              <View style={{paddingTop:10 ,width: '100%', height:700}}>
                <WebView
                source={{ uri: url }}
                />
              </View>
            </Modalize>


            <Modalize style={styles.modalView} ref={modalizeRef4} snapPoint={600}>
              <FlatList style={{marginTop:10 ,width: '100%', height:500}}
                vertival={true}
                data={usuario}
                keyExtractor={(item) => item.foto}
                renderItem={({ item }) => 
                  <PFusuario
                  foto={item.foto}
                  nome={item.nome}
                  sobrenome={item.sobrenome}
                  nicho={item.nicho}
                  email={item.email}
                />}/> 
            </Modalize>

            <Modalize style={styles.modalView} ref={modalizeRef5} snapPoint={300}>
              <ScrollView>
                <View style={{flex:1, justifyContent: 'center', width: '100%', height:280,}}>
                  
                  <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>{onOpenEdit()}}>
                    <View style={{marginLeft:20,width:'100%',height:'100%', flexDirection:'row'}}>
                      <View style={{marginBottom:10,alignItems:'center',justifyContent:'center',borderColor:'#000000', borderRadius:100,width:30,height:30,borderWidth:0.5}}>
                        <Icon name="edit" size={20} color={'#000000'}/>
                      </View>
                      <View style={{height: 40,width:'100%',marginLeft:10,borderBottomColor:'#d9d9d9',borderBottomWidth: 0.2,marginBottom: 10}}>
                        <Text style={{marginTop:5, fontSize:15}}>Editar</Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>{onOpenExcluir()}}>
                    <View style={{marginLeft:20,width:'100%',height:'100%', flexDirection:'row'}}>
                      <View style={{marginBottom:10,alignItems:'center',justifyContent:'center',borderColor:'#000000', borderRadius:100,width:30,height:30,borderWidth:0.5}}>
                        <Icon name="delete" size={20} color={'#000000'}/>
                      </View>
                      <View style={{height: 40,width:'100%',marginLeft:10,borderBottomColor:'#d9d9d9',borderBottomWidth: 0.2,marginBottom: 10}}>
                        <Text style={{marginTop:5, fontSize:15}}>Apagar</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
   
                  
                  </View>
              </ScrollView>
            </Modalize>

            <Modalize style={styles.modalView} ref={modalizeRef6} snapPoint={650}>
              <ScrollView style={{width:'100%',height:800}}>
                <View style={{flex:1, flexDirection:'column',alignItems:'center', justifyContent: 'center', width: '100%'}}>

                  <View style={{marginBottom:30,alignItems:'center',position:'relative',marginTop: 20,width:'100%', height:'100%'}}>
                    
                  <TouchableOpacity style={styles.viewPublicacao}>
                    <Image
                      source={{ uri: Puri }}
                      style={{width:'90%', marginTop:30, height:394, resizeMode:'cover', borderRadius:10}}
                    />
                  </TouchableOpacity>

                    <TextInput style={styles.imputModal} placeholder={Ptitulo} valor={Ptitulo}/>
                    <TextInput style={styles.imputModal} placeholder={Pdescricao} valor={Pdescricao}/>
                    <TextInput style={styles.imputModal} placeholder={url} valor={url}/>
                  
                    <TouchableOpacity style={{marginTop: 40,alignItems: 'center', justifyContent: 'center',width:'90%', height: 60, backgroundColor:'#3399ff', borderRadius: 10}}>
                      <Text style={{fontSize: 20, color:'#FFFFFF'}}>Atualizar</Text>
                    </TouchableOpacity>

                  </View>

                </View>
              </ScrollView>
            </Modalize>

            <Modalize style={styles.modalView} ref={modalizeRef7} snapPoint={300}>
              <ScrollView>
                <View style={{flex:1, justifyContent: 'center', width: '100%', height:280,}}>
                  <View style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}}>
                    <View style={{paddingLeft:40, paddingRight:40}}>
                      <Text style={{fontSize: 18, color:'#000000', textAlign:'center'}}>Deseja realmente excluir a publicação</Text>
                      <Text style={{marginTop:5,fontSize: 18, color:'#000000', textAlign:'center'}}>{Ptitulo}?</Text>
                    </View>
                    <TouchableOpacity onPress={()=>{Excluir()}} style={{marginTop: 40,alignItems: 'center', justifyContent: 'center',width:'90%', height: 60, backgroundColor:'#ff0000', borderRadius: 10}}>
                      <Text style={{fontSize: 20, color:'#FFFFFF'}}>Excluir</Text>
                    </TouchableOpacity>      
                  </View>         
                </View>
              </ScrollView>
            </Modalize>
          </Portal>   
    </SafeAreaView>
    </SafeAreaView>
    
  );
}