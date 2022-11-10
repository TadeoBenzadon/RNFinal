import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native'
import {auth , db} from '../../firebase/config'

class Profile extends Component {
    constructor(props) {
      super(props)
      this.state = {
        email: '',
        posts:[],

      };
    }

    componentDidMount(email){ 
        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs => {
                let postsFromDb = [];
                docs.forEach( oneDoc => {
                    postsFromDb.push({
                        id: oneDoc.id,
                        data: oneDoc.data()
                    })
                })

                this.setState({
                    posts: postsFromDb,
                    email:'',
                })
            }
        )

        
    }

logOut (){
    auth.signOut ();
    this.props.navigation.navigate('Register');
}

        render (){
          return (  <View> 
            <Text> Mi perfil</Text>
            <TouchableOpacity onPress={() => this.logOut()}>
                <Text>Cerrar Sesion</Text>
            </TouchableOpacity>
           <FlatList 
					data={this.state.posts}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<View style= {styles.container}> 
                            <Text style= {styles.titulo2} >{item.data.owner}</Text>
							<Text style= {styles.text} > DESCRIPCION: {item.data.description}</Text>
                            </View>
                        
                            )} 
            />
            
            
        </View>)
        } 
    };



    

const styles = StyleSheet.create({
   
    container:{
        flex:1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor:'white'
    },
    tittle:{
        fontSize:25,
        marginTop:20,
        marginBottom:30,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    subtittle:{
        fontSize:18,
        marginTop:20,
        marginBottom:5,
        fontWeight: 'bold',
        color: 'white'

    },
    text:{
        fontSize:15,
        color: 'black',
        margin: 10
    },
    button:{
        padding: 10,
        backgroundColor: '#dc3545',
        margin: 10,
        borderRadius: 4,
        color: 'white'
    },
    touchableText:{
        fontWeight: 'bold',
        color:'#fff',
        textAlign: 'center'
    },
    flatList:{
        flex: 1,
        marginHorizontal: 20
    }
})

export default Profile