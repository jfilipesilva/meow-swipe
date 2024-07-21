import { FlatList, Image, Text, View } from 'react-native'
import ScreenLayout from '../layouts/ScreenLayout'
import useCats from '../hooks/useCats'
import HomeScreenTemplate from '../templates/HomeScreenTemplate'
import { SwiperData } from '../components/organisms/Swiper/Swiper'

const HomeScreen = () => {
	const { catListData, loadPagination } = useCats()

	const swiperData: SwiperData = catListData.map(cat => {
		return {
			...(cat.breeds
				? {
						title: cat.breeds[0].name,
						description: cat.breeds[0].origin,
						stats: cat.breeds[0].affection_level,
				  }
				: { title: '', description: '', stats: '' }),
			imageURL: cat.url,
		}
	})

	return (
		<ScreenLayout>
			<HomeScreenTemplate data={swiperData} onSnapToItem={loadPagination} />
		</ScreenLayout>
	)
}

export default HomeScreen
