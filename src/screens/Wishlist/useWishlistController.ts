import { useIsFocused } from "@react-navigation/native"
import { useCallback, useEffect, useState } from "react"
import useToggle from "../../hooks/useToggle"
import { useHandleFavoriteMutation } from "../../redux/Apis/Service"
import { useGetFavoriteServicesQuery } from "../../redux/Apis/User"
import { navigate } from "../../utils/navigation"
import { ROUTES } from "../../utils/routes"

const useWishlistController = () => {

    const is_focused = useIsFocused()
    const [toggleFilterModal, filter_modal_open] = useToggle()

    const [services, setServices] = useState([])
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])

    const { data, isFetching: isLoading, refetch, isSuccess } = useGetFavoriteServicesQuery({ categories: selectedFilters })
    const [favorite] = useHandleFavoriteMutation({})

    useEffect(() => {
        if (is_focused) {
            setServices([])
            refetch()
        }
    }, [is_focused])

    useEffect(() => {
        if (isSuccess) {
            setServices(data?.data || [])
        }
    }, [isSuccess, data])

    useEffect(() => {
        if (isLoading) {
            setServices([])
        }
    }, [isLoading])

    const onFavorite = useCallback((id: number | string) => {

        favorite(id)

        let updated_services = services.filter((item: any) => item._id !== id)
        setServices(updated_services)

    }, [services])

    const onPressCard = useCallback((id: number | string) => {
        navigate(ROUTES.SERVICE_DETAILS, { id });
    }, [])

    const onApplyFilters = useCallback((filters: string[]) => {
        setSelectedFilters(filters)
    }, [])

    return {
        values: {
            data: services,
            isLoading,
            filter_modal_open,
            selected_filters: selectedFilters
        },
        functions: {
            onReload: refetch,
            onFavorite,
            onPressCard,
            toggleFilterModal,
            onApplyFilters
        }
    }

}

export default useWishlistController