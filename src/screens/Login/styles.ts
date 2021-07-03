import { theme } from "../../global/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    background:{
      flex:1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.dark.backgroundcolor,
    },
  
    containerLogo:{
       flex: 1,
       justifyContent: "center",
       transform: [{ scale: 0.3 }],
    },
  
    container:{
      flex: 1,
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      paddingVertical:10,
    },
  
    input:{
      backgroundColor: theme.dark.backgroundcolor,
      width: "90%",
      marginBottom: 15,
      color: "#666666",
      fontSize: 17,
      borderRadius: 5,
      borderWidth: 0.2,
      borderBottomColor: theme.dark.fontColor,
      padding: 15,
    },
  
    btnSumit:{
      backgroundColor: '#3399ff',
      width: "90%",
      height: 60,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 10,
    },
  
    submitText:{
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "bold",
    },
  
    btnSocial:{
      width: 50,
      height: 50,
      borderRadius: 25,
      borderWidth: 0.2,
      borderColor:theme.header.colors.titleColor,
      backgroundColor: theme.dark.backgroundcolor,
      alignItems:'center',
      justifyContent:'center',
      alignSelf:'center',
      overflow: 'hidden',
      marginHorizontal: 10,
    },

    social:{
      marginTop:20,
      flexDirection:'row',
      flex:1,
    },

    footer:{
      width: '100%',
      height: 60,
      borderTopColor: theme.dark.fontColor,
      borderTopWidth: 0.2,
    },
    btnRegister:{
      flex: 1,
      height: 60,
      alignSelf:'center',
      justifyContent:'center',
    },

    registerText:{
      color: theme.dark.fontColor,
    },
  
    labelText:{
      color: "#666666",
    },
  
  });