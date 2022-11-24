import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { auth } from '../../firebase/config';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
            loginError: ''
		};
	}
     
	login(email, password) {
		auth
			.signInWithEmailAndPassword(email, password)
			.then((res) => {
				this.props.navigation.navigate('HomeMenu');
			})
			.catch((error) => {
                this.setState({
                      loginError: error.message
                 })
              } )
	}

	render() {
		return (
			<View style={styles.contenedor}>
				<Text style = {styles.titulo}>Ingresar</Text>
				<View>
					<TextInput style={styles.campo} placeholder="Email" keyboardType="email-address" onChangeText={(text) => this.setState({ email: text })} value={this.state.email} />
					<TextInput style={styles.campo} placeholder="Password" keyboardType="default" secureTextEntry onChangeText={(text) => this.setState({ password: text })} value={this.state.password} />
					<Text style={styles.text} onPress={() => this.login(this.state.email, this.state.password)}>Ingresar</Text>
					<Text style={styles.text} onPress={() => this.props.navigation.navigate('Register')}>No tengo cuenta</Text>
                    <Text> {this.state.loginError}</Text>
				</View>
			</View>
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
    },
 });


 export default Login;