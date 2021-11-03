import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { createDrawerNavigator } from "@react-navigation/drawer"
import Home from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Perfil from "../screens/Perfil";
import NuevoPost from "../screens/NuevoPost";
import { auth } from '../firebase/config';
import firebase from 'firebase';

const Drawer = createDrawerNavigator();

class Menu extends Component {

    constructor(props){
        super(props)
        this.state={
            logged:false,
            errormsj:"",
            registered:false,
            userData:""

        }
    }

    
componentDidMount(){
    auth.onAuthStateChanged(user => {
        if(user){
            this.setState({
                logged: true,
                userData: user,
            })
        }
    })
};
registerSubmit(email, pass){
    console.log("registrandoo :)")
    auth.createUserWithEmailAndPassword(email, pass)
    .then(this.setState({registered:true}))
    .catch((error)=>{this.setState({errormsj:error})})
};

loginSubmit(email, pass){
    auth.signInWithEmailAndPassword(email, pass)
    .then(()=>{this.setState({logged:true})})
    .catch((error)=>{this.setState({errormsj:error})})
};

logOut(){
    auth.signOut()
    .then(()=>{this.setState({logged:false})})
  }

  render() {
    return (
        this.state.logged ?

        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={()=><Home log={this.state.logged}/>} />
            <Drawer.Screen name="Perfil" component={()=><Perfil logOut={()=>this.logOut()}/>} />
            <Drawer.Screen name="Nuevo Post" component={()=><NuevoPost/>} />
        </Drawer.Navigator>
        :
        <Drawer.Navigator style={styles.drawerNavigator}>
            <Drawer.Screen name="Login" component={()=><Login login={(email, pass)=>this.loginSubmit(email, pass)} error={this.state.errormsj} log={this.state.logged} user={this.state.user}/>} />
            <Drawer.Screen name="Register" component={()=><Register register={(email, pass)=>this.registerSubmit(email, pass)} registered={this.state.registered}/>} />
            <Drawer.Screen name="Home" component={()=><Home user={this.state.user} log={this.state.logged}/>}/>
        </Drawer.Navigator>

    )
  }
}
const styles = StyleSheet.create({

})

export default Menu