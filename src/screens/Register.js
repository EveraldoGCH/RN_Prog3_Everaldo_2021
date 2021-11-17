import { NavigationContainer} from '@react-navigation/native'
import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, Button, Dimensions, StyleSheet } from 'react-native'
import{ auth } from "../firebase/config";
import * as Font from 'expo-font';


class Register extends Component {
  
  

    constructor(props){
        super(props)
        this.state={
            registered:this.props.registered,
            email:"",
            password:"",
            error:"",
            nombre:'',
        }
    }

    async loadFonts() {
      await Font.loadAsync({
        Montserrat: require('../../assets/fonts/Montserrat-SemiBoldItalic.ttf'),
        'Montserrat-SemiBold': {
          uri: require('../../assets/fonts/Montserrat-SemiBoldItalic.ttf'),
          display: Font.FontDisplay.FALLBACK,
        },
      });
    }

    componentDidMount() {
      this.loadFonts();
    }


  render() {
    return (
      <View style={styles.registerContainer}>
        <TextInput 
            keyboardType="default"
            placeholder="Nombre"
            onChangeText={text=>this.setState({nombre:text})}
            style={styles.input}/>
        <TextInput 
            keyboardType="email-address"
            placeholder="correo@correo.com"
            onChangeText={text=>this.setState({email:text})}
            style={styles.input}/>
        <TextInput
          placeholder="Contraseña"
          onChangeText={text=>this.setState({password:text})}
          secureTextEntry={true}
          style={styles.input}/>
        

        {this.state.registered ?
        <Text>
           REGISTRADO
        </Text>
        :
        <TouchableOpacity
        disabled={this.state.email&&this.state.password!="" ? false:true}
        onPress={()=>this.props.register(this.state.email, this.state.password, this.state.nombre)}
        style={this.state.email&&this.state.password!="" ? styles.registrarBtnOn:styles.registrarBtnOff}
        >
        <Text style={styles.registrarText}>Registrarse</Text>
        </TouchableOpacity>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({

  registerContainer:{
    display:'flex',
    justifyContent: "center",
    alignItems: "center",

  },
  input:{
    height:35,
    padding:10,
    margin:10,
    borderWidth:1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderRadius: 6,
    shadowColor:"black",
    shadowOffset:{width: 0,height: 3},
    shadowRadius:4,
    fontSize:16

  },
  registrarBtnOn:{
    alignSelf:"center",
    justifyContent:"center",
    width: 200,
    marginTop: 20,
    backgroundColor:"#40BAC8",
    padding: 9,
    borderRadius: 5,
  },
  registrarBtnOff:{
    alignSelf:"center",
    justifyContent:"center",
    width: 200,
    marginTop: 20,
    backgroundColor:"#B4B4B4",
    padding: 9,
    borderRadius: 5,
  },

  registrarText:{
    fontSize:16,
    fontFamily:"Montserrat-SemiBold",
    justifyContent:"center",
    alignSelf:"center"
  }
})

export default Register