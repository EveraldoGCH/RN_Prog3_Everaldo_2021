import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import{ Camera } from "expo-camera";
import { storage } from "../firebase/config";


class MyCamera extends Component {

    constructor(props){
        super(props)
        this.state={
            permission:"",
            photo:"",
            
        }
        this.camera //ref camara
    }

    componentDidMount(){
        this.setState({
            showCamera:true
        });
        Camera.requestCameraPermissionsAsync()
        .then((res)=>this.setState({
            permission:res.status
        }))
        .catch(()=>{()=>this.setState({
            permission:false
        })})
    };

    componentWillUnmount(){
        this.setState({
            showCamera:false
        })
    }

    takePic(){
        if(!this.camera) return
        this.camera.takePictureAsync()
        .then(photo => {
            this.setState({
                photo: photo.uri,
                showCamera:false
            })
        })
    }

    savePhoto(){
        fetch(this.state.photo)
            .then(res=>res.blob())
            .then(image =>{
                const ref = storage.ref(`photos/${Date.now()}.jpg`)
                ref.put(image)
                    .then(()=>{
                        ref.getDownloadURL()
                            .then(url => {
                                this.props.onImageUpload(url);
                                this.setState({
                                    photo:'',
                                })
                            })
                    })
            })
            .catch(e=>console.log(e))
    }

    cancelPhoto(){
        this.setState({
            photo:""
        })
    }

  render() {
    return (
        <>
                
            {
                this.state.photo ? 
                <>
                <Image style={{flex:8, width:'100%'}}
                source={{uri:this.state.photo}}/> 
                <View style={{flex:1, width:'100%'}}>
                    <Text onPress={()=>this.savePhoto()}>Aceptar</Text>
                    <Text onPress={()=>this.cancelPhoto()}>Tomar otra</Text> 
                </View>
                </>
                :
                this.state.permission=="granted"?
                <>
                    <Camera
                    style={styles.cameraBody}
                    type={Camera.Constants.Type.front || Camera.Constants.Type.back}
                    ref={ref => this.camera=ref}
                    />
                    <TouchableOpacity
                    style={styles.button} 
                    onPress={()=>this.takePic()}
                    >
                        <Text>Sacar Foto</Text>
                    </TouchableOpacity>
                    </>
                    :
                    <Text>Acepta usar la cámara</Text>
            }
        </>
    )
    }}


const styles = StyleSheet.create({
    cameraBody:{
        width:"95%",
        height:"95%",
        flex:1,
    },

    button:{},
})

export default MyCamera