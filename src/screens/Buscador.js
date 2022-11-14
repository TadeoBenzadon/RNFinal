import React, {Component} from 'react';
import { db } from '../../firebase/config';
import { View,
         Text,
         TextInput,
         TouchableOpacity, 
         StyleSheet, 
         FlatList } from 'react-native';
import Post from '../components/Post';

class Buscador extends Component {
    constructor(props){
        super(props);
        this.state={
            users:[],
            email:'',
            filterBy:'',
        }
    }
    
    search(){ 
        if(this.state.filterBy==""){ 
            db.collection('users').onSnapshot(
                docs => {
                    let usersFromDb = [];
                    docs.forEach( oneDoc => {
                        usersFromDb.push({
                            id: oneDoc.id,
                            data: oneDoc.data()
                        })
                    })
                    let nuevoArray = usersFromDb.filter(function(user){
                        //Si la propiedad username es igual a lo que puse en filtro
                        if(user.username.includes(this.state.filterBy)){
                         return true 
                        }else { 
                            return false
                        }
                    })
                    this.setState({
                        users:nuevoArray,
                    })
                    
                }
            )
        }
       
    }

    handleChange(text){
        this.setState({
          filterBy: text
        },()=>{
          this.search(this.state.filterBy)
        })
       }

    
    render(){
        console.log(this.state.users)
        return(
                <View style={styles.contenedor}>
                
                    <Text style= {styles.titulo}>Buscador de publicaciones</Text>
                     <View >
                        <TextInput 
                            style={styles.campo}
                            keyboardType='default'
                            placeholder='Ingrese el nombre del usuario'
                            value={this.state.filterBy}
                            onChangeText={(text) => {this.handleChange(text)}}
                        />  
                        <TouchableOpacity
                            style={styles.button} 
                            onPress={()=>this.search(this.state.users)}
                            >
                            <Text style={ styles.text}>Buscar</Text>
                        </TouchableOpacity>                         
                    </View>
                    {/* <FlatList 
                       data={this.state.users}
                       keyExtractor={(item) => item.id}
                       renderItem={({ item }) => (
                           <View> 
                               <Text> {item.data.username}</Text>
                            </View> )}
                    />
                     */}
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