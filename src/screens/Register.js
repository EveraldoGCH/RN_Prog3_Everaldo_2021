import { NavigationContainer} from '@react-navigation/native'
import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, Button } from 'react-native'
import{ auth } from "../firebase/config"


class Register extends Component {
  
  

    constructor(props){
        super(props)
        this.state={
            registered:this.props.registered,
            email:"",
            password:"",
            error:""
        }
    }

  render() {
    return (
      <View>
        <TextInput keyboardType="email-address"
        placeholder="correo@correo.com"
        onChangeText={text=>this.setState({email:text})}/>
        <TextInput
        placeholder="tuNombre123"
        onChangeText={text=>this.setState({password:text})}
        secureTextEntry={true}/>
        

        {this.state.registered ?
        <Text>
           REGISTRADO
        </Text>
        :
        <TouchableOpacity onPress={()=>this.props.register(this.state.email, this.state.password)}>
        <Button
        disabled={this.state.email&&this.state.password!="" ? false:true}
        title="Registrarse"
        color="#545454"
        >
          <Text>
            Registrarse
          </Text>
        </Button>
        </TouchableOpacity>}
      </View>
    )
  }
}

export default Register