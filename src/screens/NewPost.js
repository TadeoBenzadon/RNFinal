import React, { Component } from 'react'
import {
    View,
    Text, 
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput
} from 'react-native'

import {auth, db} from '../../firebase/config'
import MyCamera from '../components/MyCamera'

export default class NewPost extends Component {

  constructor(props){
    super(props)
    this.state = {
      description: '', 
      likes: [],
      comments: [],
      showCamera: true, 
      url: ''     
    }
  }

  guardarPost(){
    console.log("Guardar post")
      db.collection('posts').add({
        createdAt: Date.now(),
        owner: auth.currentUser.email,
        description: this.state.description,
        likes: [],
        comments: [],
        url: this.state.url
      })
      .then((res)=>{
         console.log("Posteo Exitoso")
         this.setState({
          description: ""
         }, ()=>{
          this.props.navigation.navigate('Home')}
         ) 
      })
      .catch( err => console.log(err))

  }

  onImageUpload(url){
    this.setState({
      url,
      showCamera: false
    })
  }

  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        {
            this.state.showCamera ? 
            <MyCamera 
              onImageUpload = {url => this.onImageUpload(url)}
          /> :
            <View style={styles.container}>
                <Text style={styles.title}> Agregar Post</Text>
                 <TextInput
                 style ={styles.field} 
                 keyboardType = 'default'
                 placeholder='Descripcion'
                 onChangeText={(text) => this.setState(
                    {description: text})} //aca se guarda el estado
                multiline
                />
                 
                <TouchableOpacity
                style={styles.button}
                onPress= {()=>this.guardarPost()}
                >
                    <Text style= {styles.buttonText}> Guardar post</Text>
                </TouchableOpacity>
            </View>
        }
      </View> 
    )
  }
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:10,
        marginTop: 10,
        height:'100%',
        width: '100%'
    },
    title:{
        marginBottom:20
    },
    field:{
        borderColor: '#dcdcdc',
        borderWidth: 1,
        borderRadius: 2,
        padding:3,
        marginBottom:8
    },
    button: {
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
    buttonText:{
        color: '#black'
    }
})

