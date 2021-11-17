import React, { Component } from 'react';
import { Text, TouchableOpacity, View, ActivityIndicator, FlatList } from 'react-native';
import { auth, db } from '../firebase/config';
import Post from '../components/Post';

class Home extends Component {

    constructor(props){
        super(props)
        this.state={
          user:this.props.user,
          logged:this.props.log,
          characters:[],
          loading:true
        }
    }
    componentDidMount(){
      db.collection('posts').orderBy('createdAt', 'desc').onSnapshot( docs => {
          let posts=[];
          docs.forEach(doc => {
              posts.push({
                  id: doc.id,
                  data: doc.data()
              }) 
          })

          this.setState({
              characters: posts,
              loading: false
          })
      })

  };

  render() {
    return (
      this.state.logged ?
    
      <View>
        <Text>{auth.currentUser.displayName}</Text>
        <Text>POSTEOS:</Text>
        { this.state.loading ?
          <ActivityIndicator size='large' color='blue'/> :
            <FlatList
              data={this.state.characters}
              keyExtractor={ post => post.id}
              renderItem={ ({item})=><Post doc={item}/>}
              />
                    
                }

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