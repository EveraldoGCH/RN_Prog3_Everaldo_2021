import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import{ auth } from "../firebase/config";

class Perfil extends Component {

    constructor(props){
        super(props)
        this.state={
          
        }
    }

  render() {
    return (
      <View>
          <Text>
              {auth.currentUser.email}
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