import Swiper, { SwiperProps } from '../components/organisms/Swiper/Swiper'
import ScreenLayout from '../layouts/ScreenLayout'

type HomeScreenTemplateProps = SwiperProps

const HomeScreenTemplate = (props: HomeScreenTemplateProps) => {
	return (
		<ScreenLayout>
			<Swiper {...props} />
		</ScreenLayout>
	)
}

export default HomeScreenTemplate
