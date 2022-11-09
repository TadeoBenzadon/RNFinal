import React, {Component} from 'react';
import { db } from '../../firebase/config';
import { View,
         Text,
         TextInput,
         TouchableOpacity, 
         StyleSheet, 
         FlatList } from 'react-native';

class Buscador extends Component {
    constructor(props){
        super(props);
        this.state={
            posts:[],
            email:'',
            whoIs:'',
        }
    }
    
    search(email){ 
        db.collection('posts').where('owner', '==', email).onSnapshot(
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
                    whoIs: email,
                })
            }
        )

        
    }



    
    render(){
        return(
                <View>
                
                    <Text style= {styles.titulo}>Buscador de publicaciones</Text>
                     <View >
                        <TextInput 
                            style={styles.campo}
                            keyboardType='default'
                            placeholder='Ingrese el email del usuario'
                            value={this.state.email}
                            onChangeText={text => this.setState({ email: text})}
                        />  
                        <TouchableOpacity
                            style={styles.button} 
                            onPress={()=>this.search(this.state.email)}
                           
                            disabled= {this.state.email == '' ? true : false }
                            >
                            <Text style={ styles.text}>Buscar</Text>
                        </TouchableOpacity>                         
                    </View>
                    <FlatList 
                       data={this.state.posts}
                       keyExtractor={(item) => item.id}
                       renderItem={({ item }) => (
                           <View style= {styles.container}> 
                               <Text style= {styles.titulo2} >{item.data.owner}</Text>
                               <Text style= {styles.text} > DESCRIPCION: {item.data.description}</Text>
                               </View> )}
                    />
                    
                </View>

        )
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
	campo: {
         fontSize: 16,
         borderColor: '#f00',
         borderWidth: 1,
         borderStyle: 'solid',
         borderRadius: 4,
         marginVertical: 8, 
         marginHorizontal: 16,
         color: '#f00',
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
 });

export default Buscador; 