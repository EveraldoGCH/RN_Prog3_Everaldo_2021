import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native';
import{ auth } from "../firebase/config";



class Perfil extends Component {

    constructor(props){
        super(props)
        this.state={
          lastSign:auth.currentUser.metadata.lastSignInTime
        }
    }
    componentDidMount(){
      console.log(auth.currentUser.displayName)
    
    }

  render() {
    return (
      <View>
          <Text>
            {auth.currentUser.email}
          </Text>
          <Text>
            {auth.currentUser.displayName}
          </Text>
          <Text>
          Último inicio de sesión: {this.state.lastSign}
          </Text>
          <TouchableOpacity onPress={()=>this.props.logOut()} >
          <Text>
            Cerrar sesion
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Perfil