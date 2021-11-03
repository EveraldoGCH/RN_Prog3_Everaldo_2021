import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../firebase/config';

class Home extends Component {

    constructor(props){
        super(props)
        this.state={
          user:this.props.user,
          logged:this.props.log
        }
    }
    componentDidMount(){
      console.log(this.state.logged);
      console.log(this.state.user);
    }


  render() {
    return (
      this.state.logged ?
    
      <View>
        <Text>{auth.currentUser.email}HOMEEEEE</Text>
      </View>
      :
      <View>
        <Text>
          Home sin iniciar sesion
        </Text>
      </View>
    )
  }
}

export default Home