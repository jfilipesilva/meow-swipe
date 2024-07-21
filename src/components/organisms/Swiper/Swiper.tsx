import { useCallback } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import {
	Extrapolation,
	interpolate,
	useSharedValue,
} from 'react-native-reanimated'
import Carousel, {
	TAnimationStyle,
	TCarouselProps,
} from 'react-native-reanimated-carousel'
import SwiperCard, { SwiperCardProps } from '../../molecules/SwiperCard'

export type SwiperData = SwiperCardProps[]
export type SwiperProps = Pick<TCarouselProps, 'onSnapToItem'> & {
	data: SwiperData
}

const Swiper = ({ data }: SwiperProps) => {
	const PAGE_WIDTH = Dimensions.get('window').width
	const PAGE_HEIGHT = Dimensions.get('window').height

	const directionAnimVal = useSharedValue(0)

	const animationStyle: TAnimationStyle = useCallback(
		(value: number) => {
			'worklet'
			const translateY = interpolate(value, [0, 1], [0, -18])

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
				transform: [
					{ translateY },
					{ translateX },
					{ rotateZ: `${rotateZ}deg` },
					{ scale },
				],
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
		<View style={{ flex: 1 }}>
			<Carousel
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
					})
				}}
				fixedDirection="negative"
				renderItem={({ item }) => renderItem(item)}
				customAnimation={animationStyle}
				windowSize={5}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	carousel: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: '80%',
		height: '60%',
		borderRadius: 20,
	},
})

export default Swiper
