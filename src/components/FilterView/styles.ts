import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container:{
        backgroundColor: theme.colors.secondary100,
        borderBottomColor: theme.header.colors.borderColor,
        borderBottomWidth: 0.2,
        width: '100%',
        height: 50,
        flexDirection: 'row',
    },
    btn:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'center',
        paddingLeft: 2,
        height: '100%',
        borderRightWidth:0.2,
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        borderRightColor:theme.header.colors.borderColor,
        //backgroundColor: theme.header.colors.titleColor,
        backgroundColor: theme.colors.primary,
    },
    textBtn:{
        //color: theme.colors.heading,
        color: theme.header.colors.borderColor,
        paddingHorizontal: 10,
    },
    content:{
        flex: 1,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'center',
        paddingLeft: 2,
    },
    box:{
        paddingHorizontal:5,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:'#FFF',
        height: 35,
        borderWidth:0.2,
        borderColor: theme.colors.secondary100,
        borderRadius: 10,
        marginHorizontal: 5,
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.5,
        elevation: 1,
    },
    title:{
        marginHorizontal: 5,
        color: theme.header.colors.borderColor,
    },
})