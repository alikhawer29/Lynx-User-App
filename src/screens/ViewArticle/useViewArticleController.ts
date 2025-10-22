import { useRoute } from "@react-navigation/native"
import { useCallback, useEffect, useState } from "react"
import useSaveOffline from "../../hooks/useSaveOffline"

const useViewArticleController = () => {

    const { params } = useRoute()

    const { isSaving, saveOffline, removeOfflineContent, checkIfExists } = useSaveOffline("content")

    const [savedOffline, setSavedOffline] = useState(false)

    const check = async (id: string) => {
        setSavedOffline(!!(await checkIfExists(id)))
    }

    useEffect(() => {

        if (params?._id) {
            check(params?._id)
        }

    }, [params])

    const onSave = useCallback(async () => {
        if (savedOffline) {
            await removeOfflineContent(params?._id)
            setSavedOffline(false)
            check(params?._id)
        } else {
            await saveOffline(params)
            setSavedOffline(true)
            check(params?._id)
        }
    }, [savedOffline, params])

    return {
        values: {
            data: params || null,
            isLoading: false,
            isSaving,
            saved_offline: savedOffline
        },
        functions: {
            onSave
        }
    }
}

export default useViewArticleController