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
import { HeartIcon, XIcon } from '../../../assets/images'
import palette from '../../../theme/palette'

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
	isLoading,
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
		<>
			<View style={styles.mainContainer}>
				{isLoading && ref.current?.getCurrentIndex() === data.length - 1 && (
					<ActivityIndicator
						style={{ position: 'absolute', zIndex: 100 }}
						size="large"
					/>
				)}
				<Carousel
					ref={ref}
					loop={false}
					style={[styles.carousel, { width: PAGE_WIDTH, height: PAGE_HEIGHT }]}
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
					windowSize={4}
					onSnapToItem={index => {
						loadPagination(index)
						if (directionAnimVal.value === Math.sign(1)) {
							onPressRight(index)
						} else {
							onPressLeft(index)
						}
					}}
				/>
			</View>
			<View style={styles.buttonsContainer}>
				<Pressable
					style={styles.button}
					onPress={() => {
						directionAnimVal.value = Math.sign(-1)
						ref.current?.next()
					}}>
					<XIcon />
				</Pressable>
				<Pressable
					style={styles.button}
					onPress={() => {
						directionAnimVal.value = Math.sign(1)
						ref.current?.next()
					}}>
					<HeartIcon />
				</Pressable>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	carousel: {
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center',
		alignContent: 'center',
	},
	buttonsContainer: {
		paddingBottom: 20,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		height: 54,
		aspectRatio: 1,
		borderRadius: 80,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: palette.shadowColor,
		backgroundColor: 'white',
		marginHorizontal: 20,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,
		elevation: 10,
	},
})

export default Swiper
