import React, { Component } from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-web';
import {db, auth} from '../../firebase/config'; 


class Home extends Component{
    constructor(props) {
		super(props);
		this.state = {
            users: []
        }
    }

componentDidMount (){
    db.collection ('users').onSnapshot ((docs) => {
      let usersFromDb = []
      docs.forEach ((doc)=> {
        let user = doc.data();
        usersFromDb.push ({id: doc.id , data: user});
      });
      this.setState ({users: usersFromDb}); 
    });
}

    render (){
        return(
        <View>
        <Text>Posteos</Text>
        
        </View>
        )
        
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