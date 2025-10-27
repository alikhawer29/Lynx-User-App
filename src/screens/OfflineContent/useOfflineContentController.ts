import { useIsFocused } from "@react-navigation/native"
import { useCallback, useEffect, useMemo, useState } from "react"
import useSaveOffline from "../../hooks/useSaveOffline"
import useSearch from "../../hooks/useSearch"
import { ContentData, TContentType } from "../../interfaces"
import { navigate } from "../../utils/navigation"
import { ROUTES } from "../../utils/routes"

const TABS = [
    { label: "Videos", value: "video" },
    { label: "Article", value: "article" },
]

const useOfflineContentController = () => {

    const isFocused = useIsFocused()
    const { search, debouncedSearch, onChange: onChangeSearch } = useSearch()
    const { getOfflineContents } = useSaveOffline("content")

    const [content, setContent] = useState<ContentData[]>([])
    const [selected, setSelected] = useState<TContentType>(TABS[0].value as TContentType)

    useEffect(() => {
        if (isFocused) {
            getOfflineContents().then(res => {
                setContent(res || [])
            })
        }
    }, [isFocused, getOfflineContents])

    const filtered_data = useMemo(() => {
  
        const filtered_by_type = content.filter(item => item.type === selected)

        if (!debouncedSearch?.trim()) {
            return filtered_by_type
        }

        const lower_search = debouncedSearch.toLowerCase()

        return filtered_by_type.filter(item =>
            item?.title?.toLowerCase()?.includes(lower_search)
        )

    }, [content, selected, debouncedSearch])

    const onPressCard = useCallback((data: ContentData) => {
        const route = data.type === "article" ? ROUTES.VIEW_ARTICLE : ROUTES.VIEW_VIDEO
        navigate(route, { ...data })
    }, [])

    const onChangeTab = useCallback((tab: TContentType) => {
        setSelected(tab)
    }, [])

    return {
        values: {
            data: filtered_data,
            isLoading: false,
            search,
            selected,
            TABS
        },
        functions: {
            onPressCard,
            onChangeSearch,
            onChangeTab
        }
    }
}

export default useOfflineContentController
