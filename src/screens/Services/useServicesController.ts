import { useIsFocused } from "@react-navigation/native"
import { useCallback, useEffect, useState } from "react"
import { useAppSelector } from "../../hooks"
import useSearch from "../../hooks/useSearch"
import useToggle from "../../hooks/useToggle"
import { ServiceData } from "../../interfaces"
import { useGetServicesQuery, useHandleFavoriteMutation } from "../../redux/Apis/Service"
import { selectLoggedIn } from "../../redux/Slices/AuthSlice"
import { navigate } from "../../utils/navigation"
import { ROUTES } from "../../utils/routes"

const useServicesController = () => {

    const is_focused = useIsFocused()
    const authorized = useAppSelector(selectLoggedIn)

    const [toggleFilterModal, filter_modal_open] = useToggle()
    const { search, debouncedSearch, onChange: onChangeSearch } = useSearch()

    const [services, setServices] = useState<ServiceData[]>([])
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])

    const { data, isFetching: isLoading, refetch, isSuccess } = useGetServicesQuery({ search: debouncedSearch, categories: selectedFilters })
    const [favorite] = useHandleFavoriteMutation({})

    useEffect(() => {
        if (isSuccess) {
            setServices(data?.data || [])
        }
    }, [isSuccess, data, isLoading])

    useEffect(() => {
        if (isLoading) {
            setServices([])
        }
    }, [isLoading])

    useEffect(() => {
        if (is_focused) {
            setServices([])
            refetch()
        }
    }, [is_focused])

    const onFavorite = useCallback((id: number | string) => {

        favorite(id)

        let updated_services = services.map((item: any) => {
            if (item._id === id) {
                return {
                    ...item,
                    is_favorite: !item.is_favorite
                }
            } else {
                return item
            }
        })

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
            authorized: !!authorized,
            filter_modal_open,
            selected_filters: selectedFilters,
            search
        },
        functions: {
            onReload: refetch,
            onFavorite,
            onPressCard,
            toggleFilterModal,
            onApplyFilters,
            onChangeSearch
        }
    }

}

export default useServicesController