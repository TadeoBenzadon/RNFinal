import React, { Component } from 'react';
import { db, auth } from '../../firebase/config';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			username: '',
            bio: '',             
            fotoDePerfil: false,  // se pone false porque va estar vacio, ya que la funcionalidad no esta programada. 
		};
	} 
    componentDidMount(){
        auth.onAuthStateChanged(user =>{
             if(user){
                  this.props.navigation.navigate('HomeMenu')
             }
        })
   }
          
//Al registrar un user, queremos guardarlo en la db con nombre,biografia. 
 register(){
    auth
			.createUserWithEmailAndPassword(this.state.email, this.state.password)
			.then((res) => {
				db
					.collection('users')
					.add({ email: this.state.email,         //lo pasamos asi porque esta dentro de un OBJETO LOTERAL.
                        password: this.state.password, 
                        username: this.state.username, 
                        bio: this.state.bio,
                        fotoDePerfil: this.state.fotoDePerfil,
                     })
					.then((res) => {
						this.setState({
							email: '',
							password: '',
                            bio: '',
						});
						this.props.navigation.navigate('HomeMenu');
					})
                    })
                    .catch((error) => {console.log(error)
                        this.setState({
                              registerError: error.message
                         })
                      } )
 }


    render(){
        return(
            <View style={styles.contenedor}>
                <Text style = {styles.titulo}>Be Positive</Text>
                <View>
                    <TextInput
                     style = {styles.campo}
                     keyboardType = 'default'  
                     placeholder= 'Nombre de Usuario'
                     onChangeText={nombre => this.setState({username:nombre})}
                     value={this.state.nombreUsuario}
                    />

                    <TextInput 
                     style = {styles.campo}
                     keyboardType = 'email-address'  
                     placeholder= 'Email'
                     onChangeText={text => this.setState({email:text})}  //Utilizamos setState para actualizar el estado
                     value={this.state.email}
                    /> 

                    <TextInput 
                     style = {styles.campo}
                     keyboardType="default"
                     placeholder="Password"
                     secureTextEntry={true}
                     onChangeText={contra => this.setState({password:contra})}
                     value={this.state.password}
                     />

                    <TextInput 
                     style = {styles.campo}
                     keyboardType="default"
                     placeholder="Biografia"
                     onChangeText={bio => this.setState({bio:bio})}
                     value={this.state.bio}
                     />


                <TouchableOpacity
                    onPress={() => this.register()} 
                    style={styles.button}
                >
                    <Text style={styles.text}>Registrarse</Text>
                </TouchableOpacity>

                
					<Text style={styles.text} onPress={() => this.props.navigation.navigate('Login')}>Ya tengo cuenta</Text>
                </View>
                <Text> {this.state.registerError}</Text>

            </View>
        );
    }
}

 const styles = StyleSheet.create({
    contenedor:{
        paddingHorizontal:10,
        alignItems:"center",
        height: "100%",
        marginTop: 10,
        display:"flex",
        justifyContent:"center",
        backgroundColor: '#cabfa5',
    },
    titulo:{
        textAlign: 'center',
        fontWeight: 50,
        fontSize:50,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom:20,
        color: "black",
    },
	campo: {
         borderRadius: 10,
         width:200,
         height: 50,
         paddingLeft: 10,
         borderColor: '#62504c',
         borderWidth: 1,
         marginBottom:8,
         borderRadius: 10,
    },
    bio:{
         borderRadius: 10,
         textAlign: 'center',
         fontWeight: 50,
         fontSize: 15,
         paddingTop: 10,
         paddingBottom: 10,
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
    },
    contra:{
         textAlign: 'center',
         fontWeight: 50,
         fontSize: 15,
         paddingTop: 10,
         paddingBottom: 10,
    },
 });


export default Register;