import { Route, TabBar, TabBarProps, TabView } from 'react-native-tab-view'
import Swiper, { SwiperProps } from '../components/organisms/Swiper/Swiper'
import { StyleSheet, useWindowDimensions, View } from 'react-native'
import { HotIcon, StarIcon } from '../assets/images'
import { useState } from 'react'

type HomeScreenTemplateProps = SwiperProps

const SecondRoute = () => <View style={{ flex: 1, backgroundColor: 'white' }} />

const renderScene = (route: Route, swiperProps: SwiperProps) => {
	switch (route.key) {
		case 'first':
			return <Swiper {...swiperProps} />
		case 'search':
			return <SecondRoute />
		default:
			return null
	}
}

const renderTabBar = (props: TabBarProps<Route>) => {
	return (
		<TabBar
			{...props}
			style={styles?.tabBar}
			activeColor="#EC537E"
			inactiveColor="#BFBFC0"
			tabStyle={styles?.tabStyle}
			indicatorStyle={styles?.indicatorStyle}
			indicatorContainerStyle={styles?.indicatorContainerStyle}
			renderLabel={({ route, focused, color }) => {
				switch (route.key) {
					case 'first':
						return <HotIcon fill={focused ? color : '#BFBFC0'} />
					case 'second':
						return <StarIcon fill={focused ? color : '#BFBFC0'} />
					default:
						return null
				}
			}}
		/>
	)
}

const HomeScreenTemplate = (props: HomeScreenTemplateProps) => {
	const layout = useWindowDimensions()

	const [index, setIndex] = useState(0)
	const [routes] = useState([
		{ key: 'first', title: 'Cats' },
		{ key: 'second', title: 'Favorites' },
	])
	return (
		<TabView
			swipeEnabled={false}
			navigationState={{ index, routes }}
			renderTabBar={renderTabBar}
			renderScene={({ route }) => renderScene(route, props)}
			onIndexChange={setIndex}
			initialLayout={{ width: layout.width }}
		/>
	)
}

const styles = StyleSheet.create({
	tabBar: {
		width: 100,
		overflow: 'hidden',
		marginHorizontal: 20,
		justifyContent: 'center',
		alignSelf: 'center',
		borderRadius: 20,
		backgroundColor: '#E3E3E4',
	},
	tabSceneContainer: {
		paddingHorizontal: 20,
	},
	tabStyle: {
		minHeight: 0,
	},
	indicatorStyle: {
		height: '100%',
		borderRadius: 20,
		backgroundColor: 'white',
	},
	indicatorContainerStyle: {
		margin: 4,
		width: '82%',
	},
})

export default HomeScreenTemplate
