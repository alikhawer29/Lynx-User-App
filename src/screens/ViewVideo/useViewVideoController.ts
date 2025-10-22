import { useRoute } from "@react-navigation/native"
import { useGetContentsQuery } from "../../redux/Apis/Content"
import { useCallback, useEffect, useRef, useState } from "react"
import { VideoRef } from "react-native-video"
import useSaveOffline from "../../hooks/useSaveOffline"

const useViewVideoController = () => {

    const { params } = useRoute()

    const video_ref = useRef<VideoRef>(null)
    const [duration, setDuration] = useState(0)
    const [currentDuration, setCurrentDuration] = useState(0)
    const [savedOffline, setSavedOffline] = useState(false)

    const { isSaving, saveOffline, removeOfflineContent, checkIfExists } = useSaveOffline("content")

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

    const onProgress = useCallback((data: any) => {
        setCurrentDuration(data.currentTime)
    }, [])

    const onLoad = useCallback((data: any) => {
        setDuration(data.duration)
    }, [])

    const onEnd = useCallback(() => {
        video_ref.current?.seek(0)
        video_ref.current?.pause()
    }, [])

    return {
        refs: {
            video_ref
        },
        values: {
            data: data?.data || null,
            isLoading,
            isSaving,
            duration,
            currentDuration,
            saved_offline: savedOffline
        },
        functions: {
            onEnd,
            onLoad,
            onProgress,
            onSave
        }
    }
}

export default useViewVideoController