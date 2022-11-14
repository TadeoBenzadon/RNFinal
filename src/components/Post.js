import React, { Component } from 'react'
import { Text,  TouchableOpacity, StyleSheet } from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase';

export default class Post extends Component {

    constructor(props) {
		super(props);
		this.state = {
			users: [],
			posteos: [],
			descripcion: '',
            like: false 
		};
	}
	likear(idDelPosteo) {
		db.collection('posts').doc(idDelPosteo).update({
				likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
			})
			.then(res=> {this.setState({
                like: true
            });})
			.catch((err) => console.log(err));
	}

    sacarLike(idDelPosteo){
        db.collection('posts').doc(idDelPosteo).update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(res=> {this.setState({
            like: false
        });})
        .catch ((err)=> console.log(err))
        }

  render() {
    return (
        <> 
       <Text style= {styles.titulo2} >{this.props.owner}</Text>
							<Text style= {styles.text} > DESCRIPCION: {this.props.description}</Text>
                            { this.state.like ? ( 
							<TouchableOpacity onPress={()=> this.sacarLike(this.props.id)}>
                            <Text> Sacar Like </Text> 
                            </TouchableOpacity>
                            ) : ( <TouchableOpacity onPress={() => this.likear(this.props.id)}>
                            <Text style= {styles.button} >Dar Like</Text>
                        </TouchableOpacity>
                            )
                            } 
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Comentarios', {id: this.props.id})}>
                            <Text style= {styles.button} >Comentar</Text>
                        </TouchableOpacity>
        </>
    )
  }
}

const styles = StyleSheet.create({
  
    titulo2:{
        textAlign: 'center',
        fontWeight: 50,
        fontSize:20,
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
    text:{
        textAlign: 'center',
        fontWeight: 50,
        fontSize: 15,
        paddingTop: 10,
        paddingBottom: 10,
   }
})



    



