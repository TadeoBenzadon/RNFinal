import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-web';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase';
import Post from '../components/Post';

class Comentarios extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comentarios: []
		};
	}
	
	componentDidMount() {
	db.collection("posts").doc(this.props.route.params.id).onSnapshot((docs)=> {
        let comentariosFromDb = [];
				docs.forEach((doc) => {
					let comentarios = doc.data();
					comentariosFromDb.push({ id: doc.id, data: comments });
				});
				console.log(comentariosFromDb);

				this.setState({ comentarios: comentariosFromDb });
    }) 

	}


        
	render() {
		return (
			<>
				<Text style= {styles.titulo} > Comentarios </Text>
                <FlatList 
					data={this.state.comentarios}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<View style= {styles.container}> 
                           <Text> {item.data.comentarios} </Text>
						</View>
					)}
				/>

             
			</>
		);
	}
}

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
    titulo2:{
        textAlign: 'center',
        fontWeight: 50,
        fontSize:20,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom:20,
        color: "black",
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
    text:{
        textAlign: 'center',
        fontWeight: 50,
        fontSize: 15,
        paddingTop: 10,
        paddingBottom: 10,
   }
})

export default Comentarios;

    


