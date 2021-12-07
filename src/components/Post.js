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
    //Toma los likes
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
            },))
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
            },))
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
                <Image style={styles.imageContainer}
                source={{uri:this.props.doc.data.image}}
                />
            {/*Fonts like y comentarios*/}
                <View style={styles.fonts}>
                { this.state.liked === true ?
                        <TouchableOpacity onPress={()=>this.unLike()}>
                            <Image 
                            source={"https://img.icons8.com/ios-filled/50/fa314a/like--v1.png"}
                            style={styles.unLikedFont}/>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={()=>this.like()}>
                            <Image 
                            source={"https://img.icons8.com/ios/50/000000/like--v1.png"}
                            style={styles.unLikedFont}/>
                        </TouchableOpacity>
                    }
                <TouchableOpacity onPress={()=>this.showModal()}>
                <Image 
                source={"https://img.icons8.com/material-outlined/50/000000/comments--v2.png"}
                style={styles.comentFont}/>
                </TouchableOpacity>
                <Text style={styles.lengthComentarios}>{this.props.doc.data.comments?this.props.doc.data.comments.length:0}</Text>
                </View>

                <Text style={styles.lengthMeGusta}>{this.state.likes} Me gusta</Text>

                <View style={styles.fonts}>
                <Text style={styles.lengthMeGusta}>{this.props.doc.data.owner}:</Text>
                <Text style={styles.lengthMeGusta}> {this.props.doc.data.description}</Text>
                </View>

                {/* Activa el modal */}
                <TouchableOpacity onPress={()=>this.showModal()}>
                    <Text style={styles.verComentarios}>Ver comentarios</Text>
                </TouchableOpacity>
                {/* Modal de comentarios */}
                {
                    this.state.showModal?
                    <View style={styles.modalView}>
                    <Modal style={styles.modalContainer}
                        visible={this.state.showModal}
                        animationType="fade"
                        transparent={false}
                        presentationStyle="pageSheet"
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
                                                <Text>{item.autor}: {item.comment}</Text>
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
                    </Modal>
                    </View>
                    :
                    null
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
        width:"95%",
        height:"120%",
        alignSelf:"center",
        flex:8
    },
    imageContainer:{
        width:"95%", 
        height:Dimensions.get('screen').height/2.7,
        resizeMode:"cover",
        alignSelf:"center",
        marginVertical:8
    },
    fonts:{
        flexDirection:"row",
    },
    unLikedFont:{
        width:24,
        height:24,
        padding:5,
        marginHorizontal:5,
    },
    comentFont:{
        width:24,
        height:24,
        padding:5,
        marginHorizontal:5
    },
    lengthComentarios:{
        marginTop:3,
        marginRight:3
    },
    lengthMeGusta:{
        marginLeft:6,
        marginVertical:5
    },
    modalContainer: {
        width:110,  
        alignSelf: 'center',
        backgroundColor: "white",
        borderRadius: 6,
        padding: 10,
        height:110
    },
    modalView:{
        width:"20%",
        height:"20%"
    },
    formContainer:{
        paddingHorizontal:10,
        marginTop: 10,
        width:'100%',
        height:"30%"
    },
    multilineInput:{
        height:550,
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
        marginBottom: 10,
        borderRadius: 4,
    },
    modalText:{
        fontWeight: 'bold',
        color:'#fff',
    },
    comments:{
        alignItems: 'flex-start',
    },
    verComentarios:{
        marginLeft:6,
        marginTop:5,
        marginBottom:10
    }
})

export default Post;