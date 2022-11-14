import Home from '../screens/Home';
import Profile from '../screens/Profile';
import NewPost from '../screens/NewPost';
import Buscador from '../screens/Buscador';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function HomeMenu() {
	return (
  
	<Tab.Navigator>
			<Tab.Screen name="Home" component={Home} />
		
			<Tab.Screen name="Profile" component={Profile} />

			<Tab.Screen name="NewPost" component={NewPost} />

			<Tab.Screen name="Buscador" component={Buscador} />
		
		</Tab.Navigator>
  )
  
}






