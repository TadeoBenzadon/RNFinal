import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-web';
import { db } from '../../firebase/config';
import firebase from 'firebase';


class Comentarios extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comentarios: [], 
            comentario: ''
		};
	}
	
	 componentDidMount() {

        db.collection('posts').doc(this.props.route.params.id).onSnapshot(doc => {
            let comentariosFromDb= [];
            let coments = doc.data().comments
            comentariosFromDb.push ({ id: doc.id, data: coments })
            console.log(comentariosFromDb);
            this.setState({
                comentarios: coments
            })
        })

	} 

    guardarComentario(){
        db.collection('posts')
        .doc(this.props.route.params.id)
        .update({
         comments: firebase.firestore.FieldValue.arrayUnion(this.state.comentario)
         })
         .then((res) => {
            this.props.navigation.navigate('Comentarios');
        })
          .catch( err => console.log(err))
    

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
                           <Text style= {styles.text}> {item.data} </Text>
                           
						</View>
					)}
				/>
 
        <Text style= {styles.titulo} > Comentar </Text>
        <TextInput
                 style ={styles.campo} 
                 onChangeText={(text) => this.setState(
                    {comentario: text})} 
                multiline
                />
                <TouchableOpacity
                style={styles.button}
                onPress= {()=>this.guardarComentario()}
                >
                    <Text style= {styles.button}> Guardar comentario</Text>
                </TouchableOpacity>
             
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
   }, campo: {
    borderRadius: 10,
    width:200,
    height: 50,
    paddingLeft: 10,
    borderColor: '#62504c',
    borderWidth: 1,
    marginBottom:8,
    borderRadius: 10,
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

    


