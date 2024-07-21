import { Image, StyleSheet, View } from 'react-native'

export type SwiperCardProps = {
	title: string
	stats: string
	imageURL: string
	description: string
}

const SwiperCard = ({ imageURL }: SwiperCardProps) => {
	return (
		<View style={styles.mainContainer}>
			<Image style={styles.image} source={{ uri: imageURL }} />
		</View>
	)
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: '80%',
		height: '60%',
		borderRadius: 20,
	},
})

export default SwiperCard
