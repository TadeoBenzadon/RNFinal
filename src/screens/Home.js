import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-web';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			posteos: [],
			descripcion: '',
            like: false
		};
	}
	
	componentDidMount() {
	

		db.collection('posts').orderBy('createdAt', 'desc').onSnapshot((docs) => {
				let postsFromDb = [];
				docs.forEach((doc) => {
					let post = doc.data();
					postsFromDb.push({ id: doc.id, data: post });
				});
				console.log(postsFromDb);

				this.setState({ posteos: postsFromDb });
			});
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
				<Text style= {styles.titulo} > Dream Team </Text>
				
                <FlatList 
					data={this.state.posteos}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<View style= {styles.container}> 
                            <Text style= {styles.titulo2} >{item.data.owner}</Text>
							<Text style= {styles.text} > DESCRIPCION: {item.data.description}</Text>
                            { this.state.like == false ? ( 
							<TouchableOpacity onPress={() => this.likear(item.id)}>
								<Text style= {styles.button} >Dar Like</Text>
							</TouchableOpacity>
                            ) : (<TouchableOpacity onPress={()=> this.sacarLike(item.id)}>
                            <Text> Sacar Like </Text> 
                            </TouchableOpacity>
                            
                            )} 
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
        fontSize: 100,
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
    container:{
        flex:1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderWidth:1,
        borderRadius:5,
        paddingVertical:16,
        paddingHorizontal:8,
    }, 
    button:{
        fontSize: 18,
        color: 'red',
   },
    text:{
        textAlign: 'center',
        fontWeight: 50,
        fontSize: 15,
        paddingTop: 10,
        paddingBottom: 10,
   }
})

export default Home;

    

