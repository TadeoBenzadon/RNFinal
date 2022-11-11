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
        return (  
        <View style= {styles.container}> 
            <Text style= {styles.titulo} > Mi perfil </Text>
            <TouchableOpacity onPress={() => this.logOut()}>
                <Text style={styles.button}>Cerrar Sesion</Text>
            </TouchableOpacity>
           <FlatList 
					data={this.state.posts}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<View> 
                            <Text style= {styles.titulo2} >{item.data.owner}</Text>
							<Text style= {styles.text} > DESCRIPCION: {item.data.description}</Text>          
                        </View>
                        
                            )} 
            />
            
            
        </View>
        )
    }

    };



    

const styles = StyleSheet.create({
   
    titulo:{
        textAlign: 'center',
        fontWeight: 50,
        fontSize:50,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom:20,
        color: "black",
    },
    button:{
        borderRadius: 10,
        padding:2,
        borderWidth: 1,
        borderColor: '#62504c',
        backgroundColor: '#62504c',
        width:200,
        height: 50,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
  },
    container:{
        backgroundColor: '#cabfa5',
        flex:4,
        flexDirection: 'column',
        borderWidth:1,
        borderRadius:5,
        paddingVertical:16,
        paddingHorizontal:10,
        alignItems:"center",
        height: "100%",
        marginTop: 10,
        display:"flex",
        justifyContent:"center",
    },
    text:{
        textAlign: 'center',
        fontWeight: 50,
        fontSize: 15,
        paddingTop: 10,
        paddingBottom: 10,
    },
    titulo2:{
        textAlign: 'center',
        fontWeight: 50,
        fontSize: 50,
        paddingTop: 10,
        paddingBottom: 10,
    },
    flatList:{
        flex: 4,
        marginHorizontal: 20
    }
})

export default Profile