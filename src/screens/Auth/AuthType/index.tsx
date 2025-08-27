import { useCallback, useState } from "react"
import { FlatList, View } from "react-native"
import AuthWrapper from "../../../components/AuthWrapper"
import Button from "../../../components/Button"
import AuthSelectionCard from "../../../components/Cards/AuthSelectionCard"
import Text from "../../../components/Text"
import { InputType } from "../../../interfaces"
import colors from "../../../utils/colors"
import { AUTH_TYPES } from "../../../utils/data"
import { heightPixel } from "../../../utils/helper"
import { navigate, navigateAndSimpleReset } from "../../../utils/navigation"
import { ROUTES } from "../../../utils/routes"
// import styles from "../styles"

const AuthType = () => {

    const [selected, setSelected] = useState<InputType>(AUTH_TYPES[0].value as InputType)

    const onPress = useCallback(() => {
        navigate(ROUTES.FORGOT_PASSWORD, { type: selected })
    }, [selected])

    const onPressBackToLogin = useCallback(() => {
        navigateAndSimpleReset(ROUTES.LOGIN)
    }, [])

    return (
        <AuthWrapper
            title='Forgot Password'
        >
            <FlatList
                data={AUTH_TYPES}
                renderItem={({ item }) => <AuthSelectionCard {...item} selected={selected === item.value} onPress={() => setSelected(item.value as InputType)} />}
                ItemSeparatorComponent={() => <View style={{ height: heightPixel(10) }} />}
            />
            <Button text={"Continue"} style={{ marginVertical: heightPixel(40) }} onPress={onPress} />
            <Text position="center" color={colors.dark_gray} onPress={onPressBackToLogin}>Back To <Text underline weight="semibold" color={colors.secondary}>Login</Text></Text>
        </AuthWrapper>
    )
}

export default AuthType