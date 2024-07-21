import { FlatList, Image, Text, View } from 'react-native'
import ScreenLayout from '../layouts/ScreenLayout'
import useCats from '../hooks/useCats'

const HomeScreen = () => {
	const { catListData } = useCats()
	return (
		<ScreenLayout>
			<Text>HomeScreen</Text>
			<FlatList
				data={catListData}
				renderItem={({ item }) => (
					<Image width={400} height={500} source={{ uri: item.url }} />
				)}
			/>
		</ScreenLayout>
	)
}

export default HomeScreen
