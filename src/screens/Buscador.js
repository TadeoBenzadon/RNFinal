import React, {Component} from 'react';
import { db } from '../../firebase/config';
import { View,
         Text,
         TextInput,
         TouchableOpacity, 
         StyleSheet, 
         FlatList } from 'react-native';
import Home from './Home'

class Buscador extends Component {
    constructor(props){
        super(props);
        this.state={
            posts:[],
            user:'',
            whoIs:'',
        }
    }
    
    search(user){ 
        db.collection('posteos').where('owner', '==', user).onSnapshot(
            docs => {
                let posts = [];
                docs.forEach( oneDoc => {
                    posts.push({
                        id: oneDoc.id,
                        data: oneDoc.data()
                    })
                })

                this.setState({
                    posts: posts,
                    user:'',
                    whoIs:user,
                })
            }
        )

        
    }



    
    render(){
        // console.log(this.state);
        return(
                <View>
                
                    <Text style= {styles.titulo}>Buscador de publicaciones</Text>
                     <View >
                        <TextInput 
                            style={styles.campo}
                            keyboardType='default'
                            placeholder='Ingrese el nombre del usuario'
                            value={this.state.user}
                            onChangeText={text => this.setState({ user: text})}
                        />  
                        <TouchableOpacity
                            style={styles.button} 
                            onPress={()=>this.search(this.state.user)}
                           
                            disabled= {this.state.user == '' ? true : false }
                            >
                            <Text style={ styles.text}>Buscar</Text>
                        </TouchableOpacity>                         
                    </View>
                    <FlatList 
                        data={this.state.posts}
                        keyExtractor={post => post.id}
                        renderItem = { ({item}) => <Home info={item}
                        {...this.props} />}
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