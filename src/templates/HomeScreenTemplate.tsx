import Swiper, { SwiperProps } from '../components/organisms/Swiper/Swiper'
import ScreenLayout from '../layouts/ScreenLayout'

type HomeScreenTemplateProps = SwiperProps

const HomeScreenTemplate = (props: HomeScreenTemplateProps) => {
	return <Swiper {...props} />
}

export default HomeScreenTemplate
