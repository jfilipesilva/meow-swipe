/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StatusBar, StyleSheet } from 'react-native'

import { SafeAreaProvider } from 'react-native-safe-area-context'
import BottomTabs from './navigation/BottomTabs'
import { SWRConfig } from 'swr'

const App = () => {
	return (
		<SWRConfig>
			<SafeAreaProvider style={styles.backgroundStyle}>
				<NavigationContainer>
					<StatusBar
						barStyle="dark-content"
						backgroundColor={styles.backgroundStyle.backgroundColor}
					/>
					<BottomTabs />
				</NavigationContainer>
			</SafeAreaProvider>
		</SWRConfig>
	)
}

const styles = StyleSheet.create({
	backgroundStyle: {
		flex: 1,
		backgroundColor: 'white',
	},
})

export default App
