import useSWRInfinite from 'swr/infinite'
import { theCatAPI } from '../api/catApi/catApi'

const useCats = () => {
	const fetcher = async (page: number) => {
		try {
			return await theCatAPI.images.searchImages({
				page,
				limit: 10,
				size: 'small',
				order: 'ASC',
				hasBreeds: true,
				mimeTypes: ['jpg'],
			})
		} catch (error) {
			throw error
		}
	}

	const { setSize, isLoading, data, error } = useSWRInfinite(
		page => ['searchImages', page],
		async ([_, page]) => fetcher(page),
		{ parallel: true },
	)
	const catListData = data?.flat() ?? []

	return { isLoading, catListData, error, setSize }
}

export default useCats
