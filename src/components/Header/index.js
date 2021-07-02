import React, {useEffect, useState, useRef} from "react"
import {ScrollView ,Image, View, TouchableOpacity, Text, FlatList, NativeModules } from "react-native";
import firebase from '../../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
//Modal
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';

// Style
import { styles } from "./styles";

// Ícones
import Icon from '@expo/vector-icons/MaterialIcons';
//Global
import { theme } from "../../global/styles/theme";

export function Header(){

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
  const datauser = firebase.firestore();
  const [publicacoes, setPublicacao] = useState([]);
  const [usuario, setUsuario] = useState([]);
  
  
  
  useEffect(() => {
    database
    .collection('publicacoes')
    //.where("uid", "=",String(uidUsuario))   // Filtra apenas este nome
    .orderBy("dataehora","desc") // Exibir Decrescente
    .onSnapshot((query) => {
      const list = [];
      query.forEach((doc) => {
        list.push({...doc.data(), id: doc.id});
      });
        setPublicacao(list);
        
  
    });
   
  }, []); 
  
  /// Busca usuario
  useEffect(()=>{
    datauser
    .collection('usuarios').where("uid", "==", String(uidUsuario))     // Filtra apenas este nome
    .onSnapshot((query) => {
      const listUsuario = [];
      query.forEach((doc) => {
        listUsuario.push(doc.data());
      });
      setUsuario(listUsuario);
    });
   },[publicacoes]);
  
  const modalizeRef2 = useRef(null);
  const modalizeRef3 = useRef(null);
  const modalizeRef4 = useRef(null);
  
  
  
  
  function onOpenAlert(){
    modalizeRef3.current?.close();
    modalizeRef2.current?.open();
  }
  
  function onOpenMenu(){
    modalizeRef3.current?.open();
  }
  
  function onOpenPerfil(){
    modalizeRef3.current?.close();
    modalizeRef4.current?.open();
  }
  
  // perfil do usuario //
  function PFusuario({foto,nome,sobrenome,nicho,email} ){
    return(
      <View style={{width:'100%', height:400, justifyContent:'center', flex:1}}>
        <View style={{width:'100%',height:'30%',paddingLeft:10,justifyContent:'center',}}>
          <Image
            source={{ uri: foto }}
            style={{width:100, height:100, borderRadius:100,borderColor:'#000000', borderWidth:2}}
          />
          
        </View>
        <View style={{width:'100%', height: 200,paddingLeft: 15, marginTop: 20,flex:1, flexDirection:'column'}}>
          <Text style={{fontSize:25, marginBottom: 10}}>{nome} {sobrenome}</Text>
          <Text style={{fontSize:15, marginBottom: 10}}>{email}</Text>
          <Text style={{fontSize:15, marginBottom: 10}}>{nicho}</Text>
  
          <TouchableOpacity style={{alignItems:'center',justifyContent:'center',height: 35,width: 120,borderRadius: 5,borderWidth:1,borderColor:'#666666'}}>
            <Text>Editar Perfil</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
    return(
        <>
        <View style={styles.header}>
            <Text style={styles.nomeapp}>Divulga Ai</Text>

            <TouchableOpacity onPress={()=>{onOpenMenu()}}>
                <Icon name="menu" size={30} color={theme.colors.secondary100}/>
            </TouchableOpacity>
        </View>

        <Portal>
          <Modalize 
          styles={styles.modalView} 
          ref={modalizeRef2} 
          snapPoint={300}>
            
            <View style={{flex:1, alignItems: 'center' ,width: '100%'}}>
              <Text style={{fontSize: 15, paddingTop: '20%'}} >Deseja realmente sair?</Text>
              <TouchableOpacity style={styles.btnSair} onPress={()=>{sair()}}>
                  <Text style={styles.sairText}>Sim</Text>
              </TouchableOpacity>
            </View>
          </Modalize>

          <Modalize style={styles.modalView} ref={modalizeRef3} snapPoint={300}>
            
              <View style={{flex:1,justifyContent: 'center', width: '100%', paddingTop:40}}>
                  
                  <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>{onOpenPerfil()}}>
                  <View style={{marginLeft:20,width:'100%', flexDirection:'row'}}>
                      <View style={{marginBottom:10,alignItems:'center',justifyContent:'center',borderColor:'#000000', borderRadius:100,width:30,height:30,borderWidth:0.5}}>
                      <Icon name="person" size={20} color={'#000000'}/>
                      </View>
                      <View style={{height: 40,width:'100%',marginLeft:10,borderBottomColor:'#d9d9d9',borderBottomWidth: 0.2,marginBottom: 10}}>
                      <Text style={{marginTop:5, fontSize:15}}>Minha conta</Text>
                      </View>
                  </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>{onOpenAlert()}}>
                  <View style={{marginLeft:20,width:'100%', flexDirection:'row'}}>
                      <View style={{marginBottom:10,alignItems:'center',justifyContent:'center',borderColor:'#000000', borderRadius:100,width:30,height:30,borderWidth:0.5}}>
                      <Icon name="logout" size={20} color={'#000000'}/>
                      </View>
                      <View style={{height: 40,width:'100%',marginLeft:10,borderBottomColor:'#d9d9d9',borderBottomWidth: 0.2,marginBottom: 10}}>
                      <Text style={{marginTop:5, fontSize:15}}>Sair</Text>
                      </View>
                  </View>
                  </TouchableOpacity>

                
                </View>
           
          </Modalize>

          <Modalize style={styles.modalView} ref={modalizeRef4} snapPoint={600}>
            <FlatList style={{marginTop:10 ,width: '100%'}}
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
        </Portal>
    </>
    )
}
