import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import palette from '../../theme/palette'

export type SwiperCardProps = {
	title: string
	stats: string
	imageURL: string
	description: string
}

const SwiperCard = ({
	imageURL,
	description,
	stats,
	title,
}: SwiperCardProps) => {
	return (
		<View style={styles.mainContainer}>
			<View style={styles.imageContainer}>
				<Image style={styles.image} source={{ uri: imageURL }} />
				<View style={styles.detailsContainer}>
					<View style={styles.titleRow}>
						<Text style={styles.titleText}>{title}</Text>
						<Text style={styles.titleText}>{stats}</Text>
					</View>
					<View>
						<Text style={styles.descriptionText}>{description}</Text>
					</View>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		bottom: Dimensions.get('window').height * 0.12,
	},
	imageContainer: {
		height: Dimensions.get('window').width + 100,
		width: Dimensions.get('window').width * 0.9,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		shadowColor: palette.shadowColor,
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.51,
		shadowRadius: 13.16,
		elevation: 20,
	},
	image: {
		width: '100%',
		height: '100%',
		borderRadius: 20,
	},
	detailsContainer: {
		height: 48,
		width: '90%',
		padding: 10,
		zIndex: 100,
		bottom: 0,
		alignSelf: 'center',
		position: 'absolute',
		backgroundColor: 'white',
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
	},
	titleRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	titleText: {
		fontSize: 17,
		fontWeight: '700',
		color: '#434141',
	},
	descriptionText: {
		fontSize: 10,
		fontWeight: '700',
		color: palette.inactiveColor,
	},
})

export default SwiperCard
