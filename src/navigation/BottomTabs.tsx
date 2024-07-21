import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Dimensions, StyleSheet, View } from 'react-native'
import HomeScreen from '../screens/HomeScreen'
import Screen02 from '../screens/Screen02'
import Screen03 from '../screens/Screen03'

const Tab = createBottomTabNavigator()

const BottomTabs = () => {
	const { bottom } = useSafeAreaInsets()

	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				headerStyle: { borderColor: 'transparent' },
				tabBarStyle: [styles.tabBar, { bottom }],
			}}>
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="Screen02" component={Screen02} />
			<Tab.Screen name="Screen03" component={Screen03} />
		</Tab.Navigator>
	)
}

const styles = StyleSheet.create({
	tabBar: {
		flexDirection: 'row',
		position: 'absolute',
		left: Dimensions.get('window').width / 2 - 100,
		alignSelf: 'flex-end',
		flex: 1,
		height: 40,
		width: 200,
		borderRadius: 50,
		paddingBottom: 0,
		overflow: 'visible',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.3,
		shadowRadius: 4.65,

		elevation: 8,
	},
})

export default BottomTabs
