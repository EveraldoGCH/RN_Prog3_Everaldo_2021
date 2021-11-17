import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, FlatList, Image, Dimensions } from 'react-native';
import { auth, db } from "../firebase/config";
import firebase from "firebase";


class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
           likes: 0,
           liked: false,
           showModal:false,
           comment:'',
        }
    }
    //Likear y deslikear solo si llegamos con el tiempo
    componentDidMount(){
        if(this.props.doc.data.likes){
            let likes = this.props.doc.data.likes.length;
            this.setState({
                likes: likes,
            })
            if (this.props.doc.data.likes.includes(auth.currentUser.email)) {
                this.setState({
                    liked: true,
                })  
            }
        } 
    } 
    //Likear y deslikear solo si llegamos con el tiempo
    like(){        
        let thisDoc = db.collection('posts').doc(this.props.doc.id);

        thisDoc.update(
            { likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)}
            //ArrayUnion https://firebase.google.com/docs/firestore/manage-data/add-data#update_elements_in_an_array
        )
        .then(
            this.setState({
                liked:true,
                likes: this.state.likes + 1,
            },
            console.log('likeado ok'))
            )
        .catch(e => console.log(e))
    }
    //Likear y deslikear solo si llegamos con el tiempo
    unLike(){
        let thisDoc = db.collection('posts').doc(this.props.doc.id);
        //LInk update https://firebase.google.com/docs/firestore/manage-data/add-data#update-data

        //ArrayRemove https://firebase.google.com/docs/firestore/manage-data/add-data#update_elements_in_an_array
        thisDoc.update(
            { likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)}
        )
        .then(
            this.setState({
                liked:false,
                likes: this.state.likes - 1,
            },
            console.log('deslikeado ok'))
            )
        .catch(e => console.log(e))
    }
    
    //Muestra el modal
    showModal(){
        console.log('Mostrando modal')
        this.setState({
            showModal: true,
        })
    }
    
    //Cierra el modal
    closeModal(){
        console.log('Cerrando modal')
        this.setState({
            showModal: false,
        })
    }
    
    //Guarda comentarios en la colección.
    saveComment(){
        let thisDoc = db.collection('posts').doc(this.props.doc.id);
        let thisComment = {
            autor: auth.currentUser.email,
            comment: this.state.comment,
            createdAt: Date.now()
        }
        thisDoc.update(
            { comments: firebase.firestore.FieldValue.arrayUnion(thisComment)}
            //ArrayUnion https://firebase.google.com/docs/firestore/manage-data/add-data#update_elements_in_an_array
        )
        .then(
            this.setState({
                comment:'',
            },
            console.log('comentario enviado.'))
            )
        .catch(e => console.log(e))
    }


    render(){  
        return(
            <View style={styles.container}>
                <Image style={{flex:1, width:Dimensions.get('window').width/1.05, 
                height:Dimensions.get('window').width/1.3}}
                source={{uri:this.props.doc.data.image}}
                />
                <Text>Posteo de: {this.props.doc.data.owner}</Text>
                <Text> {this.props.doc.data.description}</Text>
                <View>
                    { this.state.liked === true ?
                        <TouchableOpacity onPress={()=>this.unLike()}>
                            <Text>Quitar like</Text>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={()=>this.like()}>
                            <Text>Me gusta</Text>
                        </TouchableOpacity>
                    }
                    <Text>likes: {this.state.likes}</Text>
                </View>
                {/* Activa el modal */}
                <TouchableOpacity onPress={()=>this.showModal()}>
                    <Text>Ver comentarios</Text>
                </TouchableOpacity>
                {/* Modal de comentarios */}
                {
                    this.state.showModal?
                    <Modal style={styles.modalContainer}
                        visible={this.state.showModal}
                        animationType="fade"
                        transparent={false}
                    >
                        {/* Botón de cierre del modal */}
                        <TouchableOpacity style={styles.closeModal} onPress={()=>{this.closeModal()}}>
                            <Text style={styles.modalText} >X</Text>
                        </TouchableOpacity>

                        {/* Flatlist para mostrar los comentarios del post */}
                        <FlatList style={styles.comments}
                                data={this.props.doc.data.comments}
                                keyExtractor={ comment => comment.createdAt.toString()}
                                renderItem={ ({item})=>
                                            <View>
                                                <Text>{item.author}: {item.comment}</Text>
                                            </View>
                                            }
                        />

                        {/* Formulario para nuevo comentario */}
                        <View style={styles.formContainer}>
                            <TextInput
                                style={styles.multilineInput}
                                onChangeText={(text)=>this.setState({comment: text})}
                                placeholder='Dejá tu comentario'
                                keyboardType='default'
                                multiline
                                value={this.state.comment}
                                />
                            <TouchableOpacity style={styles.button} onPress={()=>this.saveComment()}>
                                <Text style={styles.textButton}>Enviar comentario</Text>    
                            </TouchableOpacity>
                        </View>
                    </Modal>:
                    <Text></Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
        shadowColor: '#ccc',
        shadowOffset:{
            width: 0,
            height: 0
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        borderRadius: 5,
        width:"90%",
        height:300,
        flex:8
    },
    modalContainer: {
        width:'90%',  
        alignSelf: 'center',
        backgroundColor: "white",
        borderRadius: 6,
        padding: 10,
        boxShadow:'rgb(204 204 204) 0px 0px 13px 5px',
    },
    formContainer:{
        paddingHorizontal:10,
        marginTop: 10,
        width:'100%',
    },
    multilineInput:{
        height:50,
        paddingVertical:5,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
    },
    closeModal:{
        alignSelf: 'flex-end',
        padding: 10,
        backgroundColor: '#dc3545',
        marginTop:2,
        marginBotom: 10,
        borderRadius: 4,
    },
    modalText:{
        fontWeight: 'bold',
        color:'#fff',
    },
    comments:{
        alignItems: 'flex-start',
    }
})

export default Post;