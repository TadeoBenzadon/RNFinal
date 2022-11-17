import React, {Component} from 'react';
import { db } from '../../firebase/config'
import { View,
         Text,
         TextInput,
         TouchableOpacity, 
         StyleSheet, 
         FlatList } from 'react-native';

class Buscador extends Component{
    constructor(props){
        super(props);
        this.state={
            results:[],
            users:[],
            filtro:'',
        }
    }
    componentDidMount(){
        db.collection('users').onSnapshot(
            users => {
                let usersFromDb = [];
                users.forEach( (user) => {
                    usersFromDb.push({
                        id: user.id,
                        data: user.data()
                    })
                })
                this.setState(
                    {
                        users:usersFromDb
                        
                    }
                )
    })}
    search(){  
        if(this.state.filtro.length>0){

            let nuevoArray = this.state.users.filter((user) => {
                
                return user.data.username.includes(this.state.filtro)
                
            })
            
            this.setState({
                results:nuevoArray
            })

        }
    }
                    
    
    render(){
        return(

            <> 
            <Text style= {styles.titulo}> Buscador de usuarios </Text>
                 <View >
                    <TextInput 
                        style={styles.campo}
                        keyboardType='default'
                        placeholder='Insert user name'
                        value={this.state.filterBy}
                        onChangeText={(text) => {this.setState({filtro:text})}}
                    />  
                    <TouchableOpacity
                        style={styles.button} 
                        onPress={()=>this.search()}
                        >
                        <Text style={ styles.text}>Buscar</Text>
                    </TouchableOpacity>                         
                </View>
            { this.state.results == 0 ? ( <> <Text> El email/ user name no existe</Text></> ) : (<>  <View style={styles.container}>
                
                <FlatList 

                   data={this.state.results}
                   keyExtractor={(item) => item.id}
                   renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Perfiles', {email: item.data.owner})}>
                       <View style={ styles.contenedor} > 
                           <Text style={ styles.text}> {item.data.username}</Text>
                        </View> 
                        </TouchableOpacity>)}
                />
            </View></> )}
               
                </>
        )}
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