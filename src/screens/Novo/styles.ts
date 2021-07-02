import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({

    viewPublicacao:{
      padding: 10,
      alignItems: 'center',
      flex: 1,
      width: '100%',
      height: 394,
      marginBottom: 40,
    },
  
    nomeapp:{
      fontSize: 20,
      fontWeight:'bold',
      color: '#3399ff'
    },
  
    fotoPublicacao:{
      borderRadius: 10,
      borderWidth: 0.2,
      resizeMode: 'cover',
      width: '100%',
      height: 394,
      borderColor:theme.dark.fontColor
    },
  
    input:{
      backgroundColor: "transparent",
      width: "90%",
      marginBottom: 15,
      color: theme.dark.fontColor,
      fontSize: 17,
      borderRadius: 5,
      borderWidth: 0.2,
      borderColor: theme.dark.fontColor,
      padding: 15,
    },
  
    btnSumit:{
      marginTop: '20%',
      backgroundColor: '#3399ff',
      width: "90%",
      height: 60,
      borderRadius: 5,
      justifyContent: "center",
      marginBottom: 10,
      overflow: 'hidden',
    },
  
    submitText:{
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "bold",
    },
  
    containerview:{
      justifyContent:'center',
      alignItems:'center',
      flex: 1,
      flexDirection: 'column',
      paddingBottom: '10%',
    },
  
    backgound:{
      height: '120%',
    },
  
    header:{
      position: 'relative',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      paddingRight: 10,
      paddingLeft: 10,
      borderBottomWidth: 0.2,
      height: 50,
      borderBottomColor: '#666666',
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
      width: '95%',
      height: 500,
      marginBottom: 10,
      marginRight: 10,
      marginLeft: 10,
      borderColor: theme.dark.fontColor,
      borderRadius: 10,
      borderWidth: 0.2,
      flexDirection: 'column',
      shadowColor: theme.dark.fontColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
    },
  
    modalView:{
      flex: 1,
      top:0,
      marginTop:'10%',
      padding: '10%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
  