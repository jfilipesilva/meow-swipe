import { StyleSheet, ViewProps } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

type ScreenLayoutProps = ViewProps

const ScreenLayout = ({ children }: ScreenLayoutProps) => {
	const { bottom } = useSafeAreaInsets()
	return (
		<SafeAreaView style={[styles.mainContainer, { paddingBottom: bottom }]}>
			{children}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		paddingTop: 20,
		backgroundColor: 'white',
	},
})
export default ScreenLayout
