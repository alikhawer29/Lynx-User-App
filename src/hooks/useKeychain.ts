import { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import * as Keychain from 'react-native-keychain'

interface Credentials {
    email: string
    password: string
}

const service = Platform.select({
    ios: "com.appfnh.lynx",
    android: "com.blitzapp.lynx"
})

const useKeychain = () => {

    const [credentials, setCredentials] = useState<Credentials | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                const saved = await Keychain.getGenericPassword({ service: service })
                console.log('saved', saved)
                if (saved) {
                    setCredentials({ email: saved.username, password: saved.password })
                } else {
                    setCredentials(null)
                }
            } catch (err) {
                console.log('Error loading credentials:', err)
                setCredentials(null)
            } finally {
                setLoading(false)
            }
        })()
    }, [service])

    const saveCredentials = async (email: string, password: string) => {
        try {
            await Keychain.setGenericPassword(email, password, { service: service })
            setCredentials({ email, password })
        } catch (err) {
            console.log('Error saving credentials:', err)
        }
    }

    const clearCredentials = async () => {
        try {
            await Keychain.resetGenericPassword({ service: service })
            setCredentials(null)
        } catch (err) {
            console.log('Error clearing credentials:', err)
        }
    }

    return {
        credentials,
        loading,
        saveCredentials,
        clearCredentials
    }
}

export default useKeychain
