import  Register from './src/screens/Register';
import { StyleSheet, Text, View } from 'react-native';
import HomeMenu from './src/components/HomeMenu';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Home from './src/screens/Home';

const Stack = createNativeStackNavigator();
{/* La primera Stack.Screen va a ser la primera vista que vea el usuario */}

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Register" component={Register} />
				<Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
				<Stack.Screen name="HomeMenu" component={HomeMenu} /> 
				<Stack.Screen name="Home" component={Home} /> 
			</Stack.Navigator>
		</NavigationContainer>
	);
}


