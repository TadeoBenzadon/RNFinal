import  Register from './src/screens/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import HomeMenu from './src/components/HomeMenu';
import NewPost from './src/screens/NewPost';
import MyCamera from './src/components/MyCamera';


const Stack = createNativeStackNavigator();
{/* La primera Stack.Screen va a ser la primera vista que vea el usuario */}

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
				<Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
				<Stack.Screen options={{ headerShown: false }} name="Home" component={Home} /> 
				<Stack.Screen options={{ headerShown: false }} name="HomeMenu" component={HomeMenu}/>
				<Stack.Screen options={{ headerShown: false }} name="NewPost" component={NewPost}/>
				<Stack.Screen options={{ headerShown: false }} name="MyCamera" component={MyCamera}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}


