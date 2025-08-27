import { Formik } from "formik"
import { useCallback, useState } from "react"
import { Switch, View } from "react-native"
import AuthWrapper from "../../../components/AuthWrapper"
import Button from "../../../components/Button"
import Icon from "../../../components/Icon"
import Input from "../../../components/Input"
import Row from "../../../components/Row"
import Text from "../../../components/Text"
import colors from "../../../utils/colors"
import { navigate } from "../../../utils/navigation"
import { ROUTES } from "../../../utils/routes"
import styles from "./styles"
import useLoginController from "./useLoginController"

const Login = () => {

    const {
        schema,
        refs: {
            formik_ref
        },
        values: {
            initial,
            isLoading,
            SOCIAL_LOGINS
        },
        functions: {
            onPressRegister,
            onPressGuest,
            onSubmit
        }
    } = useLoginController()

    const onPressForgotPassword = useCallback(() => {
        navigate(ROUTES.AUTH_TYPE)
    })

    const [remember, setRemember] = useState(false)

    return (
        <AuthWrapper title='Login'>
            <Formik
                innerRef={formik_ref}
                initialValues={initial}
                validationSchema={schema}
                onSubmit={onSubmit}
            >
                {({ values: data, handleSubmit, handleChange, errors, touched }) => (
                    <>
                        <Input
                            label="Email Address"
                            required
                            placeholder="Enter Email Address"
                            type="email"
                            value={data?.email}
                            onChangeText={handleChange("email")}
                            error={touched?.email ? errors?.email : ""}
                        />
                        <Input
                            label="Password"
                            required
                            placeholder="Enter Password"
                            type="password"
                            value={data?.password}
                            onChangeText={handleChange("password")}
                            error={touched?.password ? errors?.password : ""}
                        />
                        <Row justify="space-between" align="center" style={styles.row_space_between}>
                            <Row gap={2} align="center">
                                <Switch value={remember} onValueChange={setRemember} trackColor={{ false: colors.light_gray, true: colors.light_gray }} thumbColor={colors.secondary} />
                                <Text>Remember Me</Text>
                            </Row>
                            <Text underline weight="semibold" onPress={onPressForgotPassword} color={colors.secondary}>Forgot Password?</Text>
                        </Row>
                        <Button text="Login" style={styles.login_button} onPress={handleSubmit} loading={isLoading} />
                        <Row align="center">
                            <View style={styles.divider_line} />
                            <Text style={styles.divider_text} position="center" color={colors.dark_gray}>Or Login With</Text>
                            <View style={styles.divider_line} />
                        </Row>
                        <Row gap={15} style={styles.social_logins_row}>
                            {
                                SOCIAL_LOGINS.map((item, index) => (
                                    <View key={index} style={styles.social_login_box}>
                                        <Icon source={item.icon} size={24} />
                                    </View>
                                ))
                            }
                        </Row>
                        <View style={styles.register_container}>
                            <Text position="center" color={colors.dark_gray} onPress={onPressRegister}>
                                Not a User? <Text underline weight="semibold" position="center" color={colors.secondary}>Register Now</Text>
                            </Text>
                            <Text size={16} position="center" color={colors.dark_gray} onPress={onPressGuest}>Continue as a Guest</Text>
                        </View>
                    </>
                )}
            </Formik>
        </AuthWrapper>
    )
}

export default Login