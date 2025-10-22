import { useRoute } from "@react-navigation/native"
import { useGetContentsQuery } from "../../redux/Apis/Content"
import useSaveOffline from "../../hooks/useSaveOffline"
import { useCallback, useEffect, useState } from "react"

const useViewArticleController = () => {

    const { params } = useRoute()

    const { isSaving, saveOffline, removeOfflineContent, checkIfExists } = useSaveOffline("content")

    const [savedOffline, setSavedOffline] = useState(false)

    const { data, isLoading } = useGetContentsQuery({ id: params?.id }, { skip: !params?.id })

    const check = async (id: string) => {
        setSavedOffline(!!(await checkIfExists(id)))
    }

    useEffect(() => {

        if (data?.data?._id) {
            check(data?.data?._id)
        }

    }, [data])

    const onSave = useCallback(async () => {
        if (savedOffline) {
            await removeOfflineContent(data?.data?._id)
            setSavedOffline(false)
            check(data?.data?._id)
        } else {
            await saveOffline(data?.data)
            setSavedOffline(true)
            check(data?.data?._id)
        }
    }, [savedOffline, data])

    return {
        values: {
            data: data?.data || null,
            isLoading,
            isSaving,
            saved_offline: savedOffline
        },
        functions: {
            onSave
        }
    }
}

export default useViewArticleController