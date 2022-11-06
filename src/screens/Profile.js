import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import {auth } from '../../firebase/config'

class Profile extends Component {
    constructor(props) {
      super(props)
      this.state = {}
    }

    componentDidMount(){
        db.collection('posts').where('email', '==', auth.currentUser.email).onSnapshot(
            docs =>{
                let posts = [];
                docs.forEach( doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    posts: posts,
                    loading: false
                })
            }
        )
    }


  render() {
    return(
        <View style={styles.container}>
            {
                this.state.loading ?
                <Loader/> 
                :
                <View style={styles.container}>
                    <Text style={styles.titulo}>Mi perfil</Text>
                    <Text style={styles.text}> Email: {auth.currentUser.email}</Text>
                    <Text style={styles.nombre}> Nombre de usuario: {auth.currentUser.nombreUsuario}</Text>
                    <Text style={styles.bio}>Biografia: {auth.currentUser.bio}</Text>
                    <View style={styles.container}>
                    <FlatList style={styles.flatList}
                        data={this.state.posts}
                        keyExtractor={(item)=> item.id.toString()}
                        renderItem={({item}) => <Posts borrar={true} info={item} navigation={this.props.route.params.navigation}/>}
                    />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={()=>this.props.route.params.logout()}>
                        <Text style={styles.touchableText}>Logout</Text>
                    </TouchableOpacity>         
                </View>
            }
        </View>  
      )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor:'black'
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
        color: 'white',
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