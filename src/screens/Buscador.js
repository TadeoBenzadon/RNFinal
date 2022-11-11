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
            filterBy:'',
        }
    }
    
    search(filtro){ 
        if(filtro==""){ 
            db.collection('users').onSnapshot(
                docs => {
                    let usersFromDb = [];
                    docs.forEach( oneDoc => {
                        usersFromDb.push({
                            id: oneDoc.id,
                            data: oneDoc.data()
                        })
                    })
    
                    this.setState({
                        users:usersFromDb,
                    })
                }
            )
        }
       
        
    }

    handleChange(e){
        this.setState({
          filterBy: e.target.value
        },()=>{
          this.filtrarPeliculas(this.state.filterBy)
        })
       }

    
    render(){
        return(
                <View style={styles.contenedor}>
                
                    <Text style= {styles.titulo}>Buscador de publicaciones</Text>
                     <View >
                        <TextInput 
                            style={styles.campo}
                            keyboardType='default'
                            placeholder='Ingrese el nombre del usuario'
                            value={this.state.filterBy}
                            onChangeText={(e) => {this.handleChange(e)}}
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
                           <View> 
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
        fontSize:50,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom:20,
        color: "black",
    },
    contenedor:{
        paddingHorizontal:10,
        alignItems:"center",
        height: "100%",
        marginTop: 10,
        display:"flex",
        justifyContent:"center",
        backgroundColor: '#cabfa5',
    },
    titulo2:{
        textAlign: 'center',
        fontWeight: 50,
        fontSize: 50,
        paddingTop: 10,
        paddingBottom: 10,
    },
	campo: {
        borderRadius: 10,
        width:210,
        height: 50,
        paddingLeft: 10,
        borderColor: '#62504c',
        borderWidth: 1,
        marginBottom:8,
        borderRadius: 10,
    },
    button:{
        borderRadius: 10,
        padding:2,
        borderWidth: 1,
        borderColor: '#62504c',
        backgroundColor: '#62504c',
        width:210,
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
 });

export default Buscador; 