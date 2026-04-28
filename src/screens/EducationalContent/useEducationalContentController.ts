import { useIsFocused } from "@react-navigation/native"
import { useCallback, useEffect, useState } from "react"
import { useAppSelector } from "../../hooks"
import useSearch from "../../hooks/useSearch"
import { ContentData, TContentType } from "../../interfaces"
import { useGetContentsQuery } from "../../redux/Apis/Content"
import { selectLoggedIn } from "../../redux/Slices/AuthSlice"
import { navigate } from "../../utils/navigation"
import { ROUTES } from "../../utils/routes"

const TABS = [
    {
        label: "Videos",
        value: "video"
    },
    {
        label: "Article",
        value: "article"
    },
]

const useEducationalContentController = () => {

    const is_focused = useIsFocused()
    const authorized = useAppSelector(selectLoggedIn)

    const { search, debouncedSearch, onChange: onChangeSearch } = useSearch()

    const [content, setContent] = useState<ContentData[]>([])
    const [selected, setSelected] = useState<TContentType>(TABS[0].value as TContentType)

    const { data, isFetching: isLoading, refetch, isSuccess } = useGetContentsQuery({ search: debouncedSearch, type: selected })

    useEffect(() => {
        if (isSuccess && data?.data) {
            const rows = data.data as ContentData[]
            const visible = rows.filter((item) => {
                const deleted =
                    item.deleted === true || (item as { deleted?: string }).deleted === 'true'
                const active =
                    item.active === true || (item as { active?: string }).active === 'true'
                return active && !deleted
            })
            setContent(visible)
        }
    }, [isSuccess, data, isLoading])

    useEffect(() => {
        if (isLoading) {
            setContent([])
        }
    }, [isLoading])

    useEffect(() => {
        if (is_focused) {
            setContent([])
            refetch()
        }
    }, [is_focused])

    const onPressCard = useCallback((data: any) => {
        navigate(data.type === "article" ? ROUTES.VIEW_ARTICLE : ROUTES.VIEW_VIDEO, { ...data });
    }, [])

    const onChangeTab = useCallback((tab: TContentType) => {
        setSelected(tab)
    }, [])

    return {
        values: {
            data: content,
            isLoading,
            authorized: !!authorized,
            search,
            selected,
            TABS
        },
        functions: {
            onReload: refetch,
            onPressCard,
            onChangeSearch,
            onChangeTab
        }
    }

}

export default useEducationalContentController