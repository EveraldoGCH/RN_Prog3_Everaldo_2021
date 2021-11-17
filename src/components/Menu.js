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
            userData:"",
            nombre:""

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
    console.log(this.state.nombre);
};

registerSubmit(email, pass, username){
    console.log("registrandoo :)")
    console.log(email, pass, username)
    auth.createUserWithEmailAndPassword(email, pass)
    .then((res)=>{
        console.log(res);
        res.user.updateProfile({
            displayName: username})
            .then(navigation.navigate('Login'))}
    )
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
            <Drawer.Screen name="Perfil" component={()=><Perfil logOut={()=>this.logOut()} nombrePerfil={this.state.nombre}/>} />
            <Drawer.Screen name="Nuevo Post" component={()=><NuevoPost/>} />
        </Drawer.Navigator>
        :
        <Drawer.Navigator style={styles.drawerNavigator}>
            <Drawer.Screen name="Login" component={()=><Login login={(email, pass)=>this.loginSubmit(email, pass)} error={this.state.errormsj} log={this.state.logged} user={this.state.user}/>} />
            <Drawer.Screen name="Register" component={(drawerProps)=><Register register={(email, pass, username)=>this.registerSubmit(email, pass, username)} registered={this.state.registered} drawerProps={drawerProps}/>} />
            <Drawer.Screen name="Home" component={()=><Home user={this.state.user} log={this.state.logged}/>}/>
        </Drawer.Navigator>


    )
  }
}
const styles = StyleSheet.create({

})

export default Menu