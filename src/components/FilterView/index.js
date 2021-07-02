import React, {useEffect, useState, Component} from "react";
import { View, Text, ScrollView, TouchableOpacity, FlatList  } from "react-native";
import { LinearGradient } from 'expo-linear-gradient'

// Base de dados
import firebase from '../../../firebaseConfig';

// Styles
import { styles } from "./styles";

// Icones
import { Feather } from "@expo/vector-icons/"
import { theme } from "../../global/styles/theme";

export function FilterView () {
    const databaseFilter = firebase.firestore();
    const [exibefiltros, setExibeFiltros] = useState([]);


    const [valorFiltro, setValor] = useState('');

    

    const { secondary80, secondary100 } = theme.colors;

   
    

    useEffect(() => {
        databaseFilter
        .collection('filtros')
        //.where("uid", "=",String(uidUsuario))   // Filtra apenas este nome
        .orderBy("id","desc") // Exibir Decrescente
        .onSnapshot((query) => {
          const list = [];
          query.forEach((doc) => {
            list.push({...doc.data(), id: doc.id});
          });
            setExibeFiltros(list);
        });
      }, []); 
    return(
        
        
        <View style={ styles.container}>
            <TouchableOpacity style={styles.btn} activeOpacity={0.5}>
                <Text style={styles.textBtn}>Mostrar Tudo</Text> 
            </TouchableOpacity>  
            <LinearGradient
            style={{width: '100%', flex:1}}
            colors={[secondary100, secondary80, secondary100]}
            >
                <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{width: '100%', flex:1}}
                data={exibefiltros}
                keyExtractor={(item => item.id)}
                renderItem={({ item }) => {
                    function setar(){
                        setValor(item.nome)
                    }
                    return(
                    <View style={styles.content}>
                        <TouchableOpacity onPress={()=>{setar()}} style={styles.box}>
                            <Text style={styles.title}>{item.nome}</Text>
                        </TouchableOpacity>    
                    </View>
                )}}/>
            </LinearGradient>
        </View>
    )
}