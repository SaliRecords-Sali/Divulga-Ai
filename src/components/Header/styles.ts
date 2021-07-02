import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const styles = StyleSheet.create ({
    header:{
        //paddingTop: getStatusBarHeight(),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.dark.backgroundcolor,
        paddingHorizontal: 10,
        borderBottomWidth: 0.2,
        height: 50,
        borderBottomColor: theme.header.colors.borderColor,
      },
      nomeapp:{
        fontSize: 20,
        fontWeight:'bold',
        color: theme.header.colors.titleColor,
      },

      btnSair:{
        marginTop: '20%',
        backgroundColor: '#3399ff',
        width: "90%",
        height: 60,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
      },

      sairText:{
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
      },
    
      modalView:{
        flex: 1,
        marginTop: 40,
        marginBottom:10,
        marginHorizontal:10,
        borderBottomRightRadius:40,
        borderBottomLeftRadius:40,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        backgroundColor: theme.colors.primary,
        overflow: 'hidden',
      },

      modal:{
        
      }
})