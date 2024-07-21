import { useCallback, useRef } from 'react'
import {
	ActivityIndicator,
	Dimensions,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import {
	Extrapolation,
	interpolate,
	useSharedValue,
} from 'react-native-reanimated'
import Carousel, {
	ICarouselInstance,
	TAnimationStyle,
} from 'react-native-reanimated-carousel'
import SwiperCard, { SwiperCardProps } from '../../molecules/SwiperCard'

export type SwiperData = SwiperCardProps[]
export type SwiperProps = {
	data: SwiperData
	isLoading: boolean
	onPressLeft: (index: number) => void
	onPressRight: (index: number) => void
	loadPagination: (index: number) => void
}

const Swiper = ({
	data,
	onPressLeft,
	onPressRight,
	loadPagination,
}: SwiperProps) => {
	const ref = useRef<ICarouselInstance>(null)

	const PAGE_WIDTH = Dimensions.get('window').width
	const PAGE_HEIGHT = Dimensions.get('window').height

	const directionAnimVal = useSharedValue(0)

	const animationStyle: TAnimationStyle = useCallback(
		(value: number) => {
			'worklet'

			const translateX =
				interpolate(value, [-1, 0], [PAGE_WIDTH, 0], Extrapolation.CLAMP) *
				directionAnimVal.value

			const rotateZ =
				interpolate(value, [-1, 0], [15, 0], Extrapolation.CLAMP) *
				directionAnimVal.value

			const zIndex = interpolate(
				value,
				[0, 1, 2, 3, 4],
				[0, 1, 2, 3, 4].map(v => (data.length - v) * 10),
				Extrapolation.CLAMP,
			)

			const scale = interpolate(value, [0, 1], [1, 0.95])

			const opacity = interpolate(
				value,
				[-1, -0.8, 0, 1],
				[0, 0.9, 1, 0.85],
				Extrapolation.EXTEND,
			)

			return {
				transform: [{ translateX }, { rotateZ: `${rotateZ}deg` }, { scale }],
				zIndex,
				opacity,
			}
		},
		[PAGE_HEIGHT, PAGE_WIDTH],
	)

	const renderItem = useCallback(
		(props: SwiperCardProps) => <SwiperCard {...props} />,
		[],
	)

	return (
		<View style={styles.mainContainer}>
			<Carousel
				ref={ref}
				loop={false}
				style={styles.carousel}
				defaultIndex={0}
				vertical={false}
				width={PAGE_WIDTH}
				height={PAGE_HEIGHT}
				data={data}
				onConfigurePanGesture={g => {
					g.onChange(e => {
						directionAnimVal.value = Math.sign(e.translationX)
					}).runOnJS(true)
				}}
				fixedDirection="negative"
				renderItem={({ item }) => renderItem(item)}
				customAnimation={animationStyle}
				windowSize={5}
				onSnapToItem={index => {
					loadPagination(index)
					if (directionAnimVal.value === Math.sign(1)) {
						onPressRight(index)
					} else {
						onPressLeft(index)
					}
				}}
			/>
			<View style={styles.buttonsContainer}>
				<Pressable
					style={styles.button}
					onPress={() => {
						directionAnimVal.value = Math.sign(-1)
						ref.current?.next()
					}}>
					<Text>Left</Text>
				</Pressable>
				<Pressable
					style={styles.button}
					onPress={() => {
						directionAnimVal.value = Math.sign(1)
						ref.current?.next()
					}}>
					<Text>Right</Text>
				</Pressable>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	mainContainer: { flex: 1 },
	carousel: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: '80%',
		height: '60%',
		borderRadius: 20,
	},
	buttonsContainer: {
		marginBottom: 30,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		height: 80,
		aspectRatio: 1,
		borderRadius: 80,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		backgroundColor: 'white',
		marginHorizontal: 20,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,
		elevation: 4,
	},
})

export default Swiper
