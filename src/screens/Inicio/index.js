import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getBottomSpace } from 'react-native-iphone-x-helper';
//Modal
import { Modalize } from 'react-native-modalize'; 
import { Host, Portal } from 'react-native-portalize';
import { WebView } from 'react-native-webview';

// Style
import { styles } from './styles'


//// Páginas
import Seguindo from '../Seguindo';
import Novo from '../Novo';
import MeusPosts from '../MeusPosts';
import Pesquisa from '../Pesquisar';


// Ícones
import Entypo from '@expo/vector-icons/Entypo';
import Icon from '@expo/vector-icons/MaterialIcons';

// Components
import ButtonNew from '../../components/ButtonNew';
import { Header } from '../../components/Header';
import { FilterView } from '../../components/FilterView';

// Navegação
import { NavigationContainer, ThemeProvider} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firebase from '../../../firebaseConfig';
import { theme } from '../../global/styles/theme';





//-------------------- Página inicial -----------------//


export function Inicio(navigation,props) {

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

// Nicho 
const [meuNicho, setMeuNicho] = useState('');
// ======///

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
      setPublicacao(list.filter((item)=>{
        if(item.uid !== String(uidUsuario)) {
          if(meuNicho !== '') {
            if(item.nicho.toLowerCase() === String(meuNicho).toLocaleLowerCase()) {
              return true;
            }
          }else{
            return true;
          }
        }else{
          return false;
        }
      }));
      

  });
 
}, [uidUsuario]); 

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

const modalizeRef = useRef(null);
const [url, setUrl] = useState('');


function onOpen(){
  modalizeRef.current?.open();
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

<SafeAreaView style={{ flex: 0, height: '100%', backgroundColor: theme.dark.backgroundcolor}}>
  <SafeAreaView forceInset={{ top: 'always' }} style={{ backgroundColor: '#212121', flex: 1}}>

            <Header />
            <FilterView/>
            

            <FlatList style={styles.conteudo}
              contentContainerStyle={{ paddingBottom: 95 }}
              data={publicacoes}
              map={(item) => {item.id}}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              bounces={false}
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

            );}}/>
            
            <Portal>
              <Modalize style={[styles.modalView]} ref={modalizeRef} snapPoint={650}>
                <View style={{paddingTop:10 ,width: '100%', height:700}}>
                  <WebView
                  javaScriptEnabled={true}
                  sound={true}
                  source={{ uri: url }}
                  />
                </View>
              </Modalize> 
            </Portal>         
      </SafeAreaView>
    </SafeAreaView>

  );
}

// Navigation
export default function App(){
  const Tab = createBottomTabNavigator();
  
  return (
 <>

      <NavigationContainer independent={true}>
        <Host>
        <Tab.Navigator

          tabBarOptions={{
            activeTintColor: '#3399ff',
            inactiveTintColor: '#999999',
            showLabel: false,

            style: {
              marginBottom: getBottomSpace() + 10,
              position: 'absolute',

              backgroundColor: theme.dark.backgroundcolor,
              borderWidth:0.2,
              borderColor: '#FFF',
              height: '10%',
              borderRadius: 100,
              marginHorizontal:20,
              opacity: 0.9,
              //borderTopRightRadius: 40,
              //borderTopLeftRadius: 40,
          },
          }}
          //forceInset={{ bottom: 'always', top: 'never' }} 
        >
        <Tab.Screen 
          name="Inicio" 
          component={ Inicio } 
          options={{
          tabBarIcon: ({ size, color }) => (
          <Icon name="home" size={size} color={color}/>
          ),
        }}
        />

        <Tab.Screen 
          name="Seguindo" 
          component={ Seguindo }
          options={{
          tabBarIcon: ({ size, color }) => (
          <Entypo name="rocket" size={size} color={color}/>
          ),
        }}
        />

        <Tab.Screen 
          name="Novo" 
          component={ Novo }
          options={{
          tabBarLabel: '',
          tabBarIcon: ({ size, color }) => (
          <ButtonNew size={size} color={color}/>
          ),
        }}
        />

        <Tab.Screen 
          name="Meus Posts" 
          component={ MeusPosts }
          options={{
          tabBarIcon: ({ size, color }) => (
          <Icon name="person" size={size} color={color}/>
          ),
        }}
        />

        <Tab.Screen 
          name="Pesquisar" 
          component={ Pesquisa }
          options={{
          tabBarIcon: ({ size, color }) => (
          <Icon name="search" size={size} color={color}/>
          ),
        }}
        />

      </Tab.Navigator>
      </Host>
    </NavigationContainer>

</>
  );
}