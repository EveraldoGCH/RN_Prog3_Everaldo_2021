import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Button, Dimensions } from 'react-native';
import{ auth } from "../firebase/config";

class Login extends Component {

    constructor(props){
        super(props)
        this.state={
          email:"",
          password:"",
          loggedIn:this.props.log,
          user:this.props.user,
        }
    }

  render() {
    return (
      this.state.loggedIn ?
      <Text>
            {this.state.user}
      </Text>
      :
      <View style={styles.loginContainer}>
        <TextInput keyboardType="email-address"
        placeholder="Correo Electrónico"
        onChangeText={text=>this.setState({email:text})
        }
        style={styles.input}/>
        <TextInput
        placeholder="Contraseña"
        onChangeText={text=>this.setState({password:text})}
        secureTextEntry={true}
        style={styles.input}/>
      
        <Text>
          {this.props.errormsj}
        </Text>
        <View style={styles.iniciarSesionBtn}>
        <Button
        disabled={this.state.email&&this.state.password!="" ? false:true}
        onPress={()=>this.props.login(this.state.email, this.state.password)}
        title="Iniciar Sesion"
        color="#40BAC8"
        >
        </Button>
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({

  loginContainer:{
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
  iniciarSesionBtn:{
    alignSelf:"center",
    width: 200,
    justifyContent:"center",
    margin:15
  },

  iniciarText:{
    fontSize:16
  }
})

export default Login