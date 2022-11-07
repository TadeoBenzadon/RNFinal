import React, { Component } from 'react';
import {View, Text, FlatList, StyleSheet } from 'react-native';
import {db} from '../../firebase/config'; 


class Home extends Component{
    constructor(props) {
		super(props);
		this.state = {
        }
    }

    render (){
        <view> 
            <text> Mi home</text>
        </view>
    }
};
    

const styles = StyleSheet.create({
    container:{
        flex:1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderWidth:1,
        borderRadius:5,
        backgroundColor:'black',
        paddingVertical:16,
        paddingHorizontal:8,
    }
})

export default Home;