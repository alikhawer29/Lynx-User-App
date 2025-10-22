import { useIsFocused } from "@react-navigation/native"
import { useCallback, useEffect, useState } from "react"
import useSaveOffline from "../../hooks/useSaveOffline"
import useSearch from "../../hooks/useSearch"
import { ContentData, TContentType } from "../../interfaces"
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

const useOfflineContentController = () => {

    const is_focused = useIsFocused()

    const { search, debouncedSearch, onChange: onChangeSearch } = useSearch()

    const [content, setContent] = useState<ContentData[]>([])
    const [selected, setSelected] = useState<TContentType>(TABS[0].value as TContentType)

    const { getOfflineContents } = useSaveOffline("content")

    useEffect(() => {

        const results = content.filter(item =>
            item?.title?.toLowerCase().includes(search)
        )

        setContent(results)

    }, [debouncedSearch])

    useEffect(() => {
        if (is_focused) {
            getOfflineContents().then(res => {
                setContent(res)
            })
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
            data: content.filter(item => item.type === selected),
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