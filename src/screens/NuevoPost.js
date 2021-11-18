import React, { Component } from 'react'
import { Text, View, TextInput, Button, Image } from 'react-native';
import{ auth, db } from "../firebase/config";
import MyCamera from '../components/MyCamera';

class NuevoPost extends Component {

    constructor(props){
        super(props)
        this.state={
          description:"",
          url:"",
          showCamera:true
          
        }
    }
    createPost(){
      db.collection("posts").add({
          owner:auth.currentUser.email,
          description: this.state.description,
          likes:[],
          comments:[],
          createdAt: Date.now(),
          image:this.state.url
      })
      .then(() => {
          console.log("Documento subido!");
          this.props.drawerProps.navigation.navigate("Home");
      })
      .catch((error) => {
          console.error("Error escribiendo el documento: ", error);
      });
  }

  onImageUpload(url) {
    this.setState({
        showCamera: false,
        url: url
    });
}

  render() {
    return (
      <>
      {
        this.state.showCamera ? 
        <MyCamera onImageUpload={(url)=>this.onImageUpload(url)}/>
        :
        <View style={{flex:8, width:'100%'}}>
          <Image style={{flex:8, width:'100%'}}
                 source={{uri:this.state.url}}
                /> 
          <TextInput keyboardType="default"
          placeholder="Descripción"
          onChangeText={text=>this.setState({description:text})}/>
          <Button
          title="Crear Post"
          color="#545454"
          onPress={()=>this.createPost(this.state.title, this.state.description)}
          >
          </Button>
        </View>
      }
      </>
    )
  }
}

export default NuevoPost