import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({

    //Pagina//
    
    backgound:{
      flex: 1,
      //backgroundColor: theme.dark.backgroundcolor,
      width: '100%',
    },
   
    //Conteúdo Página//
    
      marginBottonView:{
        width: '100%',
      },
    
      conteudo:{
        paddingTop:10,
        paddingBottom:10,
      },
    
      box:{
        flex: 1,
        width: '95%',
        height: 500,
        backgroundColor: '#FFFFFF',
        marginBottom: 10,
        marginRight: 10,
        marginLeft: 10,
        borderColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 0.2,
        flexDirection: 'column',
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
      },
    
      viewPublicacao:{
        alignItems: 'center',
        flex: 1,
        width: '100%',
        height: 394,
      },
    
      fotoPublicacao:{
        borderRadius: 10,
        borderWidth: 0.2,
        resizeMode: 'cover',
        width: '100%',
        height: 394,
      },
    
      btnPlay:{
        position: 'absolute',
        marginTop: '40%',
      },
    
      foto:{
        alignItems:'center',
        flex: 1,
        justifyContent: 'center',
        maxHeight: 70,
        //borderRadius: '100%',
        maxWidth: '100%',
      },
    
      title:{
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        maxHeight: 25,
        justifyContent: 'space-between',
        flex: 1,
        zIndex: 2,
      },
    
      nome:{
        fontSize: 20
      },
    
      descricao:{
        maxHeight: 25,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: 'center',
        flex: 1,
        fontSize: 12,
        marginBottom:20,
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