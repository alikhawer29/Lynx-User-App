import { useState } from "react"
import RNFS from "react-native-fs"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { TContentType } from "../interfaces"

interface OfflineContent {
    _id: string
    title: string
    description?: string
    type: TContentType
    media_type: string
    media_url: string
    media_thumbnail_url?: string
    local_path?: string
}

const useSaveOffline = (OFFLINE_STORAGE_KEY: string) => {

    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const saveOffline = async (content: OfflineContent) => {
        try {
            setIsSaving(true)
            setError(null)

            const dir_path = `${RNFS.DocumentDirectoryPath}/offline_media`
            const file_name = `${content._id}.${content.media_type === "video" ? "mp4" : "jpg"}`
            const local_path = `${dir_path}/${file_name}`

            const dirExists = await RNFS.exists(dir_path)
            if (!dirExists) await RNFS.mkdir(dir_path)

            await RNFS.downloadFile({
                fromUrl: content.media_url,
                toFile: local_path,
            }).promise

            const existing_data = await AsyncStorage.getItem(OFFLINE_STORAGE_KEY)
            const parsed: OfflineContent[] = existing_data ? JSON.parse(existing_data) : []

            const already_exists = parsed.some(item => item._id === content._id)

            const new_data = already_exists
                ? parsed.map(item =>
                    item._id === content._id
                        ? { ...item, ...content, media_url: local_path }
                        : item
                )
                : [...parsed, { ...content, media_url: local_path }]

            await AsyncStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify(new_data))

            return {
                success: true,
                local_path
            }

        } catch (err: any) {
            console.log("Save offline error:", err)
            setError(err.message || "Failed to save offline")
            return { success: false }
        } finally {
            setIsSaving(false)
        }
    }

    const getOfflineContents = async (): Promise<OfflineContent[]> => {
        const data = await AsyncStorage.getItem(OFFLINE_STORAGE_KEY)
        return data ? JSON.parse(data) : []
    }

    const removeOfflineContent = async (id: string) => {
        try {

            setIsSaving(true)

            const data = await AsyncStorage.getItem(OFFLINE_STORAGE_KEY)
            if (!data) return
            const parsed: OfflineContent[] = JSON.parse(data)
            const filtered = parsed.filter(item => item._id !== id)
            await AsyncStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify(filtered))

        } catch (err: any) {
        } finally {
            setIsSaving(false)
        }
    }

    const checkIfExists = async (id: string) => {

        const data = await AsyncStorage.getItem(OFFLINE_STORAGE_KEY)

        if (!data) return false

        const parsed: OfflineContent[] = JSON.parse(data)
        return parsed.find(item => item._id === id)

    }

    return {
        isSaving,
        error,
        saveOffline,
        getOfflineContents,
        removeOfflineContent,
        checkIfExists,
    }
}

export default useSaveOffline