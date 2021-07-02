import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  header:{
    zIndex:3,
    position: 'relative',
    top:0,
    width: '100%',
    height: 60,
    borderBottomWidth:0.2,
    backgroundColor:theme.dark.backgroundcolor,
    borderBottomColor:theme.dark.fontColor,
    paddingHorizontal: 20,
  },
  btnVoltar:{
    flex: 1,
    justifyContent:'center',
    alignSelf:'flex-start',
    width: 30,
    height: 30,
  },

  background:{
      flex: 1,
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.dark.backgroundcolor,
    },
  
  containerLogo:{
    marginTop: '10%',
    width: '100%',
    height: 110,
    justifyContent: "center",
    transform: [{ scale: 0.30 }],
  },
  
  container:{
    paddingHorizontal:20,
    width: "100%",
    //paddingBottom: 50,
    marginBottom: 150,
    marginTop: 30,
  },

  viewImg:{
    alignSelf:'center',
    flex: 1,
    backgroundColor:theme.dark.backgroundcolor,
    borderColor:theme.dark.fontColor,
    borderWidth:0.2,
    width: 150,
    height: 150,
    borderRadius:100,
    marginBottom: 30,
    overflow: 'hidden',
  },

  img:{
    alignSelf:'center',
    width: 150,
    height: 150,
  },
  input:{
    backgroundColor: theme.dark.backgroundcolor,
    width: "100%",
    marginBottom: 15,
    color: theme.dark.fontColor,
    fontSize: 17,
    borderRadius: 5,
    borderWidth: 0.2,
    borderBottomColor: theme.dark.fontColor,
    padding: 15,
  },
  
  btnSumit:{
    backgroundColor: '#3399ff',
    width: "100%",
    height: 60,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  
  submitText:{
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  
  labelText:{
    color: theme.dark.fontColor,
  }
  
  });