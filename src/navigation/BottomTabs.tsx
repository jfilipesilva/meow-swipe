import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Dimensions, StyleSheet, View } from 'react-native'
import HomeScreen from '../screens/HomeScreen'
import Screen02 from '../screens/Screen02'
import Screen03 from '../screens/Screen03'

const Tab = createBottomTabNavigator()

const BottomTabs = () => {
	return (
		<Tab.Navigator screenOptions={{ headerShown: false }}>
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="Screen02" component={Screen02} />
			<Tab.Screen name="Screen03" component={Screen03} />
		</Tab.Navigator>
	)
}

export default BottomTabs
