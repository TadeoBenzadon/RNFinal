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
	} //Es un componente de clase porque....
    componentDidMount(){
        auth.onAuthStateChanged(user =>{
             if(user){
                  this.props.navigation.navigate('HomeMenu')
             }
        })
   }
          
//Al registrar un user, queremos guardarlo en la db con nombre,biografia. ¿como hago esto?
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
            <View>
                <Text style = {styles.titulo}>Dream Team</Text>
                <View>
                    <TextInput
                     style = {styles.campo}
                     keyboardType = 'default'  //poruqe default ??
                     placeholder= 'Nombre de Usuario'
                     value={this.state.nombreUsuario}
                     onChangeText={nombre => this.setState({username:nombre})}
                    />

                    <TextInput 
                     style = {styles.campo}
                     keyboardType = 'email-address'  
                     placeholder= 'email'
                     value={this.state.email}
                     onChangeText={text => this.setState({email:text})}  //Utilizamos setState para actualizar el estado
                    /> 

                    <TextInput 
                     style = {styles.campo}
                     keyboardType="default"
                     placeholder="password"
                     secureTextEntry={true}
                     value={this.state.password}
                     onChangeText={contra => this.setState({password:contra})}
                     />

                    <TextInput 
                     style = {styles.campo}
                     keyboardType="default"
                     placeholder="Biografia"
                     value={this.state.bio}
                     onChangeText={bio => this.setState({bio:bio})}
                     />


                <TouchableOpacity
                    onPress={() => this.register()} 
                    style={styles.button}
                >
                    <Text style={styles.text}>Registrarse</Text>
                </TouchableOpacity>

                <TextInput  onChangeText={(text) => this.setState({ pass: text })} value={this.state.pass} />
					<Text style={styles.text} onPress={() => this.props.navigation.navigate('Login')}>Ya tengo cuenta</Text>
                </View>
                <Text> {this.state.registerError}</Text>

            </View>
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
    bio:{
         textAlign: 'center',
         fontWeight: 50,
         fontSize: 15,
         paddingTop: 10,
         paddingBottom: 10,
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