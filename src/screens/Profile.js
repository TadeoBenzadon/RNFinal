import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import {auth } from '../../firebase/config'

class Profile extends Component {
    constructor(props) {
      super(props)
      this.state = {}
    }
    
        render (){
            <view> 
                <text> Mi perfil</text>
            </view>
        }
    };

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