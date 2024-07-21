import { FlatList, Image, Text, View } from 'react-native'
import ScreenLayout from '../layouts/ScreenLayout'
import useCats from '../hooks/useCats'
import HomeScreenTemplate from '../templates/HomeScreenTemplate'
import { SwiperData } from '../components/organisms/Swiper/Swiper'
import { theCatAPI } from '../api/catApi/catApi'
import { useCallback } from 'react'

const HomeScreen = () => {
	const { catListData, loadPagination, isLoading, isValidating } = useCats()

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

	const upVote = useCallback(
		(index: number) => {
			try {
				theCatAPI.votes.addVote({
					imageId: catListData[index].id,
					value: 1,
				})
			} catch (error) {
				console.error(error)
			}
		},
		[catListData.length, theCatAPI],
	)

	const downVote = useCallback(
		(index: number) => {
			try {
				theCatAPI.votes.addVote({
					imageId: catListData[index].id,
					value: -1,
				})
			} catch (error) {
				console.error(error)
			}
		},
		[catListData.length, theCatAPI],
	)

	return (
		<ScreenLayout>
			<HomeScreenTemplate
				isLoading={isLoading || isValidating}
				data={swiperData}
				loadPagination={loadPagination}
				onPressRight={upVote}
				onPressLeft={downVote}
			/>
		</ScreenLayout>
	)
}

export default HomeScreen
