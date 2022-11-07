import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { auth } from '../../firebase/config';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			pass: '',
            loginError: ''
		};
	}
     
	login(email, pass) {
		auth
			.signInWithEmailAndPassword(email, pass)
			.then((res) => {
				this.props.navigation.navigate('HomeMenu');
			})
			.catch((error) => {console.log(error)
                this.setState({
                      loginError: error.message
                 })
              } )
	}

	render() {
		return (
			<View>
				<Text>Ingresar</Text>
				<View>
					<TextInput style={styles.campo} placeholder="email" keyboardType="email-address" onChangeText={(text) => this.setState({ email: text })} value={this.state.email} />
					<TextInput style={styles.campo} placeholder="password" keyboardType="default" secureTextEntry onChangeText={(text) => this.setState({ pass: text })} value={this.state.pass} />
					<Text style={styles.text} onPress={() => this.login(this.state.email, this.state.pass)}>Ingresar</Text>
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


 export default Login;