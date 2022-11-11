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
            <Text style={styles.text}> Mi perfil</Text>
            <TouchableOpacity onPress={() => this.logOut()}>
                <Text style={styles.text}>Cerrar Sesion</Text>
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
   
    container:{
         paddingHorizontal:10,
         alignItems:"center",
         height: "100%",
         marginTop: 10,
         display:"flex",
         justifyContent:"center",
         backgroundColor: '#cabfa5',
         borderColor: '#62504c',
    },
    text:{
         textAlign: 'center',
         fontWeight: 50,
         fontSize: 15,
         paddingTop: 10,
         paddingBottom: 10,
         borderRadius: 10,
         width:200,
         height: 50,
         paddingLeft: 10,
         borderColor: '#62504c',
         borderWidth: 1,
         marginBottom:8,
         borderRadius: 10,
    },
    // subtittle:{
    //     fontSize:18,
    //     marginTop:20,
    //     marginBottom:5,
    //     fontWeight: 'bold',
    //     color: 'white'

    // },
    // button:{
    //     padding: 10,
    //     backgroundColor: '#dc3545',
    //     margin: 10,
    //     borderRadius: 4,
    //     color: 'white'
    // },
    // touchableText:{
    //     fontWeight: 'bold',
    //     color:'#fff',
    //     textAlign: 'center'
    // },
    flatList:{
        flex: 4,
        marginHorizontal: 20
    }
})

export default Profile