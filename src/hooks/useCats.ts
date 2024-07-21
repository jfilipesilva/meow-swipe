import useSWRInfinite from 'swr/infinite'
import { theCatAPI } from '../api/catApi/catApi'
import { useCallback } from 'react'

const useCats = () => {
	const fetcher = (page: number) => {
		try {
			return theCatAPI.images.searchImages({
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

	const { setSize, isLoading, data, error, isValidating } = useSWRInfinite(
		page => ['searchImages', page],
		([_, page]) => fetcher(page),
		{ parallel: true },
	)

	const catListData = data?.flat() ?? []

	const loadPagination = useCallback(
		(swiperIndex: number) => {
			if (
				!isLoading &&
				!isValidating &&
				catListData &&
				catListData.length > 0 &&
				swiperIndex >= catListData.length - 6
			) {
				setSize(size => size + 1)
			}
		},
		[isLoading, catListData?.length, catListData],
	)

	return {
		isLoading,
		isValidating,
		catListData,
		error,
		loadPagination,
	}
}

export default useCats
