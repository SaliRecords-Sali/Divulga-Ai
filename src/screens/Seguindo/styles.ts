import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({

    foto:{
      flex: 1,
      justifyContent: 'center',
      height: 80,
      marginLeft: 15,
      maxWidth: '15%',
    },
  
    containerview:{
      flex: 1,
      flexDirection: 'column',
      marginTop: 16,
      marginBottom: 15,
    },
  
    info:{
      flex: 1,
      height: 80,
      alignItems: 'center',
      maxWidth: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
    },
  
    title:{
      flex: 1,
      maxHeight:'100%',
      maxWidth: '50%',
    },
  
    descricao:{
      flex: 1,
      maxHeight:'100%',
      maxWidth: '100%',
    },
  
    hora:{
      flex: 1,
      alignItems: 'center',
      maxHeight:'100%',
      maxWidth: '50%',
    },
  
    botao:{
      justifyContent: 'center',
      height: 80,
      maxWidth: '20%',
      marginRight: 15,
      marginLeft: 10,
    },
  
    backgound:{
      backgroundColor: '#FFFFFF',
    },
  
    scrollTela:{
      height: '88%',
      paddingTop:10,
      marginBottom:140,
    },
  
    conteudo:{
      paddingBottom:70,
    },
  
    box:{
      flex: 1,
      height: 80,
      backgroundColor: '#FFFFFF',
      marginBottom: 10 ,
      marginRight: 10,
      marginLeft: 10,
      borderColor: '#FFFFFF',
      borderRadius: 10,
      borderWidth: 0.2,
      flexDirection: 'row',
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
    },
  })